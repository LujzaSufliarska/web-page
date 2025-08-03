import ScrollToTop from "../scrollToTop/ScrollToTop";
import Socials from "../iconElements/Socials";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";

export default function ContactSection() {
  const { t } = useTranslation("contact");

  const email = "lujzasuf@gmail.com";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="flex flex-col px-5 gap-5 items-center text-[var(--bcg-text)]">
      <div className="flex flex-col gap-3 items-center text-center">
        <p className="text-h4">{t("text")}</p>

        <p
          onClick={copyToClipboard}
          className={`flex gap-1 items-center text-[var(--primary)] font-bold text-h3 cursor-pointer select-none ${
            copied ? "" : "hover:underline"
          }`}
          title="Click to copy email"
        >
          {copied ? (
            <span className="text-green-700 text-h5 hover:">
              Email successfully copied!
            </span>
          ) : (
            <>
              {email} <FaRegCopy size={24} />
            </>
          )}
        </p>
      </div>

      <Socials />

      {/* <ScrollToTop /> */}
    </div>
  );
}
