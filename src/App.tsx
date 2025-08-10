import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./views/MainPage";
import ProjectsPage from "./views/ProjectsPage";
import ExperiencePage from "./views/ExperiencePage";
import "./i18n";

function App() {
  return (
    <BrowserRouter
      basename={import.meta.env.MODE === "production" ? "/web-page" : "/"}
    >
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

    // TODO add back button to the pages - experience, projects
    // TODO check whether project object cannot be enlarged
    // TODO check navigation - maybe use axios so page would refersh when comming from other pages - experience, project
    // ->      TODO when on page, going to project and going back images are not loaded -> after F5 they are
    // TODO projects page - filtrovanie podľa roku?
    // TODO pridat sekciu databazy, ikonu unity
    // TODO offset scroll downu na mobiloch z headera je priliz vysoky
    // TODO skusit setnut scale a nech sa len predlzuje ten pas timeline
    // TODO pri hovery nech sa objavia podrobnosti o pracovnej pozicii na experience page
    // TODO z CV odstranit ISS program na ing je tam chyba
    // TODO v CV zmenit QR kod na webpage a aj link

    // TODO language switch on experience page - nefunguje ani keď dám mesiac ukončenia miesto súčastnosť

    // TODO change favicon (co to je?) and title of page shown in browser tab -- DONE
    // TODO accessibility pre nevidiacich?
    // TODO na hero stranke zmenit na px-5 ako vsade ale ptm treba upravit poziciu banera. nevedela som jak na to tak som tam nechala px-10
  );
}

export default App;
