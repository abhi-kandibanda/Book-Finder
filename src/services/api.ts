export type Doc = {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
};

export type SearchResult = {
  docs: Doc[];
  numFound: number;
  [key: string]: any; // allow extra fields
};

export async function searchBooks(query: string, page = 1): Promise<SearchResult> {
  const url = new URL('https://openlibrary.org/search.json');
  url.searchParams.set('title', query);
  url.searchParams.set('page', String(page));
  url.searchParams.set('limit', '100'); // ensure pagination math matches

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Network error');
  const data = (await res.json()) as SearchResult;
  return data;
}
