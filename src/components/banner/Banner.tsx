import React from "react";

type Props = {
  text: string;
};

export default function Banner(props: Props) {
  return (
    <div className="translate-y-1/2 -translate-x-1/2 p-3 rotate-10 bg-[var(--primary)] text-[var(--primary-text)] font-bold text-center text-p2">
      <p>{props.text}</p>
    </div>
  );
}
