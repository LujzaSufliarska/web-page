import React from "react";
import ExperienceTimeline from "../components/workExperience/ExperienceTimeline";
import { useTranslation } from "react-i18next";
import PositionCard from "../components/workExperience/PositionCard";

export default function ExperiencePage() {
  const { t } = useTranslation("experience");

  const allExperiences = Object.values(t("positions", { returnObjects: true }));

  return (
    // TODO neresponzivne plus sirka zalezi od timelineu a neviem to fixnut
    // TODO maybe pridat ze zobrazit na timeline ked klikas na poziciu
    // TODO nad timeline pridat filtre podla roku ze by sa to tam scrollo
    <div className="flex flex-col px-10 py-[20px] mt-[60px] items-center gap-2">
      <div className="text-h4 text-[var(--primary)]">My Journey</div>
      <div className="flex flex-col gap-4">
        <ExperienceTimeline />

        <div className="flex flex-col gap-3 w-full">
          {allExperiences.map((experience, index) => (
            <PositionCard
              key={index}
              position={experience.position}
              period={experience.period}
              company={
                <>
                  <strong>{experience.company_name}</strong>
                  <br />
                  {experience.company_location}
                  <br />
                  {experience.company_type}
                </>
              }
              description={experience.description}
              attributes={experience.attributes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
