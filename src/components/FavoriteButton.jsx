import React, { useState, useEffect } from "react";
import { toggleFavorite, isFavorite } from "../utils/localStorageUtils";

const FavoriteButton = ({ book }) => {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (book?.key) setFav(isFavorite(book.key));
  }, [book]);

  const handleClick = () => {
    toggleFavorite(book);
    setFav((prev) => !prev);
  };

  return (
    <button
      onClick={handleClick}
      className={`mt-4 px-4 py-2 rounded-lg font-medium transition ${
        fav
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
    >
      {fav ? "❤️ Remove Favorite" : "🤍 Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
