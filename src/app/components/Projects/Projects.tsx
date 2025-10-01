"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Projects() {
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

  const projects = [
    {
      title: language === "pt" ? "Projeto 1" : "Project 1",
      description:
        language === "pt"
          ? "Um protótipo chatbot simples e funcional em português."
          : "A simple and functional chatbot prototype in Portuguese.",
      tech: ["Python", "Transformers", "SQLite"],
      link: "https://github.com/Arthurtelees/chatbot_V1.0",
    },
    {
      title: language === "pt" ? "Projeto 2" : "Project 2",
      description:
        language === "pt"
          ? "Projeto desenvolvido para otimizar o controle de inventário no Exército Brasileiro em 2024."
          : "Project developed to optimize inventory control in the Brazilian Army in 2024.",
      tech: ["Python", "FastAPI", "Pydantic", "SQLite"],
      link: "https://github.com/Arthurtelees/Crud_fastAPI",
    },
    {
      title: language === "pt" ? "Projeto 3" : "Project 3",
      description:
        language === "pt"
          ? "Projeto Pessoal de estoque para estudos de tecnologias Java."
          : "Personal Stock Project for Java Technology Studies.",
      tech: ["Java", "Spring", "JavaScript", "HTML", "CSS"],
      link: "https://github.com/Arthurtelees/ProjetoEstoque-Java",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projetos"
      className={`relative py-24 transition-all duration-1000 delay-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-700/30 via-pink-600/20 to-indigo-600/30 blur-[160px] rounded-full"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 tracking-wide bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
          {language === "pt" ? "PROJETOS" : "PROJECTS"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="relative group border border-gray-800 rounded-2xl p-8 bg-gradient-to-b from-gray-900/50 to-black/40 backdrop-blur-sm hover:border-purple-500/60 transition-all duration-500 hover:-translate-y-3 shadow-lg shadow-purple-900/30"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-indigo-600/20 blur-lg"></div>

              <h3 className="text-2xl font-semibold mb-4 relative z-10 text-white group-hover:text-purple-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed relative z-10">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs border border-gray-700 px-3 py-1 rounded-full text-gray-400 group-hover:border-purple-400 group-hover:text-purple-300 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-block w-full text-center py-2 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:opacity-90 transition-all"
              >
                {language === "pt" ? "Ver Projeto" : "View Project"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
