import React from "react";
import Chip from "../chips/Chip";

type Props = {
  position: string;
  period: string;
  company: React.ReactNode;
  attributes: string; // Comma-separated list of attributes
};

export default function PositionCard(props: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row px-wrapper py-default bg-[var(--primary)] text-[var(--primary-text)] font-normal rounded-small justify-between">
        <p className="font-bold">{props.position}</p>
        <p className="md:font-bold">{props.period}</p>
      </div>

      {/* BODY */}
      <div className="flex flex-col p-wrapper border-solid border-2 border-[var(--primary)] text-[var(--bcg-text)] rounded-small justify-between gap-2">
        <p
          className="text-p1"
          // style={{ whiteSpace: "pre-line" }} // neccessary for multiline text to keep \n
        >
          {props.company}
        </p>

        {/* CHIPS */}
        <div className="flex flex-wrap gap-default">
          {props.attributes.split(",").map((attr, index) => (
            <Chip key={index} text={attr.trim()} />
          ))}
        </div>
      </div>
    </div>
  );
}
