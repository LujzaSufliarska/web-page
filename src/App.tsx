import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./views/MainPage";
import ProjectsPage from "./views/ProjectsPage";
import ExperiencePage from "./views/ExperiencePage";
import "./i18n";

function App() {
  return (
    <BrowserRouter
      basename={import.meta.env.MODE === "production" ? "/Web-Portfolio" : "/"}
    >
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

    // TODO change favicon (co to je?) and title of page shown in browser tab
    // TODO when on page, going to project and going back images are not loaded -> after F5 they are
    // TODO accessibility pre nevidiacich?
    // TODO experience page
    // TODO projects page - filtrovanie podľa roku?
    // TODO na hero stranke zmenit na px-5 ako vsade ale ptm treba upravit poziciu banera. nevedela som jak na to tak som tam nechala px-10
  );
}

export default App;
