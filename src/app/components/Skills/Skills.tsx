"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaPython,
  FaJava,
  FaJs,
  FaReact,
  FaDocker,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiDjango,
  SiFastapi,
  SiPostgresql,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiSqlite,
  SiMysql,
} from "react-icons/si";
import { useLanguage } from "../../contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

type Skill = { name: string; icon: React.ReactNode; color: string };
type Category = { name: string; skills: Skill[] };

function getCategories(lang: string): Category[] {
  return [
    {
      name: "Frontend",
      skills: [
        { name: "React", icon: <FaReact />, color: "#61dafb" },
        { name: "Next.js", icon: <SiNextdotjs />, color: "#e2e8f0" },
        { name: "TypeScript", icon: <SiTypescript />, color: "#3178c6" },
        { name: "JavaScript", icon: <FaJs />, color: "#f0db4f" },
        { name: "HTML5", icon: <SiHtml5 />, color: "#e34c26" },
        { name: "CSS3", icon: <SiCss3 />, color: "#264de4" },
      ],
    },
    {
      name: "Backend",
      skills: [
        { name: "Python", icon: <FaPython />, color: "#ffd43b" },
        { name: "Django", icon: <SiDjango />, color: "#44b78b" },
        { name: "FastAPI", icon: <SiFastapi />, color: "#009688" },
        { name: "Java", icon: <FaJava />, color: "#f89820" },
      ],
    },
    {
      name: lang === "pt" ? "Banco de Dados" : "Database",
      skills: [
        { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
        { name: "MySQL", icon: <SiMysql />, color: "#00758f" },
        { name: "SQLite", icon: <SiSqlite />, color: "#79c6e6" },
      ],
    },
    {
      name: "DevOps & Tools",
      skills: [
        { name: "Docker", icon: <FaDocker />, color: "#2496ed" },
        { name: "Git", icon: <FaGitAlt />, color: "#f05032" },
        { name: "GitHub", icon: <FaGithub />, color: "#e2e8f0" },
      ],
    },
  ];
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();
  const categories = getCategories(language);

  return (
    <section
      ref={ref}
      id="skills"
      className="py-28 relative bg-[#050508]"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="mb-3">
            <span className="text-xs font-mono text-[#a78bfa] uppercase tracking-widest">
              {language === "pt" ? "// habilidades" : "// skills"}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold mb-16"
          >
            {language === "pt" ? "Tecnologias" : "Technologies"}
          </motion.h2>

          <div className="space-y-10">
            {categories.map((category) => (
              <motion.div key={category.name} variants={fadeUp}>
                <h3 className="text-xs font-mono text-[#475569] uppercase tracking-widest mb-4">
                  {category.name}
                </h3>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
                >
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={fadeUp}
                      whileHover={{ y: -4, scale: 1.04 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="flex flex-col items-center gap-2.5 p-4 rounded-xl bg-[#0e0e1a] border border-white/[0.06] hover:border-white/[0.12] transition-colors cursor-default group"
                    >
                      <div
                        className="text-2xl transition-all duration-200 group-hover:brightness-125"
                        style={{ color: skill.color }}
                      >
                        {skill.icon}
                      </div>
                      <span className="text-[10px] text-[#64748b] group-hover:text-[#94a3b8] transition-colors font-medium text-center leading-tight">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}



