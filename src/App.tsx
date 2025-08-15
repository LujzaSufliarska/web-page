import { HashRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./views/MainPage";
import ProjectsPage from "./views/ProjectsPage";
import ExperiencePage from "./views/ExperiencePage";
import "./i18n";

function App() {
  return (
    <HashRouter>
      {/* HashRouter Ensures refresh on redirect */}
      {/* <BrowserRouter
      basename={import.meta.env.MODE === "production" ? "/web-page" : "/"}
    > */}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Route>
      </Routes>
    </HashRouter>

    // M U S T  D O

    // N I C E  T O  D O
    // TODO offset scroll downu na mobiloch z headera je priliz vysoky
    // TODO add back button to the pages - experience, projects
    // TODO projects page - filtrovanie podľa roku?
    // TODO refactor experiencepage.tsx, experiencetimeline.tsx, timelinehelpers.ts
    // TODO CV - schopnosti header ma cez seba hentu ciaru, oracle SQL developer slovo developer zacina malym a tak isto aj slovo skusenosti vo volnocasovych, prelozit reporting specialist a zmenit to na support plus nazvy poziici dat zaciatocnym velkym

    // D O E S  N O T  M A T T E R
    // TODO pridat sekciu databazy
    // TODO pri hovery nech sa objavia podrobnosti o pracovnej pozicii na experience page
    // TODO change favicon?
    // TODO accessibility pre nevidiacich?
    // TODO na hero stranke zmenit na px-5 ako vsade ale ptm treba upravit poziciu banera. nevedela som jak na to tak som tam nechala px-10
  );
}

export default App;
