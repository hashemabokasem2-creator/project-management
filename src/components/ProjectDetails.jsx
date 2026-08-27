import { Button } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";

function ProjectDetails({ project, onBack }) {
  return (
    <div className="container py-4">
      <Button
        variant="link"
        className="text-decoration-none p-0 mb-3 d-flex align-items-center gap-2 text-dark fw-bold"
        onClick={onBack}
      >
        <BsArrowRight /> العودة للمشاريع
      </Button>
      <h3 className="fw-bold mb-2">{project?.title}</h3>
      <p className="text-muted">{project?.description}</p>
    </div>
  );
}

export default ProjectDetails;
