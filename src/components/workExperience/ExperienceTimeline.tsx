import { useTranslation } from "react-i18next";
import {
  getFirstAndLastJobDates,
  getPosition,
} from "../../utils/timelineHelpers";
import { useEffect, useRef, useState } from "react";

export default function ExperienceTimeline() {
  const { t } = useTranslation("experience");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const containerWidth = 1300; // TODO Adjust accordingly to viewport
  const allExperiences = Object.values(t("positions", { returnObjects: true }));

  const { firstJobStart, lastJobEnd } = getFirstAndLastJobDates(allExperiences);

  const startYear = firstJobStart.getFullYear();
  const startMonth = firstJobStart.getMonth();
  const endYear = lastJobEnd.getFullYear();
  const endMonth = lastJobEnd.getMonth();

  const durationMonths = (endYear - startYear) * 12 + (endMonth - startMonth);

  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

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
        Interactive Timeline ({startYear} - {endYear})
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
          {/* Month markers */}
          {[...Array(durationMonths + 2)].map((_, i) => {
            const date = new Date(startYear, startMonth + i, 1);
            const monthShort = date.toLocaleString("en-US", {
              month: "short",
            });
            const year = date.getFullYear(); //startMonth + i -> date  roll over into a different year 12 is jan

            const left = (i / durationMonths) * containerWidth;

            return (
              <div
                key={`${year}-${date.getMonth()}`}
                style={{ position: "absolute", left }}
              >
                <div className="w-px h-7 bg-gray-300 mb-1" />{" "}
                {/* vertical line above */}
                <div className="text-[10px] text-gray-400">{monthShort}</div>
              </div>
            );
          })}

          {/* Year markers */}
          {startMonth != 0 && (
            <div key={startYear} style={{ position: "absolute", left: 0 }}>
              <div className="w-px h-4 bg-gray-400 mb-1" />{" "}
              <div className="text-xs text-gray-600">{startYear}</div>
            </div>
          )}

          {[...Array(Math.floor(durationMonths / 12) + 1)].map((_, i) => {
            const year = startYear + i;
            const left =
              ((i * 12) / durationMonths) * containerWidth -
              startMonth * (containerWidth / durationMonths);

            return (
              // TODO z tohto mozem urobit aj komponent
              <div key={year} style={{ position: "absolute", left }}>
                <div className="w-px h-4 bg-gray-400 mb-1" />{" "}
                <div className="text-xs text-gray-600">{year}</div>
              </div>
            );
          })}

          {/* Events */}
          {allExperiences.map((event, id) => {
            const [eventStartDate, eventEnd] = event.period.split(" - ");
            const eventEndDate =
              eventEnd.toLowerCase() === "present"
                ? new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })
                : eventEnd;

            const startPx = getPosition(
              eventStartDate,
              containerWidth,
              firstJobStart,
              durationMonths
            );
            const endPx = getPosition(
              eventEndDate,
              containerWidth,
              firstJobStart,
              durationMonths,
              true
            );

            const barWidth = Math.max(endPx - startPx, 4);

            return (
              <>
                {/* Event Bar */}
                <div
                  key={id}
                  className="absolute rounded px-2 text-white overflow-hidden text-ellipsis
                  hover:brightness-115 hover:scale-105 transition-all duration-150 ease-out"
                  style={{
                    top: 50 + id * 30,
                    left: startPx,
                    width: barWidth,
                    backgroundColor: "green",
                  }}
                  onMouseEnter={() => setHoveredBar(id)}
                  onMouseLeave={() => setHoveredBar(null)}
                  //   title={`${event.position}: ${event.period}`}
                >
                  {event.position} - {event.company_name}
                </div>

                {/* Custom Event Tooltip */}
                {hoveredBar === id && (
                  <div
                    className="absolute z-50 bg-gray-900 text-white rounded-lg p-2 shadow-xl transform -translate-x-1/2 pointer-events-none"
                    style={{
                      top: 50 + id * 30 - 10,
                      left: startPx + barWidth / 2,
                      minWidth: "200px",
                    }}
                  >
                    <div className="font-bold text-p3">{event.position}</div>
                    <div className="text-gray-300 text-p3">
                      {event.company_name}
                    </div>
                    <div className="text-gray-400 text-p2 mt-1 border-t border-gray-700 pt-1">
                      {event.period}
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
