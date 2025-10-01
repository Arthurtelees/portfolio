"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaPython,
  FaJava,
  FaJs,
  FaReact,
  FaDocker,
  FaDatabase,
  FaGithub,
} from "react-icons/fa";
import { SiNextdotjs, SiDjango, SiFastapi, SiPostgresql } from "react-icons/si";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const allSkills = [
    { name: "Python", icon: <FaPython className="text-yellow-400" /> },
    { name: "Java", icon: <FaJava className="text-red-500" /> },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    {
      name: "HTML",
      icon: <div className="text-orange-500 text-2xl">HTML</div>,
    },
    { name: "CSS", icon: <div className="text-blue-500 text-2xl">CSS</div> },
    { name: "Django", icon: <SiDjango className="text-green-600" /> },
    { name: "FastAPI", icon: <SiFastapi className="text-teal-500" /> },
    { name: "React", icon: <FaReact className="text-cyan-400" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
    { name: "SQLite", icon: <FaDatabase className="text-blue-300" /> },
    { name: "Git", icon: <FaGithub className="text-orange-500" /> },
    { name: "GitHub", icon: <FaGithub className="text-white" /> },
    { name: "Docker", icon: <FaDocker className="text-blue-500" /> },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`py-20 bg-gradient-to-b from-black via-gray-950 to-black text-white transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-4 tracking-wide">
            {language === "pt"
              ? "Tecnologias & Ferramentas"
              : "Technologies & Tools"}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {language === "pt"
              ? "Stack tecnológico que utilizo para criar soluções modernas e escaláveis"
              : "Technology stack I use to build modern and scalable solutions"}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {allSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="flex flex-col items-center justify-center gap-3 p-6 border border-gray-800 rounded-md bg-gray-900/30 hover:bg-gray-900/60 hover:border-gray-600 shadow-md hover:shadow-lg transition-all duration-500 group cursor-default transform hover:-translate-y-2"
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <div className="text-4xl group-hover:scale-125 transition-transform duration-300">
                {skill.icon}
              </div>
              <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
