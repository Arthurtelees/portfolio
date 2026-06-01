"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Stack from "./Stack";
import {
  TbRobot,
  TbCode,
  TbDatabase,
  TbDeviceLaptop,
  TbArrowsExchange,
  TbTrendingUp,
  TbArrowDown,
} from "react-icons/tb";
import { useLanguage } from "../../contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

type Service = {
  icon: React.ReactNode;
  text: string;
};

function CVButton({ language }: { language: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="/arthur_teles_26.pdf"
      download="Arthur_Teles_CV.pdf"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.96 }}
      className="relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full overflow-hidden text-sm font-semibold cursor-pointer select-none"
      style={{
        border: "1px solid rgba(167,139,250,0.35)",
        color: hovered ? "#050508" : "#e2e8f0",
        transition: "color 0.35s ease",
      }}
    >
      {/* Liquid fill background */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.38, ease: [0.32, 0, 0.18, 1] }}
        style={{ background: "linear-gradient(90deg, #a78bfa, #818cf8)" }}
      />

      {/* Shimmer sweep on enter */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="shimmer"
            aria-hidden
            className="absolute inset-0 rounded-full pointer-events-none"
            initial={{ x: "-100%" }}
            animate={{ x: "160%" }}
            exit={{ x: "160%" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{
              background:
                "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)",
              zIndex: 1,
            }}
          />
        )}
      </AnimatePresence>

      {/* Outer glow */}
      <motion.span
        aria-hidden
        className="absolute -inset-[2px] rounded-full pointer-events-none"
        animate={{
          boxShadow: hovered
            ? "0 0 22px 4px rgba(167,139,250,0.45)"
            : "0 0 0px 0px rgba(167,139,250,0)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Label */}
      <span className="relative z-10">
        {language === "pt" ? "Download Currículo" : "Download Resume"}
      </span>

      {/* Arrow with spring bounce */}
      <motion.span
        className="relative z-10"
        animate={hovered ? { y: [0, 3, 0] } : { y: 0 }}
        transition={hovered ? { duration: 0.5, ease: "easeInOut", repeat: Infinity } : {}}
      >
        <TbArrowDown size={15} />
      </motion.span>
    </motion.a>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();

  const stats = [
    {
      value: "2+",
      label: language === "pt" ? "Anos de Experiência" : "Years of Experience",
    },
    {
      value: "10+",
      label: language === "pt" ? "Projetos Entregues" : "Projects Delivered",
    },
    {
      value: language === "pt" ? "PT/EN" : "PT/EN",
      label: language === "pt" ? "Nativo • B2" : "Native • B2",
    },
    {
      value: "B2",
      label: language === "pt" ? "Inglês Técnico" : "Technical English",
    },
  ];

  const services: Service[] = [
    {
      icon: <TbRobot size={16} />,
      text:
        language === "pt"
          ? "Automação de processos (bots RPA e integrações)"
          : "Process automation (RPA bots and integrations)",
    },
    {
      icon: <TbCode size={16} />,
      text:
        language === "pt"
          ? "Desenvolvimento de APIs e scripts com Python"
          : "API development and scripting with Python",
    },
    {
      icon: <TbDatabase size={16} />,
      text:
        language === "pt"
          ? "Manipulação e otimização de bancos de dados"
          : "Database manipulation and optimization",
    },
    {
      icon: <TbDeviceLaptop size={16} />,
      text:
        language === "pt"
          ? "Criação de interfaces com Streamlit e aplicações web"
          : "Building interfaces with Streamlit and web apps",
    },
    {
      icon: <TbArrowsExchange size={16} />,
      text:
        language === "pt"
          ? "Integração entre sistemas (ERP, APIs e bancos)"
          : "Systems integration (ERP, APIs and databases)",
    },
    {
      icon: <TbTrendingUp size={16} />,
      text:
        language === "pt"
          ? "Otimização de fluxos operacionais e ganho de eficiência"
          : "Operational workflow optimization and efficiency gains",
    },
  ];

  return (
    <section ref={ref} id="sobre" className="pt-0 pb-28 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="mb-3">
            <span className="text-xs font-mono text-[#a78bfa] uppercase tracking-widest">
              {language === "pt" ? "// sobre" : "// about"}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold mb-16 text-[#e2e8f0]"
          >
            {language === "pt" ? "Sobre Mim" : "About Me"}
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-14 items-start">
            {/* Bio + Services */}
            <motion.div variants={fadeUp} className="space-y-8">
              <div className="space-y-5 text-[#94a3b8] text-lg leading-relaxed">
                <p>
                  {language === "pt" ? (
                    <>
                      Sou{" "}
                      <span className="text-[#e2e8f0] font-medium">
                        Arthur Teles
                      </span>
                      , Desenvolvedor Full Stack com experiência em ambientes corporativos. Trabalho com{" "}
                      <span className="text-[#e2e8f0] font-medium">
                        Java (Spring Boot)
                      </span>
                      ,{" "}
                      <span className="text-[#e2e8f0] font-medium">
                        Python
                      </span>
                      ,{" "}
                      <span className="text-[#e2e8f0] font-medium">
                        React
                      </span>
                      {" "}e{" "}
                      <span className="text-[#e2e8f0] font-medium">
                        TypeScript
                      </span>
                      , com foco em código limpo, manutenibilidade e alinhamento às necessidades do negócio.
                    </>
                  ) : (
                    <>
                      I&apos;m{" "}
                      <span className="text-[#e2e8f0] font-medium">
                        Arthur Teles
                      </span>
                      , Full Stack Developer with experience in corporate environments. I work with{" "}
                      <span className="text-[#e2e8f0] font-medium">
                        Java (Spring Boot)
                      </span>
                      ,{" "}
                      <span className="text-[#e2e8f0] font-medium">
                        Python
                      </span>
                      ,{" "}
                      <span className="text-[#e2e8f0] font-medium">
                        React
                      </span>
                      {" "}and{" "}
                      <span className="text-[#e2e8f0] font-medium">
                        TypeScript
                      </span>
                      , focused on clean code, maintainability and alignment with business needs.
                    </>
                  )}
                </p>
                <p>
                  {language === "pt" ? (
                    <>
                      Atualmente na{" "}
                      <span className="text-[#e2e8f0] font-medium">
                        Alldax
                      </span>
                      , desenvolvo soluções Full Stack utilizando Java, Python e React/TypeScript, criando{" "}
                      <span className="text-[#e2e8f0] font-medium">
                        automações e integrações
                      </span>
                      {" "}entre sistemas internos. Trabalho em times ágeis (Scrum, Kanban, XP), buscando melhorar a confiabilidade dos fluxos e elevar a eficiência operacional em torno de 10–15%.
                    </>
                  ) : (
                    <>
                      Currently at{" "}
                      <span className="text-[#e2e8f0] font-medium">
                        Alldax
                      </span>
                      , I develop Full Stack solutions using Java, Python and React/TypeScript, creating{" "}
                      <span className="text-[#e2e8f0] font-medium">
                        automations and integrations
                      </span>
                      {" "}between internal systems. I work in agile teams (Scrum, Kanban, XP), seeking to improve workflow reliability and boost operational efficiency by 10–15%.
                    </>
                  )}
                </p>
                <p className="text-[#a78bfa] font-medium">
                  {language === "pt"
                    ? "Não apenas escrevo código — busco entender o problema e entregar soluções inteligentes e sustentáveis."
                    : "I don't just write code — I seek to understand the problem and deliver intelligent, sustainable solutions."}
                </p>
              </div>

              {/* Services grid */}
              <div>
                <h3 className="text-xs font-mono text-[#475569] uppercase tracking-widest mb-4">
                  {language === "pt" ? "O que eu faço" : "What I do"}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-[#64748b]"
                    >
                      <span className="text-[#a78bfa] shrink-0 mt-0.5">
                        {s.icon}
                      </span>
                      <span>{s.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CV download */}
              <CVButton language={language} />
            </motion.div>

            {/* Right column: stats + photos */}
            <motion.div variants={stagger} className="flex flex-col gap-6">
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeUp}
                    className="p-5 rounded-2xl bg-[#0e0e1a] border border-white/[0.06] text-center hover:border-white/[0.1] transition-colors"
                  >
                    <div className="text-2xl font-bold text-gradient mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#64748b] leading-tight">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Photo stack */}
              <motion.div variants={fadeUp}>
                <div style={{ width: "100%", height: "260px" }}>
                  <Stack
                    randomRotation={false}
                    sensitivity={150}
                    sendToBackOnClick={true}
                    autoplay={true}
                    autoplayDelay={3000}
                    pauseOnHover={true}
                    cards={[
                      <img key={1} src="/images/photo-1.jpeg" alt="Arthur Teles" style={{ width: "100%", height: "100%", objectFit: "cover" }} />,
                      <img key={2} src="/images/photo-2.jpeg" alt="Arthur Teles" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />,
                      <img key={3} src="/images/photo-3.jpeg" alt="Arthur Teles" style={{ width: "100%", height: "100%", objectFit: "cover" }} />,
                      <img key={4} src="/images/photo-4.jpeg" alt="Arthur Teles" style={{ width: "100%", height: "100%", objectFit: "cover" }} />,
                      <img key={5} src="/images/photo-5.jpeg" alt="Arthur Teles" style={{ width: "100%", height: "100%", objectFit: "cover" }} />,
                    ]}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
