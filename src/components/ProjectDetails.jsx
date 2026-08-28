import { useState, useContext, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  Modal,
  Form,
  Badge,
  Card,
} from "react-bootstrap";
import ProjectContext from "../components/ProjectContext.jsx";
import {
  BsArrowLeft,
  BsPlusLg,
  BsCircle,
  BsHourglassSplit,
  BsCheckCircleFill,
  BsTrash,
} from "react-icons/bs";

function ProjectDetails({ project, onBack }) {
  const [activeTab, setActiveTab] = useState("board");
  const {
    projects,
    updateTaskStatus,
    deleteTask,
    attachFile,
    addComment,
    addTask,
  } = useContext(ProjectContext);
  const currentProject =
    projects?.find((p) => Number(p.id) === Number(project?.id)) || project;
  const todoTasks =
    currentProject?.tasks?.filter((t) => t.status === "todo") || [];
  const inProgressTasks =
    currentProject?.tasks?.filter((t) => t.status === "inProgress") || [];
  const completedTasks =
    currentProject?.tasks?.filter((t) => t.status === "completed") || [];

  const fileInputRef = useRef(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && selectedTaskId) {
      attachFile(currentProject.id, selectedTaskId, file.name);
      e.target.value = "";
    }
  };
  const triggerFileInput = (taskId) => {
    setSelectedTaskId(taskId);
    fileInputRef.current.click();
  };

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [commentText, setCommentText] = useState("");
  const handleOpenCommentModal = (taskId) => {
    const task = [...todoTasks, ...inProgressTasks, ...completedTasks].find(
      (t) => t.id === taskId,
    );
    setSelectedTask(task);
    setShowCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
    setCommentText("");
    setSelectedTask(null);
  };

  const handleSaveComment = () => {
    if (commentText.trim() && selectedTask) {
      addComment(currentProject.id, selectedTask.id, commentText);
      handleCloseCommentModal();
    }
  };
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "متوسط",
    dueDate: "",
    assignee: "",
  });

  const handleTaskChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSaveTask = () => {
    if (!taskData.title.trim()) return;

    const newTask = {
      id: Date.now(),
      ...taskData,
      status: "todo",
      comments: [],
      files: [],
    };

    addTask(currentProject.id, newTask);
    setShowTaskModal(false);
    setTaskData({
      title: "",
      description: "",
      priority: "متوسط",
      dueDate: "",
      assignee: "",
    });
  };
  return (
    <>
      <section className="py-4">
        <Container>
          <Row className="align-items-start justify-content-between g-3 mb-4">
            <Col md={8} lg={9}>
              <Button
                variant="link"
                className="text-decoration-none p-0 mb-2 d-flex align-items-center gap-2 text-primary fw-bold fs-4"
                onClick={onBack}
              >
                <BsArrowLeft /> {project?.title}
              </Button>

              <p className="text-muted small mb-3">{project?.description}</p>

              <div className="d-flex gap-2 flex-wrap">
                {project?.membersList?.map((name, idx) => (
                  <span
                    key={idx}
                    className="badge bg-light text-dark border rounded-pill d-flex align-items-center gap-2 px-2 py-1 fw-normal"
                  >
                    <span
                      className="rounded-circle d-inline-block"
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: project?.color || "#0d6efd",
                      }}
                    ></span>
                    {name}
                  </span>
                ))}
              </div>
            </Col>
            <Col md={4} lg={3} className="d-flex justify-content-md-end">
              <Button
                variant="primary"
                className="d-flex align-items-center gap-2"
                onClick={() => setShowTaskModal(true)}
              >
                <BsPlusLg /> إضافة مهمة
              </Button>
            </Col>
          </Row>
          <Row className="mb-4 border-bottom">
            <Col>
              <Nav
                activeKey={activeTab}
                onSelect={(selectedKey) => setActiveTab(selectedKey)}
                className="border-0"
              >
                <Nav.Item>
                  <Nav.Link
                    eventKey="board"
                    className={`fw-bold px-3 py-2 text-decoration-none border-0 ${
                      activeTab === "board"
                        ? "text-primary border-bottom border-primary border-3 active"
                        : "text-muted"
                    }`}
                    style={{ background: "transparent" }}
                  >
                    لوحة المهام
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="calendar"
                    className={`fw-bold px-3 py-2 text-decoration-none border-0 ${
                      activeTab === "calendar"
                        ? "text-primary border-bottom border-primary border-3 active"
                        : "text-muted"
                    }`}
                    style={{ background: "transparent" }}
                  >
                    التقويم
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          {activeTab === "board" ? (
            <Row className="g-3">
              <Col md={4}>
                <div
                  className="p-3 rounded-3"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex align-items-center gap-2 mb-3 fw-bold text-dark">
                    <BsCircle className="text-primary" />
                    <span>قيد الانتظار ({todoTasks.length})</span>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    {todoTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-white p-3 rounded-3 shadow-sm border-start border-4"
                        style={{ borderColor: "#fd7e14" }}
                      >
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold mb-0">{task.title}</h6>
                          <Button
                            variant="link"
                            className="text-danger p-0 border-0"
                            onClick={() =>
                              deleteTask(currentProject.id, task.id)
                            }
                          >
                            <BsTrash />
                          </Button>
                        </div>

                        <p className="text-muted small mb-3">
                          {task.description}
                        </p>

                        <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
                          <span
                            className={`badge ${
                              task.priority === "عالي"
                                ? "bg-danger"
                                : task.priority === "متوسط"
                                  ? "bg-warning"
                                  : "bg-secondary"
                            } rounded-pill`}
                          >
                            {task.priority}
                          </span>
                          <span className="badge bg-light text-dark border rounded-pill">
                            👤 {task.assignee}
                          </span>
                          <span className="badge bg-light text-dark border rounded-pill">
                            📅 {task.dueDate}
                          </span>
                        </div>
                        {task.files && task.files.length > 0 && (
                          <div className="mb-2 small text-muted">
                            📎 الملفات: {task.files.join(", ")}
                          </div>
                        )}
                        {task.comments && task.comments.length > 0 && (
                          <div className="mb-3 p-2 bg-light rounded small">
                            <strong>التعليقات:</strong>
                            <ul className="mb-0 ps-3">
                              {task.comments.map((c, i) => (
                                <li key={i}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="d-flex align-items-center justify-content-between pt-2 border-top small">
                          <Button
                            variant="link"
                            className="p-0 text-decoration-none text-primary small"
                            onClick={() =>
                              updateTaskStatus(
                                currentProject.id,
                                task.id,
                                "inProgress",
                              )
                            }
                          >
                            بدء العمل
                          </Button>
                          <Button
                            variant="link"
                            className="p-0 text-decoration-none text-muted small"
                            onClick={() => triggerFileInput(task.id)}
                          >
                            إرفاق ملف
                          </Button>
                          <Button
                            variant="link"
                            className="p-0 text-decoration-none text-muted small"
                            onClick={() => handleOpenCommentModal(task.id)}
                          >
                            تعليق
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div
                  className="p-3 rounded-3"
                  style={{ backgroundColor: "#fff8ef" }}
                >
                  <div className="d-flex align-items-center gap-2 mb-3 fw-bold text-dark">
                    <BsHourglassSplit className="text-warning" />
                    <span>قيد التنفيذ ({inProgressTasks.length})</span>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    {inProgressTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-white p-3 rounded-3 shadow-sm border-start border-4"
                        style={{ borderColor: "#dc3545" }}
                      >
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold mb-0">{task.title}</h6>
                          <Button
                            variant="link"
                            className="text-danger p-0 border-0"
                            onClick={() =>
                              deleteTask(currentProject.id, task.id)
                            }
                          >
                            <BsTrash />
                          </Button>
                        </div>

                        <p className="text-muted small mb-3">
                          {task.description}
                        </p>

                        <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
                          <span
                            className={`badge ${
                              task.priority === "عالي"
                                ? "bg-danger"
                                : task.priority === "متوسط"
                                  ? "bg-warning"
                                  : "bg-secondary"
                            } rounded-pill`}
                          >
                            {task.priority}
                          </span>
                          <span className="badge bg-light text-dark border rounded-pill">
                            👤 {task.assignee}
                          </span>
                          <span className="badge bg-light text-dark border rounded-pill">
                            📅 {task.dueDate}
                          </span>
                        </div>
                        {task.files && task.files.length > 0 && (
                          <div className="mb-2 small text-muted">
                            📎 الملفات: {task.files.join(", ")}
                          </div>
                        )}
                        {task.comments && task.comments.length > 0 && (
                          <div className="mb-3 p-2 bg-light rounded small">
                            <strong>التعليقات:</strong>
                            <ul className="mb-0 ps-3">
                              {task.comments.map((c, i) => (
                                <li key={i}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="d-flex align-items-center justify-content-between pt-2 border-top small">
                          <Button
                            variant="link"
                            className="p-0 text-decoration-none text-success small"
                            onClick={() =>
                              updateTaskStatus(
                                currentProject.id,
                                task.id,
                                "completed",
                              )
                            }
                          >
                            إكمال
                          </Button>
                          <Button
                            variant="link"
                            className="p-0 text-decoration-none text-muted small"
                            onClick={() => triggerFileInput(task.id)}
                          >
                            إرفاق ملف
                          </Button>
                          <Button
                            variant="link"
                            className="p-0 text-decoration-none text-muted small"
                            onClick={() => handleOpenCommentModal(task.id)}
                          >
                            تعليق
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div
                  className="p-3 rounded-3"
                  style={{ backgroundColor: "#e8f5e9" }}
                >
                  <div className="d-flex align-items-center gap-2 mb-3 fw-bold text-dark">
                    <BsCheckCircleFill className="text-success" />
                    <span>مكتملة ({completedTasks.length})</span>
                  </div>

                  {completedTasks.length > 0 && (
                    <div className="d-flex flex-column gap-3">
                      {completedTasks.map((task) => (
                        <div
                          key={task.id}
                          className="bg-white p-3 rounded-3 shadow-sm border-start border-4 border-success"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold mb-0 text-decoration-line-through">
                              {task.title}
                            </h6>
                            <Button
                              variant="link"
                              className="text-danger p-0 border-0"
                              onClick={() =>
                                deleteTask(currentProject.id, task.id)
                              }
                            >
                              <BsTrash />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          ) : (
            <Row className="mt-4">
              <Col xs={12}>
                <h5 className="fw-bold mb-3">المهام القادمة</h5>

                {todoTasks.length === 0 ? (
                  <div className="text-center text-muted py-4 fw-normal">
                    لا يوجد مهام قيد الانتظار
                  </div>
                ) : (
                  todoTasks.map((task) => (
                    <Card key={task.id} className="border-0 shadow-sm mb-2">
                      <Card.Body className="d-flex align-items-center justify-content-between py-2 px-3">
                        <div>
                          <h6 className="fw-bold m-0 small">{task.title}</h6>
                          <span className="text-muted extra-small">
                            {task.dueDate} • {task.projectTitle}
                          </span>
                        </div>
                        <Badge
                          bg={
                            task.priority === "عالي"
                              ? "danger"
                              : task.priority === "متوسط"
                                ? "warning"
                                : "secondary"
                          }
                          className="fw-normal"
                        >
                          {task.priority}
                        </Badge>
                      </Card.Body>
                    </Card>
                  ))
                )}
              </Col>
            </Row>
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Modal
            show={showCommentModal}
            onHide={handleCloseCommentModal}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header>
              <Modal.Title className="h5 fw-bold mb-0">إضافة تعليق</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p className="text-muted small mb-3">
                المهمة:{" "}
                <span className="fw-bold text-dark">{selectedTask?.title}</span>
              </p>

              <div className="custom-outlined-input">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="custom-input"
                  style={{ height: "90px" }}
                />
                <label>تعليق جديد</label>
              </div>
            </Modal.Body>

            <Modal.Footer className="border-0 pt-0">
              <Button
                variant="light"
                className="text-decoration-none text-muted"
                onClick={handleCloseCommentModal}
              >
                إلغاء
              </Button>
              <Button variant="primary" onClick={handleSaveComment}>
                إضافة
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={showTaskModal}
            onHide={() => setShowTaskModal(false)}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header>
              <Modal.Title className="h5 fw-bold mb-0">
                إضافة مهمة جديدة
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="d-flex flex-column gap-3">
              <div className="custom-outlined-input">
                <Form.Control
                  type="text"
                  name="title"
                  value={taskData.title}
                  onChange={handleTaskChange}
                  className="custom-input"
                />
                <label>عنوان المهمة</label>
              </div>
              <div className="custom-outlined-input">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={taskData.description}
                  onChange={handleTaskChange}
                  className="custom-input"
                  style={{ height: "90px" }}
                />
                <label>الوصف</label>
              </div>
              <div className="custom-outlined-input">
                <Form.Select
                  name="priority"
                  value={taskData.priority}
                  onChange={handleTaskChange}
                  className="custom-input"
                >
                  <option value="منخفض">منخفض</option>
                  <option value="متوسط">متوسط</option>
                  <option value="عالي">عالي</option>
                </Form.Select>
                <label>الأولوية</label>
              </div>
              <div className="custom-outlined-input">
                <Form.Control
                  type="date"
                  name="dueDate"
                  value={taskData.dueDate}
                  onChange={handleTaskChange}
                  className="custom-input"
                />
                <label>موعد التسليم</label>
              </div>
              <div className="custom-outlined-input">
                <Form.Select
                  name="assignee"
                  value={taskData.assignee}
                  onChange={handleTaskChange}
                  className="custom-input"
                >
                  <option value="">اختر موظف...</option>
                  {currentProject?.membersList?.map((member, index) => (
                    <option key={index} value={member.name || member}>
                      {member.name || member}
                    </option>
                  ))}
                </Form.Select>
                <label>تعيين إلى</label>
              </div>
            </Modal.Body>

            <Modal.Footer className="border-0 pt-0">
              <Button
                variant="link"
                className="text-decoration-none text-muted"
                onClick={() => setShowTaskModal(false)}
              >
                إلغاء
              </Button>
              <Button variant="primary" onClick={handleSaveTask}>
                إضافة
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </section>
    </>
  );
}

export default ProjectDetails;
