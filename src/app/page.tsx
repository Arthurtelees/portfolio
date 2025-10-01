import About from "./components/About/About";
import Hero from "./components/Hero/Hero";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Header from "./components/Header/Header";
import Contact from "./components/Contact/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Header />
      <Projects />
      <Contact />
    </main>
  );
}
