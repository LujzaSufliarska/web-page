import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { FaFilter } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";
import ProjectCard from "../components/project/ProjectCard";

export default function ProjectsPage() {
  const { t, i18n } = useTranslation(["projects", "navbar"]);

  const filtersType = Object.values(t("filters", { returnObjects: true }));
  const filtersYears = Object.values(t("years", { returnObjects: true }));

  const allProjects = Object.values(t("projects", { returnObjects: true }));

  const allFilter = filtersType[0];

  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(filtersType[0]);

  const handleFilter = (filterIndex: number) => {
    setSelectedFilter(filtersType[filterIndex]);
  };

  const toggleFilterMenu = () => setShowFilter(!showFilter);

  const filteredProjects =
    selectedFilter === allFilter
      ? allProjects
      : allProjects.filter((project) => project.type === selectedFilter);

  // TODO i could fix that on refresh all filter is always selected
  useEffect(() => {
    setSelectedFilter(filtersType[0]);
  }, [i18n.language]);

  return (
    // TODO pridat filter na roky pripadne pre top 4 projekty ktore chcem zobrazit dat dajaky order alebo flag a podla toho to zobrazit v tej druhej sekcii

    <div className="flex flex-col px-10 py-[20px] mt-[60px] items-center gap-medium">
      {/* <IoArrowBack /> */}
      <div className="text-h4 text-[var(--primary)]">All of My Projects</div>

      {/* MOBILE FILTER MENU */}
      <div className="sm:hidden flex flex-col">
        <div
          className="flex gap-1 cursor-pointer text-[var(--primary)]"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaFilter size={24} />
          <p>{selectedFilter}</p>
        </div>

        {showFilter && (
          <ul className="flex flex-col w-2/5 justify-between px-8 text-[var(--bcg-text)]">
            {filtersType.map((filter, index) => (
              <li
                key={index}
                className={`cursor-pointer pb-1 ${
                  selectedFilter === filter ? "font-bold" : "opacity-50"
                }`}
                onClick={() => {
                  handleFilter(index);
                  toggleFilterMenu();
                }}
              >
                {filter}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* DESKTOP FILTER MENU */}
      <ul className="hidden sm:flex w-2/5 justify-between px-wrapper border-solid border-b-2 border-[var(--primary)] text-[var(--bcg-text)]">
        {filtersType.map((filter, index) => (
          <li
            key={index}
            className={`cursor-pointer pb-1 ${
              selectedFilter === filter
                ? "font-bold"
                : "opacity-50 hover:opacity-100"
            }`}
            onClick={() => handleFilter(index)}
          >
            {filter}
          </li>
        ))}
      </ul>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full justify-items-center">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={index}
            img={project.img}
            name={project.name}
            description={project.description}
            year={project.year}
            type={project.type}
            skills={project.skills}
          />
        ))}
      </div>
    </div>
  );
}
