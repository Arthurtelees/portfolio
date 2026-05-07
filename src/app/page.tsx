import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Skills />

      {/* Wave: dark (#050508) → white */}
      <div className="bg-[#050508]">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "90px" }}
          aria-hidden="true"
        >
          <path d="M0,90 C360,18 1080,18 1440,90 L1440,90 L0,90 Z" fill="white" />
        </svg>
      </div>

      <Projects />

      <div className="bg-white">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "90px" }}
          aria-hidden="true"
        >
          <path d="M0,90 C360,18 1080,18 1440,90 L1440,90 L0,90 Z" fill="#050508" />
        </svg>
      </div>

      <Contact />
    </main>
  );
}

