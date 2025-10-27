📚 Book Finder App

A simple and elegant book search application built with React + Tailwind CSS that allows users to explore books by title, author, or topic using the Open Library API.

🚀 Live Demo

👉 View on CodeSandbox
 (replace with your deployed link)

🧠 Features

🔍 Search Books — by title, author, or subject

📖 Book Details Page — shows full info and cover

❤️ Favorites System — save books using localStorage

⚡ Responsive UI — works seamlessly on mobile and desktop

💬 Error & Loading Handling — graceful messages for empty results or API errors

🛠️ Tech Stack
Category	Tools Used
Frontend	React 18, Tailwind CSS
Routing	React Router DOM
API	Open Library Search API
State Management	React Hooks
Storage	Browser LocalStorage
⚙️ API Reference

Search Books:

https://openlibrary.org/search.json?title={bookTitle}


Book Details:

https://openlibrary.org/works/{id}.json

🧩 Project Structure
src/
 ├── components/ → Reusable UI components
 ├── pages/ → Home, BookDetails, Favorites
 ├── services/ → API fetching logic
 ├── utils/ → LocalStorage helper
 ├── App.jsx → Routing setup
 └── index.css → Tailwind setup

💻 Local Setup
# 1️⃣ Clone the repository
git clone https://github.com/yourusername/book-finder.git

# 2️⃣ Install dependencies
npm install

# 3️⃣ Run locally
npm run dev

🧠 Learnings

Integrating external REST APIs in React

Managing persistent state with localStorage

Modular component architecture with Tailwind CSS

Responsive design and error handling

👤 Author

Alex (Demo Persona)
Built by Nagraj 💻
Inspired by Open Library’s mission to make books discoverable for everyone.

🌟 Future Enhancements

Pagination / Infinite Scroll

Debounced Search

Dark / Light Theme Toggle

Favorite Book Export / Share