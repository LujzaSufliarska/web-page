import PositionCard from "../workExperience/PositionCard";
import SectionHeader from "../highlight/SectionHeader";
import { useTranslation } from "react-i18next";
import Button from "../button/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function ExperienceSection() {
  const { t } = useTranslation(["experience", "navbar"]);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-5 gap-3 items-center">
      {/* 1. title from navbar 2. title from coresponding json */}
      <SectionHeader>
        {/* {t("sections.experience", { ns: "navbar" })} */}
        {t("section")}
      </SectionHeader>

      <div className="flex flex-col gap-3 w-full">
        <PositionCard
          key={1}
          position={t("positions.mbank1.position")}
          period={t("positions.mbank1.period")}
          company={
            <>
              <strong>{t("positions.mbank1.company_name")}</strong>
              <br />
              {t("positions.mbank1.company_location")}
              <br />
              {t("positions.mbank1.company_type")}
            </>
          }
          description={t("positions.mbank1.description")}
          attributes={t("positions.mbank1.attributes")}
        />

        <PositionCard
          key={2}
          position={t("positions.mbank2.position")}
          period={t("positions.mbank2.period")}
          company={
            <>
              <strong>{t("positions.mbank2.company_name")}</strong>
              <br />
              {t("positions.mbank2.company_location")}
              <br />
              {t("positions.mbank2.company_type")}
            </>
          }
          description={t("positions.mbank2.description")}
          attributes={t("positions.mbank2.attributes")}
        />
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
