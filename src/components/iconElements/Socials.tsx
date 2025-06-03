import React from "react";
import ClickableImage from "./ClickableImg";
import { useTheme } from "../../context/theme-context";

export default function Socials() {
  const { theme } = useTheme();

  return (
    <div className="flex gap-5">
      <ClickableImage
        url="https://linkedin.com/in/lujza-šufliarska"
        imgSrc="/icons/linkedin.png"
        altText="Link to Lujza Šufliarska LinkedIn profile"
      />
      <ClickableImage
        url="https://instagram.com/lujzska/"
        imgSrc="/icons/instagram.png"
        altText="Link to Lujza Šufliarska Instagram profile"
      />

      {theme === "light" ? (
        <ClickableImage
          url="https://github.com/LujzaSufliarska"
          imgSrc="/icons/github-light.png"
          altText="Link to Lujza Šufliarska Instagram profile"
        />
      ) : (
        <ClickableImage
          url="https://github.com/LujzaSufliarska"
          imgSrc="/icons/github-dark.png"
          altText="Link to Lujza Šufliarska Instagram profile"
        />
      )}
    </div>
  );
}
