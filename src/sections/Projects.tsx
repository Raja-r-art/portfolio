import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Activity, Mic, Users, Sun, Play } from "lucide-react";
import { Project, projectsData } from "../constants/portfolioData";
import { GithubIcon } from "../components/SocialIcons";

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

const getProjectLogo = (id: number, color: string) => {
  switch (id) {
    case 1: // Deep Fake Voice Detection
      return (
        <div className="flex flex-col items-center gap-1.5 my-auto w-full">
          {/* Dynamic waveform visualizer representing human voice & synthetic fraud detection */}
          <div className="flex items-end justify-center gap-1 h-9 w-full">
            <motion.div 
              className="w-1 h-3 rounded-full bg-emerald-400"
              animate={{ height: [8, 20, 8] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="w-1 h-6 rounded-full bg-emerald-500"
              animate={{ height: [12, 28, 12] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            {/* AI synthetic voice fake wave - pulsing warning color bar */}
            <motion.div 
              className="w-1 h-8 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"
              animate={{ height: [28, 10, 28], opacity: [1, 0.4, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
            <motion.div 
              className="w-1 h-5 rounded-full bg-emerald-400"
              animate={{ height: [10, 22, 10] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            />
            <motion.div 
              className="w-1 h-2 rounded-full bg-emerald-500"
              animate={{ height: [6, 14, 6] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
          </div>
          <div className="flex items-center gap-1 text-[7.5px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            ANTI_FRAUD
          </div>
        </div>
      );
    case 2: // Let's Socialize
      return (
        <div className="flex flex-col items-center justify-center my-auto w-full">
          <div className="relative p-1.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
            <Users className="w-7 h-7 text-neutral-300" style={{ color }} />
            {/* Pulsing connection nodes */}
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          </div>
          <span className="text-[7px] font-mono text-neutral-400 mt-1.5 uppercase tracking-wider">CONNECT_PEOPLE</span>
        </div>
      );
    case 3: // Vitamin D Deficiency
      return (
        <div className="flex flex-col items-center justify-center my-auto w-full">
          <div className="relative p-1.5 rounded-xl bg-white/5 border border-white/10">
            <Sun className="w-7 h-7 text-amber-400 animate-pulse" />
            <span className="absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full bg-black border border-white/10">
              <Activity className="w-2.5 h-2.5 text-emerald-400" />
            </span>
          </div>
          <span className="text-[7px] font-mono text-neutral-400 mt-1.5 uppercase tracking-wider">ML_PREDICT</span>
        </div>
      );
    case 4: // Movie Streaming Platform
      return (
        <div className="flex flex-col items-center justify-center my-auto w-full">
          <div className="relative p-1.5 rounded-xl bg-white/5 border border-white/10">
            <Play className="w-7 h-7 text-rose-500 fill-rose-500/20 translate-x-[1px]" />
          </div>
          <span className="text-[7px] font-mono text-neutral-400 mt-1.5 uppercase tracking-wider">MERN_STREAM</span>
        </div>
      );
    default:
      return null;
  }
};

function ProjectsVisual() {
  const { ref, tilt } = useMouseTilt(12);

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center" style={{ perspective: 900 }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.04),transparent_70%)]" />

      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        style={{ transformStyle: "preserve-3d", width: 540, height: 540 }}
        className="relative"
      >
        <div className="relative" style={{ width: 540, height: 540 }}>
          {/* Grid dots */}
          {Array.from({ length: 9 }).map((_, row) =>
            Array.from({ length: 9 }).map((_, col) => (
              <motion.div
                key={`${row}-${col}`}
                className="absolute w-1 h-1 rounded-full bg-white/20"
                style={{ left: col * 60 + (row % 2) * 30, top: row * 58 }}
                animate={{ opacity: [0.1, 0.45, 0.1] }}
                transition={{ duration: 2 + (row + col) * 0.25, repeat: Infinity, ease: "easeInOut", delay: (row + col) * 0.12 }}
              />
            ))
          )}

          {/* Project cards */}
          {projectsData.map((project, idx) => {
            const positions = [
              { left: 20,  top: 40  },
              { left: 320, top: 20  },
              { left: 45,  top: 310 },
              { left: 335, top: 320 },
            ];
            const sizes = [180, 160, 170, 155];
            const pos = positions[idx] || { left: 80, top: 80 };
            const size = sizes[idx] || 100;

            return (
              <motion.div
                key={project.id}
                className="absolute rounded-2xl border border-white/10 flex flex-col items-center justify-between p-3.5 overflow-hidden group"
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: size,
                  height: size,
                  background: `linear-gradient(135deg, ${project.color}14, ${project.color}04)`,
                  boxShadow: `0 8px 32px ${project.color}0a`,
                }}
                animate={{ y: [0, -10, 0], rotate: [0, idx % 2 === 0 ? 1.5 : -1.5, 0] }}
                transition={{ duration: 4.5 + idx * 0.6, repeat: Infinity, ease: "easeInOut", delay: idx * 0.6 }}
              >
                {/* Top accent line */}
                <div className="w-full h-[2px] rounded-full mb-1.5" style={{ backgroundColor: project.color, opacity: 0.6 }} />

                {/* Category chip */}
                <span className="font-mono text-[8px] text-slate-500 uppercase tracking-wide leading-none">{project.category.split("/")[0].trim()}</span>

                {/* Logo / visual representation */}
                {getProjectLogo(project.id, project.color)}

                {/* Title */}
                <p className="font-display font-bold text-white text-center leading-tight mt-1.5" style={{ fontSize: size < 160 ? 10 : 11 }}>
                  {project.title}
                </p>

                {/* Bottom glow */}
                <div className="absolute bottom-0 right-0 w-20 h-20 rounded-full blur-2xl z-[-1]" style={{ backgroundColor: project.color, opacity: 0.15 }} />
              </motion.div>
            );
          })}

          {/* Connection lines */}
          <svg className="absolute inset-0 pointer-events-none" width="540" height="540">
            {[
              [110, 130, 400, 100],
              [130, 395, 412.5, 397.5],
              [110, 130, 130, 395],
              [400, 100, 412.5, 397.5],
              [110, 130, 412.5, 397.5],
            ].map(([x1, y1, x2, y2], i) => (
              <motion.line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="1"
                strokeDasharray="4 4"
                animate={{ opacity: [0.3, 0.8, 0.3], strokeDashoffset: [0, -16] }}
                transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
              />
            ))}
          </svg>

          {/* Traveling particles */}
          {[0, 1, 2].map((i) => {
            const startPoints = [
              { x: 110, y: 130 },
              { x: 130, y: 395 },
              { x: 110, y: 130 }
            ];
            const endPoints = [
              { x: 400, y: 100 },
              { x: 412.5, y: 397.5 },
              { x: 130, y: 395 }
            ];
            const start = startPoints[i];
            const end = endPoints[i];
            return (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-white"
                style={{ transform: "translate(-50%, -50%)" }}
                animate={{
                  left: [start.x, end.x, start.x],
                  top: [start.y, end.y, start.y],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 3 + i * 0.8, repeat: Infinity, delay: i * 0.9, ease: "easeInOut" }}
              />
            );
          })}

          {/* Bottom label */}
          <motion.div
            className="absolute font-mono text-[9px] text-slate-600 text-center w-full"
            style={{ bottom: 0 }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            // DEPLOYED_PROJECTS
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="min-h-screen py-24 relative flex items-center justify-center border-t border-white/10 bg-[#080808]/80">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_58%,rgba(255,255,255,0.06),transparent_30%)]" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Projects Visual — same height class as About illustration */}
        <motion.div
          className="lg:col-span-6 h-[540px] sm:h-[620px] lg:h-[680px] order-2 lg:order-1 flex items-center justify-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <ProjectsVisual />
        </motion.div>

        {/* Projects list */}
        <div className="lg:col-span-6 order-1 lg:order-2 text-left">
          <div className="mb-2">
            <span className="font-mono text-xs text-neutral-400 uppercase font-bold tracking-widest">// DEPLOYED OBJECTIVES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold mb-8 tracking-tight">
            Featured <span className="text-white">Projects</span>
          </h2>

          <div className="space-y-4">
            {projectsData.map((project: Project, idx: number) => {
              const isHovered = hoveredIndex === idx;
              return (
                <motion.div
                  key={project.id}
                  className="glass-card rounded-xl p-6 border border-white/5 relative cursor-pointer group"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div
                    className="absolute top-0 left-0 w-[3px] h-full transition-transform origin-bottom duration-300"
                    style={{ backgroundColor: project.color, transform: isHovered ? "scaleY(1)" : "scaleY(0.3)" }}
                  />
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[10px] font-mono tracking-wider uppercase opacity-60 mb-1 block">{project.category}</span>
                      <h3 className="font-display font-bold text-base text-white group-hover:text-neutral-300 transition-colors">{project.title}</h3>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:border-white/30 transition-all" style={{ color: project.color }}>
                      <Activity className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300">{t}</span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>{project.metrics}</span>
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      VIEW_DETAILS <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-[#090b21] border border-white/10 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} transition={{ type: "spring", damping: 25 }}>
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"><X className="w-6 h-6" /></button>
              <div className="mb-4">
                <span className="font-mono text-[10px] tracking-wider uppercase text-neutral-300 font-bold block mb-1">{selectedProject.category}</span>
                <h3 className="font-display font-extrabold text-2xl text-white">{selectedProject.title}</h3>
              </div>
              <div className="w-full h-48 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center border border-white/5" style={{ background: `linear-gradient(135deg, ${selectedProject.color}22, ${selectedProject.color}05)` }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_20%,#090b21_90%)] z-10" />
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-300" />
                <div className="absolute z-20"><div className="font-mono text-xs font-bold text-white bg-black/60 px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-md"><span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />{selectedProject.metrics}</div></div>
              </div>
              <div className="space-y-4 mb-6">
                <h4 className="font-display font-bold text-sm text-white">Project Overview</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">{selectedProject.longDescription}</p>
              </div>
              <div className="mb-6">
                <h4 className="font-display font-bold text-sm text-white mb-3">Technologies Stack</h4>
                <div className="flex flex-wrap gap-2">{selectedProject.tech.map((t) => <span key={t} className="text-[10px] font-mono px-3 py-1 rounded bg-white/5 border border-white/5 text-slate-300">{t}</span>)}</div>
              </div>
              <div className="flex flex-wrap gap-4 border-t border-white/5 pt-6">
                <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-mono text-xs px-5 py-2.5 rounded-lg border border-white/10 transition-all cursor-pointer"><GithubIcon className="w-4 h-4" />GITHUB_REPOSITORY</a>
                <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white text-black font-mono text-xs font-bold px-5 py-2.5 rounded-lg transition-all hover:bg-neutral-300 cursor-pointer"><ExternalLink className="w-4 h-4" />LIVE_DEPLOYMENT</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
