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

  return (
    <BookContext.Provider value={{ books, setBooks, addBook }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;
