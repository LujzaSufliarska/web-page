interface Props {
  key: string | number;
  left: number;
  label: string | number;
  type: "month" | "year";
}

export function TimelineMarker(props: Props) {
  const { key, left, label, type } = props;

  const styles = {
    month: {
      lineHeight: "h-8",
      lineColor: "bg-gray-300",
      textSize: "text-[10px]",
      textColor: "text-gray-400",
    },
    year: {
      lineHeight: "h-4",
      lineColor: "bg-gray-400",
      textSize: "text-p2",
      textColor: "text-gray-600",
    },
  };

  const { lineHeight, lineColor, textSize, textColor } = styles[type];

  return (
    <div key={key} style={{ position: "absolute", left }}>
      {/* vertical line above */}
      <div className={`w-px ${lineHeight} ${lineColor} mb-1`} />
      <div className={`${textSize} ${textColor}`}>{label}</div>
    </div>
  );
}
