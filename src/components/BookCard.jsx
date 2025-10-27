import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const coverImage = book.coverId
    ? `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`
    : "https://via.placeholder.com/300x400?text=No+Cover";

  return (
    <Link
      to={`/book/${book.key.split("/").pop()}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 p-4 flex flex-col items-center"
    >
      <img
        src={coverImage}
        alt={book.title}
        className="h-64 w-full object-cover rounded-md mb-4"
      />
      <h3 className="font-semibold text-neutral-800 text-center line-clamp-1">
        {book.title}
      </h3>
      <p className="text-sm text-neutral-500 mt-1">
        {book.author ? book.author : "Unknown Author"}
      </p>
    </Link>
  );
};

export default BookCard;
