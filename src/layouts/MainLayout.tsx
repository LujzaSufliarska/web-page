import Navbar from "../components/header/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import Footer from "../components/footer/Footer";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="relative py-10 px-sm_screen md:px-md_screen lg:px-lg_screen z-0 bg-[var(--bcg)]">
        <Outlet />
        <ScrollToTop />
      </div>{" "}
      <Footer />
    </>
  );
}
