import React from "react";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ContactSection from "../components/sections/ContactSection";
import { useTranslation } from "react-i18next";

//import "./i18n";

const sectionComponents: Record<string, React.ReactNode> = {
  home: <HeroSection />,
  about: <AboutSection />,
  experience: <ExperienceSection />,
  testimonials: <TestimonialsSection />,
  projects: <ProjectsSection />,
  contact: <ContactSection />,
};

export default function mainPage() {
  const { t } = useTranslation("navbar");

  const sections = t("sections", { returnObjects: true }) as Record<
    string,
    string
  >;

  const showTestimonial = false;

  return (
    <div className="flex flex-col gap-medium">
      {/* <section id="home">
        <HeroSection />
      </section> */}

      {Object.keys(sections).map((id) => (
        // <section key={id} id={id}>
        //   {sectionComponents[id]}
        // </section>

        <React.Fragment key={id}>
          <section id={id}>{sectionComponents[id]}</section>

          {/* Insert TestimonialsSection right after the 'experience' section */}
          {showTestimonial && id === "experience" && (
            <section id="testimonials">
              <TestimonialsSection />
            </section>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
