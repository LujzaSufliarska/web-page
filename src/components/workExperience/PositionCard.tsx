import React, { useState } from "react";
import Chip from "../chips/Chip";
import { useTranslation } from "react-i18next";

type Props = {
  position: string;
  period: string;
  company: React.ReactNode;
  description: string;
  attributes: string; // Comma-separated list of attributes
};

export default function PositionCard(props: Props) {
  const { t } = useTranslation("other");

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

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

        {!isExpanded ? (
          <button
            onClick={toggleExpanded}
            className="text-p1 text-[var(--primary)] w-fit cursor-pointer hover:underline"
          >
            {t("showDescription")}
          </button>
        ) : (
          <>
            <button
              onClick={toggleExpanded}
              className="text-p1 text-[var(--primary)] w-fit cursor-pointer hover:underline"
            >
              {t("hideDescription")}
            </button>

            <div className="flex flex-col text-p3">
              {props.description.split("\n").map((text) => (
                <p>{text.trim()}</p>
              ))}
            </div>
          </>
        )}

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
