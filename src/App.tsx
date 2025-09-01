import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import { searchBooks, Doc } from './services/api';

export default function App(): JSX.Element {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Doc[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [numFound, setNumFound] = useState<number>(0);
  const [favorites, setFavorites] = useState<Doc[]>(() => {
    try {
      const raw = localStorage.getItem('bf:favorites') || '[]';
      return JSON.parse(raw) as Doc[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('bf:favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setNumFound(0);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    let canceled = false;

    searchBooks(query, page)
      .then((res) => {
        if (canceled) return;
        setResults(res.docs || []);
        setNumFound(res.numFound || 0);
      })
      .catch((err) => {
        if (canceled) return;
        setError('Failed to fetch results');
        console.error(err);
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    return () => {
      canceled = true;
    };
  }, [query, page]);

  function toggleFavorite(book: Doc): void {
    setFavorites((prev) => {
      const exists = prev.find((b) => b.key === book.key);
      if (exists) return prev.filter((b) => b.key !== book.key);
      return [book, ...prev];
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif">Book Finder</h1>
          <p className="mt-1 text-sm text-gray-600">
            A classic, reliable search for Alex — built the old way, done right.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <SearchBar
          onSearch={(q: string) => {
            setPage(1);
            setQuery(q);
          }}
        />

        <div className="mt-6">
          {loading && <p className="text-sm text-gray-600">Searching...</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {!loading && !error && (
            <BookList
              results={results}
              page={page}
              total={numFound}
              onPage={(p: number) => setPage(p)}
              onToggleFav={toggleFavorite}
              favorites={favorites}
            />
          )}
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Favorites</h2>
          {favorites.length === 0 ? (
            <p className="mt-2 text-sm text-gray-600">
              No favorites yet — add one by clicking the star on a book card.
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favorites.map((b) => {
                const favCover = b.cover_i
                  ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`
                  : '/placeholder.svg';
                return (
                  <div key={b.key} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-start gap-4">
                      <img
                        src={favCover}
                        alt={b.title}
                        className="w-16 h-20 object-cover rounded-sm"
                      />
                      <div>
                        <div className="font-medium">{b.title}</div>
                        <div className="text-sm text-gray-600">
                          {(b.author_name || []).slice(0, 2).join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <footer className="mt-12 py-6 border-t bg-white">
        <div className="max-w-4xl mx-auto px-4 text-sm text-gray-600">
          <p>
            Built with the Open Library Search API. Traditional, dependable —
            like a library should be.
          </p>
        </div>
      </footer>
    </div>
  );
}
