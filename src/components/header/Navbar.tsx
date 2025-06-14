import { useTheme } from "../../context/theme-context";

import { useTranslation } from "react-i18next";

import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";

export default function Navbar() {
  const { t, i18n } = useTranslation("navbar");
  const { theme, toggleTheme } = useTheme();

  const sections = t("sections", { returnObjects: true }) as Record<
    string,
    string
  >;

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "sk" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
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

  return (
    <nav className="fixed w-full h-[60px] top-0 left-0 px-lg_screen py-default bg-[var(--bcg)] opacity-95 text-[var(--bcg-text)] text-default drop-shadow-lg dark:drop-shadow-gray-800 gap-4 flex justify-between items-center z-[999]">
      <p className="text-h5 text-[var(--primary)] font-bold">
        Lujza Šufliarska
      </p>

      <div className="flex gap-5">
        {/* is === section "header" in json (the first part with : ) */}
        {Object.entries(sections).map(([id, label]) => (
          <a
            key={id}
            onClick={() => handleScroll(id)}
            className="cursor-pointer"
          >
            {label}
          </a>
        ))}
        {/* <a onClick={() => handleScroll("home")} className="cursor-pointer">
          Home
        </a> */}
      </div>
      <div className="flex gap-2 items-center">
        <button className=" cursor-pointer" onClick={() => toggleLanguage()}>
          {i18n.language === "en" ? "SK" : "EN"}
        </button>
        {theme === "light" ? (
          <IoMoonOutline className="cursor-pointer" onClick={toggleTheme} />
        ) : (
          <IoSunnyOutline className="cursor-pointer" onClick={toggleTheme} />
        )}
      </div>
    </nav>
  );
}
