import React from 'react';
import BookCard from './BookCard';
import type { Doc } from '../services/api';

type Props = {
  results: Doc[];
  page: number;
  total: number;
  onPage: (p: number) => void;
  onToggleFav: (b: Doc) => void;
  favorites: Doc[];
};

export default function BookList({
  results,
  page,
  total,
  onPage,
  onToggleFav,
  favorites,
}: Props): JSX.Element {
  const totalPages = Math.max(1, Math.ceil(total / 100));

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.map((doc) => (
          <BookCard
            key={doc.key}
            doc={doc}
            onToggleFav={() => onToggleFav(serializeDoc(doc))}
            isFav={favorites.some((f) => f.key === doc.key)}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">Found: {total} results</div>
        <div className="space-x-2">
          <button
            className="px-3 py-1 rounded border bg-white"
            onClick={() => onPage(Math.max(1, page - 1))}
            disabled={page <= 1}
          >
            Prev
          </button>
          <span className="text-sm">
            Page {page} / {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded border bg-white"
            onClick={() => onPage(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function serializeDoc(doc: Doc): Doc {
  return {
    key: doc.key,
    title: doc.title,
    author_name: doc.author_name,
    cover_i: doc.cover_i,
    first_publish_year: doc.first_publish_year,
  };
}
