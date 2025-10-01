"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

export default function About() {
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

  const renderHTML = (text: string) => {
    return { __html: text };
  };

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className={`py-20 bg-black text-white transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500">
            {language === "pt" ? "Sobre Mim" : "About Me"}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {language === "pt"
              ? "Saiba mais sobre minha carreira e serviços profissionais"
              : "Learn more about my career and professional services"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 rounded-2xl border border-purple-500/40 shadow-lg shadow-purple-800/30">
            <h3 className="text-2xl font-semibold mb-6 text-purple-400">
              {language === "pt" ? "Quem sou eu?" : "Who am I?"}
            </h3>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p
                dangerouslySetInnerHTML={renderHTML(
                  language === "pt"
                    ? "Sou <strong>Arthur Teles</strong>, formado em Tecnologia da Informação e pós-graduado em Java/PHP, Desenvolvedor Full Stack apaixonado por criar aplicações escaláveis e resolver problemas reais com tecnologia."
                    : "I'm <strong>Arthur Teles</strong>, graduated in Information Technology and post-graduated in Java/PHP, a Full Stack Developer passionate about creating scalable applications and solving real problems with technology."
                )}
              />

              <p
                dangerouslySetInnerHTML={renderHTML(
                  language === "pt"
                    ? "Tenho especialização em <strong>Python (Django/FastAPI)</strong>, <strong>React</strong> e arquiteturas modernas para web, transformando desafios complexos em soluções limpas, bem estruturadas e de fácil manutenção."
                    : "I specialize in <strong>Python (Django/FastAPI)</strong>, <strong>React</strong> and modern web architectures, transforming complex challenges into clean, well-structured and easy-to-maintain solutions."
                )}
              />

              <p className="text-indigo-300 font-medium">
                {language === "pt"
                  ? "Eu não apenas escrevo código; eu projeto sistemas que são fáceis de manter e prontos para crescer."
                  : "I don't just write code; I design systems that are easy to maintain and ready to grow."}
              </p>
            </div>
            <div className="text-center pt-4 border-t border-gray-800">
              <a
                href="/curriculo Arthur Teles atz.pdf"
                download="curriculo Arthur Teles atz.pdf"
                className="inline-block px-8 py-3 rounded-lg font-semibold tracking-wide bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:opacity-90 transition-all"
              >
                {language === "pt" ? "Download CV" : "Download CV"}
              </a>
              <p className="text-gray-400 text-sm mt-2">
                {language === "pt"
                  ? "Baixe meu currículo completo em PDF"
                  : "Download my complete resume in PDF"}
              </p>
            </div>
          </div>

          <div className="space-y-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 rounded-2xl border border-indigo-500/40 shadow-lg shadow-indigo-800/30">
            <h3 className="text-2xl font-semibold mb-6 text-indigo-400">
              {language === "pt" ? "O que eu faço?" : "What I do?"}
            </h3>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4 text-white">
                {language === "pt"
                  ? "Serviços de Backend & Frontend:"
                  : "Backend & Frontend Services:"}
              </h4>

              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400">⚡</span>
                  <span>
                    {language === "pt"
                      ? "Criação e manutenção de APIs RESTful escaláveis com Python"
                      : "Creation and maintenance of scalable RESTful APIs with Python"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400">⚙️</span>
                  <span>
                    {language === "pt"
                      ? "Automação de processos corporativos com ganhos de eficiência"
                      : "Automation of corporate processes with efficiency gains"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400">🗄️</span>
                  <span>
                    {language === "pt"
                      ? "Modelagem, otimização e integração de bancos de dados (SQL)"
                      : "Modeling, optimization and integration of databases (SQL)"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">🔗</span>
                  <span>
                    {language === "pt"
                      ? "Integração de sistemas internos aplicando metodologias ágeis"
                      : "Integration of internal systems applying agile methodologies"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400">💻</span>
                  <span>
                    {language === "pt"
                      ? "Desenvolvimento de interfaces modernas com React"
                      : "Development of modern interfaces with React"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-500">🐳</span>
                  <span>
                    {language === "pt"
                      ? "Deploy e containerização com Docker"
                      : "Deploy and containerization with Docker"}
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-purple-500/40 bg-gradient-to-br from-purple-900/20 to-black/50 shadow-lg shadow-purple-800/20">
              <h4 className="text-lg font-semibold mb-4 text-purple-400">
                {language === "pt"
                  ? "Destaques Profissionais:"
                  : "Professional Highlights:"}
              </h4>
              <p
                className="text-gray-300 text-sm leading-relaxed"
                dangerouslySetInnerHTML={renderHTML(
                  language === "pt"
                    ? "No <strong>Hospital Militar de Brasília</strong>, desenvolvi aplicações que <strong>automatizaram processos e resultaram em 43% de ganho em eficiência operacional</strong>, aplicando metodologias ágeis como Scrum, Kanban e XP."
                    : "At the <strong>Brasília Military Hospital</strong>, I developed applications that <strong>automated processes and resulted in a 43% gain in operational efficiency</strong>, applying agile methodologies like Scrum, Kanban and XP."
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
