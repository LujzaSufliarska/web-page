import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("footer");

  const showOlderVersions = false;

  // TODO page with older versions of the website
  const handle = () => {};

  return (
    <div className="flex flex-col gap-3 bg-[var(--primary)] py-wrapper px-lg_screen text-[var(--primary-text)] text-1 text-center items-center">
      <p>{t("text")}</p>
      <p>© Lujza Šufliarska 2025</p>

      {showOlderVersions && (
        <div className="flex justify-end w-full ">
          <button
            className="text-p2 underline cursor-pointer"
            onClick={() => handle}
          >
            {t("button")}
          </button>
        </div>
      )}
    </div>
  );
}
