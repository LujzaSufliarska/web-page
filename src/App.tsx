import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./views/MainPage";
import "./i18n";

function App() {
  return (
    <BrowserRouter basename="/Web-Portfolio">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          {/* <Route path="/projects" element={} /> */}
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </BrowserRouter>

    // TODO accessibility pre nevidiacich?
    // TODO projects page?
  );
}

export default App;
