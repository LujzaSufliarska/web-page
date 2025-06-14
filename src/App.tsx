import { useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
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

    // TODO add whether I'm open to work
    // TODO language switch
    // TODO fix project filter bar
    // TODO implement project filter
    // TODO projects page?
    // TODO project description on hover
    // TODO Responsive
    // TODO accessibility pre nevydiacich?
  );
}

export default App;
