import React from "react";
import TextHighlight from "../highlight/TextHighlight";
import SectionHeader from "../highlight/SectionHeader";
import { useTheme } from "../../context/theme-context";
import { useTranslation, Trans } from "react-i18next";

type Skills = {
  [category: string]: string[];
};

export default function AboutSection() {
  const { t } = useTranslation(["about", "navbar"]);
  const { theme } = useTheme(); // condition for dark icons

  const allSkills = Object.entries(
    t("skills", { returnObjects: true }) as Skills
  );

  return (
    <div className="flex flex-col px-5 items-center gap-5">
      <div className="flex flex-col gap-3 items-center">
        <SectionHeader>{t("sections.about", { ns: "navbar" })}</SectionHeader>

        <div className="flex flex-col text-default text-[var(--bcg-text)] text-justify gap-2">
          {/* <p>
            <Trans
              i18nKey="text1"
              components={{ highlight: <TextHighlight /> }} // error
            />
          </p> */}

          <p>
            {t("text1")
              .split(/(<highlight>.*?<\/highlight>)/g)
              .map((part, index) => {
                const match = part.match(/<highlight>(.*?)<\/highlight>/);

                if (match) {
                  return <TextHighlight key={index}>{match[1]}</TextHighlight>;
                }

                return <React.Fragment key={index}>{part}</React.Fragment>;
              })}
          </p>

          <p>{t("text2")}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center w-full">
        <SectionHeader>{t("title2")}</SectionHeader>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full text-[var(--bcg-text)] xs:justify-items-center sm:justify-items-stretch xs:text-center sm:text-left"> */}
        <div className="flex flex-wrap gap-8 w-full text-[var(--bcg-text)] justify-evenly">
          {allSkills.map(([skillSetName, skills]) => (
            <div className="flex flex-col gap-1 xs:min-w-[50%] sm:min-w-0text-center">
              <p className="font-bold text-h5">{skillSetName}</p>
              {/* <ul className="list-disc text-p1 px-4"> */}
              <ul className="text-p1">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap px-wrapper py-default w-full justify-evenly gap-3">
          <img
            src="./icons/python.png"
            alt="Python icon"
            className="h-icon-m"
          />
          <img src="./icons/java.png" alt="Java icon" className="h-icon-m" />
          <img
            src="./icons/postgresql.png"
            alt="PostgreSQL icon"
            className="h-icon-m"
          />
          <img src="./icons/html.png" alt="HTML icon" className="h-icon-m" />
          <img src="./icons/css.png" alt="CSS icon" className="h-icon-m" />

          <img src="./icons/figma.png" alt="Figma icon" className="h-icon-m" />
          <img
            src="./icons/axure.png"
            alt="Axure RP icon"
            className="h-icon-m"
          />
          <img
            src="./icons/photoshop.png"
            alt="Adobe Photoshop icon"
            className="h-icon-m"
          />
          <img
            src="./icons/illustrator.png"
            alt="Adobe Illustrator icon"
            className="h-icon-m"
          />

          {theme === "light" ? (
            <img
              src="./icons/github-light.png"
              alt="GitHub icon"
              className="h-icon-m"
            />
          ) : (
            <img
              src="./icons/github-dark.png"
              alt="GitHub icon"
              className="h-icon-m"
            />
          )}
          <img src="./icons/git.png" alt="Git icon" className="h-icon-m" />
          <img src="./icons/jira.png" alt="Jira icon" className="h-icon-m" />

          <img
            src="./icons/premiere_pro.png"
            alt="Adobe Premiere Pro icon"
            className="h-icon-m"
          />
          <img
            src="./icons/microsoft_office.png"
            alt="Microsoft Office icon"
            className="h-icon-m"
          />
          <img src="./icons/pbi.png" alt="Power BI icon" className="h-icon-m" />
        </div>
      </div>
    </div>
  );
}
