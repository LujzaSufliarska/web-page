import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function TextHighlight({ children }: Props) {
  return <span className="text-[var(--primary)] font-bold"> {children}</span>;
}
