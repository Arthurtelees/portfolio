"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
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
      value: "33%",
      label:
        language === "pt" ? "Ganho em Eficiência" : "Efficiency Gain",
    },
    {
      value: "2024",
      label: language === "pt" ? "Pós-Graduação" : "Post-Graduation",
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
    <section ref={ref} id="sobre" className="py-28 relative">
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
                      , formado em Tecnologia da Informação e pós-graduado em
                      Java/PHP. Desenvolvedor Full Stack focado em automação,
                      integrações e construção de soluções que resolvem
                      problemas reais no dia a dia das empresas.
                    </>
                  ) : (
                    <>
                      I&apos;m{" "}
                      <span className="text-[#e2e8f0] font-medium">
                        Arthur Teles
                      </span>
                      , graduated in Information Technology and post-graduated
                      in Java/PHP. Full Stack Developer focused on automation,
                      integrations and building solutions that solve real
                      problems in companies&apos; day-to-day operations.
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
                      , atuo com desenvolvimento de sistemas, bots e automações voltadas
                      para rotinas contábeis e financeiras, criando soluções
                      que reduzem esforço manual, aumentam a eficiência e
                      trazem mais confiabilidade aos processos. Também trabalho
                      com integrações entre sistemas, análise de dados e
                      melhorias contínuas em fluxos já existentes.
                    </>
                  ) : (
                    <>
                      Currently at{" "}
                      <span className="text-[#e2e8f0] font-medium">
                        Alldax
                      </span>
                      , I develop systems, bots and automations for accounting and
                      financial routines, creating solutions that reduce manual
                      effort, increase efficiency and bring more reliability to
                      processes. I also work on systems integrations, data
                      analysis and continuous improvements to existing
                      workflows.
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
              <a
                href="/curriculo Arthur Teles atz.pdf"
                download="curriculo Arthur Teles atz.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.1] text-sm font-medium text-[#94a3b8] hover:text-white hover:border-white/[0.2] transition-all duration-200"
              >
                {language === "pt" ? "Download CV" : "Download Resume"}
                <TbArrowDown size={14} className="text-[#a78bfa]" />
              </a>
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

              {/* Photo gallery — overlapping fan */}
              <motion.div variants={fadeUp}>
                {/* Container with fixed height to hold the overlap */}
                <div className="relative flex justify-center" style={{ height: "220px" }}>
                  {/* Left photo */}
                  <motion.div
                    initial={{ opacity: 0, rotate: -25, x: -20 }}
                    animate={inView ? { opacity: 1, rotate: -8, x: 0 } : {}}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                    whileHover={{ rotate: -2, scale: 1.12, y: -18, zIndex: 30 }}
                    className="absolute left-0 bottom-0 cursor-pointer"
                    style={{ zIndex: 10, transformOrigin: "bottom center" }}
                  >
                    <div className="p-[2px] rounded-2xl bg-gradient-to-br from-violet-400/50 via-purple-600/20 to-slate-800/60 shadow-xl shadow-black/60 transition-all duration-300 hover:shadow-[0_0_40px_rgba(167,139,250,0.45)]">
                      <div className="relative rounded-[calc(1rem-2px)] overflow-hidden w-[140px] h-[180px]">
                        <Image
                          src="/images/photo-2.jpeg"
                          alt="Arthur Teles"
                          fill
                          className="object-cover transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 hover:opacity-0" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Center photo — on top, floats */}
                  <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.85 }}
                    animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.9, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                    whileHover={{ scale: 1.14, y: -22, zIndex: 30 }}
                    className="absolute bottom-0 cursor-pointer"
                    style={{ zIndex: 20, transformOrigin: "bottom center" }}
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="p-[2px] rounded-2xl bg-gradient-to-br from-violet-400/90 via-indigo-500/60 to-purple-700/40 shadow-2xl shadow-violet-500/30 transition-all duration-300 hover:shadow-[0_0_55px_rgba(167,139,250,0.6)]">
                        <div className="relative rounded-[calc(1rem-2px)] overflow-hidden w-[150px] h-[195px]">
                          <Image
                            src="/images/photo-1.jpeg"
                            alt="Arthur Teles"
                            fill
                            className="object-cover transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-300 hover:opacity-0" />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Right photo */}
                  <motion.div
                    initial={{ opacity: 0, rotate: 25, x: 20 }}
                    animate={inView ? { opacity: 1, rotate: 8, x: 0 } : {}}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                    whileHover={{ rotate: 2, scale: 1.12, y: -18, zIndex: 30 }}
                    className="absolute right-0 bottom-0 cursor-pointer"
                    style={{ zIndex: 10, transformOrigin: "bottom center" }}
                  >
                    <div className="p-[2px] rounded-2xl bg-gradient-to-br from-violet-400/50 via-purple-600/20 to-slate-800/60 shadow-xl shadow-black/60 transition-all duration-300 hover:shadow-[0_0_40px_rgba(167,139,250,0.45)]">
                      <div className="relative rounded-[calc(1rem-2px)] overflow-hidden w-[140px] h-[180px]">
                        <Image
                          src="/images/photo-3.jpeg"
                          alt="Arthur Teles"
                          fill
                          className="object-cover transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 hover:opacity-0" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}


