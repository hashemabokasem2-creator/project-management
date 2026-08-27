import { Routes, Route } from "react-router-dom";
import Mynavbar from "./components/Navbar.jsx";
import Projectmanag from "./pages/Projectmanag.jsx";
import Softwarelibrary from "./pages/Softwarelibrary.jsx";
import ProjectProvider from "./components/ProjectProvider.jsx";

function App() {
  return (
    <>
      <ProjectProvider>
        <Mynavbar />
        <Routes>
          <Route path="/" element={<Projectmanag />} />
          <Route path="/library" element={<Softwarelibrary />} />
        </Routes>
      </ProjectProvider>
    </>
  );
}

export default App;
