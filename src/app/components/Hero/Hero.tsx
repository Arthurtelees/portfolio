"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const ROLES: Record<string, string[]> = {
  pt: [
    "Desenvolvedor Full Stack",
    "Especialista em Python",
    "Engenheiro de Software",
    "Automação & Integrações",
  ],
  en: [
    "Full Stack Developer",
    "Python Specialist",
    "Software Engineer",
    "Automation & Integrations",
  ],
};

const bio = {
  pt: "Desenvolvedor Full Stack focado em automação, integrações e construção de soluções que resolvem problemas reais no dia a dia das empresas. Atualmente na Alldax, criando bots e sistemas para rotinas contábeis.",
  en: "Full Stack Developer focused on automation, integrations and building solutions that solve real problems. Currently at Alldax, building bots and systems for accounting routines.",
};

function WordReveal({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.27em]"
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export default function Hero() {
  const { language } = useLanguage();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const currentRoles = ROLES[language] ?? ROLES.en;

  useEffect(() => {
    setRoleIndex(0);
    setDisplayText("");
    setIsDeleting(false);
  }, [language]);

  useEffect(() => {
    const currentRole = currentRoles[roleIndex];
    const speed = isDeleting ? 35 : 75;
    timerRef.current = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % currentRoles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timerRef.current);
  }, [displayText, isDeleting, roleIndex, currentRoles]);

  const bioText = bio[language as keyof typeof bio] ?? bio.en;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#050508]"
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 75% 35%, rgba(167,139,250,0.055), transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 max-w-6xl pt-24 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-14 items-center">

          {/* ── LEFT: Text column ── */}
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
            }}
            initial="hidden"
            animate="visible"
          >
            {/* Available badge */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="mb-9"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.07] bg-white/[0.03] text-sm text-[#94a3b8]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)] animate-pulse" />
                {language === "pt"
                  ? "Disponível para oportunidades"
                  : "Available for opportunities"}
              </div>
            </motion.div>

            {/* Giant outlined name */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -24 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.85, ease: [0.21, 0.47, 0.32, 0.98] as const },
                },
              }}
              className="mb-5"
            >
              <h1
                className="font-bold tracking-tight leading-[0.88]"
                style={{ fontSize: "clamp(4.5rem, 11vw, 9rem)" }}
              >
                <span className="block text-outline">Arthur</span>
                <span className="block text-gradient">
                  Teles
                  <span className="animate-blink text-[#a78bfa] font-light ml-1">.</span>
                </span>
              </h1>
            </motion.div>

            {/* Typewriter role */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="h-8 flex items-center mb-8 text-[#475569] font-mono text-lg"
            >
              <span>{displayText}</span>
              <span className="animate-blink ml-0.5 text-[#a78bfa]">_</span>
            </motion.div>

            {/* Bio — word by word */}
            <motion.p
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.045, delayChildren: 0.5 } },
              }}
              className="text-[#64748b] text-[1.05rem] max-w-lg mb-10 leading-relaxed"
            >
              <WordReveal text={bioText} />
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.85 } },
              }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("projetos")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-7 py-3 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                style={{ background: "linear-gradient(135deg, #a78bfa, #818cf8)" }}
              >
                {language === "pt" ? "Ver Projetos" : "View Projects"}
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contato")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-7 py-3 rounded-full text-sm font-medium border border-white/[0.1] text-[#94a3b8] hover:border-white/[0.18] hover:text-white transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                {language === "pt" ? "Entrar em Contato" : "Get in Touch"}
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.5, delay: 1.05 } },
              }}
              className="flex items-center gap-5 text-[#475569]"
            >
              <a
                href="https://github.com/Arthurtelees"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <span className="w-px h-4 bg-white/[0.08]" />
              <a
                href="https://www.linkedin.com/in/arthur-teles-179145202/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <span className="w-px h-4 bg-white/[0.08]" />
              <a
                href="mailto:arthurnunesteles@gmail.com"
                className="hover:text-white transition-colors"
                aria-label="Email"
              >
                <HiMail size={22} />
              </a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Code window ── */}
          <CodeWindow />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#3d3d5c] to-transparent"
        />
      </motion.div>
    </section>
  );
}

function CodeWindow() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [18, -18]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-18, 18]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 36 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.95, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] as const }}
      className="hidden lg:block"
    >
      {/* Float layer — framer-motion owns the y transform */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Perspective container */}
        <div style={{ perspective: "1000px" }}>
          {/* Tilt layer */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY }}
            className="relative cursor-default"
          >
              {/* Glow */}
              <div
                className="absolute -inset-6 rounded-3xl blur-3xl opacity-[0.14] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse, #a78bfa 0%, #818cf8 50%, transparent 80%)",
                }}
              />

              {/* Code editor window */}
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0c0c14] shadow-2xl">
                {/* Chrome bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05] bg-[#0e0e1a]">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="ml-4 text-xs text-[#475569] font-mono">automation.py</span>
                </div>

                {/* Code */}
                <div className="p-5 font-mono text-[0.8rem] space-y-1.5 leading-snug">
                  <p>
                    <span className="text-violet-400">import</span>{" "}
                    <span className="text-sky-300">automation</span>
                  </p>
                  <p>
                    <span className="text-violet-400">from</span>{" "}
                    <span className="text-sky-300">rpa</span>{" "}
                    <span className="text-violet-400">import</span>{" "}
                    <span className="text-emerald-400">Pipeline</span>
                  </p>

                  <p className="mt-3">
                    <span className="text-violet-400">def</span>{" "}
                    <span className="text-blue-300">process</span>
                    <span className="text-[#94a3b8]">(data):</span>
                  </p>
                  <p className="pl-5 text-[#3d4f6e]"># automate repetitive tasks</p>
                  <p className="pl-5">
                    <span className="text-[#94a3b8]">pipe</span>
                    <span className="text-[#64748b]"> = </span>
                    <span className="text-emerald-400">Pipeline</span>
                    <span className="text-[#94a3b8]">.</span>
                    <span className="text-blue-300">build</span>
                    <span className="text-[#94a3b8]">(data)</span>
                  </p>
                  <p className="pl-5">
                    <span className="text-violet-400">return</span>{" "}
                    <span className="text-[#94a3b8]">pipe.</span>
                    <span className="text-blue-300">execute</span>
                    <span className="text-[#94a3b8]">()</span>
                  </p>

                  <p className="mt-3">
                    <span className="text-violet-400">class</span>{" "}
                    <span className="text-yellow-300">Solution</span>
                    <span className="text-[#94a3b8]">:</span>
                  </p>
                  <p className="pl-5">
                    <span className="text-[#94a3b8]">efficiency</span>
                    <span className="text-[#64748b]"> = </span>
                    <span className="text-orange-300">1.43</span>
                    <span className="text-[#3d4f6e]">  # +43%</span>
                  </p>
                  <p className="pl-5">
                    <span className="text-[#94a3b8]">stack</span>
                    <span className="text-[#64748b]"> = </span>
                    <span className="text-[#94a3b8]">[</span>
                    <span className="text-amber-300">&quot;Python&quot;</span>
                    <span className="text-[#64748b]">, </span>
                    <span className="text-amber-300">&quot;FastAPI&quot;</span>
                    <span className="text-[#94a3b8]">,</span>
                  </p>
                  <p className="pl-10">
                    <span className="text-amber-300">&quot;React&quot;</span>
                    <span className="text-[#64748b]">, </span>
                    <span className="text-amber-300">&quot;PostgreSQL&quot;</span>
                    <span className="text-[#94a3b8]">]</span>
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-emerald-400">▶</span>
                    <span className="text-[#475569]">Running...</span>
                    <span className="inline-block w-[7px] h-[13px] bg-[#a78bfa] animate-blink" />
                  </div>
                </div>
              </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

