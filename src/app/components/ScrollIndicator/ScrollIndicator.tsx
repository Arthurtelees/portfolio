"use client";

import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setScrollProgress(total > 0 ? (current / total) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-white/[0.04]">
      <div
        className="h-full transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, #a78bfa, #818cf8)",
        }}
      />
    </div>
  );
}

