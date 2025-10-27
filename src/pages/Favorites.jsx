import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites } from "../utils/localStorageUtils";
import BookCard from "../components/BookCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black transition-colors"
          >
            <span className="text-lg">←</span> Back to Search
          </Link>

          {favorites.length > 0 && (
            <span className="text-sm text-neutral-500">
              {favorites.length} {favorites.length === 1 ? "book" : "books"}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 tracking-tight">
          ❤️ My Favorite Books
        </h1>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl shadow-sm border border-neutral-200">
            <div className="text-7xl mb-6">📚</div>
            <p className="text-neutral-700 text-lg font-medium mb-2">
              No favorites yet
            </p>
            <p className="text-neutral-500 max-w-md text-center leading-relaxed">
              Go back and explore more books. Tap the ❤️ icon to add your
              favorite ones here.
            </p>
            <Link
              to="/"
              className="mt-6 px-5 py-2 text-sm font-medium bg-black text-white rounded-full hover:bg-neutral-800 transition-all"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          // Grid of Favorites
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8">
            {favorites.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
