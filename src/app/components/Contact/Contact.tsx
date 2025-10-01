"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const contacts = [
    {
      name: "Email",
      value: "arthurnunesteles@gmail.com",
      href: "mailto:arthurnunesteles@gmail.com",
      icon: "✉️",
      color: "from-purple-500 to-pink-500",
      borderColor: "hover:border-purple-500",
      description:
        language === "pt"
          ? "Envie-me um email para oportunidades profissionais"
          : "Send me an email for professional opportunities",
    },
    {
      name: "WhatsApp",
      value: "+55 (61) 98421-2571",
      href: "https://api.whatsapp.com/send/?phone=5561984212571",
      icon: "📱",
      color: "from-green-500 to-emerald-500",
      borderColor: "hover:border-green-500",
      description:
        language === "pt"
          ? "Conversas rápidas e diretas"
          : "Quick and direct conversations",
    },
    {
      name: "LinkedIn",
      value: "/in/arthur-teles-179145202",
      href: "https://www.linkedin.com/in/arthur-teles-179145202/",
      icon: "💼",
      color: "from-blue-500 to-cyan-500",
      borderColor: "hover:border-blue-500",
      description:
        language === "pt"
          ? "Conecte-se profissionalmente"
          : "Professional networking",
    },
    {
      name: "GitHub",
      value: "@Arthurtelees",
      href: "https://github.com/Arthurtelees",
      icon: "💻",
      color: "from-gray-700 to-pink-600",
      borderColor: "hover:border-pink-500",
      description:
        language === "pt"
          ? "Veja meus projetos e contribuições"
          : "Check my projects and contributions",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contato"
      className={`py-20 bg-black text-white transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-4 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500">
          {language === "pt"
            ? "Vamos Trabalhar Juntos!"
            : "Let's Work Together!"}
        </h2>

        <p className="text-center text-gray-300 text-lg mb-16 max-w-2xl mx-auto">
          {language === "pt"
            ? "Pronto para transformar suas ideias em realidade? Escolha a melhor forma de entrar em contato comigo."
            : "Ready to turn your ideas into reality? Choose the best way to get in touch with me."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {contacts.map((contact, index) => (
            <a
              key={contact.name}
              href={contact.href}
              target={contact.name !== "Email" ? "_blank" : "_self"}
              rel={contact.name !== "Email" ? "noopener noreferrer" : ""}
              className={`group p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${contact.borderColor} hover:border-2`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-r ${contact.color} flex items-center justify-center text-xl transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {contact.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    {contact.name}
                  </h3>
                  <p className="text-lg font-semibold text-gray-200 mb-1">
                    {contact.value}
                  </p>
                  <p className="text-sm text-gray-400">{contact.description}</p>
                </div>

                <div className="text-gray-400 group-hover:text-purple-400 transform group-hover:translate-x-1 transition-all duration-300">
                  →
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
          ))}
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900/30 via-black to-indigo-900/30 border border-purple-500/30 shadow-2xl shadow-purple-500/20">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
              {language === "pt"
                ? "Pronto para Iniciar seu Próximo Projeto?"
                : "Ready to Start Your Next Project?"}
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              {language === "pt"
                ? "Seja um site incrível, uma aplicação web complexa ou uma solução inovadora, estou aqui para ajudar. Vamos conversar sobre como posso contribuir para o sucesso do seu projeto com soluções tecnológicas de ponta."
                : "Whether it's an amazing website, a complex web application or an innovative solution, I'm here to help. Let's talk about how I can contribute to your project's success with cutting-edge technological solutions."}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a
                href="mailto:arthurnunesteles@gmail.com"
                className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                {language === "pt" ? "Enviar Email" : "Send Email"}
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=5561984212571"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-xl font-semibold border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all transform hover:scale-105"
              >
                {language === "pt" ? "Iniciar conversa" : "Start Chat"}
              </a>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
