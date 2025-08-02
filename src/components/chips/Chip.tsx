type ButtonVariant = "job" | "project";

type Props = {
  text: string;
  variant?: ButtonVariant;
};

export default function Chip(props: Props) {
  const variantClasses: { [key in ButtonVariant]: string } = {
    job: "border-[var(--primary)] text-[var(--bcg-text)]",
    project: "border-[var(--primary-text)] text-[var(--primary-text)]",
  };

  return (
    <div
      className={`border-solid border-2 rounded-round px-default text-p2 ${
        variantClasses[props.variant ?? "job"]
      }`}
    >
      <p>{props.text}</p>
    </div>
  );
}
