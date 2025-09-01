# Book Finder (React + Vite + Tailwind)

This project implements the Book Finder user need (persona: Alex — a college student who wants to search books).  
It uses the Open Library Search API (no auth) and is built with React, Vite and Tailwind CSS.

## Features
- Search by book title (debounced input)
- List results with cover (if available), author(s), first publish year
- Pagination (uses Open Library `page` param, limit 100)
- Favorite books (persisted to `localStorage`)
- Responsive layout and accessible links/buttons

## How to run locally
1. Node 18+ recommended
2. Install dependencies

```bash
npm install
