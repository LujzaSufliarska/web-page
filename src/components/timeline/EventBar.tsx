import React from "react";

interface Event {
  position: string;
  company_name: string;
  period: string;
  endDate: Date;
}

interface Props {
  id: number;
  lineIndex: number;
  left: number;
  barWidth: number;
  event: Event;
  setHoveredBar: (id: number | null) => void;
  color: string;
}

export default function EventBar(props: Props) {
  const { id, lineIndex, left, barWidth, event, setHoveredBar, color } = props;

  return (
    <div
      key={id}
      className="absolute rounded px-2 text-white overflow-hidden text-ellipsis
                  hover:brightness-115 hover:scale-105 transition-all duration-150 ease-out"
      style={{
        top: 50 + lineIndex * 30,
        left: left,
        width: barWidth,
        backgroundColor: color,
      }}
      onMouseEnter={() => setHoveredBar(id)}
      onMouseLeave={() => setHoveredBar(null)}
      //   title={`${event.position}: ${event.period}`}
    >
      {event.position} - {event.company_name}
    </div>
  );
}
