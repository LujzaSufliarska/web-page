import { useTranslation } from "react-i18next";
import {
  getFirstAndLastJobDates,
  getPositionYear,
} from "../../utils/timelineHelpers";
import { useEffect, useRef } from "react";

export default function ExperienceTimeline() {
  const { t } = useTranslation("experience");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const containerWidth = 1300; // Adjust accordingly to viewport
  const allExperiences = Object.values(t("positions", { returnObjects: true }));

  const { firstJobStart, lastJobEnd } = getFirstAndLastJobDates(allExperiences);

  const startYear = firstJobStart.getFullYear();
  const endYear = lastJobEnd.getFullYear();

  const duration = endYear - startYear;

  // Scroll to show the right side (present jobs)
  useEffect(() => {
    if (scrollContainerRef.current && containerWidth > 0) {
      const scrollContainer = scrollContainerRef.current;
      scrollContainer.scrollLeft = Math.max(0, containerWidth);
    }
  }, [containerWidth, allExperiences]);

  return (
    <div className="p-4">
      {/* header */}
      <div className="text-default font-bold text-[var(--bcg-text)]">
        Timeline ({startYear} - {endYear})
      </div>

      {/* timeline */}
      <div
        className="overflow-x-auto border rounded bg-white whitespace-nowrap"
        ref={scrollContainerRef}
      >
        <div
          className="relative h-48"
          style={{ width: containerWidth, minWidth: containerWidth }}
        >
          {/* Year markers */}
          {[...Array(duration + 1)].map((_, i) => {
            const year = startYear + i;
            const left = ((year - startYear) / duration) * containerWidth;

            return (
              <div key={year} style={{ position: "absolute", left }}>
                <div className="w-px h-4 bg-gray-400 mb-1" />{" "}
                <div className="text-xs text-gray-600">{year}</div>
              </div>
            );
          })}

          {/* Events */}
          {allExperiences.map((event, id) => {
            const startPx = getPositionYear(
              event.period.split(" - ")[0],
              containerWidth,
              startYear,
              duration
            );
            const endPx = getPositionYear(
              event.period.split(" - ")[1].toLowerCase() === "present"
                ? new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })
                : event.period.split(" - ")[1],
              containerWidth,
              startYear,
              duration
            );

            const barWidth = Math.max(endPx - startPx, 4);

            const textFitsBar = event.position.length * 8 < barWidth;

            return (
              <div
                key={id}
                className={`absolute rounded px-2 ${
                  textFitsBar ? "text-white" : "text-black"
                }`}
                style={{
                  top: 50 + id * 30,
                  left: startPx,
                  width: barWidth,
                  backgroundColor: "green",
                }}
                title={`${event.position}: ${event.period}`}
              >
                {event.position} - {event.company_name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
