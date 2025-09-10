import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  startYear: number;
  length: number;
  onYearChange: (year: number) => void;
};

export default function YearFilter(props: Props) {
  const { t: t_other } = useTranslation("other");

  const years = Array.from(
    { length: props.length },
    (_, i) => props.startYear + i
  ).reverse();

  return (
    <div className="flex gap-1 justify-end text-p1">
      <p className="text-[var(--bcg-text)]">
        {t_other("experienceTimeline.scrollText")}
      </p>
      <select
        className="text-[var(--bcg-text)]"
        defaultValue={years[0]}
        onChange={(e) => props.onYearChange(Number(e.target.value))}
      >
        {years.map((year) => (
          <option key={year} value={year} className="text-black">
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
