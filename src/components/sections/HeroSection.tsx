import React from "react";
import Button from "../button/Button";
import { GoDownload } from "react-icons/go";
import Socials from "../iconElements/Socials";
import { useTranslation } from "react-i18next";
import Banner from "../banner/Banner";

export default function HeroSection() {
  const { t } = useTranslation("home");

  // const bannerPossitiveText = t("Open to work! Contact me!");
  const bannerPossitiveText = t("Looking for new opportunities! Contact me!");

  const bannerNegativeText = t(
    "Not looking for a job at the moment. But feel free to contact me!"
  );
  const lookingForWork = false;

  const handleDownload = () => {};

  return (
    <div className="flex flex-col px-10 py-[20px] mt-[60px] items-center gap-medium">
      <div className="flex flex-col gap-medium items-center lg:items-end">
        <div className="flex flex-col lg:flex-row gap-5 items-center lg:items-end">
          {/* Hero text w/ button */}
          <div className="flex flex-col gap-3 items-start">
            <div className="flex flex-col gap-1">
              <p className="text-h3 text-[var(--bcg-text)]">{t("greeting")}</p>

              <div className="flex flex-wrap gap-1 text-h2">
                <p className="text-[var(--bcg-text)]">{t("who")}</p>
                <p className="text-[var(--primary)] font-bold">{t("name")}</p>
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

          {/* Image w/ banner */}
          <div className="relative w-full max-w-[400px] min-w-[100px] md:min-w-52 lg:max-w-[400px] h-auto aspect-square">
            <img
              className="w-full h-full object-cover"
              src="Lujza_Šufliarska_selfie.png"
              alt="Lujza Šufliarska selfie"
            />

            <div
              className={`absolute top-0 right-0 transform translate-x-[${
                lookingForWork ? "35%" : "55%"
              }]`}
            >
              <Banner
                text={lookingForWork ? bannerPossitiveText : bannerNegativeText}
              />
            </div>
          </div>
        </div>
        <Socials />
      </div>
    </div>
  );
}
