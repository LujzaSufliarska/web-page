import React from "react";
import ScrollToTop from "../scrollToTop/ScrollToTop";
import Socials from "../iconElements/Socials";

export default function ContactSection() {
  return (
    <div className="flex flex-col px-lg_screen gap-5 items-center text-[var(--bcg-text)]">
      <div className="flex flex-col gap-3 items-center">
        <p className="text-h4">
          Are you interested in working with me? Get in touch!
        </p>

        {/* TODO copy email by click */}
        <p className="text-[var(--primary)] font-bold text-h3">
          lujzasuf@gmail.com
        </p>
      </div>

      <Socials />

      {/* <ScrollToTop /> */}
    </div>
  );
}
