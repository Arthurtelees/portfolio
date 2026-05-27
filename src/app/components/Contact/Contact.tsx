"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

interface ContactLink {
  name: string;
  icon: React.ReactNode;
  href: string;
  label: string;
  external: boolean;
}

function TiltCard({ link }: { link: ContactLink }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), {
    stiffness: 180,
    damping: 22,
  });
  const glowX = useTransform(mouseX, [0, 1], [0, 100]);
  const glowY = useTransform(mouseY, [0, 1], [0, 100]);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
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
    <motion.a
      ref={cardRef}
      variants={fadeUp}
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
      className="relative flex items-center gap-4 p-4 rounded-xl bg-[#0e0e1a] border border-white/[0.06] hover:border-violet-500/30 transition-colors group cursor-pointer overflow-hidden"
    >
      {/* Dynamic glare highlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(167,139,250,0.13) 0%, transparent 65%)`
          ),
        }}
      />

      {/* Shadow that follows tilt */}
      <motion.div
        className="absolute -inset-1 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(167,139,250,0.18) 0%, transparent 70%)",
          filter: "blur(16px)",
          zIndex: -1,
        }}
      />

      <div
        className="text-[#64748b] group-hover:text-[#a78bfa] transition-colors shrink-0"
        style={{ transform: "translateZ(20px)" }}
      >
        {link.icon}
      </div>
      <div style={{ transform: "translateZ(20px)" }}>
        <div className="text-[10px] font-mono text-[#475569] mb-0.5">
          {link.name}
        </div>
        <div className="text-sm font-medium text-[#94a3b8] group-hover:text-[#e2e8f0] transition-colors">
          {link.label}
        </div>
      </div>
    </motion.a>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();

  const links: ContactLink[] = [
    {
      name: "Email",
      icon: <HiMail size={20} />,
      href: "mailto:arthurnunesteles@gmail.com",
      label: "arthurnunesteles@gmail.com",
      external: false,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={18} />,
      href: "https://www.linkedin.com/in/arthur-teles-179145202/",
      label: "/in/arthur-teles",
      external: true,
    },
    {
      name: "GitHub",
      icon: <FaGithub size={18} />,
      href: "https://github.com/Arthurtelees",
      label: "@Arthurtelees",
      external: true,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={18} />,
      href: "https://api.whatsapp.com/send/?phone=5561984212571",
      label: "+55 61 98421-2571",
      external: true,
    },
  ];

  return (
    <section ref={ref} id="contato" className="py-28 relative overflow-hidden">
      {/* Gradient at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(167,139,250,0.06), transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-3">
            <span className="text-xs font-mono text-[#a78bfa] uppercase tracking-widest">
              {language === "pt" ? "// contato" : "// contact"}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            {language === "pt" ? (
              <>
                Vamos{" "}
                <span className="text-gradient">trabalhar</span>
                <br />
                juntos
              </>
            ) : (
              <>
                Let&apos;s{" "}
                <span className="text-gradient">work</span>
                <br />
                together
              </>
            )}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-[#64748b] text-lg mb-12 max-w-sm mx-auto leading-relaxed"
          >
            {language === "pt"
              ? "Aberto a oportunidades, freelances e colaborações."
              : "Open to opportunities, freelance work, and collaborations."}
          </motion.p>

          {/* Contact cards with 3D hover */}
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-14 text-left"
            style={{ perspective: "1000px" }}
          >
            {links.map((link) => (
              <TiltCard key={link.name} link={link} />
            ))}
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={fadeUp}
            className="pt-8 border-t border-white/[0.06] text-xs text-[#475569] font-mono"
          >
            Arthur Teles &copy; {new Date().getFullYear()} — Full Stack Developer
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}