"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { FaGithub } from "react-icons/fa";
import {
  HiArrowUpRight,
  HiBolt,
  HiCheck,
  HiCommandLine,
  HiLockClosed,
} from "react-icons/hi2";
import { useLanguage } from "../../contexts/LanguageContext";

const EASE = [0.16, 1, 0.3, 1] as const;

type Loc = Record<string, string>;

type Metric = { value: string | Loc; label: Loc; count?: boolean };

type Project = {
  id: string;
  name: Loc;
  nameAccent?: string;
  tagline: Loc;
  description: Loc;
  year: Loc;
  status: "production" | "development";
  metrics: Metric[];
  tech: string[];
  brand: string;
  domain: string;
  link?: string;
  linkLabel?: Loc;
  /** Screenshots em /public/images. Mais de uma vira carrossel. */
  images?: string[];
  chip?: { text: Loc; icon: ReactNode };
  console?: boolean;
};

const t = (v: string | Loc, lang: string) =>
  typeof v === "string" ? v : v[lang] ?? v.en;

const projects: Project[] = [
  {
    id: "01",
    name: { pt: "Gest", en: "Gest" },
    nameAccent: "ALL",
    tagline: {
      pt: "Plataforma SaaS multi-tenant de RH e financeiro",
      en: "Multi-tenant HR and finance SaaS",
    },
    description: {
      pt: "Plataforma de RH e financeiro usada pelas 8 empresas do Grupo 3SA: ponto, benefícios, férias e rateio financeiro automático. Fiz a concepção e cuido de tudo, do banco de dados à interface. Cada empresa enxerga só os próprios dados, garantido por Row Level Security no Postgres, e os PDFs de folha de pagamento são lidos automaticamente com modelos da Anthropic e da OpenAI, extraindo cerca de 5.600 rubricas por mês.",
      en: "HR and finance platform used by all 8 companies in Grupo 3SA: time tracking, benefits, vacations and automatic cost allocation. I designed it and own everything from the database to the UI. Each company only sees its own data, enforced by Row Level Security in Postgres, and payroll PDFs are parsed automatically with Anthropic and OpenAI models, extracting around 5,600 line items per month.",
    },
    year: { pt: "Desde 2025", en: "Since 2025" },
    status: "development",
    metrics: [
      { value: "185", label: { pt: "colaboradores ativos", en: "active employees" } },
      { value: "8", label: { pt: "empresas atendidas", en: "companies served" } },
      { value: "~5.600", label: { pt: "rubricas/mês via IA", en: "line items/mo via AI" } },
    ],
    tech: ["Java 21", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Supabase", "Docker"],
    brand: "#e8593c",
    domain: "gestall.g3sa.com.br",
    link: "https://gestall.g3sa.com.br",
    linkLabel: { pt: "Ver plataforma", en: "View platform" },
    images: ["/images/gestall-1.png"],
    chip: {
      text: { pt: "Extração de PDF com IA", en: "AI-powered PDF extraction" },
      icon: <HiBolt size={13} />,
    },
  },
  {
    id: "02",
    name: { pt: "emitte", en: "emitte" },
    tagline: {
      pt: "Emissão de NFS-e para quem cuida de vários CNPJs",
      en: "NFS-e issuing for firms handling many tax IDs",
    },
    description: {
      pt: "Emissor de notas fiscais de serviço multi-tenant. Construí com outra desenvolvedora e o MVP entrou no ar em cerca de 6 dias. Hoje é usado diariamente por cerca de 35 criadores de conteúdo que emitem notas de comissões de afiliados da Shopee. Os certificados digitais ficam cifrados com AES-256-GCM e cada nota passa por uma fila assíncrona com retry, DLQ e reconciliação automática.",
      en: "Multi-tenant service invoice (NFS-e) issuer. I built it with another developer and had the MVP live in about 6 days. It's now used daily by around 35 content creators issuing invoices for Shopee affiliate commissions. Digital certificates are encrypted with AES-256-GCM and every invoice goes through an async queue with retry, DLQ and automatic reconciliation.",
    },
    year: { pt: "2025", en: "2025" },
    status: "production",
    metrics: [
      {
        value: { pt: "~6 dias", en: "~6 days" },
        label: { pt: "até o MVP no ar", en: "to a live MVP" },
      },
      {
        value: "AES-256",
        count: false,
        label: { pt: "certificados cifrados", en: "encrypted certificates" },
      },
      { value: "~35", label: { pt: "criadores de conteúdo", en: "content creators" } },
    ],
    tech: ["TanStack Start", "React 19", "TypeScript", "PostgreSQL", "RLS"],
    brand: "#3ccf6e",
    domain: "emitte.app.br",
    link: "https://emitte.app.br",
    linkLabel: { pt: "Visitar site", en: "Visit site" },
    images: ["/images/emitte-1.png"],
    chip: {
      text: { pt: "NFS-e autorizada", en: "NFS-e authorized" },
      icon: <HiCheck size={13} />,
    },
  },
  {
    id: "03",
    name: { pt: "Automações RPA", en: "RPA Automations" },
    tagline: {
      pt: "Bots para rotinas fiscais e contábeis",
      en: "Bots for tax and accounting routines",
    },
    description: {
      pt: "Bots em Python que automatizam rotinas fiscais e contábeis para mais de 150 empresas, como a provisão e a consulta de malhas fiscais na SEFAZ. No Bot de Provisão, automatizei execuções que levavam em média 1h57 de trabalho manual (de 10 min a 8h). Rodam numa fila distribuída no MySQL com lock por heartbeat, autenticam com certificado A1/A3, salvam os resultados no SharePoint via Microsoft Graph e são acompanhados por um painel em Streamlit.",
      en: "Python bots that automate tax and accounting routines for 150+ companies, such as tax provisioning and SEFAZ audit checks. On the Provisioning Bot, I automated runs that used to take an average of 1h57 of manual work (from 10 min to 8h). They run on a distributed MySQL queue with heartbeat locking, authenticate with A1/A3 certificates, store results in SharePoint through Microsoft Graph and are monitored from a Streamlit dashboard.",
    },
    year: { pt: "2025", en: "2025" },
    status: "production",
    metrics: [
      { value: "~3.560h", label: { pt: "economizadas a cada 6 meses", en: "saved every 6 months" } },
      {
        value: { pt: "1h57", en: "1h57" },
        count: false,
        label: { pt: "tempo médio automatizado", en: "avg. time automated" },
      },
      { value: "150+", label: { pt: "empresas atendidas", en: "companies served" } },
    ],
    tech: ["Python", "PyAutoGUI", "OpenCV", "SeleniumBase", "Streamlit", "MySQL", "Microsoft Graph"],
    brand: "#f5a524",
    domain: "bot_provisao.py",
    console: true,
  },
];

/* Small pieces */

function CountUp({
  value,
  lang,
  play,
  enabled = true,
}: {
  value: string;
  lang: string;
  play: boolean;
  enabled?: boolean;
}) {
  const parts = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  const canCount = enabled && !!parts;
  const target = parts ? parseInt(parts[2].replace(/[.,]/g, ""), 10) : 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!canCount || !play) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [canCount, play, target]);

  if (!canCount || !parts) return <>{value}</>;
  const fmt = new Intl.NumberFormat(lang === "pt" ? "pt-BR" : "en-US");
  return (
    <>
      {parts[1]}
      {fmt.format(n)}
      {parts[3]}
    </>
  );
}

function Status({ status, lang }: { status: Project["status"]; lang: string }) {
  const prod = status === "production";
  const color = prod ? "#34d399" : "#fbbf24";
  const label = prod
    ? lang === "pt"
      ? "Em produção"
      : "In production"
    : lang === "pt"
      ? "Em desenvolvimento ativo"
      : "In active development";
  return (
    <span
      className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest"
      style={{ color }}
    >
      <span className="relative flex w-2 h-2">
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-60"
          style={{ background: color }}
        />
        <span className="relative w-2 h-2 rounded-full" style={{ background: color }} />
      </span>
      {label}
    </span>
  );
}

/* Screens (real screenshots) */

function Screens({
  images,
  alt,
  revealed,
}: {
  images: string[];
  alt: string;
  revealed: boolean;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setI((p) => (p + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ scale: 1.12 }}
      animate={revealed ? { scale: 1 } : undefined}
      transition={{ duration: 1.6, ease: EASE }}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={images[i]}
          src={images[i]}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full object-cover object-top select-none"
        />
      </AnimatePresence>
    </motion.div>
  );
}

/* RPA live console */

const LOGS: [string, string][] = [
  ["INFO", "worker-02 assumiu o lote #4821"],
  ["INFO", "Login na SEFAZ com certificado A1"],
  ["OK", "Malha fiscal sem pendências (CNPJ 12.***.***/0001-90)"],
  ["INFO", "Botão 'Consultar' localizado via OpenCV (0.97)"],
  ["OK", "Provisão calculada: R$ 18.420,55"],
  ["OK", "Enviado ao SharePoint /Provisoes/2026-11"],
  ["WARN", "Portal lento, nova tentativa em 5s"],
  ["OK", "Lote #4821 concluído em 41s"],
];

const LEVEL_COLOR: Record<string, string> = {
  INFO: "#64748b",
  OK: "#34d399",
  WARN: "#fbbf24",
};

function clock(n: number) {
  const s = 9 * 3600 + 41 * 60 + n * 3;
  return [Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
}

const WORKERS = [
  ["worker-01", true],
  ["worker-02", true],
  ["worker-03", false],
] as const;

function RpaConsole({ active }: { active: boolean }) {
  const [tick, setTick] = useState(7);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setTick((p) => p + 1), 1100);
    return () => clearInterval(id);
  }, [active]);

  const lines = Array.from({ length: 7 }, (_, k) => tick - 6 + k);
  const processed = 100 + (tick % 51);

  return (
    <div
      className="absolute inset-0 flex font-mono text-[10px] sm:text-[11px]"
      style={{
        background:
          "radial-gradient(70% 90% at 100% 0%, rgba(245,165,36,0.07), transparent 60%)",
      }}
    >
      {/* log stream */}
      <div className="flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-end gap-1.5 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {lines.map((n) => {
            const [level, msg] = LOGS[n % LOGS.length];
            return (
              <motion.div
                key={n}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex gap-2.5 whitespace-nowrap"
              >
                <span className="text-white/20 shrink-0">{clock(n)}</span>
                <span className="w-8 shrink-0" style={{ color: LEVEL_COLOR[level] }}>
                  {level}
                </span>
                <span className="text-white/70 truncate">{msg}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div className="flex items-center gap-1.5 mt-1 text-[#f5a524]">
          <span>$</span>
          <span className="w-1.5 h-3 bg-[#f5a524]/80 animate-blink" />
        </div>
      </div>

      {/* side panel */}
      <div className="hidden sm:flex w-[36%] shrink-0 flex-col gap-5 p-5 border-l border-white/[0.06] bg-white/[0.015]">
        <div>
          <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1.5">
            Empresas
          </div>
          <div className="text-lg font-semibold text-white tabular-nums">
            {processed}
            <span className="text-white/25">/150</span>
          </div>
          <div className="h-1 mt-2 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#f5a524]"
              animate={{ width: `${(processed / 150) * 100}%` }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">
            Workers
          </div>
          {WORKERS.map(([name, on]) => (
            <div key={name} className="flex items-center justify-between text-white/55">
              <span>{name}</span>
              <span className="flex items-center gap-1.5 text-[9px] text-white/30">
                <span className="relative flex w-1.5 h-1.5">
                  {on && (
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                  )}
                  <span
                    className={`relative w-1.5 h-1.5 rounded-full ${on ? "bg-emerald-400" : "bg-white/20"}`}
                  />
                </span>
                {on ? "heartbeat" : "ocioso"}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">
            Economia em 6 meses
          </div>
          <div className="text-lg font-semibold text-[#f5a524]">~3.560h</div>
        </div>
      </div>
    </div>
  );
}

/* Browser frame with tilt, glare, reveal and parallax */

function Frame({
  project,
  revealed,
  flip,
}: {
  project: Project;
  revealed: boolean;
  flip: boolean;
}) {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const live = useInView(wrapRef, { margin: "0px 0px -10% 0px" });

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], [36, -36]);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 140, damping: 18 });
  const glare = useTransform(
    [mx, my],
    ([x, y]) =>
      `radial-gradient(520px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,255,255,0.09), transparent 45%)`
  );
  const [hover, setHover] = useState(false);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    setHover(false);
    mx.set(0.5);
    my.set(0.5);
  }

  const alt = t(project.name, language) + (project.nameAccent ?? "");

  return (
    <motion.div ref={wrapRef} style={{ y: reduce ? 0 : parallax }} className="relative">
      {/* brand glow */}
      <motion.div
        aria-hidden
        className="absolute -inset-8 md:-inset-14 rounded-[48px] blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(55% 55% at 50% 55%, ${project.brand}, transparent 72%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? (hover ? 0.3 : 0.14) : 0 }}
        transition={{ duration: 0.8 }}
      />

      <div style={{ perspective: 1400 }}>
        <motion.div
          onMouseEnter={() => setHover(true)}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={reduce ? undefined : { rotateX, rotateY }}
          initial={{ clipPath: "inset(14% 10% 14% 10% round 24px)", opacity: 0 }}
          animate={
            revealed
              ? { clipPath: "inset(0% 0% 0% 0% round 14px)", opacity: 1 }
              : undefined
          }
          transition={{ duration: 1.2, ease: EASE }}
          className="relative rounded-[14px] border border-white/[0.08] bg-[#0a0a10] overflow-hidden shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
        >
          {/* chrome */}
          <div className="relative flex items-center h-10 px-4 border-b border-white/[0.06] bg-[#0d0d14]">
            <div className="flex gap-1.5">
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <span
                  key={c}
                  className="w-2.5 h-2.5 rounded-full transition-colors duration-300"
                  style={{ background: hover ? c : "rgba(255,255,255,0.12)" }}
                />
              ))}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.04] text-[11px] font-mono text-white/45 max-w-[60%]">
              {project.console ? <HiCommandLine size={12} /> : <HiLockClosed size={10} />}
              <span className="truncate">{project.domain}</span>
            </div>
          </div>

          {/* viewport */}
          <div className="relative aspect-[16/10] sm:aspect-[2/1] overflow-hidden">
            {project.console ? (
              <RpaConsole active={live} />
            ) : (
              <Screens images={project.images ?? []} alt={alt} revealed={revealed} />
            )}
            <motion.div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ background: glare }}
              animate={{ opacity: hover ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </div>

      {/* floating chip */}
      {project.chip && (
        <motion.div
          className={`absolute -bottom-5 z-10 ${flip ? "right-5" : "left-5"}`}
          initial={{ opacity: 0, y: 16 }}
          animate={revealed ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2.5 pl-2 pr-3.5 py-2 rounded-xl bg-[#101018]/90 backdrop-blur-md border border-white/10 shadow-2xl text-xs text-[#e2e8f0]"
          >
            <span
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: `${project.brand}22`, color: project.brand }}
            >
              {project.chip.icon}
            </span>
            {t(project.chip.text, language)}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

/* Project row */

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { language } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const revealed = useInView(ref, { once: true, margin: "-15% 0px" });
  const flip = index % 2 === 1;

  return (
    <article
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center"
    >
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <Frame project={project} revealed={revealed} flip={flip} />
      </div>

      <motion.div
        className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}
        initial="hidden"
        animate={revealed ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
        }}
      >
        <motion.div variants={item} className="flex items-center gap-4 mb-8 font-mono text-xs">
          <span style={{ color: project.brand }}>{project.id}</span>
          <motion.span
            className="h-px flex-1 bg-white/10 origin-left"
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 1, ease: EASE } },
            }}
          />
          <span className="text-[#475569]">{t(project.year, language)}</span>
        </motion.div>

        <motion.div variants={item}>
          <Status status={project.status} lang={language} />
        </motion.div>

        <motion.h3
          variants={item}
          className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-[#e2e8f0]"
        >
          {t(project.name, language)}
          {project.nameAccent && (
            <span style={{ color: project.brand }}>{project.nameAccent}</span>
          )}
        </motion.h3>

        <motion.p variants={item} className="mt-2 text-[#64748b]">
          {t(project.tagline, language)}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 text-[15px] leading-relaxed text-[#94a3b8]"
        >
          {t(project.description, language)}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 grid grid-cols-3 border-y border-white/[0.06]"
        >
          {project.metrics.map((m, k) => (
            <div
              key={k}
              className={`py-5 ${k > 0 ? "pl-3 sm:pl-4 border-l border-white/[0.06]" : ""} ${
                k < project.metrics.length - 1 ? "pr-3 sm:pr-4" : ""
              }`}
            >
              <div className="text-xl sm:text-2xl md:text-[1.7rem] font-semibold leading-none text-[#f1f5f9] tabular-nums whitespace-nowrap">
                <CountUp
                  value={t(m.value, language)}
                  lang={language}
                  play={revealed}
                  enabled={m.count !== false}
                />
              </div>
              <div className="mt-2 text-[11px] leading-snug text-[#64748b]">
                {t(m.label, language)}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 font-mono text-[11px] leading-relaxed text-[#64748b]"
        >
          {project.tech.map((x, k) => (
            <span key={x} className="inline-block whitespace-nowrap">
              {k > 0 && <span className="mx-2 text-white/15">/</span>}
              {x}
            </span>
          ))}
        </motion.p>

        <motion.div variants={item} className="mt-9">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ "--brand": project.brand } as CSSProperties}
              className="group inline-flex items-center gap-3 text-sm font-medium text-[#e2e8f0]"
            >
              <span className="relative">
                {project.linkLabel ? t(project.linkLabel, language) : project.domain}
                <span className="absolute left-0 -bottom-1 h-px w-full bg-[var(--brand)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </span>
              <span className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--brand)] group-hover:border-transparent group-hover:text-[#050508]">
                <HiArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:rotate-45"
                />
              </span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm text-[#475569]">
              <HiLockClosed size={14} />
              {language === "pt"
                ? "Uso interno na Alldax, sem acesso público"
                : "Internal use at Alldax, no public access"}
            </span>
          )}
        </motion.div>
      </motion.div>
    </article>
  );
}

/* Section */

export default function Projects() {
  const { language } = useLanguage();
  const headRef = useRef<HTMLDivElement>(null);
  const headIn = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section id="projetos" className="relative py-28 md:py-36 bg-[#050508] overflow-x-clip">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          ref={headRef}
          initial="hidden"
          animate={headIn ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-24 md:mb-32"
        >
          <div>
            <motion.span
              variants={item}
              className="block text-xs font-mono text-[#a78bfa] uppercase tracking-widest"
            >
              {language === "pt" ? "// projetos" : "// projects"}
            </motion.span>
            <motion.h2
              variants={item}
              className="mt-3 text-4xl md:text-5xl font-bold text-[#e2e8f0]"
            >
              {language === "pt" ? "Projetos" : "Projects"}
            </motion.h2>
          </div>
          <motion.p
            variants={item}
            className="text-[#64748b] max-w-sm md:text-right leading-relaxed"
          >
            {language === "pt"
              ? "Sistemas que construí do zero e que hoje rodam com usuários e dados reais."
              : "Systems I built from scratch that now run with real users and real data."}
          </motion.p>
        </motion.div>

        <div className="space-y-32 md:space-y-44">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>

        <div className="mt-32 flex justify-center">
          <a
            href="https://github.com/Arthurtelees"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-[#e2e8f0] transition-colors"
          >
            <FaGithub size={16} />
            {language === "pt"
              ? "Estudos e projetos menores no GitHub"
              : "Studies and smaller projects on GitHub"}
            <HiArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
