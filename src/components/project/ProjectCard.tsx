import React from "react";
import Chip from "../chips/Chip";

type Props = {
  img: string;
  name: string;
  description?: string;
  type: string;
  skills: string;
};

export default function ProjectCard(props: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <img src={props.img} className="" />

      <div className="flex flex-col gap-2 p-default bg-[var(--primary)]">
        <div className="text-[var(--primary-text)]">
          <p className="text-p1 font-bold">{props.name}</p>
          <p className="text-p2">{props.type}</p>
        </div>

        {/* SKILLS */}
        <div className="flex flex-wrap gap-default">
          {props.skills.split(",").map((skill, index) => (
            <Chip key={index} text={skill.trim()} variant="project" />
          ))}
        </div>

        {/* TODO hover and description is rolled up */}
      </div>
    </div>
  );
}
