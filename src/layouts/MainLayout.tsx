import Navbar from "../components/header/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import Footer from "../components/footer/Footer";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="relative p-10 z-0 bg-[var(--bcg)]">
        <Outlet />
        <ScrollToTop />
      </div>{" "}
      <Footer />
    </>
  );
}
