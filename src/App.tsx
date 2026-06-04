import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import ParticlesBackground from "./components/ParticlesBackground";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Profiles from "./sections/Profiles";
import Resume from "./sections/Resume";
import Social from "./sections/Social";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // Scroll Spy to set active navbar indicators based on intersection
    const sections = ["hero", "about", "skills", "projects", "profiles", "resume", "social", "contact"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <div key="portfolio-workspace" className="relative w-full min-h-screen bg-[#020202] text-white">
            
            {/* Sticky Navigation Bar */}
            <Navbar activeSection={activeSection} />

            {/* Futuristic Interlocking Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
              {/* Particle System Canvas */}
              <ParticlesBackground />
              
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(120,120,120,0.16),transparent_35%),linear-gradient(180deg,#020202,#0b0b0d_42%,#030303)]"></div>
              <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:72px_72px]"></div>
            </div>

            {/* Main Web Page Content */}
            <main className="relative z-10">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Profiles />
              <Resume />
              <Social />
              <Contact />
            </main>

            {/* Footer console */}
            <Footer />
            
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
