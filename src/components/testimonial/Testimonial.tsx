import React from "react";

type Props = {
  name: string;
  position: string;
  text: string;
  img?: string; // Optional image URL
};

export default function Testimonial(props: Props) {
  return (
    <div className="flex flex-col md:flex-row p-wrapper rounded-round max-w-xl min-h-56 bg-[var(--primary)] text-[var(--primary-text)] gap-1 items-center justify-between">
      {/* Image */}
      {props.img ? (
        <img
          className="w-[150px] h-[150px] md:order-2"
          src={props.img}
          alt="Photo"
        />
      ) : (
        <div className="w-[150px] h-[150px] md:order-2 bg-white dark:bg-black rounded-full shrink-0" />
      )}

      {/* Text */}
      <div className="flex flex-col gap-3 md:order-1">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <p className="text-h5 font-bold">{props.name}</p>
          <p className="text-default">{props.position}</p>
        </div>

        <p className="text-p1 text-justify">{props.text}</p>
      </div>
    </div>
  );
}
