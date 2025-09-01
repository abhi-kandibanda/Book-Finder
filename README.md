# 📚 Book Finder

A simple and responsive web app that helps users search for books by title, view details, and save their favorites.  
Built with **React, Vite, and Tailwind CSS**, powered by the **Open Library API**.

## ✨ Features
- 🔎 **Search by title** — fast, debounced input
- 📖 **View book details** — title, authors, first publish year, and cover (if available)
- ⭐ **Favorite books** — stored locally in browser (`localStorage`)
- 📄 **Pagination** — browse through large result sets
- 📱 **Responsive design** — works on mobile, tablet, and desktop
- 
## 🛠️ Tech Stack
- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Vitest** (testing)
- **Open Library API** ([Docs](https://openlibrary.org/dev/docs/api/search))

## 📂 Project Structure
book-finder/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│ ├── main.tsx # Entry point
│ ├── App.tsx # Root component
│ ├── index.css # Global styles (Tailwind)
│ ├── components/ # UI components
│ ├── services/ # API calls
│ └── utils/ # Utility functions
└── tests/ # Unit tests

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+  
- npm or yarn

### Run locally
```bash
# 1. Clone repo
git clone https://github.com/<abhi-kandibanda>/book-finder.git
cd book-finder

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

---



