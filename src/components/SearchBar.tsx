import React, { useState } from 'react';
import debounce from '../utils/debounce';

type Props = {
  onSearch: (q: string) => void;
};

export default function SearchBar({ onSearch }: Props): JSX.Element {
  const [value, setValue] = useState<string>('');
  const debounced = debounce((v: string) => onSearch(v), 500);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const v = e.target.value;
    setValue(v);
    debounced(v);
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    onSearch(value);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label htmlFor="q" className="sr-only">
        Search books
      </label>
      <div className="relative">
        <input
          id="q"
          value={value}
          onChange={handleChange}
          placeholder="Search for books by title — e.g. The Hobbit"
          className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 pr-32 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <button
          type="submit"
          className="absolute right-1 top-1 bottom-1 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
        >
          Search
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Uses Open Library Search API — no keys required.
      </p>
    </form>
  );
}
