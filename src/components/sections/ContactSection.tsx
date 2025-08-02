import React from "react";
import ScrollToTop from "../scrollToTop/ScrollToTop";
import Socials from "../iconElements/Socials";
import { useTranslation } from "react-i18next";

export default function ContactSection() {
  const { t } = useTranslation("contact");

  return (
    <div className="flex flex-col px-lg_10screen gap-5 items-center text-[var(--bcg-text)]">
      <div className="flex flex-col gap-3 items-center text-center">
        <p className="text-h4">{t("text")}</p>

        {/* TODO copy email by click */}
        <p className="text-[var(--primary)] font-bold text-h3">
          lujzasuf@gmail.com
        </p>
      </div>

      <Socials />

      {/* <ScrollToTop /> */}
    </div>
  );
}
