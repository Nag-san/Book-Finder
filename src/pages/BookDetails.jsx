import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import FavoriteButton from "../components/FavoriteButton";
import ErrorMessage from "../components/ErrorMessage";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [authorName, setAuthorName] = useState("Unknown Author");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        if (!res.ok) throw new Error("Failed to fetch book details");
        const data = await res.json();
        setBook(data);

        // Fetch author details if available
        if (data.authors && data.authors.length > 0) {
          const authorKey = data.authors[0]?.author?.key;
          if (authorKey) {
            const authorRes = await fetch(
              `https://openlibrary.org${authorKey}.json`
            );
            const authorData = await authorRes.json();
            setAuthorName(authorData?.name || "Unknown Author");
          }
        }
      } catch {
        setError("Unable to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const coverImage = book.covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : "https://via.placeholder.com/400x550?text=No+Cover";

  const description =
    typeof book.description === "string"
      ? book.description
      : book.description?.value;

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col items-center py-10 px-5">
      <div className="w-full max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-black transition-colors mb-6"
        >
          ← <span>Back to Search</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 flex flex-col sm:flex-row gap-10 items-center sm:items-start">
          <img
            src={coverImage}
            alt={book.title}
            className="w-64 h-80 object-cover rounded-xl shadow border border-neutral-200"
          />

          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 leading-tight">
              {book.title}
            </h1>
            <p className="text-neutral-500 mb-4 text-lg">{authorName}</p>

            {description && (
              <p className="text-neutral-700 leading-relaxed mb-8 whitespace-pre-line">
                {description}
              </p>
            )}

            <div className="flex justify-start mb-6">
              <FavoriteButton
                book={{
                  key: `/works/${id}`,
                  title: book.title,
                  author: authorName,
                  coverId: book.covers?.[0] || null,
                }}
              />
            </div>

            <div className="space-y-4">
              {book.subjects && (
                <Section title="Subjects" items={book.subjects.slice(0, 10)} />
              )}
              {book.subject_people && (
                <Section
                  title="Main Characters"
                  items={book.subject_people.slice(0, 8)}
                />
              )}
              {book.subject_places && (
                <Section
                  title="Places"
                  items={book.subject_places.slice(0, 8)}
                />
              )}
              {book.subject_times && (
                <Section
                  title="Timeline"
                  items={book.subject_times.slice(0, 5)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Created / Last Modified */}
        <div className="text-sm text-neutral-500 mt-10 text-center">
          <p>
            Created:{" "}
            {book.created?.value
              ? new Date(book.created.value).toDateString()
              : "Unknown"}
          </p>
          <p>
            Last Modified:{" "}
            {book.last_modified?.value
              ? new Date(book.last_modified.value).toDateString()
              : "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

// 🔹 Sub-component for displaying tag-like sections
const Section = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div>
      <h3 className="font-semibold text-neutral-800 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={i}
            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1 rounded-full text-sm transition-colors"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BookDetails;
