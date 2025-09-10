import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import ExperienceTimeline from "../components/workExperience/ExperienceTimeline";
import PositionCard from "../components/workExperience/PositionCard";
import { IoArrowBack } from "react-icons/io5";

export default function ExperiencePage() {
  const { t } = useTranslation("experience");

  const allExperiences = Object.values(t("positions", { returnObjects: true }));

  // Change to use position names as keys instead of indices
  const positionCardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  //   const scrollToCard = (positionName: number) => {
  //     positionCardRefs.current[positionName]?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   };
  const scrollToCard = (positionName: number) => {
    const element = positionCardRefs.current[positionName];
    if (element) {
      const yOffset = -80; // Negative up, positive scrolls down
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col w-full py-[20px] mt-[60px] gap-2">
      {/* <IoArrowBack /> */}
      <div className="text-h4 text-[var(--primary)] text-center">
        {t("section2")}
      </div>
      <div className="flex flex-col gap-4">
        <ExperienceTimeline onEventClick={scrollToCard} visible={true} />

        <div className="flex flex-col gap-3 w-full">
          {allExperiences.map((experience) => (
            <div
              key={experience.position}
              ref={(el) => {
                positionCardRefs.current[experience.position] = el;
              }}
            >
              <PositionCard
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
