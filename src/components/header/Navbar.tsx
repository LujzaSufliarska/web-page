import { useEffect, useState } from "react";
import { useTheme } from "../../context/theme-context";

import { useTranslation } from "react-i18next";

import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import { BREAKPOINTS } from "../../config/breakpoints";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { t, i18n } = useTranslation(["navbar", "home"]);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  const sections = t("sections", { returnObjects: true }) as Record<
    string,
    string
  >;

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "sk" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("appLanguage", newLang);
  };

  const handleLinkClick = (id: string) => {
    const element = document.getElementById(id);

    if (location.pathname !== "/") {
      // navigate(`/#${id}`);
      window.location.href = `${window.location.pathname}#${id}`;
      window.location.reload();
      // Wait a bit for the DOM to render before scrolling - element can be set to null now
      setTimeout(() => {
        const element = document.getElementById(id);

        if (element) {
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offset = 70;

          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
          });
        }
      }, 100);
    } else if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offset = 70;

      // element.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      // Close the menu if the screen is wider than 768px - md
      if (window.innerWidth >= BREAKPOINTS.md) {
        setShowMenu(false);
      }
    };

    // Disable page scroll when menu is open
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("resize", handleResize);

    // Run on mount to handle initial screen size
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = ""; // cleanup overflow style on unmount
    };
  }, [showMenu]);

  return (
    <>
      {/* DESKTOP */}
      <nav className="fixed w-full h-[60px] top-0 left-0 px-sm_screen md:px-md_screen lg:px-lg_screen py-default bg-[var(--bcg)] opacity-95 text-[var(--bcg-text)] text-default drop-shadow-lg dark:drop-shadow-gray-800 gap-4 flex justify-between items-center z-[999]">
        {/* Display Initials */}
        {/* <p className="sm:hidden flex text-h5 text-[var(--primary)] font-bold">
          {getInitials(t("name", { ns: "home" }))}
        </p> */}

        {/* Display Whole Name */}
        {/* <p className="hidden sm:flex text-h5 text-[var(--primary)] font-bold">
          {t("name", { ns: "home" })}
        </p> */}

        <p
          className="flex text-h5 text-[var(--primary)] font-bold cursor-pointer"
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {t("name", { ns: "home" })}
        </p>

        <div className="hidden md:flex gap-5">
          {/* is === section "header" in json (the first part with : ) */}
          {Object.entries(sections).map(([id, label]) => (
            <Link
              key={id}
              to={`/#${id}`}
              onClick={() => handleLinkClick(id)}
              className="cursor-pointer"
            >
              {label}
            </Link>
          ))}
          {/* <a onClick={() => handleScroll("home")} className="cursor-pointer">
                  Home
                </a> */}
        </div>

        <div className="hidden md:flex gap-2 items-center">
          <button className=" cursor-pointer" onClick={() => toggleLanguage()}>
            {i18n.language === "en" ? "SK" : "EN"}
          </button>
          {theme === "light" ? (
            <IoMoonOutline className="cursor-pointer" onClick={toggleTheme} />
          ) : (
            <IoSunnyOutline className="cursor-pointer" onClick={toggleTheme} />
          )}
        </div>

        {/* MOBILE Menu Icon and X Icon*/}
        <div className="md:hidden flex text-3xl text-[var(--primary)]">
          {showMenu ? (
            <IoClose
              className="cursor-pointer"
              onClick={() => setShowMenu(false)}
            />
          ) : (
            <IoIosMenu
              className="cursor-pointer"
              onClick={() => setShowMenu(true)}
            />
          )}
        </div>
      </nav>

      {/* TODO menu opens only on top of the screen - i could also just delete useEffect which makes the page not scrollable */}
      {/* Full-screen Mobile SIDE MENU */}
      {showMenu && (
        <div className="w-full h-full top-0 left-0 px-sm_screen md:px-md_screen lg:px-lg_screen py-big bg-[var(--bcg)] text-[var(--bcg-text)] text-default flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            {/* is === section "header" in json (the first part with : ) */}
            {Object.entries(sections).map(([id, label]) => (
              <a
                key={id}
                onClick={() => {
                  setShowMenu(false);
                  handleLinkClick(id);
                }}
                className="cursor-pointer"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            <button
              className=" cursor-pointer"
              onClick={() => toggleLanguage()}
            >
              {i18n.language === "en" ? "SK" : "EN"}
            </button>
            {theme === "light" ? (
              <IoMoonOutline className="cursor-pointer" onClick={toggleTheme} />
            ) : (
              <IoSunnyOutline
                className="cursor-pointer"
                onClick={toggleTheme}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
