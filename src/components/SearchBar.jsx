import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("title");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query, type);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("", type);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl flex flex-col sm:flex-row items-center gap-3 bg-white border border-neutral-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-200"
    >
      <input
        type="text"
        placeholder={`Search by ${type}...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-neutral-900 focus:outline-none placeholder:text-neutral-400 text-neutral-800"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="px-3 py-2.5 rounded-lg border border-neutral-300 text-neutral-700 bg-white focus:ring-2 focus:ring-neutral-900 focus:outline-none"
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="subject">Topic</option>
      </select>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.98] transition-all"
        >
          Search
        </button>

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="px-5 py-2.5 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-100 active:scale-[0.98] transition-all"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
