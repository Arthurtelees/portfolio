"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

type Project = {
  title: string;
  description: Record<string, string>;
  tech: string[];
  link: string;
  repo: string;
  year: string;
  previewGradient: string;
};

const projects: Project[] = [
  {
    title: "ChatBot V1.0",
    description: {
      pt: "Protótipo de chatbot com NLP em português usando modelos Transformer e persistência em SQLite.",
      en: "NLP chatbot prototype in Portuguese using Transformer-based language models with SQLite persistence.",
    },
    tech: ["Python", "Transformers", "SQLite", "NLP"],
    link: "https://github.com/Arthurtelees/chatbot_V1.0",
    repo: "chatbot_V1.0",
    year: "2023",
    previewGradient: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 60%, #6366f1 100%)",
  },
  {
    title: "Army Inventory System",
    description: {
      pt: "Sistema de controle de inventário para o Exército Brasileiro com API RESTful e documentação Swagger automática.",
      en: "Inventory management system for the Brazilian Army with RESTful API and auto-generated Swagger documentation.",
    },
    tech: ["Python", "FastAPI", "Pydantic", "SQLite", "Swagger"],
    link: "https://github.com/Arthurtelees/Crud_fastAPI",
    repo: "Crud_fastAPI",
    year: "2024",
    previewGradient: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 60%, #0284c7 100%)",
  },
  {
    title: "Stock Management",
    description: {
      pt: "Sistema de gestão de estoque em Java com Spring Boot e interface web integrada.",
      en: "Stock management system built with Java and Spring Boot, featuring an integrated web interface.",
    },
    tech: ["Java", "Spring Boot", "JavaScript", "HTML", "CSS"],
    link: "https://github.com/Arthurtelees/ProjetoEstoque-Java",
    repo: "ProjetoEstoque-Java",
    year: "2023",
    previewGradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 60%, #ef4444 100%)",
  },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();

  return (
    <section ref={ref} id="projetos" className="py-28 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="mb-3 text-center">
            <span className="text-xs font-mono text-[#a78bfa] uppercase tracking-widest">
              {language === "pt" ? "// projetos" : "// projects"}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold mb-4 text-center text-slate-900"
          >
            {language === "pt" ? "Projetos" : "Projects"}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-slate-400 text-center mb-16 max-w-sm mx-auto"
          >
            {language === "pt"
              ? "Uma seleção do que já construí."
              : "A selection of what I've built."}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                whileHover={{ scale: 1.025 }}
                transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-2xl hover:border-violet-200 transition-all duration-300"
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 border-b border-slate-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <div className="flex-1 ml-2 px-3 py-0.5 rounded bg-white text-[11px] text-slate-400 font-mono border border-slate-200 truncate">
                    github.com/Arthurtelees/{project.repo}
                  </div>
                </div>

                {/* Preview gradient area */}
                <div
                  className="h-36 flex items-center justify-center relative overflow-hidden"
                  style={{ background: project.previewGradient }}
                >
                  <div className="absolute inset-0 opacity-[0.12] dot-grid" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  />
                  <span className="text-white/60 font-mono text-xs tracking-[0.2em] uppercase">
                    {project.year}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-[#7c3aed] transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    {project.description[language] ?? project.description.en}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-900 transition-colors"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <FaGithub size={13} />
                    {language === "pt" ? "Ver no GitHub" : "View on GitHub"}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div variants={fadeUp} className="flex justify-center mt-10">
            <a
              href="https://github.com/Arthurtelees"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-all duration-200 text-sm font-medium"
            >
              <FaGithub size={16} />
              {language === "pt" ? "Ver mais no GitHub" : "More on GitHub"}
              <FaExternalLinkAlt size={11} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


