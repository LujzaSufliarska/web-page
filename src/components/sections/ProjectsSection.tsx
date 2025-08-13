import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import ProjectCard from "../project/ProjectCard";
import SectionHeader from "../highlight/SectionHeader";

import { FaArrowRightLong } from "react-icons/fa6";

export default function ProjectsSection() {
  const { t } = useTranslation(["projects", "navbar"]);
  const navigate = useNavigate();

  const maxProjects = 3;

  const allProjects = Object.values(t("projects", { returnObjects: true }));

  return (
    <div className="flex flex-col px-5 gap-5 items-center">
      <SectionHeader>{t("sections.projects", { ns: "navbar" })}</SectionHeader>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 w-full justify-items-center">
        {allProjects.slice(0, maxProjects).map((project, index) => (
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

      <Button
        label={t("button")}
        icon={<FaArrowRightLong />}
        onClick={() => {
          navigate("/projects");
          window.scrollTo({ top: 0, behavior: "smooth" }); // TODO nejak to glitchuje
        }}
      />
    </div>
  );
}
