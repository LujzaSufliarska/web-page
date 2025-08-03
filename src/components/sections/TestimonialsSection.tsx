import { useState } from "react";
import SectionHeader from "../highlight/SectionHeader";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Testimonial from "../testimonial/Testimonial";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function TestimonialsSection() {
  const { t } = useTranslation(["testimonials", "navbar"]);

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const testimonials = Object.values(
    t("testimonials", { returnObjects: true })
  );

  const length = testimonials.length;

  const next = () => {
    setDirection("right");
    setCurrent((prev) => (prev + 1) % length);
  };

  const prev = () => {
    setDirection("left");
    setCurrent((prev) => (prev - 1 + length) % length);
  };

  return (
    <div className="flex flex-col px-5 gap-3 items-center">
      <SectionHeader>
        {/* {t("sections.testimonials", { ns: "navbar" })} */}
        {t("section")}
      </SectionHeader>

      {/* CAROUSEL */}
      <div className="flex flex-col gap-3 w-full items-center">
        <div className="flex flex-row w-full justify-between items-center">
          {/* Shrinking automatically not bcs of responsivnes set by me */}
          <IoIosArrowBack
            size={40}
            className="text-[var(--primary)] cursor-pointer"
            onClick={prev}
          />

          <div className="w-full flex justify-center relative min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: direction === "right" ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === "right" ? -50 : 50 }}
                transition={{ duration: 0.3 }}
              >
                <Testimonial
                  name={testimonials[current].name}
                  position={testimonials[current].position}
                  text={testimonials[current].text}
                  img={testimonials[current].img}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <IoIosArrowForward
            size={40}
            className="text-[var(--primary)] cursor-pointer"
            onClick={next}
          />
        </div>

        {/* PAGGINATION */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-5 h-5 rounded-full cursor-pointer ${
                current === index
                  ? "bg-[var(--primary)]"
                  : "bg-[var(--bcg)] border-1 border-[var(--primary)]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
