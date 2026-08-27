import Sectionone from "../components/sectionone.jsx";
import { useState, useContext } from "react";
import ProjectDetails from "../components/ProjectDetails.jsx";
import  ProjectContext  from "../components/ProjectContext.jsx";

function Projectmanag() {
  const { projects } = useContext(ProjectContext);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  return (
    <>
      {selectedProjectId === null ? (
        <Sectionone onSelectProject={(id) => setSelectedProjectId(id)} />
      ) : (
        <ProjectDetails
          project={selectedProject}
          onBack={() => setSelectedProjectId(null)}
        />
      )}
    </>
  );
}

export default Projectmanag;
