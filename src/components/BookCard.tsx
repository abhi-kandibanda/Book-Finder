import React from 'react';
import type { Doc } from '../services/api';

type Props = {
  doc: Doc;
  onToggleFav: () => void;
  isFav: boolean;
};

export default function BookCard({
  doc,
  onToggleFav,
  isFav,
}: Props): JSX.Element {
  const cover = doc.cover_i
    ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
    : null;

  return (
    <article className="bg-white rounded-lg p-4 shadow-sm card-transition hover:shadow-md hover:-translate-y-1">
      <div className="flex gap-4">
        <img
          src={cover || 'https://via.placeholder.com/120x160?text=No+Cover'}
          alt={doc.title}
          className="w-24 h-32 object-cover rounded"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{doc.title}</h3>
          <div className="text-sm text-gray-600">
            {(doc.author_name || []).slice(0, 2).join(', ')}
          </div>
          <p className="mt-2 text-xs text-gray-500">
            First published: {doc.first_publish_year || '—'}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <a
              className="text-sm underline"
              href={`https://openlibrary.org${doc.key}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Open Library
            </a>

            <button
              onClick={onToggleFav}
              aria-pressed={isFav}
              className={`px-3 py-1 rounded ${
                isFav ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {isFav ? '★ Favorited' : '☆ Favorite'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
