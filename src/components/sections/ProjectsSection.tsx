import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import ProjectCard from "../project/ProjectCard";
import SectionHeader from "../highlight/SectionHeader";
import { useTranslation } from "react-i18next";

export default function ProjectsSection() {
  const { t, i18n } = useTranslation(["projects", "navbar"]);

  const maxProjects = 9;

  const filters = Object.values(t("filters", { returnObjects: true }));
  const allProjects = Object.values(t("projects", { returnObjects: true }));

  const allFilter = filters[0];

  const [selectedFilter, setSelectedFilter] = useState(filters[0]);

  const handleFilter = (filterIndex: number) => {
    setSelectedFilter(filters[filterIndex]);
  };

  const filteredProjects =
    selectedFilter === allFilter
      ? allProjects.slice(0, maxProjects)
      : allProjects
          .slice(0, maxProjects)
          .filter((project) => project.type === selectedFilter);

  const handle = () => {};

  // TODO i could fix that on refresh all filter is always selected
  useEffect(() => {
    setSelectedFilter(filters[0]);
  }, [i18n.language]);

  return (
    <div className="flex flex-col px-10 gap-5 items-center">
      <SectionHeader>{t("sections.projects", { ns: "navbar" })}</SectionHeader>

      {/* MENU */}
      <ul className="flex w-2/5 justify-between px-wrapper border-solid border-b-2 border-[var(--primary)] text-[var(--bcg-text)]">
        {filters.map((filter, index) => (
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
            type={project.type}
            skills={project.skills}
          />
        ))}
      </div>

      {/* TODO navigate na page */}
      <Button
        label={t("button")}
        icon={<FaArrowRightLong />}
        onClick={() => handle}
      />
    </div>
  );
}
