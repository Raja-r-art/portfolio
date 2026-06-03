import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Terminal, GitCommit, Flame } from "lucide-react";
import { CodingProfile, codingProfilesData } from "../constants/portfolioData";

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

// ─── Individual DSA Mini-Visualizations ─────────────────────────────────────

function ArrayViz() {
  const vals = [3, 7, 1, 9, 4, 6];
  return (
    <svg viewBox="0 0 110 40" className="w-full h-full">
      {vals.map((v, i) => (
        <g key={i}>
          <rect x={4 + i * 17} y={8} width={14} height={14} rx={2}
            fill={i === 2 ? "#3a3a3a" : "#1e1e1e"} stroke={i === 2 ? "#aaa" : "#333"} strokeWidth="0.8" />
          <text x={11 + i * 17} y={18.5} textAnchor="middle" fontSize="6"
            fill={i === 2 ? "#fff" : "#888"} fontFamily="monospace">{v}</text>
          <text x={11 + i * 17} y={30} textAnchor="middle" fontSize="5"
            fill="#444" fontFamily="monospace">{i}</text>
        </g>
      ))}
    </svg>
  );
}

function StringViz() {
  const chars = ["D", "S", "A"];
  return (
    <svg viewBox="0 0 110 40" className="w-full h-full">
      {chars.map((c, i) => (
        <g key={i}>
          <rect x={20 + i * 24} y={6} width={20} height={20} rx={3}
            fill="#1e1e1e" stroke="#3a3a3a" strokeWidth="0.8" />
          <text x={30 + i * 24} y={19} textAnchor="middle" fontSize="9"
            fill="#d0d0d0" fontFamily="monospace" fontWeight="bold">{c}</text>
        </g>
      ))}
      <motion.rect x={20} y={6} width={20} height={20} rx={3}
        fill="none" stroke="#888" strokeWidth="1"
        animate={{ x: [20, 44, 68, 44, 20] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
    </svg>
  );
}

function SlidingWindowViz() {
  const vals = [2, 4, 1, 7, 3, 8];
  return (
    <svg viewBox="0 0 110 40" className="w-full h-full">
      {vals.map((v, i) => (
        <rect key={i} x={4 + i * 17} y={10} width={14} height={14} rx={2}
          fill="#1e1e1e" stroke="#2a2a2a" strokeWidth="0.8" />
      ))}
      {vals.map((v, i) => (
        <text key={i} x={11 + i * 17} y={20} textAnchor="middle" fontSize="6"
          fill="#777" fontFamily="monospace">{v}</text>
      ))}
      <motion.rect
        x={4} y={8} width={48} height={18} rx={3}
        fill="none" stroke="#aaa" strokeWidth="1.2" opacity={0.7}
        animate={{ x: [4, 21, 38, 21, 4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.text x={58} y={22} fontSize="5" fill="#666" fontFamily="monospace"
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
        window=3
      </motion.text>
    </svg>
  );
}

function StackViz() {
  const items = ["C", "B", "A"];
  return (
    <svg viewBox="0 0 110 52" className="w-full h-full">
      {items.map((v, i) => (
        <g key={i}>
          <rect x={30} y={4 + i * 14} width={50} height={12} rx={2}
            fill={i === 0 ? "#2e2e2e" : "#1a1a1a"} stroke={i === 0 ? "#888" : "#2a2a2a"} strokeWidth="0.8" />
          <text x={55} y={12.5 + i * 14} textAnchor="middle" fontSize="6"
            fill={i === 0 ? "#ccc" : "#666"} fontFamily="monospace">{v}</text>
        </g>
      ))}
      <motion.text x={88} y={11} fontSize="5.5" fill="#555" fontFamily="monospace"
        animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
        ← top
      </motion.text>
      <text x={55} y={50} textAnchor="middle" fontSize="5" fill="#333" fontFamily="monospace">LIFO</text>
    </svg>
  );
}

function QueueViz() {
  const items = ["P1", "P2", "P3"];
  return (
    <svg viewBox="0 0 110 45" className="w-full h-full">
      <text x={4} y={25} fontSize="5" fill="#444" fontFamily="monospace">IN→</text>
      {items.map((v, i) => (
        <g key={i}>
          <rect x={20 + i * 24} y={12} width={20} height={14} rx={2}
            fill="#1e1e1e" stroke={i === 0 ? "#888" : "#2a2a2a"} strokeWidth="0.8" />
          <text x={30 + i * 24} y={21.5} textAnchor="middle" fontSize="6"
            fill={i === 0 ? "#ccc" : "#666"} fontFamily="monospace">{v}</text>
        </g>
      ))}
      <text x={92} y={25} fontSize="5" fill="#444" fontFamily="monospace">→OUT</text>
      <motion.circle cx={20} cy={19} r={2} fill="#aaa"
        animate={{ cx: [20, 44, 68, 92] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
      <text x={55} y={40} textAnchor="middle" fontSize="5" fill="#333" fontFamily="monospace">FIFO</text>
    </svg>
  );
}

function BinarySearchViz() {
  const arr = [1, 3, 5, 7, 9, 11, 13];
  return (
    <svg viewBox="0 0 110 45" className="w-full h-full">
      {arr.map((v, i) => (
        <g key={i}>
          <rect x={3 + i * 15} y={8} width={12} height={12} rx={1.5}
            fill={i === 3 ? "#3a3a3a" : "#1a1a1a"}
            stroke={i === 3 ? "#ccc" : i === 0 || i === 6 ? "#555" : "#2a2a2a"}
            strokeWidth="0.8" />
          <text x={9 + i * 15} y={17} textAnchor="middle" fontSize="5.5"
            fill={i === 3 ? "#fff" : i === 0 || i === 6 ? "#888" : "#555"}
            fontFamily="monospace">{v}</text>
        </g>
      ))}
      <motion.line x1={57} y1={6} x2={57} y2={22} stroke="#aaa" strokeWidth="0.8"
        animate={{ x1: [57, 27, 42, 57], x2: [57, 27, 42, 57] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
      <text x={55} y={33} textAnchor="middle" fontSize="5" fill="#555" fontFamily="monospace">mid pointer</text>
      <text x={55} y={42} textAnchor="middle" fontSize="5" fill="#333" fontFamily="monospace">O(log n)</text>
    </svg>
  );
}

function GraphViz() {
  const nodes = [
    { cx: 30, cy: 18, label: "A" },
    { cx: 80, cy: 18, label: "B" },
    { cx: 55, cy: 38, label: "C" },
    { cx: 15, cy: 40, label: "D" },
    { cx: 95, cy: 40, label: "E" },
  ];
  const edges = [[0,1],[0,2],[1,2],[2,3],[2,4],[0,3]];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % nodes.length), 800);
    return () => clearInterval(id);
  }, []);
  return (
    <svg viewBox="0 0 110 52" className="w-full h-full">
      {edges.map(([a, b], i) => (
        <motion.line key={i} x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r={8}
            fill={i === active ? "#2e2e2e" : "#161616"}
            stroke={i === active ? "#ccc" : "#333"} strokeWidth="0.8" />
          <text x={n.cx} y={n.cy + 2.5} textAnchor="middle" fontSize="6"
            fill={i === active ? "#fff" : "#777"} fontFamily="monospace">{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

function TrieViz() {
  return (
    <svg viewBox="0 0 110 52" className="w-full h-full">
      {/* Root */}
      <circle cx={55} cy={8} r={6} fill="#222" stroke="#555" strokeWidth="0.8" />
      <text x={55} y={10.5} textAnchor="middle" fontSize="5.5" fill="#aaa" fontFamily="monospace">*</text>
      {/* Level 1 */}
      {[["D",25,24],["C",85,24]].map(([l,x,y]) => (
        <g key={l as string}>
          <line x1={55} y1={14} x2={x as number} y2={(y as number)-6} stroke="#333" strokeWidth="0.7" />
          <circle cx={x as number} cy={y as number} r={6} fill="#1e1e1e" stroke="#444" strokeWidth="0.8" />
          <text x={x as number} y={(y as number)+2.5} textAnchor="middle" fontSize="5.5" fill="#bbb" fontFamily="monospace">{l}</text>
        </g>
      ))}
      {/* Level 2 */}
      {[["S",12,40,"D",25,24],["A",38,40,"D",25,24],["O",72,40,"C",85,24],["++",98,40,"C",85,24]].map(([l,x,y,_pl,px,py]) => (
        <g key={`${l}`}>
          <line x1={px as number} y1={(py as number)+6} x2={x as number} y2={(y as number)-6} stroke="#2a2a2a" strokeWidth="0.7" />
          <circle cx={x as number} cy={y as number} r={6} fill="#161616" stroke="#333" strokeWidth="0.7" />
          <text x={x as number} y={(y as number)+2.5} textAnchor="middle" fontSize="4.5" fill="#888" fontFamily="monospace">{l}</text>
        </g>
      ))}
    </svg>
  );
}

function RecursionViz() {
  return (
    <svg viewBox="0 0 110 52" className="w-full h-full">
      {/* f(4) root */}
      <rect x={38} y={2} width={34} height={12} rx={2} fill="#222" stroke="#555" strokeWidth="0.7" />
      <text x={55} y={10.5} textAnchor="middle" fontSize="5.5" fill="#ccc" fontFamily="monospace">f(4)</text>
      {/* f(3) f(2) */}
      {[["f(3)",18,20],["f(2)",74,20]].map(([l,x,y]) => (
        <g key={l as string}>
          <line x1={55} y1={14} x2={(x as number)+17} y2={y as number} stroke="#333" strokeWidth="0.7" />
          <rect x={x as number} y={y as number} width={34} height={12} rx={2} fill="#1a1a1a" stroke="#444" strokeWidth="0.7" />
          <text x={(x as number)+17} y={(y as number)+8.5} textAnchor="middle" fontSize="5.5" fill="#aaa" fontFamily="monospace">{l}</text>
        </g>
      ))}
      {/* leaf nodes */}
      {[["f(2)",6,38,"f(3)",18,20],["f(1)",38,38,"f(3)",18,20],["f(1)",62,38,"f(2)",74,20],["f(0)",93,38,"f(2)",74,20]].map(([l,x,y,_,px,py]) => (
        <g key={`${l}${x}`}>
          <line x1={(px as number)+17} y1={(py as number)+12} x2={(x as number)+14} y2={y as number} stroke="#222" strokeWidth="0.6" />
          <rect x={x as number} y={y as number} width={28} height={10} rx={1.5} fill="#111" stroke="#2e2e2e" strokeWidth="0.6" />
          <text x={(x as number)+14} y={(y as number)+7.5} textAnchor="middle" fontSize="4.5" fill="#666" fontFamily="monospace">{l}</text>
        </g>
      ))}
      <motion.text x={55} y={52} textAnchor="middle" fontSize="4.5" fill="#444" fontFamily="monospace"
        animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }}>
        memoize →
      </motion.text>
    </svg>
  );
}

function DPViz() {
  const grid = [[0,0,0,0],[0,1,2,3],[0,1,3,4],[0,1,3,5]];
  const [step, setStep] = useState(0);
  const totalCells = 16;
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % totalCells), 400);
    return () => clearInterval(id);
  }, []);
  return (
    <svg viewBox="0 0 110 52" className="w-full h-full">
      <text x={4} y={8} fontSize="5" fill="#444" fontFamily="monospace">DP table</text>
      {grid.map((row, r) => row.map((v, c) => {
        const cellIdx = r * 4 + c;
        const isActive = cellIdx === step % totalCells;
        const isPast = cellIdx < step % totalCells;
        return (
          <g key={`${r}-${c}`}>
            <rect x={20 + c * 18} y={12 + r * 10} width={16} height={9} rx={1.5}
              fill={isActive ? "#2e2e2e" : isPast ? "#1e1e1e" : "#111"}
              stroke={isActive ? "#ccc" : isPast ? "#333" : "#222"} strokeWidth="0.7" />
            <text x={28 + c * 18} y={19 + r * 10} textAnchor="middle" fontSize="5.5"
              fill={isActive ? "#fff" : isPast ? "#888" : "#444"} fontFamily="monospace">{v}</text>
          </g>
        );
      }))}
      <text x={55} y={50} textAnchor="middle" fontSize="4.5" fill="#333" fontFamily="monospace">O(n²) space</text>
    </svg>
  );
}

// ─── DSA concept card layout ─────────────────────────────────────────────────
const DSA_CONCEPTS = [
  { label: "Array",          color: "#d6d6d6", Component: ArrayViz },
  { label: "String",         color: "#b8b8b8", Component: StringViz },
  { label: "Sliding Window", color: "#a0a0a0", Component: SlidingWindowViz },
  { label: "Stack",          color: "#c8c8c8", Component: StackViz },
  { label: "Queue",          color: "#a8a8a8", Component: QueueViz },
  { label: "Binary Search",  color: "#d0d0d0", Component: BinarySearchViz },
  { label: "Graph",          color: "#b0b0b0", Component: GraphViz },
  { label: "Trie",           color: "#909090", Component: TrieViz },
  { label: "Recursion / DP", color: "#c0c0c0", Component: RecursionViz },
  { label: "Dynamic Prog.",  color: "#aaaaaa", Component: DPViz },
];

function DSAVisualization() {
  const { ref, tilt } = useMouseTilt(14);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center" style={{ perspective: 1000 }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,255,255,0.05),transparent_65%)]" />

      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full max-w-[540px]"
      >
        {/* Title badge */}
        <div className="text-center mb-3">
          <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full bg-white/3">
            // DATA STRUCTURES & ALGORITHMS
          </span>
        </div>

        {/* 5×2 grid */}
        <div className="grid grid-cols-2 gap-2">
          {DSA_CONCEPTS.map(({ label, color, Component }, i) => (
            <motion.div
              key={label}
              className="relative rounded-xl border overflow-hidden cursor-default"
              style={{
                borderColor: hovered === i ? `${color}50` : "rgba(255,255,255,0.06)",
                background: hovered === i
                  ? `linear-gradient(135deg,${color}12,${color}04)`
                  : "rgba(255,255,255,0.02)",
                boxShadow: hovered === i ? `0 0 18px ${color}18` : "none",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            >
              {/* Color accent line */}
              <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg,${color}80,transparent)` }} />

              {/* Label */}
              <div className="px-2 pt-1.5 pb-0">
                <span className="font-mono text-[8px] font-bold tracking-wide" style={{ color }}>{label}</span>
              </div>

              {/* Visualization */}
              <div className="px-1 pb-1.5" style={{ height: 76 }}>
                <Component />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Profiles() {
  const [selectedProfile, setSelectedProfile] = useState<CodingProfile>(codingProfilesData[0]);

  const contributionGrid = Array.from({ length: 7 * 20 }).map(() => {
    const level = Math.floor(Math.random() * 4);
    return ["bg-neutral-900", "bg-neutral-700/70", "bg-neutral-500/80", "bg-white"][level];
  });

  return (
    <section id="profiles" className="min-h-screen py-24 relative flex items-center justify-center border-t border-white/10 bg-[#080808]/80">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_50%,rgba(255,255,255,0.08),transparent_30%)]" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* DSA visualization */}
        <motion.div
          className="lg:col-span-6 h-[600px] sm:h-[660px] lg:h-[700px]"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <DSAVisualization />
        </motion.div>

        {/* Profiles dashboard */}
        <div className="lg:col-span-6 text-left">
          <div className="mb-2">
            <span className="font-mono text-xs text-neutral-400 uppercase font-bold tracking-widest">// ALGORITHMIC METRICS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold mb-8 tracking-tight">
            Coding <span className="text-white">Profiles</span>
          </h2>

          {/* Profile selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {codingProfilesData.map((profile) => (
              <button
                key={profile.name}
                onClick={() => setSelectedProfile(profile)}
                className={`px-4 py-2 rounded-lg font-mono text-[10px] sm:text-xs font-bold border transition-all duration-200 cursor-pointer ${
                  selectedProfile.name === profile.name
                    ? "bg-white/10 text-white border-white/20"
                    : "bg-white/5 text-slate-400 border-white/5 hover:border-white/10 hover:text-white"
                }`}
              >
                {profile.name.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Terminal box */}
          <div className="terminal-window rounded-xl p-6 border border-white/10 relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/50" />
                <span className="w-3 h-3 rounded-full bg-neutral-500/50" />
                <span className="w-3 h-3 rounded-full bg-white/70" />
              </div>
              <span className="font-mono text-[10px] text-slate-500 flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-white" />
                CONSOLE: {selectedProfile.name.toLowerCase()}_stats.sh
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4 font-mono text-xs">
                <div><span className="text-slate-500 block mb-0.5">NET_PROVIDER:</span><span className="text-white font-bold">{selectedProfile.name}</span></div>
                <div><span className="text-slate-500 block mb-0.5">USER_NAME:</span><span className="text-white font-bold">@{selectedProfile.username}</span></div>
                <div><span className="text-slate-500 block mb-0.5">CURRENT_STANDING:</span><span className="text-white font-bold">{selectedProfile.rating}</span></div>
                <div><span className="text-slate-500 block mb-0.5">KEY_METRIC:</span><span className="text-slate-300 font-bold">{selectedProfile.stat}</span></div>
              </div>

              <div className="space-y-4">
                <span className="text-slate-500 font-mono text-xs block mb-1">ACTIVITY_LOG (PAST_90_DAYS)</span>
                <div className="gap-1 bg-[#090b21] p-3 rounded border border-white/5 max-w-full overflow-x-auto"
                  style={{ display: "grid", gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }}>
                  {contributionGrid.map((bgColor, i) => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-sm ${bgColor} transition-colors duration-300 hover:bg-white`} />
                  ))}
                </div>
                <div className="flex items-center gap-4 font-mono text-[10px] text-slate-400">
                  <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-neutral-300" />STREAK: Active</span>
                  <span className="flex items-center gap-1"><GitCommit className="w-3.5 h-3.5 text-white" />COMMITS: Regular</span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 mt-6 flex justify-end">
              <a href={selectedProfile.url} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-[10px] font-mono text-white hover:underline cursor-pointer">
                CONNECT_TO_NODE <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
