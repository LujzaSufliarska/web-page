import { useTranslation } from "react-i18next";

export function parseDate(date: string): Date {
  const [month, year] = date.split(" ");

  const months: Record<string, number> = {
    // JS Date months are 0-indexed
    // English
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,

    // Slovak
    Január: 0, Február: 1, Marec: 2, Apríl: 3, Máj: 4, Jún: 5,
    Júl: 6, Október: 9
  };

  return new Date(parseInt(year), months[month]);
}

// export function parseDate(date: string): Date {
//   const [month, year] = date.split(" ");
  
//   const skMonths: Record<string, number> = {
//     Január: 0, Február: 1, Marec: 2, Apríl: 3, Máj: 4, Jún: 5,
//     Júl: 6, August: 7, September: 8, Október: 9, November: 10, December: 11
//   };
  
//   return skMonths[month] !== undefined 
//     ? new Date(parseInt(year), skMonths[month])
//     : new Date(date); // fallback na štandardné parsovanie
// }

export function getFirstAndLastJobDates(positions: {
  period: string }[],
) {
  const { t } = useTranslation("experience");
  const presentKeyword = t("key_for_period_end").toLowerCase()

  const startDates: Date[] = [];
  const endDates: Date[] = [];

  Object.values(positions).forEach(pos => {
    const [start, end] = pos.period.split(" - ");

    console.log(start, end)

    startDates.push(parseDate(start));
    // endDates.push(end.toLowerCase() === t("key_for_period_end").toLowerCase() ? new Date() : parseDate(end));
    endDates.push(end.toLowerCase() === presentKeyword.toLowerCase() ? new Date() : parseDate(end));
  });

  const firstJobStart = new Date(Math.min(...startDates.map(d => d.getTime())));
  const lastJobEnd = new Date(Math.max(...endDates.map(d => d.getTime())));

  return { firstJobStart, lastJobEnd };
}



// old not used. usable when i want to show timeline in years only but it was not visually accurate
export function getPositionYear(date: string, containerWidth: number, start: number, duration: number): number {
  const year = parseDate(date).getFullYear();
  const ratio = (year - start) / duration;

  return ratio * containerWidth;
}

export function getPosition(eventDate: string, containerWidth: number, firstJobStartDate: Date, totalMonths: number, includeMonth = false): number {
  const targetDate = parseDate(eventDate);

  if (includeMonth) {
    targetDate.setMonth(targetDate.getMonth() + 1); // work ended in that month not before it
  }

  // Number of months from first job to start of this job
  const monthsFromStart =
    (targetDate.getFullYear() - firstJobStartDate.getFullYear()) * 12 +
    (targetDate.getMonth() - firstJobStartDate.getMonth());

  const ratio = monthsFromStart / totalMonths;

  return ratio * containerWidth;
}


// ------------------------------------------------------------------------------------------------------------------------------


interface PositionWithLine {
  position: any;
  startDate: Date;
  endDate: Date;
  lineIndex: number;
  startPx: number;
  endPx: number;
  barWidth: number;
}

interface LineOccupancy {
  lineIndex: number;
  occupiedRanges: Array<{ start: number; end: number; startDate: Date; endDate: Date }>;
}

export function assignPositionsToLines(
  positions: any[],
  firstJobStart: Date,
  durationMonths: number,
  containerWidth: number
): PositionWithLine[] {
  const { t } = useTranslation("experience");
  const presentKeyword = t("key_for_period_end").toLowerCase()
  const lg = localStorage.getItem("appLanguage");

  const result: PositionWithLine[] = [];
  const lines: LineOccupancy[] = [];

  // Sort positions by start date to process them chronologically
  const sortedPositions = [...positions].sort((a, b) => {
    const startA = a.period.split(" - ")[0];
    const startB = b.period.split(" - ")[0];

    return parseDate(startA).getTime() - parseDate(startB).getTime();
  });

  for (const position of sortedPositions) {
    const [eventStartDate, eventEnd] = position.period.split(" - ");
    // const eventEndDate = eventEnd.toLowerCase() === t("key_for_period_end").toLowerCase()
    const eventEndDate = eventEnd.toLowerCase() === presentKeyword.toLowerCase()
      ? new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })
      : eventEnd;

    //new Date().toLocaleDateString((localStorage.getItem("appLanguage") === "en" ? "en-US" : "sk-US"), { year: "numeric", month: "long" })

    const startDate = parseDate(eventStartDate);
    const endDate = parseDate(eventEndDate);
    
    const startPx = getPosition(eventStartDate, containerWidth, firstJobStart, durationMonths);
    const endPx = getPosition(eventEndDate, containerWidth, firstJobStart, durationMonths, true);
    const barWidth = Math.max(endPx - startPx, 4);

    // Find a suitable line for this position
    let assignedLineIndex = findSuitableLine(lines, startDate, endDate, startPx, endPx);

    // If no suitable line found, create a new one
    if (assignedLineIndex === -1) {
      assignedLineIndex = lines.length;
      lines.push({
        lineIndex: assignedLineIndex,
        occupiedRanges: []
      });
    }

    // Add this position to the assigned line
    lines[assignedLineIndex].occupiedRanges.push({
      start: startPx,
      end: endPx,
      startDate,
      endDate
    });

    result.push({
      position,
      lineIndex: assignedLineIndex,
      startPx,
      endPx,
      barWidth,
      startDate,
      endDate
    });
  }

  return result;
}

function findSuitableLine(
  lines: LineOccupancy[],
  newStartDate: Date,
  newEndDate: Date,
  newStartPx: number,
  newEndPx: number
): number {
  const visualLineBuffer = 0; //Claude set to 5, but does not matter bcs lines are not adjacent

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let canFitOnThisLine = true;

    for (const positionInLine of line.occupiedRanges) {
      // Check for overlap (positions that run simultaneously)
      const hasTimeOverlap = (
        (positionInLine.endDate > newStartDate && positionInLine.startDate < newEndDate)
      );

      // Check for adjacency (positions that end/start at the same time)
      const isAdjacent = (
        positionInLine.endDate.getTime() === newStartDate.getTime() ||
        positionInLine.startDate.getTime() === newEndDate.getTime() ||
        positionInLine.end === newStartPx ||
        positionInLine.start === newEndPx
      );

      // Check for visual proximity (bars that would be too close visually)
      const hasOverlap = (
        positionInLine.end + visualLineBuffer > newStartPx && positionInLine.start - visualLineBuffer < newEndPx
      );

      if (hasTimeOverlap || isAdjacent || hasOverlap) {
        canFitOnThisLine = false;
        break;
      }
    }

    if (canFitOnThisLine) {
      return i;
    }
  }

  return -1; // No suitable line found
}