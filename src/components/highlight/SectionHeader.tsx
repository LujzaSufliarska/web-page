import React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function SectionHeader(props: Props) {
  return (
    <p className="text-h4 text-[var(--primary)] underline">{props.children}</p>
  );
}
