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
import YearFilter from "./YearFilter";

interface ExperienceTimelineProps {
  onEventClick: (id: number) => void;
  visible: boolean;
}

export default function ExperienceTimeline({
  onEventClick,
  visible,
}: ExperienceTimelineProps) {
  const { t } = useTranslation("experience");
  const { t: t_mils } = useTranslation("milestones");
  const { t: t_other } = useTranslation("other");

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // console.log(scrollContainerRef.current?.clientWidth);

  const allExperiences = Object.values(t("positions", { returnObjects: true }));
  const allMilestones = Object.values(
    t_mils("milestones", { returnObjects: true }),
  );
  // sortnute neskor v assignpositiontolines in helper functions
  const allEvents = [...allExperiences, ...allMilestones];

  //   const { firstJobStart, lastJobEnd } = getFirstAndLastJobDates(allExperiences);
  const { firstJobStart, lastJobEnd } = getFirstAndLastJobDates(allEvents);

  const startYear = firstJobStart.getFullYear();
  const startMonth = firstJobStart.getMonth();
  const endYear = lastJobEnd.getFullYear();
  const endMonth = lastJobEnd.getMonth();

  const durationMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
  const yearsCount = Math.floor(durationMonths / 12) + 1; // TODO +1 ked zacina nieco pred rokom 2021 inak to prida 2026 aj ked este neni,; pobodne +2 dunno uvidime ako to pojde vekom
  console.log(endYear, startYear);

  // const pxPerMonth = Math.max(
  //   25,
  //   scrollContainerRef.current?.clientWidth / durationMonths
  // );
  const [pxPerMonth, setPxPerMonth] = useState(25);

  useEffect(() => {
    const updatePxPerMonth = () => {
      if (scrollContainerRef.current) {
        const viewportWidth = scrollContainerRef.current.clientWidth;
        const minPxPerMonth = 25;

        // Calculate what spacing would fit the viewport
        const viewportBasedSpacing = viewportWidth / durationMonths;

        setPxPerMonth(Math.max(minPxPerMonth, viewportBasedSpacing - 4));
      }
    };

    updatePxPerMonth();
    window.addEventListener("resize", updatePxPerMonth);
    return () => window.removeEventListener("resize", updatePxPerMonth);
  }, [durationMonths]);

  const containerWidth = durationMonths * pxPerMonth;

  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  //   const positionsWithLines = assignPositionsToLines(
  //     allExperiences,
  //     firstJobStart,
  //     durationMonths,
  //     containerWidth*/
  //   );
  const positionsWithLines = assignPositionsToLines(
    allEvents,
    firstJobStart,
    durationMonths,
    pxPerMonth,
  );

  const totalLines =
    Math.max(...positionsWithLines.map((p) => p.lineIndex)) + 1;

  const monthMarkers = [...Array(durationMonths + 3)].map((_, i) => {
    const date = new Date(startYear, startMonth - 1 + i, 1); // i want one month before first event on the timeline
    const monthShort = date.toLocaleString(
      i18n.language === "sk" ? "sk-SK" : "en-US",
      {
        month: "short",
      },
    );
    const year = date.getFullYear(); //startMonth + i -> date roll over into a different year 12 is jan

    const left = i * pxPerMonth;

    return (
      <TimelineMarker
        id={`${year}-${date.getMonth()}`}
        left={left}
        label={monthShort}
        type="month"
      />
    );
  });

  const yearMarkers = [...Array(yearsCount)].map((_, i) => {
    const year = startYear + i;
    const left = i * 12 * pxPerMonth - (startMonth - 1) * pxPerMonth;

    return <TimelineMarker id={year} left={left} label={year} type="year" />;
  });

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

  const handleYearChange = (year: number) => {
    // Scroll to the starting position of that year
    if (scrollContainerRef.current && containerWidth > 0) {
      const monthsFromStart = (year - startYear) * 12 - startMonth + 1; // +1 so the year is on the edge
      const scrollTo = monthsFromStart * pxPerMonth;

      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  // Scroll to show the right side (present jobs)
  // useEffect(() => {
  //   if (scrollContainerRef.current && containerWidth > 0) {
  //     const scrollContainer = scrollContainerRef.current;
  //     scrollContainer.scrollLeft = scrollContainer.scrollWidth;
  //   }
  // }, []);
  useEffect(() => {
    if (scrollContainerRef.current && containerWidth > 0) {
      const scrollContainer = scrollContainerRef.current;
      // Only auto-scroll if the content is wider than the viewport
      if (containerWidth > scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth;
      }
    }
  }, [containerWidth]);

  return (
    <div className="py-4 w-full">
      {/* header */}
      <div className="text-default font-bold text-[var(--bcg-text)]">
        {t_other("experienceTimeline.header")} ({startYear} - {endYear})
      </div>

      <div className="flex items-center justify-between mb-2">
        {visible && (
          <div className="text-p2 text-[var(--bcg-text)]">
            {t_other("experienceTimeline.note")}
          </div>
        )}
        <YearFilter
          startYear={startYear}
          length={yearsCount}
          onYearChange={handleYearChange}
        />
      </div>

      {/* timeline */}
      <div
        className="overflow-x-auto border rounded bg-white whitespace-nowrap"
        ref={scrollContainerRef}
        onMouseMove={handleMouseMove}
      >
        <div
          className="relative h-45"
          style={{
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
          {positionsWithLines.map((positionData) => {
            const { position, lineIndex, startPx, barWidth } = positionData;
            const tooltipPos = getTooltipPosition(
              mousePosition.x,
              mousePosition.y,
            );

            const color = positionData.position.job_sector ? "green" : "blue";

            return (
              <>
                <EventBar
                  id={position.position}
                  lineIndex={lineIndex}
                  left={startPx + containerWidth / durationMonths}
                  barWidth={barWidth}
                  event={position}
                  setHoveredBar={setHoveredBar}
                  color={color}
                  onClickEvent={() => onEventClick(position.position)}
                />

                {/* Custom Event Tooltip */}
                {hoveredBar === position.position && (
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
