import { useState } from "react";
import BookSectionOne from "../components/BookSectionOne.jsx";
import BookProvider from "../components/BookProvider.jsx";
import BookDetails from "../components/BookDetails.jsx";

function Softwarelibrary() {
  const [selectedBookId, setSelectedBookId] = useState(null);
  return (
    <>
      <BookProvider>
        <div className="container py-4">
          {selectedBookId === null ? (
            <div>
              <BookSectionOne onSelectBook={(id) => setSelectedBookId(id)} />
            </div>
          ) : (
            <BookDetails
              bookId={selectedBookId}
              onBack={() => setSelectedBookId(null)}
            />
          )}
        </div>
      </BookProvider>
    </>
  );
}

export default Softwarelibrary;
