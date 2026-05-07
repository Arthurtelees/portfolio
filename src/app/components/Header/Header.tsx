"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [visible, setVisible] = useState(false);
  const { language, setLanguage } = useLanguage();

  const menuItems = [
    { name: language === "pt" ? "Início" : "Home", id: "home" },
    { name: language === "pt" ? "Sobre" : "About", id: "sobre" },
    { name: "Skills", id: "skills" },
    { name: language === "pt" ? "Projetos" : "Projects", id: "projetos" },
    { name: language === "pt" ? "Contato" : "Contact", id: "contato" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = menuItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(menuItems[i].id);
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(menuItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [language]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed top-5 left-0 right-0 flex justify-center z-50 pointer-events-none"
        >
          <div className="pointer-events-auto flex items-center gap-0.5 px-2 py-1.5 rounded-full bg-[#0c0c14]/90 border border-white/[0.07] backdrop-blur-xl shadow-2xl shadow-black/60">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? "text-white"
                    : "text-[#64748b] hover:text-[#94a3b8]"
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08]"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </button>
            ))}

            <div className="w-px h-4 bg-white/[0.08] mx-1" />

            <button
              onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
              className="px-3 py-1.5 rounded-full text-xs font-mono font-medium text-[#64748b] hover:text-white transition-colors cursor-pointer"
            >
              {language === "pt" ? "EN" : "PT"}
            </button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
