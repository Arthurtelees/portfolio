"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TbBriefcase, TbCalendar } from "react-icons/tb";
import { useLanguage } from "../../contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

type Loc = { pt: string; en: string };

type Job = {
  role: Loc;
  company: Loc;
  period: Loc;
  current?: boolean;
  bullets: Loc[];
  stack: string[];
};

const jobs: Job[] = [
  {
    role: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" },
    company: { pt: "Alldax Contabilidade (Grupo 3 S/A)", en: "Alldax Contabilidade (Grupo 3 S/A)" },
    period: { pt: "out 2025 — presente", en: "Oct 2025 — present" },
    current: true,
    bullets: [
      {
        pt: "Lidero, desde a concepção, o Gestall (gestall.g3sa.com.br): plataforma SaaS multi-tenant de RH e financeiro que hoje gerencia 185 colaboradores ativos nas 8 empresas do Grupo 3SA, com cerca de 80% de adoção mensal entre os usuários cadastrados.",
        en: "I lead, from conception, Gestall (gestall.g3sa.com.br): a multi-tenant HR and finance SaaS platform now managing 185 active employees across Grupo 3SA's 8 companies, with around 80% monthly adoption among registered users.",
      },
      {
        pt: "O volume de registros de ponto processados pela plataforma cresceu cerca de 100% entre janeiro e outubro de 2026, acompanhando a expansão de 104 para 155 colaboradores ativos no módulo.",
        en: "The volume of time-tracking records processed by the platform grew about 100% between January and October 2026, in step with the module's growth from 104 to 155 active employees.",
      },
      {
        pt: "Implementei o isolamento de dados entre empresas com Row Level Security no PostgreSQL e corrigi falhas de isolamento antes que chegassem à produção.",
        en: "I implemented cross-company data isolation with Row Level Security in PostgreSQL and fixed isolation flaws before they reached production.",
      },
      {
        pt: "Integrei modelos de IA (Anthropic e OpenAI) para extrair automaticamente cerca de 5.600 rubricas por mês dos PDFs de folha de pagamento, eliminando a digitação manual desses dados.",
        en: "I integrated AI models (Anthropic and OpenAI) to automatically extract around 5,600 payroll line items per month from payslip PDFs, eliminating manual data entry.",
      },
      {
        pt: "Desenvolvi e publiquei em produção o Emitte (emitte.app.br), plataforma de emissão de NFS-e, em parceria com outra desenvolvedora, em cerca de 6 dias. Hoje é usada diariamente por cerca de 35 criadores de conteúdo que emitem notas de comissões de afiliados da Shopee.",
        en: "I built and shipped Emitte (emitte.app.br), an NFS-e issuing platform, with another developer, in about 6 days. It's now used daily by roughly 35 content creators issuing invoices for Shopee affiliate commissions.",
      },
      {
        pt: "Desenvolvi automações RPA (Bot de Provisão e Bot de Malhas Fiscais/SEFAZ) com PyAutoGUI e SeleniumBase em modo CDP, hoje usadas por mais de 150 empresas e responsáveis por cerca de 3.560 horas economizadas a cada 6 meses. No Bot de Provisão, automatizei execuções que levavam em média 1h57 de trabalho manual (de 10 min a 8h).",
        en: "I built RPA automations (Provisioning Bot and Tax Audit/SEFAZ Bot) with PyAutoGUI and SeleniumBase in CDP mode, now used by 150+ companies and responsible for around 3,560 hours saved every 6 months. On the Provisioning Bot, I automated runs that used to take an average of 1h57 of manual work (from 10 min to 8h).",
      },
      {
        pt: "Dou suporte técnico e mentoria a desenvolvedores e estagiários do time.",
        en: "I provide technical support and mentorship to developers and interns on the team.",
      },
    ],
    stack: [
      "Java 21", "Spring Boot", "Python", "TypeScript", "React", "TanStack Start",
      "PostgreSQL (RLS)", "MySQL", "Supabase", "Deno", "Docker", "Streamlit",
      "PyAutoGUI", "OpenCV", "SeleniumBase", "Microsoft Graph API", "AES-256-GCM",
    ],
  },
  {
    role: { pt: "Desenvolvedor Full Stack (Freelance)", en: "Full Stack Developer (Freelance)" },
    company: { pt: "Classe A Soluções em Tecnologia", en: "Classe A Soluções em Tecnologia" },
    period: { pt: "mar 2025 — dez 2025", en: "Mar 2025 — Dec 2025" },
    bullets: [
      {
        pt: "Implementei o módulo de pagamentos da plataforma, integrando PayPal, boleto bancário e depósito.",
        en: "I implemented the platform's payments module, integrating PayPal, bank slip and deposit.",
      },
      {
        pt: "Protegi sessões e rotas com NextAuth, implementando autenticação segura de ponta a ponta.",
        en: "I secured sessions and routes with NextAuth, implementing end-to-end secure authentication.",
      },
      {
        pt: "Reduzi requisições redundantes ao otimizar o consumo de APIs com TanStack Query.",
        en: "I reduced redundant requests by optimizing API consumption with TanStack Query.",
      },
      {
        pt: "Padronizei a interface com Tailwind CSS e shadcn/ui a partir de layouts do Figma e geri o estado global com React Context API.",
        en: "I standardized the UI with Tailwind CSS and shadcn/ui from Figma layouts, and managed global state with React Context API.",
      },
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "NextAuth", "TanStack Query", "React Context API", "Figma"],
  },
  {
    role: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" },
    company: { pt: "Hospital Militar de Área de Brasília (HMAB)", en: "Hospital Militar de Área de Brasília (HMAB)" },
    period: { pt: "fev 2024 — fev 2025", en: "Feb 2024 — Feb 2025" },
    bullets: [
      {
        pt: "Desenvolvi aplicações em Python (FastAPI e Django) e React para áreas administrativas e clínicas em ambiente de alta criticidade.",
        en: "I built applications in Python (FastAPI and Django) and React for administrative and clinical areas in a high-criticality environment.",
      },
      {
        pt: "Automatizei processos internos, reduzindo o tempo operacional em 33%.",
        en: "I automated internal processes, cutting operational time by 33%.",
      },
      {
        pt: "Migrei sistemas legados para tecnologias modernas e integrei sistemas de mais de 15 setores.",
        en: "I migrated legacy systems to modern technologies and integrated systems across 15+ departments.",
      },
    ],
    stack: ["Python", "FastAPI", "Django", "React"],
  },
];

function t(v: Loc, lang: string) {
  return lang === "pt" ? v.pt : v.en;
}

function JobCard({ job, index }: { job: Job; index: number }) {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative pl-12"
    >
      {/* Timeline node */}
      <span
        className="absolute left-0 top-1.5 w-8 h-8 rounded-full flex items-center justify-center border"
        style={{
          borderColor: job.current ? "rgba(167,139,250,0.5)" : "rgba(255,255,255,0.1)",
          background: job.current ? "rgba(167,139,250,0.12)" : "#0e0e1a",
        }}
      >
        <TbBriefcase size={15} className={job.current ? "text-[#a78bfa]" : "text-[#475569]"} />
      </span>
      {index < jobs.length - 1 && (
        <span className="absolute left-4 top-9 -translate-x-1/2 w-px h-[calc(100%+2.5rem)] bg-white/[0.08]" />
      )}

      <div className="p-6 rounded-2xl bg-[#0e0e1a] border border-white/[0.06] hover:border-white/[0.1] transition-colors">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
          <div>
            <h3 className="text-lg font-semibold text-[#e2e8f0]">{t(job.role, language)}</h3>
            <p className="text-[#a78bfa] text-sm font-medium">{t(job.company, language)}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#64748b] shrink-0 mt-1">
            <TbCalendar size={13} />
            {t(job.period, language)}
            {job.current && (
              <span className="ml-1 inline-flex items-center gap-1.5 text-[#34d399]">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full bg-[#34d399] animate-ping opacity-60" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                </span>
              </span>
            )}
          </span>
        </div>

        <ul className="mt-4 space-y-2.5">
          {job.bullets.map((b, i) => (
            <li key={i} className="text-sm text-[#94a3b8] leading-relaxed flex gap-2.5">
              <span className="text-[#a78bfa] shrink-0 mt-[0.45em] w-1 h-1 rounded-full bg-[#a78bfa]" />
              <span>{t(b, language)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {job.stack.map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 rounded-md bg-white/[0.04] text-[11px] font-mono text-[#64748b]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();

  return (
    <section ref={ref} id="experiencia" className="py-28 relative bg-[#050508]">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="mb-3">
            <span className="text-xs font-mono text-[#a78bfa] uppercase tracking-widest">
              {language === "pt" ? "// experiência" : "// experience"}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold mb-16 text-[#e2e8f0]"
          >
            {language === "pt" ? "Experiência" : "Experience"}
          </motion.h2>

          <div className="space-y-10">
            {jobs.map((job, i) => (
              <JobCard key={job.company.en} job={job} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
