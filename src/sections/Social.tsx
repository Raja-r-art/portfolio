import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, ArrowUpRight } from "lucide-react";
import { socialLinksData, SocialLink } from "../constants/portfolioData";
import { GithubIcon, LinkedinIcon, InstagramIcon, YoutubeIcon, TwitterIcon } from "../components/SocialIcons";

const renderNodeIcon = (label: string, size: number) => {
  switch (label) {
    case "You":
      return (
        <text
          textAnchor="middle" dominantBaseline="middle"
          fontSize={size * 0.45}
          fill="white"
          fontFamily="sans-serif"
          fontWeight="bold"
          y={size * 0.55}
          x={size * 0.5}
        >
          You
        </text>
      );
    case "LI": // LinkedIn
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" rx="1" />
          <circle cx="4" cy="4" r="2" fill="currentColor" />
        </svg>
      );
    case "GH": // GitHub
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    case "IG": // Instagram
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "YT": // YouTube
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <polygon points="10 15 15 12 10 9" fill="currentColor" />
        </svg>
      );
    case "X": // Twitter/X
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      );
    case "CF": // Codeforces
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-white">
          <rect x="3" y="10" width="4" height="11" rx="1" />
          <rect x="10" y="3" width="4" height="18" rx="1" />
          <rect x="17" y="13" width="4" height="8" rx="1" />
        </svg>
      );
    case "LC": // LeetCode
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M8 6L2 12L8 18" />
          <path d="M16 6L22 12L16 18" />
          <path d="M14 4L10 20" />
        </svg>
      );
    default:
      return null;
  }
};

function SocialNetworkIllustration() {
  const nodes = [
    { x: 50, y: 50, size: 26, label: "You", delay: 0 },
    { x: 12, y: 22, size: 20, label: "LI", delay: 0.3 },
    { x: 88, y: 18, size: 19, label: "GH", delay: 0.6 },
    { x: 8,  y: 72, size: 18, label: "IG", delay: 0.9 },
    { x: 92, y: 75, size: 19, label: "YT", delay: 1.2 },
    { x: 48, y: 88, size: 17, label: "X", delay: 1.5 },
    { x: 26, y: 52, size: 16, label: "CF", delay: 1.8 },
    { x: 74, y: 48, size: 16, label: "LC", delay: 2.1 },
  ];

  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
    [1, 6], [2, 7], [3, 5], [4, 5],
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full max-w-[440px] h-[440px]">
        {/* Edges */}
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.5"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2 + i * 0.25, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const innerSize = node.size * 0.55;
          return (
            <g key={i}>
              {/* Outer pulse ring */}
              <motion.circle
                cx={node.x} cy={node.y} r={node.size * 0.8}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="0.5"
                animate={{ r: [node.size * 0.7, node.size * 1.1, node.size * 0.7], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
              />
              {/* Inner circle */}
              <motion.circle
                cx={node.x} cy={node.y} r={innerSize}
                fill={i === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}
                stroke={i === 0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)"}
                strokeWidth={i === 0 ? "0.8" : "0.5"}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
              />
              {/* SVG Icon Embedded */}
              <g transform={`translate(${node.x - innerSize * 0.55}, ${node.y - innerSize * 0.55})`}>
                {renderNodeIcon(node.label, innerSize * 1.1)}
              </g>
            </g>
          );
        })}

        {/* Traveling particles along edges */}
        {[0, 1, 2, 3].map((edgeIdx) => {
          const [a, b] = edges[edgeIdx];
          return (
            <motion.circle
              key={`p-${edgeIdx}`}
              r="0.8"
              fill="white"
              animate={{
                cx: [nodes[a].x, nodes[b].x, nodes[a].x],
                cy: [nodes[a].y, nodes[b].y, nodes[a].y],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: edgeIdx * 0.6,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default function Social() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const getIconComponent = (name: string) => {
    switch (name.toLowerCase()) {
      case "linkedin": return LinkedinIcon;
      case "github": return GithubIcon;
      case "instagram": return InstagramIcon;
      case "youtube": return YoutubeIcon;
      case "twitter/x": return TwitterIcon;
      default: return Globe;
    }
  };

  return (
    <section
      id="social"
      className="min-h-[70vh] py-20 relative flex items-center justify-center border-t border-white/10 bg-[#080808]/80"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_45%,rgba(255,255,255,0.08),transparent_28%)]" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Social links */}
        <div className="lg:col-span-7 text-left">
          <div className="mb-2">
            <span className="font-mono text-xs text-neutral-400 uppercase font-bold tracking-widest">// NEURAL NETWORKS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold mb-8 tracking-tight">
            Connect <span className="text-white">Socially</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {socialLinksData.map((social: SocialLink, idx: number) => {
              const Icon = getIconComponent(social.name);
              const isHovered = hoveredIdx === idx;

              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card rounded-xl p-5 border border-white/5 relative flex flex-col justify-between min-h-[120px] group transition-all duration-300"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    boxShadow: isHovered ? `0 8px 32px 0 ${social.color}15` : 'none'
                  }}
                >
                  <div
                    className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: social.color }}
                  />

                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/5 transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${social.color}15`,
                      color: social.color
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    <span className="font-display font-bold text-xs text-white">
                      {social.name}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Social network illustration */}
        <motion.div
          className="lg:col-span-5 h-[440px] sm:h-[520px] flex items-center justify-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <SocialNetworkIllustration />
        </motion.div>

      </div>
    </section>
  );
}
