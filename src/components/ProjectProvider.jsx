import { useState } from "react";
import ProjectContext from "./ProjectContext";

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "مشروع تطوير الموقع",
      description: "تطوير موقع إلكتروني حديث باستخدام React",
      tasksCount: 2,
      membersCount: 3,
      membersList: ["أحمد", "فؤاد", "علي"],
      membersLetters: ["أ", "ف", "ع"],
      color: "#0d6efd",
      tasks: [
        {
          id: 101,
          title: "إعداد قاعدة البيانات",
          description: "تصميم وإنشاء قاعدة البيانات",
          status: "todo",
          priority: "متوسط",
          assignee: "فاطمة علي",
          dueDate: "2026-01-16",
        },
        {
          id: 102,
          title: "تصميم الواجهة الأمامية",
          description: "إنشاء تصميم احترافي للواجهة الأمامية",
          status: "inProgress",
          priority: "عالي",
          assignee: "أحمد محمد",
          dueDate: "2026-01-09",
        },
      ],
    },
    {
      id: 2,
      title: "مشروع تطبيق الجوال",
      description: "تطوير تطبيق جوال للمبيعات",
      tasksCount: 0,
      membersCount: 2,
      membersList: ["سارة", "محمد"],
      membersLetters: ["س", "م"],
      color: "#198754",
      tasks: [],
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

  const addTask = (projectId, newTask) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (String(project.id) === String(projectId)) {
          const updatedTasks = [...(project.tasks || []), newTask];
          return {
            ...project,
            tasks: updatedTasks,
            tasksCount: updatedTasks.length,
          };
        }
        return project;
      }),
    );
  };
  const updateTaskStatus = (projectId, taskId, newStatus) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: project.tasks.map((task) =>
              task.id === taskId ? { ...task, status: newStatus } : task,
            ),
          };
        }
        return project;
      }),
    );
  };

  const deleteTask = (projectId, taskId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id === projectId) {
          const updatedTasks = project.tasks.filter(
            (task) => task.id !== taskId,
          );
          return {
            ...project,
            tasks: updatedTasks,
            tasksCount: updatedTasks.length,
          };
        }
        return project;
      }),
    );
  };

  const addComment = (projectId, taskId, commentText) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: project.tasks.map((task) =>
              task.id === taskId
                ? { ...task, comments: [...(task.comments || []), commentText] }
                : task,
            ),
          };
        }
        return project;
      }),
    );
  };

  const attachFile = (projectId, taskId, fileName) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: project.tasks.map((task) =>
              task.id === taskId
                ? { ...task, files: [...(task.files || []), fileName] }
                : task,
            ),
          };
        }
        return project;
      }),
    );
  };
  const value = {
    projects,
    totalTasksCount,
    completedCount,
    inProgressCount,
    handleDeleteProject,
    handleAddProject,
    addTask,
    updateTaskStatus,
    deleteTask,
    addComment,
    attachFile,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectProvider;
