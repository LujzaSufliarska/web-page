import { useState } from "react";
import Chip from "../chips/Chip";
import { useTranslation } from "react-i18next";

type Props = {
  img: string;
  name: string;
  description?: string;
  type: string;
  skills: string;
};

export default function ProjectCard(props: Props) {
  const { t } = useTranslation("other");

  const [hovered, setHovered] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className="flex flex-col w-full group"
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

        {/* Button only on small screens */}
        {props.description && (
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="text-p2 text-[var(--primary-text)] underline md:hidden w-fit"
            aria-expanded={showDescription}
            aria-controls="description"
          >
            {showDescription ? t("hideDescription") : t("showDescription")}
          </button>
        )}

        {/* Description that rolls out */}
        <div
          // className={`overflow-hidden transition-all duration-300 ease-in-out text-p2 text-[var(--primary-text)] ${
          //   hovered ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          // }`}

          className={`overflow-hidden transition-all duration-300 ease-in-out text-p2 text-[var(--primary-text)] 
            ${
              // Small screens: controlled by showDescription
              showDescription ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            } 
            md:max-h-0 md:opacity-0 
            group-hover:md:max-h-40 group-hover:md:opacity-100`}
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
