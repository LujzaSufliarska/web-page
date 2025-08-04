import { useTranslation } from "react-i18next";
import {
  getFirstAndLastJobDates,
  getPosition,
} from "../../utils/timelineHelpers";
import { useEffect, useRef, useState } from "react";

export default function ExperienceTimeline() {
  const { t } = useTranslation("experience");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const containerWidth = 1500; // TODO Adjust accordingly to viewport
  const allExperiences = Object.values(t("positions", { returnObjects: true }));

  const { firstJobStart, lastJobEnd } = getFirstAndLastJobDates(allExperiences);

  const startYear = firstJobStart.getFullYear();
  const startMonth = firstJobStart.getMonth();
  const endYear = lastJobEnd.getFullYear();
  const endMonth = lastJobEnd.getMonth();

  const durationMonths = (endYear - startYear) * 12 + (endMonth - startMonth);

  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Scroll to show the right side (present jobs)
  useEffect(() => {
    if (scrollContainerRef.current && containerWidth > 0) {
      const scrollContainer = scrollContainerRef.current;
      scrollContainer.scrollLeft = Math.max(0, containerWidth);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = scrollContainerRef.current?.getBoundingClientRect();

    if (rect) {
      setMousePosition({
        x:
          e.clientX - rect.left + (scrollContainerRef.current?.scrollLeft || 0),
        y: e.clientY - rect.top,
      });
    }
  };

  //   const getTooltipPosition = (mouseX: number, mouseY: number) => {
  //     const tooltipWidth = 200; // min width lower
  //     const tooltipHeight = 80; // cca

  //     let x = mouseX;
  //     let y = mouseY - tooltipHeight;

  //     if (x < tooltipWidth) {
  //       x = tooltipWidth;
  //     } else if (x > containerWidth - tooltipWidth / 2) {
  //       x = containerWidth - tooltipWidth;
  //     }

  //     // Tooltip overflow at top
  //     if (y < 0) {
  //       y = mouseY; // Show below cursor instead
  //     }

  //     return { x, y };
  //   };

  const getTooltipPosition = (mouseX: number, mouseY: number) => {
    const tooltipWidth = 200;
    const tooltipHeight = 80;

    // Get the visible viewport width of the scroll container
    const viewportWidth =
      scrollContainerRef.current?.clientWidth || containerWidth;
    const scrollLeft = scrollContainerRef.current?.scrollLeft || 0;

    // Calculate position relative to viewport, not absolute content
    const mouseXInViewport = mouseX - scrollLeft;

    let x = mouseX; // Start with absolute position
    let y = mouseY - tooltipHeight;

    // Adjust X position if tooltip would overflow viewport
    if (mouseXInViewport < tooltipWidth / 2) {
      // Too close to left edge of viewport
      x = scrollLeft + tooltipWidth / 2;
    } else if (mouseXInViewport > viewportWidth - tooltipWidth / 2) {
      // Too close to right edge of viewport
      x = scrollLeft + viewportWidth - tooltipWidth / 2;
    }

    // Handle Y overflow
    if (y < 0) {
      y = mouseY + 20; // Show below cursor with some offset
    }

    return { x, y };
  };

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
        onMouseMove={handleMouseMove}
      >
        <div
          className="relative h-45"
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
          {/* TODO este ked kliknem na bar tak ta to moze scrollnut na to oknieko ktore bude nizsie */}
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
                      //   top: 50 + id * 30 - 10,
                      //   left: startPx + barWidth / 2,
                      top: getTooltipPosition(mousePosition.x, mousePosition.y)
                        .y,
                      left: getTooltipPosition(mousePosition.x, mousePosition.y)
                        .x,
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
