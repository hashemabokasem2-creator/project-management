import "./sectionone.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useState } from "react";
import {
  BsClockHistory,
  BsCheckCircle,
  BsClipboardCheck,
  BsPlusLg,
  BsTrash,
  BsPeople,
} from "react-icons/bs";
import { useContext } from "react";
import ProjectContext from "./ProjectContext";

function Sectionone() {
  const [showModal, setShowModal] = useState(false);
  const {
    projects,
    totalTasksCount,
    completedCount,
    inProgressCount,
    handleDeleteProject,
    handleAddProject,
  } = useContext(ProjectContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    membersInput: "",
    color: "#0d6efd",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const namesArray = formData.membersInput
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);

    const membersLetters = namesArray.map((name) =>
      name.charAt(0).toUpperCase(),
    );

    handleAddProject({
      title: formData.title,
      description: formData.description,
      membersCount: namesArray.length,
      membersLetters: membersLetters,
      color: formData.color,
    });

    setFormData({
      title: "",
      description: "",
      membersInput: "",
      color: "#0d6efd",
    });
    setShowModal(false);
  };
  return (
    <>
      <Container className="py-4 px-4 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-primary m-0">لوحة تحكم المشاريع</h3>
          <Button
            variant="primary"
            className="d-flex align-items-center gap-2 px-3 py-2 fw-semibold"
            onClick={() => setShowModal(true)}
          >
            <span>مشروع جديد</span>
            <BsPlusLg />
          </Button>
        </div>
        <Row className="g-3 mb-5">
          <Col md={4}>
            <Card className="bg-primary text-white text-center border-0 shadow-sm py-3">
              <Card.Body className="d-flex flex-column align-items-center gap-2">
                <BsClipboardCheck className="fs-2" />
                <h2 className="fw-bold m-0">{totalTasksCount}</h2>
                <Card.Text className="small m-0">إجمالي المهام</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="bg-success text-white text-center border-0 shadow-sm py-3">
              <Card.Body className="d-flex flex-column align-items-center gap-2">
                <BsCheckCircle className="fs-2" />
                <h2 className="fw-bold m-0">{completedCount}</h2>
                <Card.Text className="small m-0">مهام مكتملة</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="bg-warning text-white text-center border-0 shadow-sm py-3">
              <Card.Body className="d-flex flex-column align-items-center gap-2">
                <BsClockHistory className="fs-2" />
                <h2 className="fw-bold m-0">{inProgressCount}</h2>
                <Card.Text className="small m-0">مهام قيد التنفيذ</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="mb-3">
          <h5 className="fw-bold m-0">
            المشاريع <span className="text-muted">({projects.length})</span>
          </h5>
        </div>

        <Row className="g-3">
          {projects.map((project) => (
            <Col key={project.id} md={6} lg={4}>
              <Card className="shadow-sm border-0 h-100 position-relative border-top-custom">
                <Card.Body className="d-flex flex-column justify-content-between p-3">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="fw-bold m-0 text-dark">{project.title}</h6>
                      <BsTrash
                        className="text-danger cursor-pointer fs-5"
                        onClick={() => handleDeleteProject(project.id)}
                      />
                    </div>

                    <Card.Text className="text-muted small mb-3">
                      {project.description}
                    </Card.Text>

                    <div className="d-flex gap-2 mb-3">
                      <span className="badge bg-light text-dark border fw-normal px-2 py-1">
                        <BsClipboardCheck className="me-1" /> مهمة{" "}
                        {project.tasksCount}
                      </span>
                      <span className="badge bg-light text-dark border fw-normal px-2 py-1">
                        <BsPeople className="me-1" /> عضو {project.membersCount}
                      </span>
                    </div>

                    {/* <div className="d-flex gap-1 mb-3">
                      {project.membersLetters?.map((letter, idx) => (
                        <span
                          key={idx}
                          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center small fw-bold"
                          style={{
                            width: "28px",
                            height: "28px",
                            fontSize: "12px",
                          }}
                        >
                          {letter}
                        </span>
                      ))}
                    </div> */}
                    <div className="d-flex gap-1 mb-3">
                      {project.membersLetters?.map((letter, idx) => (
                        <span
                          key={idx}
                          className="rounded-circle text-white d-flex align-items-center justify-content-center small fw-bold"
                          style={{
                            width: "28px",
                            height: "28px",
                            fontSize: "12px",
                            backgroundColor: project.color || "#0d6efd",
                          }}
                        >
                          {letter}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-top">
                    <p className="text-primary small m-0 fw-semibold cursor-pointer">
                      عرض التفاصيل
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          backdrop="static"
        >
          <Form onSubmit={handleSubmit}>
            <Modal.Header>
              <Modal.Title className="fw-bold fs-5">
                إضافة مشروع جديد
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column gap-4 pt-4">
              <div className="custom-outlined-input">
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="custom-input"
                />
                <label>اسم المشروع</label>
              </div>
              <div className="custom-outlined-input">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="custom-input"
                  style={{ height: "90px" }}
                />
                <label>الوصف</label>
              </div>
              <div className="custom-outlined-input">
                <Form.Control
                  type="text"
                  name="membersInput"
                  value={formData.membersInput}
                  onChange={handleChange}
                  className="custom-input"
                />
                <label>أسماء المشاركين</label>
              </div>

              <div className="custom-outlined-input">
                <div className="d-flex align-items-center justify-content-between p-2 border rounded custom-input">
                  <Form.Control
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="p-0 border-0 cursor-pointer custom-color-input"
                    style={{ width: "450px", height: "30px" }}
                  />
                </div>
                <label>اللون</label>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="light" onClick={() => setShowModal(false)}>
                إلغاء
              </Button>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                إضافة
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </>
  );
}

export default Sectionone;
