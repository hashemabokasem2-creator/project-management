import { useState, useContext } from "react";
import { Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import {
  BsPlusLg,
  BsPerson,
  BsGrid,
  BsCalendarEvent,
  BsArrowLeft,
  BsTrash,
} from "react-icons/bs";
import BookContext from "./BookContext";

function BookDetails({ bookId, onBack }) {
  const { books, addReview, deleteReview } = useContext(BookContext);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const book = books.find((b) => b.id === bookId);
  if (!book) return null;
  const firstLetter = book.title ? book.title.charAt(0) : "";
  const filledStars = Math.floor(book.rating || 0);
  const emptyStars = 5 - filledStars;

  const handleCloseModal = () => {
    setShowReviewModal(false);
    setRating(0);
    setHoverRating(0);
    setComment("");
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (rating === 0) return;

    addReview(book.id, rating, comment);
    handleCloseModal();
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          onClick={onBack}
          style={{ color: "#8a2be2" }}
          className="btn p-0 border-0 bg-transparent text-purple fw-bold d-flex align-items-center gap-2 fs-4"
        >
          <BsArrowLeft /> تفاصيل الكتاب
        </button>

        <Button
          style={{ backgroundColor: "#8a2be2", borderColor: "#8a2be2" }}
          className="text-white d-flex align-items-center gap-2"
          onClick={() => setShowReviewModal(true)}
        >
          <BsPlusLg /> إضافة مراجعة
        </Button>
      </div>

      <Row className="g-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm p-3 text-center">
            <div className="bg-light rounded p-5 d-flex justify-content-center align-items-center mb-3">
              <div
                className="rounded-3 d-flex justify-content-center align-items-center text-white fw-bold fs-1"
                style={{
                  width: "120px",
                  height: "160px",
                  backgroundColor: "#8a2be2",
                }}
              >
                {firstLetter}
              </div>
            </div>
            <div className="d-flex justify-content-start mb-2">
              <div
                style={{ backgroundColor: "#8a2be2" }}
                className="px-2 rounded text-white py-1"
              >
                {book.category}
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <span className="text-warning fs-5">
                {"★".repeat(filledStars)}
                {"☆".repeat(emptyStars)}
              </span>
              <span className="fw-bold fs-6">{book.rating || 0.0}</span>
              <span className="text-muted small">
                ({book.reviewsCount || 0} مراجعة)
              </span>
            </div>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="border-0 shadow-sm p-4 mb-4">
            <h3 className="fw-bold text-purple mb-3">{book.title}</h3>

            <div className="d-flex flex-column gap-2 mb-4 text-muted">
              <div className="d-flex align-items-center gap-2">
                <BsPerson />{" "}
                <span>
                  <strong>المؤلف:</strong> {book.author}
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <BsGrid />{" "}
                <span>
                  <strong>التصنيف:</strong> {book.category}
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <BsCalendarEvent />{" "}
                <span>
                  <strong>تاريخ النشر:</strong> {book.year}
                </span>
              </div>
            </div>

            <hr className="my-3 text-muted" />

            <div>
              <h6 className="fw-bold mb-2">الوصف</h6>
              <p className="text-muted mb-0">
                {book.description || "وصف الكتاب"}
              </p>
            </div>
          </Card>
          <Card className="border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-3">
              المراجعات ({book.reviewsCount || 0})
            </h5>

            {book.reviews && book.reviews.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {book.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-light rounded p-3 d-flex justify-content-between align-items-start"
                  >
                    <div className="d-flex gap-3">
                      <div
                        className="rounded-circle text-white d-flex justify-content-center align-items-center fw-bold flex-shrink-0"
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#8a2be2",
                        }}
                      >
                        أ
                      </div>

                      <div>
                        <h6 className="fw-bold mb-1 fs-6">المستخدم الحالي</h6>
                        <div className="text-warning mb-2 small">
                          {"★".repeat(rev.rating)}
                          {"☆".repeat(5 - rev.rating)}
                        </div>
                        <p className="mb-2 text-dark small">{rev.comment}</p>
                        <span
                          className="text-muted small d-block"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {rev.date || "a few seconds ago"}
                        </span>
                      </div>
                    </div>
                    <BsTrash
                      className="text-danger style-pointer fs-5 ms-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        deleteReview(book.id, rev.id);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-light rounded p-4 text-center text-muted">
                لا توجد مراجعات بعد، كن أول من يضيف مراجعة
              </div>
            )}
          </Card>
        </Col>
      </Row>
      <Modal
        show={showReviewModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title className="fw-bold fs-5">إضافة مراجعة</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddReview}>
          <Modal.Body className="d-flex flex-column gap-3">
            <p className="text-muted mb-1">
              <strong>الكتاب:</strong> {book.title}
            </p>
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted">التقييم:</span>
              <div className="fs-4" style={{ cursor: "pointer" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= (hoverRating || rating)
                        ? "text-warning"
                        : "text-muted"
                    }
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="custom-outlined-input">
              <Form.Control
                as="textarea"
                rows={3}
                className="custom-input"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <label>تعليقك</label>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleCloseModal}>
              إلغاء
            </Button>
            <Button
              type="submit"
              style={{ backgroundColor: "#8a2be2", borderColor: "#8a2be2" }}
              className="text-white"
            >
              إضافة
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default BookDetails;
