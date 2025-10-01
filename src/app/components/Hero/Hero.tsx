"use client";

import { useEffect, useState } from "react";
import Particles from "../Particles/Particles";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();

  const fullText =
    language === "pt" ? "Desenvolvedor Full Stack" : "Full Stack Developer";
  const buttonText = language === "pt" ? "Ver Projetos →" : "View Projects →";

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
  }, [language]);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 90);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const scrollToProjects = () => {
    document.getElementById("projetos")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white"
    >
      <Particles />

      <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 opacity-20 blur-[150px] rounded-full animate-pulse"></div>

      <div className="z-10 text-center px-6">
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-2xl opacity-70 animate-pulse -z-10"></div>

            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl ring-4 ring-purple-400/50 relative animate-float z-20 bg-black">
              <img
                src="/avatar.png"
                alt="Arthur Teles"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-lg opacity-50 animate-pulse -z-10"></div>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400"
            style={{
              backgroundImage:
                "linear-gradient(to right, #c084fc, #ec4899, #818cf8)",
            }}
          >
            Arthur Teles
          </span>
        </h1>

        <div className="text-xl md:text-2xl text-gray-300 font-light mb-8 tracking-wide min-h-[2rem]">
          {displayText}
          <span className="ml-1 text-purple-400 animate-pulse">|</span>
        </div>

        <button
          onClick={scrollToProjects}
          className="px-10 py-4 rounded-xl font-medium tracking-wide text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:opacity-90 transition-all shadow-lg shadow-purple-800/40 hover:scale-105 transform duration-300 relative z-20"
        >
          {buttonText}
        </button>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-pulse {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
