import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./views/MainPage";
import "./i18n";
import ProjectsPage from "./views/ProjectsPage";

function App() {
  return (
    <BrowserRouter
      basename={import.meta.env.MODE === "production" ? "/Web-Portfolio" : "/"}
    >
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </BrowserRouter>

    // TODO accessibility pre nevidiacich?
    // TODO projects page - filtrovanie podľa roku?
    // TODO experience page
    // TODO na hero stranke zmenit na px-5 ako vsade ale ptm treba upravit poziciu banera. nevedela som jak na to tak som tam nechala px-10
  );
}

export default App;
