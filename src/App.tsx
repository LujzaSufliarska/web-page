import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./views/MainPage";
import "./i18n";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          {/* <Route path="/projects" element={} /> */}
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </BrowserRouter>

    // TODO Responsive
    // TODO accessibility pre nevidiacich?
    // TODO fix testimonial card height nech sa prisposobuje textu
    // TODO projects page?
  );
}

export default App;
