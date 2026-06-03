import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code2, Award } from "lucide-react";

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

function DeveloperIllustration() {
  const { ref, tilt } = useMouseTilt(12);

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center" style={{ perspective: 900 }}>
      <div className="absolute w-80 h-80 rounded-full opacity-10 blur-3xl bg-white" />

      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative flex flex-col items-center"
      >
        {/* Monitor */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative mb-1"
        >
          <div
            className="rounded-xl p-[2px]"
            style={{
              background: "linear-gradient(135deg,#333,#1a1a1a,#2a2a2a)",
              boxShadow: "0 0 35px rgba(255,255,255,0.06), 0 25px 50px rgba(0,0,0,0.85)"
            }}
          >
            <div className="rounded-lg bg-[#030303] overflow-hidden" style={{ width: 320, height: 210 }}>
              <div className="flex items-center gap-1.5 px-3 py-2.5 bg-[#0d0d0d]">
                <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
              </div>
              <div className="p-4 font-mono text-[10px] leading-6 space-y-0.5">
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }}>
                  <span className="text-slate-500">const </span>
                  <span className="text-white">developer</span>
                  <span className="text-slate-500"> = {"{"}</span>
                </motion.div>
                <div className="pl-3">
                  <span className="text-slate-400">name</span><span className="text-slate-500">: </span>
                  <span className="text-neutral-300">"Raja R"</span><span className="text-slate-500">,</span>
                </div>
                <div className="pl-3">
                  <span className="text-slate-400">college</span><span className="text-slate-500">: </span>
                  <span className="text-neutral-300">"SECE"</span><span className="text-slate-500">,</span>
                </div>
                <div className="pl-3">
                  <span className="text-slate-400">branch</span><span className="text-slate-500">: </span>
                  <span className="text-neutral-300">"CSE AIML"</span>
                </div>
                <div><span className="text-slate-500">{"}"}</span></div>
                <motion.div
                  className="flex items-center gap-1 mt-1.5 text-slate-500"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <span>&gt;</span>
                  <span className="w-[6px] h-[12px] bg-white/70 inline-block" />
                </motion.div>
              </div>
            </div>
          </div>
          <div className="mx-auto w-5 h-5 bg-[#1e1e1e]" style={{ clipPath: "polygon(25% 0,75% 0,85% 100%,15% 100%)" }} />
          <div className="mx-auto h-2.5 rounded-full bg-[#1e1e1e]" style={{ width: 80 }} />
        </motion.div>

        {/* Desk */}
        <div className="rounded-xl" style={{ width: 420, height: 16, background: "linear-gradient(180deg,#2a2a2a,#1a1a1a)", boxShadow: "0 5px 20px rgba(0,0,0,0.65)" }} />

        {/* Keyboard */}
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="mt-3.5 rounded-lg bg-[#141414] border border-white/5"
          style={{ width: 260, height: 72, padding: "8px 10px" }}
        >
          {[10, 9, 8].map((count, row) => (
            <div key={row} className="flex gap-1 mb-1.5">
              {Array.from({ length: count }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{ height: 12, backgroundColor: "#1e1e1e" }}
                  animate={{ backgroundColor: ["#1e1e1e", "#2e2e2e", "#1e1e1e"] }}
                  transition={{ duration: 0.15, delay: (row * count + i) * 0.08, repeat: Infinity, repeatDelay: 2 + Math.random() * 3 }}
                />
              ))}
            </div>
          ))}
        </motion.div>

        {/* Floating tech badges */}
        {[
          { label: "React.js", x: -160, y: -150, delay: 0 },
          { label: "Python", x: 155, y: -130, delay: 0.4 },
          { label: "MERN Stack", x: -170, y: 50, delay: 0.8 },
          { label: "ML / AI", x: 150, y: 80, delay: 1.2 },
        ].map(({ label, x, y, delay }) => (
          <motion.div
            key={label}
            className="absolute font-mono text-[9px] px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300 backdrop-blur-sm whitespace-nowrap"
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
            animate={{ y: [0, -5, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay }}
          >
            {label}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <section
      id="about"
      className="min-h-screen py-24 relative flex items-center justify-center border-t border-white/10 bg-[#080808]/80"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_28%,rgba(255,255,255,0.025))]" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Developer illustration */}
        <motion.div
          className="lg:col-span-6 h-[480px] sm:h-[580px] lg:h-[640px] order-2 lg:order-1"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <DeveloperIllustration />
        </motion.div>

        {/* About Content */}
        <motion.div
          className="lg:col-span-6 order-1 lg:order-2 text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="mb-2">
            <span className="font-mono text-xs text-neutral-400 uppercase font-bold tracking-widest">// IDENTITY SCAN</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-display font-extrabold mb-6 tracking-tight">
            About <span className="text-white">Me</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            I'm <strong className="text-white">Raja R</strong>, a B.E CSE (AI & ML) undergraduate at Sri Eshwar College of Engineering (CGPA: 7.8, 2024–2028). I'm passionate about building full-stack web applications, solving algorithmic challenges, and applying machine learning to real-world problems.
          </motion.p>

          <motion.p variants={itemVariants} className="text-slate-400 text-sm leading-relaxed mb-8">
            From MERN stack development to data science, I focus on writing clean, scalable code. I've interned as a MERN Stack Developer at Better Tomorrow and have competed in national-level hackathons including the Agentica 2.0 Hackathon at IIIT Sri City (Finalist, 2026).
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="glass-card rounded-xl p-5 text-left group">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4 border border-white/15 group-hover:bg-white/15 transition-all">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-bold text-sm text-white mb-1">Internship Experience</h3>
              <p className="font-mono text-[10px] text-neutral-300 mb-2">MERN STACK DEV · BETTER TOMORROW</p>
              <p className="text-slate-400 text-xs leading-relaxed">Built & deployed full-stack apps. Implemented auth, CRUD APIs, and AWS deployments.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card rounded-xl p-5 text-left group">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4 border border-white/15 group-hover:bg-white/15 transition-all">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-bold text-sm text-white mb-1">Academic Background</h3>
              <p className="font-mono text-[10px] text-neutral-300 mb-2">B.E CSE (AIML) · CGPA 7.8</p>
              <p className="text-slate-400 text-xs leading-relaxed">Sri Eshwar College of Engineering, 2024–2028. HSC: 79.66%.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card rounded-xl p-5 text-left group sm:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/15 group-hover:bg-white/15 transition-all">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white">Achievements</h3>
                  <p className="font-mono text-[10px] text-neutral-300">HACKATHONS · EVENTS · COMPETITIONS</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Runner-Up Creatathon 2025", "Finalist Agentica 2.0 IIIT Sri City 2026", "Paper Presentations × 3", "Web Design Competition"].map(t => (
                  <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300">{t}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
