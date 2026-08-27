import { useState } from "react";
import ProjectContext from "./ProjectContext";

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "مشروع تطوير الموقع",
      description: "تطوير موقع إلكتروني حديث باستخدام React",
      tasksCount: 3,
      membersCount: 2,
      membersLetters: ["أ", "ف", "خ"],
    },
    {
      id: 2,
      title: "مشروع تطبيق الجوال",
      description: "تطوير تطبيق جوال للمبيعات",
      tasksCount: 1,
      membersCount: 2,
      membersLetters: ["س", "م"],
    },
  ]);

  const [totalTasksCount, setTotalTasksCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);

  const handleDeleteProject = (id) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const handleAddProject = (newProjectData) => {
    const newProject = {
      id: Date.now(),
      tasksCount: 0,
      ...newProjectData,
    };

    setProjects((prevProjects) => [...prevProjects, newProject]);
  };
  const value = {
    projects,
    totalTasksCount,
    completedCount,
    inProgressCount,
    handleDeleteProject,
    handleAddProject,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectProvider;
