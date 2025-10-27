import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { fetchBooks } from "../services/bookService";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const handleSearch = async (term) => {
    if (!term.trim()) return;
    setQuery(term);
    setLoading(true);
    setError("");
    try {
      const data = await fetchBooks(term);
      if (data.length === 0) setError("No books found for that search term.");
      setBooks(data);
    } catch (err) {
      setError("Something went wrong while fetching books.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col items-center px-6 py-12">
      {/* Header */}
      <header className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center mb-16">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-center sm:text-left">
          Book<span className="text-neutral-400 font-light">Finder</span>
        </h1>

        <Link
          to="/favorites"
          className="mt-6 sm:mt-0 px-5 py-2 text-sm font-medium bg-black text-white rounded-full hover:bg-neutral-800 transition-all flex items-center gap-2"
        >
          ❤️ Favorites
        </Link>
      </header>

      {/* Tagline */}
      <p className="text-neutral-500 text-center max-w-2xl mb-10 text-lg leading-relaxed">
        Discover your next favorite read. Search any title, author, or topic —
        and let curiosity take over 📚
      </p>

      {/* Search */}
      <div className="w-full max-w-3xl mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Results */}
      <section className="w-full max-w-6xl mt-10">
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && books.length > 0 && (
          <div className="transition-all duration-500 ease-in-out">
            <BookList books={books} />
          </div>
        )}

        {!loading && !error && books.length === 0 && query && (
          <div className="text-center text-neutral-500 mt-16">
            <p className="text-lg font-medium mb-2">
              No results found for “{query}”.
            </p>
            <p className="text-neutral-400 text-sm">
              Try refining your search or checking spelling.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
