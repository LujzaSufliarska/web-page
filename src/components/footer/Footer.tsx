import React from "react";

export default function Footer() {
  // TODO page with older versions of the website
  const handle = () => {};

  return (
    <div className="flex flex-col gap-3 bg-[var(--primary)] py-wrapper px-lg_screen text-[var(--primary-text)] text-1 text-center items-center">
      <p>
        Designed in Figma and coded in VS Code. Built with React,
        Typescript and Tailwind CSS.
      </p>
      <p>© Lujza Šufliarska 2025</p>

      <div className="flex justify-end w-full ">
        <button
          className="text-p2 underline cursor-pointer"
          onClick={() => handle}
        >
          Checkout older versions
        </button>
      </div>
    </div>
  );
}
