import PositionCard from "../workExperience/PositionCard";
import SectionHeader from "../highlight/SectionHeader";
import { useTranslation } from "react-i18next";
import Button from "../button/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { parseDate } from "../../utils/timelineHelpers";

export default function ExperienceSection() {
  const { t } = useTranslation(["experience", "navbar"]);
  const navigate = useNavigate();

  function getLatestExperiences() {
    const allExperiences = Object.values(
      t("positions", { returnObjects: true })
    );
    const presentKeyword = t("key_for_period_end", {
      ns: "experience",
    }).toLowerCase();

    const sortedByEndDate = allExperiences
      .map((position) => {
        const [start, end] = position.period.split(" - ");
        const endDate =
          end.toLowerCase() === presentKeyword ? new Date() : parseDate(end);

        return {
          ...position,
          _endDate: endDate, // Add parsed end date for sorting
        };
      })
      .sort((a, b) => b._endDate.getTime() - a._endDate.getTime()); // Newest to oldest

    return sortedByEndDate;
  }

  const latestExperiences = getLatestExperiences().slice(0, 3);

  return (
    <div className="flex flex-col px-5 gap-3 items-center">
      {/* 1. title from navbar 2. title from coresponding json */}
      <SectionHeader>
        {/* {t("sections.experience", { ns: "navbar" })} */}
        {t("section")}
      </SectionHeader>

      <div className="flex flex-col gap-3 w-full">
        {latestExperiences.map((experience, index) => (
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

      <Button
        label={t("button")}
        icon={<FaArrowRightLong />}
        onClick={() => {
          navigate("/experience");
          window.scrollTo({ top: 0, behavior: "smooth" }); // TODO nejak to glitchuje
        }}
      />
    </div>
  );
}
