import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "profiles", label: "Coding" },
    { id: "resume", label: "CV" },
    { id: "social", label: "Social" },
    { id: "contact", label: "Contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled 
          ? "bg-black/85 backdrop-blur-md py-4 border-b border-white/10" 
          : "bg-transparent py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => scrollToSection("hero")}
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-white to-neutral-500 flex items-center justify-center font-display font-extrabold text-black group-hover:scale-105 transition-transform duration-200">
            R
          </span>
          <span className="font-display font-bold tracking-wider text-sm hidden sm:inline-block">
            RAJA R <span className="text-neutral-400 font-light">.DEV</span>
          </span>
        </div>

        {/* DESKTOP NAV ITEMS */}
        <nav className="hidden lg:flex items-center gap-8 bg-white/5 py-1.5 px-6 rounded-full border border-white/5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-xs font-mono tracking-wider transition-colors duration-200 relative py-1 ${
                activeSection === item.id 
                  ? "text-white" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span 
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-white"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <div className="hidden sm:block">
          <button
            onClick={() => scrollToSection("contact")}
            className="flex items-center gap-1.5 bg-white hover:bg-neutral-300 text-black px-5 py-2 rounded-full font-mono text-xs font-bold border border-white/20 hover:shadow-[0_0_18px_rgba(255,255,255,0.25)] transition-all duration-200 cursor-pointer"
          >
            Hire Me
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* MOBILE BURGER MENU */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* MOBILE MENUS */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-[69px] left-0 w-full h-[calc(100vh-69px)] bg-black z-30 flex flex-col p-8 lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-6 items-start mt-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-2xl font-display font-medium tracking-wide text-left w-full border-b border-white/5 pb-3 ${
                    activeSection === item.id ? "text-white" : "text-slate-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollToSection("contact")}
              className="mt-auto w-full py-4 bg-white text-black font-mono font-bold text-center rounded-xl flex items-center justify-center gap-2 border border-white/25 shadow-lg"
            >
              Hire Me
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
