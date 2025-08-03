import Button from "../button/Button";
import { GoDownload } from "react-icons/go";
import Socials from "../iconElements/Socials";
import { useTranslation } from "react-i18next";
import Banner from "../banner/Banner";

export default function HeroSection() {
  const { t } = useTranslation("home");
  const { t: tOther } = useTranslation("other");

  const lookingForWork = false;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "CV_Lujza_Šufliarska_2025.pdf";
    link.download = "CV_Lujza_Šufliarska_2025.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col px-10 py-[20px] mt-[60px] items-center gap-medium">
      <div className="flex flex-col gap-medium items-center lg:items-end">
        <div className="flex flex-col lg:flex-row gap-5 items-center lg:items-end">
          {/* Image w/ banner */}
          <div className="lg:order-2 relative w-full max-w-[350px] min-w-[100px] md:min-w-52 lg:max-w-[400px] h-auto aspect-square lg:flex-shrink-0">
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
                text={
                  lookingForWork
                    ? tOther("banner.positiveText")
                    : tOther("banner.negativeText")
                }
              />
            </div>
          </div>

          {/* Hero text w/ button */}
          <div className="flex flex-col lg:order-1 gap-3 items-start">
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

            <a
              href="CV_Lujza_Šufliarska_2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                label={t("button")}
                icon={<GoDownload />}
                onClick={() => {}}
                // onClick={handleDownload}
              />
            </a>
          </div>
        </div>
        <Socials />
      </div>
    </div>
  );
}
