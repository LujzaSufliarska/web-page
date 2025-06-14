import React, { useState } from "react";
import Chip from "../chips/Chip";

type Props = {
  img: string;
  name: string;
  description?: string;
  type: string;
  skills: string;
};

export default function ProjectCard(props: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={props.img}
        className="h-full max-h-[200px] w-auto object-contain"
      />

      {/* Intro text */}
      <div className="flex flex-col gap-2 p-default bg-[var(--primary)]">
        <div className="text-[var(--primary-text)]">
          <p className="text-p1 font-bold">{props.name}</p>
          <p className="text-p2">{props.type}</p>
        </div>

        {/* Description that rolls out */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out text-p2 text-[var(--primary-text)] ${
            hovered ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ whiteSpace: "normal" }}
        >
          {props.description}
        </div>

        {/* SKILLS */}
        <div className="flex flex-wrap gap-default">
          {props.skills.split(",").map((skill, index) => (
            <Chip key={index} text={skill.trim()} variant="project" />
          ))}
        </div>
      </div>
    </div>
  );
}
