import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Server, Layout, ShieldAlert, Zap } from "lucide-react";
import { skillsData, Skill } from "../constants/portfolioData";

type CategoryType = 'languages' | 'frontend' | 'backend' | 'devops' | 'aiml';

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

function AlgorithmEngineIllustration() {
  const { ref, tilt } = useMouseTilt(8);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Content for the visualizer console
  const consoleContent: Record<string, { title: string; code: string; complexity: string }> = {
    "array-string-window": {
      title: "ARRAY, STRING & SLIDING WINDOW",
      code: `// Finding longest substring without repeating chars
let left = 0, maxLen = 0;
const charMap = new Map();
for (let right = 0; right < s.length; right++) {
  if (charMap.has(s[right])) {
    left = Math.max(charMap.get(s[right]) + 1, left);
  }
  charMap.set(s[right], right);
  maxLen = Math.max(maxLen, right - left + 1);
}`,
      complexity: "Time: O(N) | Space: O(min(A, N))"
    },
    "binary-search": {
      title: "BINARY SEARCH (DIVIDE & CONQUER)",
      code: `// Binary Search in sorted array
let low = 0, high = arr.length - 1;
while (low <= high) {
  const mid = Math.floor((low + high) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) low = mid + 1;
  else high = mid - 1;
}
return -1;`,
      complexity: "Time: O(log N) | Space: O(1)"
    },
    "stack": {
      title: "STACK STRUCTURE (LIFO)",
      code: `// Stack Last-In-First-Out operations
const stack = [];
stack.push("S1"); // Insert
stack.push("S2"); // Insert
const val = stack.pop(); // Remove "S2"
const top = stack[stack.length - 1]; // Peek`,
      complexity: "Push/Pop: O(1) | Space: O(N)"
    },
    "queue": {
      title: "QUEUE STRUCTURE (FIFO)",
      code: `// Queue First-In-First-Out operations
const queue = [];
queue.push("Q1"); // Enqueue (rear)
queue.push("Q2"); // Enqueue
const front = queue.shift(); // Dequeue (front: "Q1")`,
      complexity: "Enqueue/Dequeue: O(1) | Space: O(N)"
    },
    "trie": {
      title: "PREFIX TRIE (SPELLS RAJA / SECE)",
      code: `// Word prefix search
class TrieNode {
  children = {};
  isWord = false;
}
function insert(word) {
  let curr = root;
  for (const char of word) {
    if (!curr.children[char]) curr.children[char] = new TrieNode();
    curr = curr.children[char];
  }
  curr.isWord = true;
}`,
      complexity: "Insert/Search: O(L) | Space: O(ALPHABET * N)"
    },
    "recursion": {
      title: "RECURSION FUNCTION (CALL STACK)",
      code: `// Divide and Conquer (e.g. Fibonacci)
function fib(n) {
  if (n <= 1) return n; // Base case
  // Recursive branching
  return fib(n - 1) + fib(n - 2);
}`,
      complexity: "Time: O(2^N) | Space: O(N) Call Stack"
    },
    "dp": {
      title: "DYNAMIC PROGRAMMING (MEMOIZATION)",
      code: `// Bottom-up DP (Fibers / Grid Transitions)
const dp = Array(n + 1).fill(0);
dp[1] = 1;
for (let i = 2; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}
return dp[n];`,
      complexity: "Time: O(N) | Space: O(N) [Optimizable to O(1)]"
    },
    "graph": {
      title: "GRAPH NETWORK TRAVERSAL",
      code: `// Breadth-First Search (BFS) using Queue
const visited = new Set([start]);
const queue = [start];
while (queue.length > 0) {
  const curr = queue.shift();
  for (const neighbor of adjList[curr]) {
    if (!visited.has(neighbor)) {
      visited.add(neighbor);
      queue.push(neighbor);
    }
  }
}`,
      complexity: "Time: O(V + E) | Space: O(V + E)"
    }
  };

  const defaultContent = {
    title: "ALGORITHM ENGINE // PROBLEM SOLVING PIPELINE",
    code: `// Hover over any submodule in the interactive schematic above
// to compile and inspect its data structure & algorithm details.
const engine = { status: "ACTIVE", dev: "RAJA R", speed: "O(log N)" };
console.log(engine);`,
    complexity: "System Status: ONLINE"
  };

  const active = consoleContent[hoveredSection || ""] || defaultContent;

  return (
    <div ref={ref} className="relative w-full flex flex-col items-center gap-6 select-none" style={{ perspective: 900 }}>
      {/* Outer Card with glassmorphism */}
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full max-w-[560px] bg-white/[0.02] border border-white/10 rounded-2xl p-4 shadow-2xl relative overflow-hidden backdrop-blur-md"
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Interactive SVG Diagram */}
        <div className="relative w-full aspect-square max-h-[440px] sm:max-h-[500px] flex items-center justify-center">
          <svg viewBox="0 0 460 400" className="w-full h-full text-white">
            <defs>
              <pattern id="grid-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
                <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" />
              </pattern>
              <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComponentTransfer in="blur" result="glow1">
                  <feFuncA type="linear" slope="0.7"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="glow1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" rx="12" />

            {/* Background connection lines (flow lines) */}
            <g opacity="0.3">
              <path d="M 100 65 L 230 65" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 310 65 L 340 180" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 60 190 L 60 290" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 190 190 L 190 290" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 330 250 L 330 290" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
            </g>

            {/* 1. ARRAY & STRING + SLIDING WINDOW */}
            <g
              transform="translate(20, 20)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredSection("array-string-window")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <rect width="170" height="90" rx="8" fill="rgba(255,255,255,0.01)" stroke={hoveredSection === "array-string-window" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.05)"} strokeWidth="1" />
              <text x="10" y="16" className="font-mono text-[8px] font-bold fill-slate-500">// 01_ARRAY_&_STRING</text>
              
              {/* Array items */}
              {["R","A","J","A","D","S"].map((char, i) => (
                <g key={i} transform={`translate(${12 + i * 24}, 30)`}>
                  <rect width="20" height="20" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <text x="10" y="14" className="font-mono text-[9px] font-bold fill-slate-300 text-center" textAnchor="middle">{char}</text>
                  <text x="10" y="-4" className="font-mono text-[6px] fill-slate-600 text-center" textAnchor="middle">{i}</text>
                </g>
              ))}

              {/* Sliding Window */}
              <motion.rect
                y="27"
                width="70"
                height="26"
                rx="6"
                fill="rgba(255,255,255,0.04)"
                stroke="#ffffff"
                strokeWidth="1.5"
                filter="url(#glow-effect)"
                animate={{ x: [10, 82, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.text
                y="68"
                className="font-mono text-[7px] font-bold fill-white"
                animate={{ x: [26, 98, 26] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                sliding_window
              </motion.text>
            </g>

            {/* 2. BINARY SEARCH */}
            <g
              transform="translate(260, 20)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredSection("binary-search")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <rect width="170" height="90" rx="8" fill="rgba(255,255,255,0.01)" stroke={hoveredSection === "binary-search" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.05)"} strokeWidth="1" />
              <text x="10" y="16" className="font-mono text-[8px] font-bold fill-slate-500">// 02_BINARY_SEARCH</text>

              {/* Sorted Array items */}
              {[2, 5, 8, 12, 19, 27].map((num, i) => (
                <g key={i} transform={`translate(${12 + i * 24}, 30)`}>
                  <rect width="20" height="20" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <text x="10" y="14" className="font-mono text-[8px] font-bold fill-slate-300 text-center" textAnchor="middle">{num}</text>
                </g>
              ))}

              {/* Pointers L, M, H */}
              {/* L */}
              <motion.g
                animate={{ x: [0, 72, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M 22 68 L 22 55" stroke="#ffffff" strokeWidth="1" />
                <text x="22" y="76" className="font-mono text-[8px] fill-white text-center" textAnchor="middle">L</text>
              </motion.g>

              {/* M */}
              <motion.g
                animate={{ x: [72, 96, 72] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M 22 68 L 22 55" stroke="#888888" strokeWidth="1" />
                <text x="22" y="76" className="font-mono text-[8px] fill-neutral-400 text-center" textAnchor="middle">M</text>
              </motion.g>

              {/* H */}
              <motion.g
                animate={{ x: [120, 120, 120] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M 22 68 L 22 55" stroke="#ffffff" strokeWidth="1" />
                <text x="22" y="76" className="font-mono text-[8px] fill-white text-center" textAnchor="middle">H</text>
              </motion.g>
            </g>

            {/* 3. STACK */}
            <g
              transform="translate(20, 130)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredSection("stack")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <rect width="90" height="110" rx="8" fill="rgba(255,255,255,0.01)" stroke={hoveredSection === "stack" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.05)"} strokeWidth="1" />
              <text x="10" y="16" className="font-mono text-[7px] font-bold fill-slate-500">// 03_STACK_LIFO</text>

              {/* Bucket shape */}
              <path d="M 25 30 L 25 90 L 65 90 L 65 30" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

              {/* Stack items */}
              <rect x="29" y="76" width="32" height="10" rx="2" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
              <text x="45" y="84" className="font-mono text-[7px] fill-slate-400 text-center" textAnchor="middle">S1</text>

              <rect x="29" y="62" width="32" height="10" rx="2" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
              <text x="45" y="70" className="font-mono text-[7px] fill-slate-400 text-center" textAnchor="middle">S2</text>

              {/* Animated Push/Pop item */}
              <motion.g
                animate={{ y: [0, -32, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <rect x="29" y="48" width="32" height="10" rx="2" fill="rgba(255,255,255,0.4)" stroke="#ffffff" strokeWidth="0.8" filter="url(#glow-effect)" />
                <text x="45" y="56" className="font-mono text-[7px] fill-white text-center font-bold" textAnchor="middle">S3</text>
              </motion.g>

              {/* Direction Indicator */}
              <motion.path
                d="M 45 18 L 45 28"
                stroke="#fff"
                strokeWidth="0.8"
                fill="none"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </g>

            {/* 4. QUEUE */}
            <g
              transform="translate(130, 130)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredSection("queue")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <rect width="110" height="110" rx="8" fill="rgba(255,255,255,0.01)" stroke={hoveredSection === "queue" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.05)"} strokeWidth="1" />
              <text x="10" y="16" className="font-mono text-[7px] font-bold fill-slate-500">// 04_QUEUE_FIFO</text>

              {/* Tube structure */}
              <line x1="15" y1="42" x2="95" y2="42" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
              <line x1="15" y1="68" x2="95" y2="68" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

              {/* Queue items flow */}
              <g style={{ clipPath: "polygon(15px 0px, 95px 0px, 95px 100px, 15px 100px)" }}>
                {[0, 1, 2, 3].map((val, idx) => (
                  <motion.g
                    key={idx}
                    animate={{ x: [-24, 76] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: idx * -1 }}
                  >
                    <rect x="20" y="46" width="18" height="18" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    <text x="29" y="58" className="font-mono text-[7px] fill-slate-400 text-center" textAnchor="middle">Q{val}</text>
                  </motion.g>
                ))}
              </g>

              {/* In/Out labels */}
              <text x="10" y="84" className="font-mono text-[6px] fill-slate-500">out (front)</text>
              <text x="75" y="84" className="font-mono text-[6px] fill-slate-500">in (rear)</text>
            </g>

            {/* 5. PREFIX TRIE */}
            <g
              transform="translate(260, 130)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredSection("trie")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <rect width="170" height="110" rx="8" fill="rgba(255,255,255,0.01)" stroke={hoveredSection === "trie" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.05)"} strokeWidth="1" />
              <text x="10" y="16" className="font-mono text-[7px] font-bold fill-slate-500">// 05_PREFIX_TRIE (RAJA / SECE)</text>

              {/* Nodes and Links */}
              <g transform="translate(10, 12)" stroke="rgba(255,255,255,0.1)" strokeWidth="1">
                {/* Lines */}
                <line x1="75" y1="20" x2="45" y2="42" />
                <line x1="75" y1="20" x2="105" y2="42" />
                
                <line x1="45" y1="42" x2="30" y2="64" />
                <line x1="30" y1="64" x2="30" y2="86" />

                <line x1="105" y1="42" x2="120" y2="64" />
                <line x1="120" y1="64" x2="120" y2="86" />

                {/* Node Circles & Text */}
                <circle cx="75" cy="20" r="5" fill="#444" />
                <circle cx="75" cy="20" r="2.5" fill="#888" />
                
                {/* Left Branch (RAJA) */}
                <circle cx="45" cy="42" r="7" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                <text x="45" y="45" className="font-mono text-[7px] font-bold fill-slate-400 text-center" textAnchor="middle">R</text>

                <circle cx="30" cy="64" r="7" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                <text x="30" y="67" className="font-mono text-[7px] font-bold fill-slate-400 text-center" textAnchor="middle">A</text>

                <circle cx="30" cy="86" r="7" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeWidth="0.8" />
                <text x="30" y="89" className="font-mono text-[7px] font-bold fill-white text-center" textAnchor="middle">J</text>

                {/* Right Branch (SECE) */}
                <circle cx="105" cy="42" r="7" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                <text x="105" y="45" className="font-mono text-[7px] font-bold fill-slate-400 text-center" textAnchor="middle">S</text>

                <circle cx="120" cy="64" r="7" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                <text x="120" y="67" className="font-mono text-[7px] font-bold fill-slate-400 text-center" textAnchor="middle">E</text>

                <circle cx="120" cy="86" r="7" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeWidth="0.8" />
                <text x="120" y="89" className="font-mono text-[7px] font-bold fill-white text-center" textAnchor="middle">C</text>

                {/* Glowing Search Path Particle */}
                <motion.circle
                  r="3.5"
                  fill="#ffffff"
                  filter="url(#glow-effect)"
                  animate={{
                    cx: [75, 45, 30, 30, 75, 105, 120, 120, 75],
                    cy: [20, 42, 64, 86, 20, 42, 64, 86, 20],
                    opacity: [0, 1, 1, 1, 0, 1, 1, 1, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </g>
            </g>

            {/* 6. RECURSION CALL TREE */}
            <g
              transform="translate(20, 260)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredSection("recursion")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <rect width="130" height="120" rx="8" fill="rgba(255,255,255,0.01)" stroke={hoveredSection === "recursion" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.05)"} strokeWidth="1" />
              <text x="10" y="16" className="font-mono text-[7px] font-bold fill-slate-500">// 06_RECURSION</text>

              {/* Recursive call tree nodes */}
              <g transform="translate(0, 12)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8">
                <line x1="65" y1="25" x2="35" y2="52" />
                <line x1="65" y1="25" x2="95" y2="52" />
                <line x1="35" y1="52" x2="20" y2="78" />
                <line x1="35" y1="52" x2="50" y2="78" />

                {/* Nodes */}
                <circle cx="65" cy="25" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                <text x="65" y="28" className="font-mono text-[6px] fill-slate-300 text-center" textAnchor="middle">f(3)</text>

                <circle cx="35" cy="52" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                <text x="35" y="55" className="font-mono text-[6px] fill-slate-300 text-center" textAnchor="middle">f(2)</text>

                <circle cx="95" cy="52" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                <text x="95" y="55" className="font-mono text-[6px] fill-slate-300 text-center" textAnchor="middle">f(1)</text>

                <circle cx="20" cy="78" r="9" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeWidth="0.8" />
                <text x="20" y="81" className="font-mono text-[6px] fill-white text-center font-bold" textAnchor="middle">f(1)</text>

                <circle cx="50" cy="78" r="9" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeWidth="0.8" />
                <text x="50" y="81" className="font-mono text-[6px] fill-white text-center font-bold" textAnchor="middle">f(0)</text>

                {/* Flow particles */}
                <motion.circle
                  r="2"
                  fill="#ffffff"
                  filter="url(#glow-effect)"
                  animate={{
                    cx: [65, 35, 20, 35, 50, 35, 65, 95, 65],
                    cy: [25, 52, 78, 52, 78, 52, 25, 52, 25],
                    opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0]
                  }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </g>
            </g>

            {/* 7. DYNAMIC PROGRAMMING TABLE */}
            <g
              transform="translate(160, 260)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredSection("dp")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <rect width="130" height="120" rx="8" fill="rgba(255,255,255,0.01)" stroke={hoveredSection === "dp" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.05)"} strokeWidth="1" />
              <text x="10" y="16" className="font-mono text-[7px] font-bold fill-slate-500">// 07_DP_TABLE</text>

              {/* Memoization grid */}
              <g transform="translate(15, 26)">
                {Array.from({ length: 3 }).map((_, r) =>
                  Array.from({ length: 3 }).map((_, c) => {
                    const values = [[1, 1, 1], [1, 2, 3], [1, 3, 6]];
                    const delay = (r + c) * 0.4;
                    return (
                      <g key={`${r}-${c}`} transform={`translate(${c * 28}, ${r * 22})`}>
                        <motion.rect
                          width="24"
                          height="18"
                          rx="2"
                          fill="rgba(255,255,255,0.03)"
                          stroke="rgba(255,255,255,0.15)"
                          strokeWidth="0.8"
                          animate={{ 
                            stroke: ["rgba(255,255,255,0.15)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.15)"],
                            fill: ["rgba(255,255,255,0.03)", "rgba(255,255,255,0.12)", "rgba(255,255,255,0.03)"]
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay }}
                        />
                        <text x="12" y="12" className="font-mono text-[8px] font-bold fill-slate-300 text-center" textAnchor="middle">{values[r][c]}</text>
                      </g>
                    );
                  })
                )}

                {/* Memoization arrows */}
                <path d="M 26 35 L 36 35" stroke="#fff" strokeWidth="0.8" fill="none" />
                <path d="M 40 20 L 40 30" stroke="#fff" strokeWidth="0.8" fill="none" />
              </g>
            </g>

            {/* 8. GRAPH NETWORK */}
            <g
              transform="translate(300, 260)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredSection("graph")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <rect width="140" height="120" rx="8" fill="rgba(255,255,255,0.01)" stroke={hoveredSection === "graph" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.05)"} strokeWidth="1" />
              <text x="10" y="16" className="font-mono text-[7px] font-bold fill-slate-500">// 08_GRAPH_NETWORK</text>

              {/* Nodes and Links */}
              <g transform="translate(10, 10)">
                <line x1="60" y1="28" x2="30" y2="58" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                <line x1="60" y1="28" x2="90" y2="58" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                <line x1="30" y1="58" x2="60" y2="88" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                <line x1="90" y1="58" x2="60" y2="88" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                <line x1="30" y1="58" x2="90" y2="58" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Nodes */}
                <circle cx="60" cy="28" r="6" fill="#1e1e1e" stroke="#fff" strokeWidth="0.8" />
                <text x="60" y="30" className="font-mono text-[5px] fill-white text-center" textAnchor="middle">A</text>

                <circle cx="30" cy="58" r="6" fill="#1e1e1e" stroke="#fff" strokeWidth="0.8" />
                <text x="30" y="60" className="font-mono text-[5px] fill-white text-center" textAnchor="middle">B</text>

                <circle cx="90" cy="58" r="6" fill="#1e1e1e" stroke="#fff" strokeWidth="0.8" />
                <text x="90" y="60" className="font-mono text-[5px] fill-white text-center" textAnchor="middle">C</text>

                <circle cx="60" cy="88" r="6" fill="#1e1e1e" stroke="#fff" strokeWidth="0.8" />
                <text x="60" y="90" className="font-mono text-[5px] fill-white text-center" textAnchor="middle">D</text>

                {/* Traveling packet */}
                <motion.circle
                  r="3.5"
                  fill="#ffffff"
                  filter="url(#glow-effect)"
                  animate={{
                    cx: [60, 30, 60, 90, 60],
                    cy: [28, 58, 88, 58, 28]
                  }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
                />
              </g>
            </g>
          </svg>
        </div>
      </motion.div>

      {/* Code Console Panel */}
      <div className="w-full max-w-[560px] bg-black border border-white/10 rounded-xl p-5 shadow-2xl relative font-mono text-[10px] text-left leading-relaxed">
        <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
          <span className="text-[9px] font-bold text-slate-400 tracking-wider">CONSOLE_OUTPUT // STATUS: ONLINE</span>
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
        </div>
        
        {/* Module Title */}
        <div className="text-white font-bold mb-2 flex items-center gap-1.5">
          <span className="text-neutral-500">&gt;</span> {active.title}
        </div>

        {/* Code Snippet Box */}
        <pre className="text-neutral-300 whitespace-pre overflow-x-auto bg-white/[0.02] border border-white/5 rounded-lg p-3 max-h-[120px] mb-3 no-scrollbar scrollbar-none font-mono">
          {active.code}
        </pre>

        {/* Big-O Badges */}
        <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 bg-white/[0.01] border border-white/5 rounded-lg px-3 py-2">
          <span>COMPLEXITY:</span>
          <span className="text-white filter drop-shadow-[0_0_3px_rgba(255,255,255,0.4)]">{active.complexity}</span>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("languages");

  const categories: { id: CategoryType; label: string; icon: any }[] = [
    { id: "languages", label: "Languages", icon: Cpu },
    { id: "frontend", label: "Frontend", icon: Layout },
    { id: "backend", label: "Backend", icon: Server },
    { id: "devops", label: "Tools & DevOps", icon: ShieldAlert },
    { id: "aiml", label: "AI / ML & DSA", icon: Zap }
  ];

  const filteredSkills = skillsData.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="min-h-screen py-24 relative flex items-center justify-center border-t border-white/10 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(255,255,255,0.08),transparent_28%)]" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Skills panel */}
        <div className="lg:col-span-6 text-left">
          <div className="mb-2">
            <span className="font-mono text-xs text-neutral-400 uppercase font-bold tracking-widest">// COGNITIVE BASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold mb-8 tracking-tight">
            My <span className="text-white">Skills</span>
          </h2>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-medium border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-white/10 text-white border-white/40 shadow-[0_0_14px_rgba(255,255,255,0.12)]"
                      : "bg-white/5 text-slate-400 border-white/5 hover:border-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Skills list */}
          <div className="space-y-5 min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {filteredSkills.map((skill: Skill) => (
                  <div key={skill.name} className="glass-card rounded-xl p-5 border border-white/10 relative overflow-hidden group hover:border-white/30 transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: skill.color }} />
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-display font-bold text-sm text-white">{skill.name}</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300">
                        {skill.years}yr{skill.years !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed mb-4 font-mono truncate">{skill.details}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: skill.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-bold" style={{ color: skill.color }}>{skill.proficiency}%</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* DSA Algorithm Engine illustration */}
        <motion.div
          className="lg:col-span-6 flex items-center justify-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <AlgorithmEngineIllustration />
        </motion.div>
      </div>
    </section>
  );
}
