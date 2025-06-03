import React from "react";

type Props = {
  name: string;
  position: string;
  text: string;
  img?: string; // Optional image URL
};

export default function Testimonial(props: Props) {
  return (
    <div className="flex p-wrapper rounded-round w-[595px] h-[230px] bg-[var(--primary)] text-[var(--primary-text)] gap-1 items-center justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-h5 font-bold">{props.name}</p>
          <p className="text-default">{props.position}</p>
        </div>

        <p className="text-p1">{props.text}</p>
      </div>

      {props.img ? (
        <img className="w-[150px] h-[150px]" src={props.img} alt="Photo" />
      ) : (
        <div className="w-[150px] h-[150px] bg-white dark:bg-black rounded-full shrink-0" />
      )}
    </div>
  );
}
