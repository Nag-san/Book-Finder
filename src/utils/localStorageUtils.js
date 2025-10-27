export const getFavorites = () => {
  const favs = localStorage.getItem("favorites");
  return favs ? JSON.parse(favs) : [];
};

export const saveFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const toggleFavorite = (book) => {
  const favorites = getFavorites();
  const existing = favorites.find((b) => b.key === book.key);

  let updated;
  if (existing) {
    updated = favorites.filter((b) => b.key !== book.key);
  } else {
    updated = [...favorites, book];
  }

  saveFavorites(updated);
  return updated;
};

export const isFavorite = (bookKey) => {
  const favorites = getFavorites();
  return favorites.some((b) => b.key === bookKey);
};
