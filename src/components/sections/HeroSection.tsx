import React from "react";
import Button from "../button/Button";
import { GoDownload } from "react-icons/go";
import Socials from "../iconElements/Socials";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation("home");

  const handleDownload = () => {};

  return (
    <div className="flex flex-col px-lg_screen py-[20px] mt-[60px] items-center gap-medium">
      <div className="flex flex-col gap-medium items-end">
        {/* Changed from items-center to items-end for alignment inak je to zbytocne mozno skusit fixnut len ked dam na mainPage center tak nizsie sekcie su uzke TODO*/}
        <div className="flex gap-5 items-end">
          <div className="flex flex-col gap-3 items-start">
            <div className="flex flex-col gap-1">
              <p className="text-h3 text-[var(--bcg-text)]">{t("greeting")}</p>

              <div className="flex gap-1">
                <p className="text-h2 text-[var(--bcg-text)]">{t("who")}</p>
                <p className="text-h2 text-[var(--primary)] font-bold">
                  Lujza Šufliarska
                </p>
              </div>

              <p className="text-default text-[var(--bcg-text)] text-justify">
                {t("text")}
              </p>
            </div>
            <Button
              label={t("button")}
              icon={<GoDownload />}
              onClick={() => handleDownload}
            />
          </div>
          <img
            className="w-[400] h-[400]"
            src="Lujza_Šufliarska_selfie.png"
            alt="Lujza Šufliarska selfie"
          />
        </div>
        <Socials />
      </div>
    </div>
  );
}
