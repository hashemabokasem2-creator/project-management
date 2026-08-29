import { useState } from "react";
import BookContext from "./BookContext";

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "فن البرمجة",
      author: "أحمد محمد",
      category: "تقنية",
      year: 2023,
      rating: 4.5,
      reviewsCount: 0,
    },
    {
      id: 2,
      title: "قصة الحضارة",
      author: "فاطمة حسن",
      category: "تاريخ",
      year: 2022,
      rating: 4.8,
      reviewsCount: 0,
    },
    {
      id: 3,
      title: "علم النفس الحديث",
      author: "خالد أحمد",
      category: "علم نفس",
      year: 2023,
      rating: 4.2,
      reviewsCount: 0,
    },
    {
      id: 4,
      title: "الذكاء الاصطناعي",
      author: "سارة محمد",
      category: "تقنية",
      year: 2023,
      rating: 4.7,
      reviewsCount: 0,
    },
  ]);

  const addBook = (newBookData) => {
    const newBook = {
      id: Date.now(),
      ...newBookData,
      rating: 0,
      reviewsCount: 0,
    };
    setBooks((prevBooks) => [newBook, ...prevBooks]);
  };

  const addReview = (bookId, rating, comment) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id === bookId) {
          const currentCount = book.reviewsCount || 0;
          const currentRating = book.rating || 0;
          const newCount = currentCount + 1;
          const newRating = Number(
            ((currentRating * currentCount + rating) / newCount).toFixed(1),
          );

          const newReview = {
            id: Date.now(),
            rating,
            comment,
            date: new Date().toLocaleDateString("ar-EG"),
          };
          const existingReviews = book.reviews || [];

          return {
            ...book,
            rating: newRating,
            reviewsCount: newCount,
            reviews: [newReview, ...existingReviews],
          };
        }
        return book;
      }),
    );
  };

  const deleteReview = (bookId, reviewId) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id === bookId) {
          const updatedReviews = (book.reviews || []).filter(
            (rev) => rev.id !== reviewId,
          );
          const newCount = updatedReviews.length;
          const totalRating = updatedReviews.reduce(
            (sum, r) => sum + r.rating,
            0,
          );
          const newRating =
            newCount > 0 ? Number((totalRating / newCount).toFixed(1)) : 0;

          return {
            ...book,
            rating: newRating,
            reviewsCount: newCount,
            reviews: updatedReviews,
          };
        }
        return book;
      }),
    );
  };

  return (
    <BookContext.Provider
      value={{ books, setBooks, addBook, addReview, deleteReview }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;
