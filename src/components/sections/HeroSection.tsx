import React from "react";
import Button from "../button/Button";
import { GoDownload } from "react-icons/go";
import Socials from "../iconElements/Socials";
import { useTranslation } from "react-i18next";
import Banner from "../banner/Banner";

export default function HeroSection() {
  const { t } = useTranslation("home");

  const bannerPossitiveText = t("Open to work! Contact me!");
  const bannerNegativeText = t(
    "Not looking for a job at the moment. But feel free to contact me!"
  );
  const lookingForWork = false;

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

          <div className="relative max-w-[400px] h-[400px]">
            <img
              className="min-w-[400px] w-full h-full object-cover"
              src="Lujza_Šufliarska_selfie.png"
              alt="Lujza Šufliarska selfie"
            />
            {/* TODO adjust positions based on text */}
            <div className="absolute top-4 -right-8">
              <Banner
                text={lookingForWork ? bannerPossitiveText : bannerNegativeText}
              />
            </div>
          </div>

          {/* 
          <img
            className="w-[400] h-[400]"
            src="Lujza_Šufliarska_selfie.png"
            alt="Lujza Šufliarska selfie"
          />
          <Banner
                text={lookingForWork ? bannerPossitiveText : bannerNegativeText}
              /> */}
        </div>
        <Socials />
      </div>
    </div>
  );
}
