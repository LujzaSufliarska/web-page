import React from "react";
import Button from "../button/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import ProjectCard from "../project/ProjectCard";
import SectionHeader from "../highlight/SectionHeader";

export default function ProjectsSection() {
  const handle = () => {};

  return (
    <div className="flex flex-col px-lg_screen gap-5 items-center">
      <SectionHeader>Projects</SectionHeader>

      {/* MENU */}
      {/* TODO gap vyriesit */}
      <ul className="flex  px-wrapper border-solid border-b-2 border-[var(--primary)] text-[var(--bcg-text)]">
        <li>All</li>
        <li>Web</li>
        <li>Mobile</li>
        <li>Other</li>
      </ul>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full justify-items-center">
        {/* TODO asi cez map zas? */}
        <ProjectCard
          img=""
          name="Name"
          description="Web"
          skills="Skill 1, Skill 2, Skill 3, Skill 4"
        />

        <ProjectCard
          img=""
          name="Name"
          description="Mobile"
          skills="Skill 1, Skill 2, Skill 3"
        />

        <ProjectCard
          img=""
          name="Name"
          description="Other"
          skills="Skill 1, Skill 2"
        />

        <ProjectCard
          img=""
          name="Name"
          description="Other"
          skills="Skill 1, Skill 2, Skill 3, Skill 4, Skill 5, Skill 6"
        />

        <ProjectCard
          img=""
          name="Name"
          description="Other"
          skills="Skill 1, Skill 2, Skill 3, Skill 4, Skill 5"
        />
      </div>

      {/* TODO navigate na page */}
      <Button
        label="View More Projects"
        icon={<FaArrowRightLong />}
        onClick={() => handle}
      />
    </div>
  );
}
