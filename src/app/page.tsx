import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      {/* Hero + seamless fade bridge (outside overflow:hidden) */}
      <div className="relative">
        <Hero />
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "280px",
            zIndex: 20,
            background:
              "linear-gradient(to bottom, transparent 0%, #050508 100%)",
          }}
        />
      </div>
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}

