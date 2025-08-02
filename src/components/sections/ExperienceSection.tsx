import PositionCard from "../workExperience/PositionCard";
import SectionHeader from "../highlight/SectionHeader";
import { useTranslation } from "react-i18next";

export default function ExperienceSection() {
  const { t } = useTranslation(["experience", "navbar"]);

  return (
    <div className="flex flex-col px-10 gap-3 items-center">
      {/* 1. title from navbar 2. title from coresponding json */}
      <SectionHeader>
        {/* {t("sections.experience", { ns: "navbar" })} */}
        {t("section")}
      </SectionHeader>

      <div className="flex flex-col gap-3 w-full">
        <PositionCard
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
    </div>
  );
}
