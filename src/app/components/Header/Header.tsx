"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();

  const menuItems = [
    { name: language === "pt" ? "Início" : "Home", id: "home" },
    { name: language === "pt" ? "Sobre" : "About", id: "sobre" },
    { name: language === "pt" ? "Habilidades" : "Skills", id: "skills" },
    { name: language === "pt" ? "Projetos" : "Projects", id: "projetos" },
    { name: language === "pt" ? "Contato" : "Contact", id: "contato" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 100;
      for (let i = menuItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(menuItems[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(menuItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [language]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black bg-opacity-80 backdrop-blur-md border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="text-white text-xl font-light tracking-wider cursor-pointer hover:text-gray-300 transition-colors"
            onClick={() => scrollToSection("home")}
          >
            {language === "pt" ? "Seja Bem-vindo!" : "Welcome!"}
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-light tracking-wide transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-white border-b border-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}

            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-transparent text-gray-400 text-sm border border-gray-700 rounded px-2 py-1 focus:outline-none focus:border-gray-500 transition-colors"
            >
              <option value="pt">PT</option>
              <option value="en">EN</option>
            </select>
          </nav>

          <div className="md:hidden text-white">
            <button className="p-2">
              <div className="w-6 h-px bg-white mb-1"></div>
              <div className="w-6 h-px bg-white mb-1"></div>
              <div className="w-6 h-px bg-white"></div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
