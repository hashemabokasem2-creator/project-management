import { useState, useContext } from "react";
import "./BookSectionOne.css";
import { Row, Col, Card, Button, Form, Modal } from "react-bootstrap";
import {
  BsSearch,
  BsPlusLg,
  BsBook,
  BsGrid,
  BsPerson,
  BsCalendarEvent,
} from "react-icons/bs";
import BookContext from "./BookContext";

function BookSectionOne({ onSelectBook }) {
  const { books, setBooks, addBook } = useContext(BookContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("جميع التصنيفات");
  const [selectedAuthor, setSelectedAuthor] = useState("جميع المؤلفين");
  const totalBooks = books.length;
  const totalCategories = new Set(books.map((b) => b.category)).size;
  const totalAuthors = new Set(books.map((b) => b.author)).size;
  const categories = [
    "جميع التصنيفات",
    ...new Set(books.map((b) => b.category)),
  ];
  const authors = ["جميع المؤلفين", ...new Set(books.map((b) => b.author))];

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "جميع التصنيفات" ||
      book.category === selectedCategory;
    const matchesAuthor =
      selectedAuthor === "جميع المؤلفين" || book.author === selectedAuthor;
    return matchesSearch && matchesCategory && matchesAuthor;
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    year: new Date().getFullYear(),
    description: "",
  });

  const handleCloseModal = () => {
    setShowAddModal(false);
    setFormData({
      title: "",
      author: "",
      category: "",
      year: new Date().getFullYear(),
      description: "",
    });
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.category) return;

    addBook({
      title: formData.title,
      author: formData.author,
      category: formData.category,
      year: Number(formData.year) || new Date().getFullYear(),
      description: formData.description,
    });

    handleCloseModal();
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 style={{ color: "#8a2be2" }} className="fw-bold m-0">
          المكتبة الرقمية
        </h3>
        <Button
          variant="primary"
          style={{ backgroundColor: "#8a2be2" }}
          className="d-flex align-items-center gap-2"
          onClick={() => setShowAddModal(true)}
        >
          <BsPlusLg /> إضافة كتاب
        </Button>
      </div>
      <Card className="border-0 shadow-sm p-3 mb-4">
        <Row className="g-3">
          <Col md={6}>
            <div className="position-relative">
              <BsSearch
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                style={{ zIndex: 5 }}
              />
              <Form.Control
                placeholder="...ابحث عن كتاب"
                className="ps-5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </Col>
          <Col md={3}>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
            >
              {authors.map((auth, index) => (
                <option key={index} value={auth}>
                  {auth}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Card>
      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card
            className="border-0 shadow-sm text-center py-3"
            style={{ backgroundColor: "#fef5e7" }}
          >
            <BsBook size={28} className="text-warning mb-2 mx-auto" />
            <h4 className="fw-bold m-0">{totalBooks}</h4>
            <span className="text-muted small">إجمالي الكتب</span>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="border-0 shadow-sm text-center py-3"
            style={{ backgroundColor: "#eef6ff" }}
          >
            <BsGrid size={28} className="text-primary mb-2 mx-auto" />
            <h4 className="fw-bold m-0">{totalCategories}</h4>
            <span className="text-muted small">تصنيفات</span>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="border-0 shadow-sm text-center py-3"
            style={{ backgroundColor: "#f3e8ff" }}
          >
            <BsPerson size={28} className="text-purple mb-2 mx-auto" />
            <h4 className="fw-bold m-0">{totalAuthors}</h4>
            <span className="text-muted small">مؤلفين</span>
          </Card>
        </Col>
      </Row>
      <h5 className="fw-bold mb-3">الكتب ({filteredBooks.length})</h5>

      <Row className="g-3">
        {filteredBooks.map((book) => (
          <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              className="h-100 border-0 shadow-sm overflow-hidden style-card-hover"
              style={{ cursor: "pointer" }}
              onClick={() => onSelectBook(book.id)}
            >
              <div className="bg-light p-4 text-center position-relative">
                <div
                  style={{ backgroundColor: "#8a2be2" }}
                  className="position-absolute top-0 rounded p-1 text-white end-0 m-2"
                >
                  {book.category}
                </div>
                <BsBook
                  size={50}
                  style={{ color: "#8a2be2" }}
                  className="text-purple my-3"
                />
              </div>
              <Card.Body className="d-flex flex-column justify-content-between p-3">
                <div>
                  <Card.Title className="fw-bold fs-6 mb-2">
                    {book.title}
                  </Card.Title>

                  <div className="text-muted small mb-1 d-flex align-items-center gap-1">
                    <BsPerson /> {book.author}
                  </div>

                  <div className="text-muted small mb-2 d-flex align-items-center gap-1">
                    <BsCalendarEvent /> {book.year}
                  </div>
                  <div className="d-flex align-items-center gap-1 mb-1">
                    <span className="text-warning small">
                      {"★".repeat(Math.floor(book.rating))}
                      {"☆".repeat(5 - Math.floor(book.rating))}
                    </span>
                    <span className="text-muted small">({book.rating})</span>
                  </div>

                  <p className="text-muted small mb-0">
                    مراجعة {book.reviewsCount}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                  <p className="text-primary mb-0 small fw-bold">
                    عرض التفاصيل
                  </p>
                  <p
                    className="text-danger mb-0 small fw-bold"
                    onClick={(e) => {
                      e.stopPropagation();
                      setBooks(books.filter((b) => b.id !== book.id));
                    }}
                  >
                    حذف
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        show={showAddModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title className="fw-bold fs-5">إضافة كتاب جديد</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddBook}>
          <Modal.Body className="d-flex flex-column gap-3">
            <div className="custom-outlined-input">
              <Form.Control
                type="text"
                className="custom-input"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <label>عنوان الكتاب</label>
            </div>
            <div className="custom-outlined-input">
              <Form.Control
                type="text"
                className="custom-input"
                required
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
              />
              <label>المؤلف</label>
            </div>
            <div className="custom-outlined-input">
              <Form.Control
                type="text"
                className="custom-input"
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
              <label>التصنيف</label>
            </div>
            <div className="custom-outlined-input">
              <Form.Control
                type="number"
                className="custom-input"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
              />
              <label>تاريخ النشر</label>
            </div>
            <div className="custom-outlined-input">
              <Form.Control
                as="textarea"
                rows={3}
                className="custom-input"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <label>الوصف</label>
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

export default BookSectionOne;
