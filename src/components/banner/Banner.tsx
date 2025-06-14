import React from "react";

type Props = {
  text: string;
};

export default function Banner(props: Props) {
  return (
    <div className="p-4 bg-[var(--primary)] text-[var(--primary-text)] font-bold rotate-12 text-center text-p2">
      <p>{props.text}</p>
    </div>
  );
}
