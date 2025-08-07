import { useTranslation } from "react-i18next";
import {
  getFirstAndLastJobDates,
  getPosition,
  assignPositionsToLines,
} from "../../utils/timelineHelpers";
import { useEffect, useRef, useState } from "react";
import { TimelineMarker } from "../timeline/TimelineMarker";
import EventBar from "../timeline/EventBar";
import i18n from "../../i18n";

export default function ExperienceTimeline() {
  const { t } = useTranslation("experience");
  const { t: t_other } = useTranslation("milestones");
  const presentKeyword = t_other("key_for_period_end").toLowerCase();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const containerWidth = 1300; // TODO Adjust accordingly to viewport

  const allExperiences = Object.values(t("positions", { returnObjects: true }));
  const allMilestones = Object.values(
    t_other("milestones", { returnObjects: true })
  );
  const allEvents = [...allExperiences, ...allMilestones];

  //   const { firstJobStart, lastJobEnd } = getFirstAndLastJobDates(allExperiences);
  const { firstJobStart, lastJobEnd } = getFirstAndLastJobDates(allEvents);

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

  //   const positionsWithLines = assignPositionsToLines(
  //     allExperiences,
  //     firstJobStart,
  //     durationMonths,
  //     containerWidth
  //   );
  const positionsWithLines = assignPositionsToLines(
    allEvents,
    firstJobStart,
    durationMonths,
    containerWidth
  );

  //   console.log(positionsWithLines);

  const totalLines =
    Math.max(...positionsWithLines.map((p) => p.lineIndex)) + 1;

  // Scroll to show the right side (present jobs)
  useEffect(() => {
    if (scrollContainerRef.current && containerWidth > 0) {
      const scrollContainer = scrollContainerRef.current;
      scrollContainer.scrollLeft = scrollContainer.scrollWidth;
    }
  }, []);

  const monthMarkers = [...Array(durationMonths + 3)].map((_, i) => {
    const date = new Date(startYear, startMonth - 1 + i, 1); // i want one month before first event on the timeline
    const monthShort = date.toLocaleString(
      i18n.language === "sk" ? "sk-SK" : "en-US",
      {
        month: "short",
      }
    );
    const year = date.getFullYear(); //startMonth + i -> date roll over into a different year 12 is jan

    const left = (i / durationMonths) * containerWidth;

    return (
      <TimelineMarker
        id={`${year}-${date.getMonth()}`}
        left={left}
        label={monthShort}
        type="month"
      />
    );
  });

  const yearMarkers = [...Array(Math.floor(durationMonths / 12) + 1)].map(
    (_, i) => {
      const year = startYear + i;
      const left =
        ((i * 12) / durationMonths) * containerWidth -
        startMonth * (containerWidth / durationMonths);

      return <TimelineMarker id={year} left={left} label={year} type="year" />;
    }
  );

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

  // VIBE CODED lebo netusim jak to fixnut
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
    let y = mouseY - tooltipHeight - 5;

    // Tooltip would overflow viewport
    if (mouseXInViewport < tooltipWidth / 2) {
      // Too close to left edge of viewport
      x = scrollLeft + tooltipWidth / 2 + 30;
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
      <div className="text-p2 text-[var(--bcg-text)]">(Hover over bars)</div>

      {/* timeline */}
      <div
        className="overflow-x-auto border rounded bg-white whitespace-nowrap"
        ref={scrollContainerRef}
        onMouseMove={handleMouseMove}
      >
        <div
          className="relative h-45"
          style={{
            width: containerWidth,
            minWidth: containerWidth,
            height: 45 + totalLines * 30 + 75, // 75 buffer na citanie
          }}
        >
          {/* Month markers */}
          {monthMarkers}

          {/* Year markers */}
          {startMonth != 0 && (
            <TimelineMarker
              id={startYear}
              left={0}
              label={startYear}
              type="year"
            />
          )}
          {yearMarkers}

          {/* Events */}
          {/* TODO este ked kliknem na bar tak ta to moze scrollnut na to oknieko ktore bude nizsie */}
          {positionsWithLines.map((positionData, id) => {
            const { position, lineIndex, startPx, barWidth } = positionData;
            const tooltipPos = getTooltipPosition(
              mousePosition.x,
              mousePosition.y
            );

            const color = positionData.position.job_sector ? "green" : "blue";

            return (
              <>
                <EventBar
                  id={id}
                  lineIndex={lineIndex}
                  left={startPx + containerWidth / durationMonths}
                  barWidth={barWidth}
                  event={position}
                  setHoveredBar={setHoveredBar}
                  color={color}
                />

                {/* Custom Event Tooltip */}
                {hoveredBar === id && (
                  <div
                    className="absolute z-50 bg-gray-900 text-white rounded-lg p-2 shadow-xl transform -translate-x-1/2 pointer-events-none"
                    style={{
                      top: tooltipPos.y,
                      left: tooltipPos.x,
                      minWidth: "200px",
                      //   width: "200px",
                      //   whiteSpace: "pre-wrap"
                    }}
                  >
                    <div className="font-bold text-p3">{position.position}</div>
                    <div className="text-gray-300 text-p3">
                      {position.company_name}
                    </div>
                    <div className="text-gray-400 text-p2 mt-1 border-t border-gray-700 pt-1">
                      {position.period}
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
