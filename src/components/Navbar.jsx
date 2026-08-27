import "./Navbar.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BsFolder, BsCodeSquare } from "react-icons/bs";
function Mynavbar() {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="py-2 px-3">
        <Container
          fluid
          className="d-flex justify-content-between align-items-center"
        >
          <Navbar.Brand className="text-white fw-bold m-0 fs-5">
            تطبيقاتي
          </Navbar.Brand>
          <Nav className="d-flex flex-row align-items-center gap-2">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              className="custom-nav-item d-flex align-items-center gap-2 text-white px-3 py-2 rounded-3"
            >
              <BsFolder className="fs-5" />
              <span>إدارة المشاريع</span>
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/library"
              className="custom-nav-item d-flex align-items-center gap-2 text-white px-3 py-2 rounded-3"
            >
              <BsCodeSquare className="fs-5" />
              <span>المكتبة البرمجية</span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Mynavbar;
