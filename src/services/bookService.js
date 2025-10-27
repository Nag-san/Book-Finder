// src/services/bookService.js
/**
 * Service module to interact with the Open Library API.
 * Handles searching for books by title, author, or subject.
 */

const BASE_URL = "https://openlibrary.org/search.json";

/**
 * Fetch books from the Open Library API.
 * @param {string} query - Search term entered by user.
 * @param {string} type - Type of search ("title", "author", or "subject").
 * @returns {Promise<Object>} Returns a list of book objects or throws an error.
 */
export const fetchBooks = async (query, type = "title") => {
  if (!query || query.trim() === "") {
    throw new Error("Please enter a search query.");
  }

  try {
    const url = `${BASE_URL}?${type}=${encodeURIComponent(query.trim())}&limit=20`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }

    const data = await response.json();

    // Transform the data into a simplified format for the UI
    const books = data.docs.map((book) => ({
      key: book.key,
      title: book.title,
      author: book.author_name ? book.author_name.join(", ") : "Unknown Author",
      year: book.first_publish_year || "N/A",
      coverId: book.cover_i || null,
      subject: book.subject ? book.subject.slice(0, 5) : [],
    }));

    return books;
  } catch (error) {
    console.error("Error fetching books:", error.message);
    throw new Error("Failed to fetch books. Please try again later.");
  }
};

/**
 * Utility function to get the full cover image URL.
 * @param {number} coverId - The cover ID returned from API.
 * @returns {string} The cover image URL.
 */
export const getCoverImage = (coverId) => {
  if (!coverId) {
    // Fallback image if no cover is found
    return "https://via.placeholder.com/150x220?text=No+Cover";
  }
  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
};
