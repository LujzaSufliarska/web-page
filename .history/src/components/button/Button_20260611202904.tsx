import React from "react";

type Props = {
  label: string;
  icon?: React.ReactNode;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button(props: Props) {
  return (
    <button
      className="h-icon-m px-9 sm:px-default py-wrapper sm:py-small text-[var(--bcg-text)] border-solid border-[var(--primary)] rounded-round border-t-1 border-l-3 border-b-3 flex gap-1 items-center cursor-pointer text-p2 sm:text-p1"
      onClick={props.onClick}
    >
      {props.label}
      {props.icon && <span className="h-icon-xxs">{props.icon}</span>}
    </button>
  );
}
