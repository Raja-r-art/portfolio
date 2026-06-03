import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Terminal, Code2, Cpu } from "lucide-react";

const ROLES = ["Java Full Stack Developer", "Full Stack Engineer", "Software Engineer", "AI/ML Developer"];

function useMouseTilt(maxAngle = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setTilt({ x: py * -maxAngle, y: px * maxAngle });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [maxAngle]);
  return { ref, tilt };
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { ref: tiltRef, tilt } = useMouseTilt(8);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = isDeleting ? 45 : 90;

    timeoutRef.current = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, displayText.length + 1));
        if (displayText.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(current.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center justify-center pt-24 pb-12 overflow-hidden bg-black"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,200,200,0.12),transparent_60%)]" />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center">

        {/* Monitor mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full max-w-4xl mb-10"
          style={{ perspective: 1000 }}
        >
          {/* Monitor frame */}
          <motion.div
            ref={tiltRef}
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            style={{ transformStyle: "preserve-3d", maxWidth: 880 }}
            className="relative mx-auto"
          >
            {/* Screen outer bezel */}
            <div
              className="rounded-2xl p-[3px] relative"
              style={{
                background: "linear-gradient(135deg,#3a3a3a,#1a1a1a,#2e2e2e)",
                boxShadow: "0 0 0 1px #0f0f0f, 0 40px 80px rgba(0,0,0,0.9), 0 0 60px rgba(255,255,255,0.04)"
              }}
            >
              {/* Screen inner */}
              <div className="rounded-xl overflow-hidden bg-[#020202] relative" style={{ minHeight: 420 }}>
                {/* Menu bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#0d0d0d] border-b border-white/5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="ml-4 font-mono text-[10px] text-slate-500 flex items-center gap-1.5">
                    <Terminal className="w-3 h-3" /> raja-r@portfolio:~
                  </span>
                </div>

                {/* Screen content */}
                <div className="flex flex-col items-center justify-center py-20 px-8 relative">
                  {/* Scanlines effect */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.04]"
                    style={{
                      backgroundImage: "repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 4px)"
                    }}
                  />

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="font-mono text-xs text-slate-500 mb-4 tracking-widest uppercase"
                  >
                    &gt; Hi, I'm
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="font-sans font-extrabold mb-6 leading-none tracking-tight relative text-glow-primary"
                    style={{
                      fontSize: "clamp(3.5rem, 11vw, 6.2rem)",
                    }}
                  >
                    Raja R
                  </motion.h1>

                  <div className="flex items-center justify-center gap-2.5 font-sans text-base sm:text-xl font-semibold text-slate-300">
                    <span className="text-slate-500">//</span>
                    <span style={{ minWidth: 280, textAlign: "left" }} className="text-white">
                      {displayText}
                      <span className="inline-block w-[2px] h-[1.1em] bg-white ml-0.5 align-middle animate-pulse" />
                    </span>
                  </div>

                  {/* Bottom status bar */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-2 border-t border-white/5 bg-[#080808]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-mono text-[9px] text-slate-600">
                        <Cpu className="w-2.5 h-2.5" /> Java / Spring Boot
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[9px] text-slate-600">
                        <Code2 className="w-2.5 h-2.5" /> React / MERN
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-slate-600">v2.1.26</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Monitor stand neck */}
            <div className="mx-auto mt-0 w-10 h-10 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]" style={{ clipPath: "polygon(30% 0,70% 0,80% 100%,20% 100%)" }} />
            {/* Monitor base */}
            <div className="mx-auto h-3.5 rounded-full bg-gradient-to-r from-[#1a1a1a] via-[#2e2e2e] to-[#1a1a1a]" style={{ width: "42%" }} />
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-white text-black font-mono text-xs font-bold px-7 py-3 rounded-full hover:bg-neutral-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300 border border-white/30 cursor-pointer"
          >
            Explore Projects
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-black/60 text-white border border-white/20 hover:border-white/60 hover:bg-white/10 font-mono text-xs font-semibold px-7 py-3 rounded-full transition-all duration-300 cursor-pointer backdrop-blur-md"
          >
            Hire Me
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <motion.button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="flex flex-col items-center gap-2 text-[10px] font-mono text-slate-500 hover:text-white transition-colors cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          SCROLL_DOWN
          <ArrowDown className="w-3.5 h-3.5 text-white" />
        </motion.button>
      </div>
    </section>
  );
}
