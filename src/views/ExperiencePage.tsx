import React from "react";
import ExperienceTimeline from "../components/workExperience/ExperienceTimeline";

export default function ExperiencePage() {
  return (
    <div className="flex flex-col px-10 py-[20px] mt-[60px] items-center gap-2">
      <div className="text-h4 text-[var(--primary)]">My Journey</div>
      <div>
        <ExperienceTimeline />
      </div>
    </div>
  );
}
