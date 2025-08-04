export function parseDate(date: string): Date {
  const [month, year] = date.split(" ");

  const months: { [key: string]: number } = {
    // JS Date months are 0-indexed
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5, July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
  };

  return new Date(parseInt(year), months[month]);
}

export function getFirstAndLastJobDates(positions: { period: string }[]) {
  const startDates: Date[] = [];
  const endDates: Date[] = [];

  Object.values(positions).forEach(pos => {
    const [start, end] = pos.period.split(" - ");

    startDates.push(parseDate(start));
    endDates.push(end.toLowerCase() === "present" ? new Date() : parseDate(end));
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