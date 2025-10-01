"use client";

import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState(0);
  const sections = ["home", "sobre", "skills", "projetos", "contato"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const section = document.getElementById(sections[index]);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex flex-col items-center gap-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full border border-white transition-all duration-300 ${
              activeSection === index
                ? "bg-white scale-125"
                : "bg-transparent hover:bg-white hover:bg-opacity-50"
            }`}
            aria-label={`Ir para ${sections[index]}`}
          />
        ))}
      </div>
    </div>
  );
}
