import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Eye, CheckCircle, MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/SocialIcons";

function useMouseTilt(maxAngle = 8) {
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

function ResumePreview() {
  const { ref, tilt } = useMouseTilt(10);

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center" style={{ perspective: 900 }}>
      <div className="absolute w-64 h-96 rounded-xl opacity-8 blur-3xl bg-white/10" />

      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
          style={{ width: 310 }}
        >
          {/* Shadow */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black blur-xl opacity-60" style={{ width: 255, height: 30 }} />

          {/* Paper */}
          <div
            className="rounded-xl overflow-hidden relative"
            style={{
              background: "linear-gradient(160deg,#f8f3ea,#ede8dc)",
              boxShadow: "0 30px 70px rgba(0,0,0,0.85), 6px 0 18px rgba(0,0,0,0.3)",
              padding: "18px 16px",
            }}
          >
            {/* Header */}
            <div className="rounded-lg mb-3" style={{ background: "#1e1e1e", padding: "10px 12px" }}>
              <div style={{ fontSize: 12, color: "#fff", fontWeight: "bold", fontFamily: "monospace", marginBottom: 3 }}>RAJA R</div>
              <div className="flex gap-2.5 flex-wrap" style={{ fontSize: 7.5, color: "#888", fontFamily: "monospace" }}>
                <span>+91 9566932710</span>
                <span>·</span>
                <span>raja.r2024aiml@sece.ac.in</span>
              </div>
              <div className="flex gap-2.5 mt-1" style={{ fontSize: 7.5, color: "#666", fontFamily: "monospace" }}>
                <span>GitHub</span><span>·</span><span>LinkedIn</span>
              </div>
            </div>

            {/* EDUCATION */}
            <SectionBlock title="EDUCATION" accent="#aaa">
              <ResumeRow label="B.E CSE (AIML) · SECE" value="CGPA: 7.8" sub="2024–2028" />
              <ResumeRow label="HSC · JSR Hr. Sec. School" value="79.66%" sub="2023–2024" />
              <ResumeRow label="SSLC · JSR Hr. Sec. School" value="70.8%" sub="2021–2022" />
            </SectionBlock>

            <Divider />

            {/* INTERNSHIP */}
            <SectionBlock title="INTERNSHIP" accent="#aaa">
              <ResumeRow label="MERN Stack Dev · Better Tomorrow" value="Dec 2025–Jan 2026" />
              <BodyLine w={100} />
              <BodyLine w={85} />
            </SectionBlock>

            <Divider />

            {/* PROJECTS */}
            <SectionBlock title="PROJECTS" accent="#aaa">
              {["Deep Fake Voice Detection", "Let's Socialize", "Vitamin D Deficiency Pred.", "Movie Streaming (MERN)"].map((p, i) => (
                <div key={i} style={{ marginBottom: 4 }}>
                  <div style={{ height: 5.5, width: `${80 + (i % 2) * 10}%`, background: "#555", borderRadius: 1, marginBottom: 2 }} />
                  <BodyLine w={90} />
                </div>
              ))}
            </SectionBlock>

            <Divider />

            {/* SKILLS */}
            <SectionBlock title="SKILLS" accent="#aaa">
              <div className="flex flex-wrap gap-1">
                {["C","C++","Python","React","Node","MongoDB","AWS","ML","Git"].map((s, i) => (
                  <div key={i} style={{ height: 10, minWidth: 26, padding: "0 5px", background: "#ccc", borderRadius: 2, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 5.5, color: "#333", fontFamily: "monospace" }}>{s}</span>
                  </div>
                ))}
              </div>
            </SectionBlock>

            <Divider />

            {/* ACHIEVEMENTS */}
            <SectionBlock title="ACHIEVEMENTS" accent="#aaa">
              <BodyLine w={100} />
              <BodyLine w={88} />
              <BodyLine w={72} />
            </SectionBlock>

            {/* Corner fold */}
            <div className="absolute bottom-0 right-0" style={{ width: 0, height: 0, borderLeft: "24px solid transparent", borderBottom: "24px solid #ccc" }} />
          </div>

          {/* Floating badges */}
          {[
            { label: "PDF Ready", x: 170, y: 20, delay: 0 },
            { label: "ATS Optimized", x: -150, y: 100, delay: 0.8 },
            { label: "Updated 2026", x: 160, y: 200, delay: 1.5 },
          ].map(({ label, x, y, delay }) => (
            <motion.div
              key={label}
              className="absolute font-mono text-[8px] px-2 py-0.5 rounded-full border border-white/15 bg-black/80 text-slate-400 whitespace-nowrap"
              style={{ left: `calc(50% + ${x}px)`, top: y }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay }}
            >
              {label}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function SectionBlock({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ height: 7, width: 80, background: "#3a3a3a", borderRadius: 1.5, marginBottom: 5 }}>
        <span style={{ fontSize: 5.5, color: "#888", fontFamily: "monospace", paddingLeft: 3 }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 0.8, background: "#ddd", marginBottom: 6 }} />;
}

function ResumeRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, alignItems: "flex-start" }}>
      <div>
        <div style={{ height: 5.5, width: label.length * 3.8, maxWidth: 160, background: "#888", borderRadius: 1, marginBottom: 1 }} />
        {sub && <div style={{ height: 4, width: 55, background: "#bbb", borderRadius: 1 }} />}
      </div>
      <div style={{ height: 5, width: value.length * 3.4, maxWidth: 80, background: "#aaa", borderRadius: 1, flexShrink: 0 }} />
    </div>
  );
}

function BodyLine({ w }: { w: number }) {
  return <div style={{ height: 4, width: `${w}%`, background: "#ccc", borderRadius: 1, marginBottom: 2.5 }} />;
}

export default function Resume() {
  const [downloading, setDownloading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleDownload = () => {
    setDownloading(true);

    const resumeText = `==================================================
RAJA R - CURRICULUM VITAE
==================================================
Phone: +91 9566932710
Email: raja.r2024aiml@sece.ac.in
GitHub: https://github.com/Raja-r-art
LinkedIn: https://www.linkedin.com/in/raja-r-806b0a331
Address: Coimbatore, Tamil Nadu, India

--------------------------------------------------
ACADEMIC PROFILE
--------------------------------------------------
* B.E. Computer Science and Engineering (AI & ML)
  Sri Eshwar College of Engineering, Coimbatore (2024 - 2028)
  Current CGPA: 7.8
  
* Higher Secondary Certificate (HSC)
  JSR Hr. Sec. School (2023 - 2024)
  Percentage: 79.66%
  
* Secondary School Leaving Certificate (SSLC)
  JSR Hr. Sec. School (2021 - 2022)
  Percentage: 70.8%

--------------------------------------------------
PROFESSIONAL EXPERIENCE
--------------------------------------------------
* MERN Stack Developer Intern | Better Tomorrow
  Period: Dec 2025 - Jan 2026
  - Designed, built and deployed full-stack web applications using MongoDB, Express.js, React.js, and Node.js.
  - Implemented authentication, secure CRUD operations, and RESTful API endpoints.
  - Deployed microservices and frontend clients on AWS (EC2 & Amplify).
  - Actively leveraged Git and GitHub for version control and group reviews.

--------------------------------------------------
TECHNICAL PROJECTS
--------------------------------------------------
* Deep Fake Voice Detection (AI / Machine Learning)
  - Developed a machine learning model to classify AI-generated fake voices.
  - Extracted audio features like pitch and frequency pattern distributions.
  - Trained classification models on the ASVspoof dataset.
  - Technologies: Python, Scikit-learn, Audio Preprocessing, Librosa.

* Let's Socialize (Frontend / React)
  - Engineered a fully responsive social media application with posts, stories, and feed features.
  - Developed modular React components, state management hooks, and client-side routing.
  - Technologies: React.js, JavaScript, TailwindCSS, Bootstrap, JSON Server.

* Vitamin D Deficiency Prediction (Data Science / ML)
  - Formulated a classification model predicting Vitamin D deficiency levels.
  - Managed data cleansing, outliers processing, and custom feature engineering.
  - Technologies: Python, Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn.

* Movie Streaming Platform (Full Stack / MERN)
  - Programmed a comprehensive full-stack movie streaming interface.
  - Integrated secure JWT user authentication and structured relational MongoDB schemas.
  - Technologies: MongoDB, Express.js, React.js, Node.js, RESTful APIs, JWT.

--------------------------------------------------
TECHNICAL SKILLS
--------------------------------------------------
* Languages: C, C++, Python, Java, JavaScript
* Frontend: React.js, HTML5, CSS3, Bootstrap, TailwindCSS
* Backend & Database: Node.js, Express.js, MongoDB, RESTful APIs
* DevOps & Tools: Git, GitHub, AWS (EC2 / Amplify), VS Code, Figma
* AI & ML: Machine Learning, Pandas, NumPy, Matplotlib, Seaborn, DSA, OOPS

--------------------------------------------------
HONORS & ACHIEVEMENTS
--------------------------------------------------
* Runner-Up: Creatathon 2025 | Sri Eshwar College of Engineering
* Finalist: Agentica 2.0 Hackathon | IIIT Sri City (2026)
* Participant: Kalam Paper Presentation | Karpagam College of Engineering (2025)
* Participant: Hilaricas Web Design | Hindusthan CAS (2025)
* Participant: Fiestaa '25 Paper Presentation | KPR College of Engineering (2025)

--------------------------------------------------
CERTIFICATIONS
--------------------------------------------------
* C Programming Course (Hands-On) - SkillRack (2025)
* C++ Programming Course - SkillRack (2025)

==================================================
Generated on: ${new Date().toLocaleDateString()}
==================================================`;

    setTimeout(() => {
      // Create and trigger download
      const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Raja_R_CV.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloading(false);
      setCompleted(true);
      setTimeout(() => setCompleted(false), 3000);
    }, 1500);
  };

  return (
    <section id="resume" className="min-h-screen py-24 relative flex items-center justify-center border-t border-white/10 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(255,255,255,0.08),transparent_28%)]" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">

        {/* Resume content */}
        <div className="lg:col-span-7 text-left">
          <div className="mb-2">
            <span className="font-mono text-xs text-neutral-400 uppercase font-bold tracking-widest">// ARCHIVE DOCUMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold mb-6 tracking-tight">
            Curriculum <span className="text-white">Vitae</span>
          </h2>

          {/* Contact info strip */}
          <div className="glass-card rounded-xl p-4 border border-white/10 mb-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Phone className="w-3.5 h-3.5 text-slate-500" />+91 9566932710
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Mail className="w-3.5 h-3.5 text-slate-500" />raja.r2024aiml@sece.ac.in
            </div>
            <a href="https://github.com/Raja-r-art" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white transition-colors">
              <GithubIcon className="w-3.5 h-3.5 text-slate-500" />GitHub
            </a>
            <a href="https://www.linkedin.com/in/raja-r-806b0a331" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white transition-colors">
              <LinkedinIcon className="w-3.5 h-3.5 text-slate-500" />LinkedIn
            </a>
          </div>

          {/* Education */}
          <CVSection title="EDUCATION">
            <CVItem title="B.E CSE (AI & ML) — Sri Eshwar College of Engineering" meta="CGPA: 7.8 · 2024–2028" />
            <CVItem title="HSC — JSR Hr. Sec. School" meta="79.66% · 2023–2024" />
            <CVItem title="SSLC — JSR Hr. Sec. School" meta="70.8% · 2021–2022" />
          </CVSection>

          {/* Internship */}
          <CVSection title="INTERNSHIP">
            <CVItem title="MERN Stack Developer Intern — Better Tomorrow" meta="Dec 2025 – Jan 2026">
              <ul className="list-disc list-inside text-slate-400 text-xs space-y-1 mt-1">
                <li>Built & deployed full-stack apps using MongoDB, Express.js, React, Node.js</li>
                <li>Implemented auth, CRUD APIs, and RESTful services</li>
                <li>Deployed on AWS (EC2 / Amplify); version control via GitHub</li>
              </ul>
            </CVItem>
          </CVSection>

          {/* Coding Profiles */}
          <CVSection title="CODING PROFILES">
            <div className="flex flex-wrap gap-3">
              {[
                { name: "LeetCode", stat: "130+ Problems · Rank: 1,221,715", url: "https://leetcode.com/u/RbFmJlWxSR/" },
                { name: "SkillRack", stat: "560+ Problems · 3 Certs · 80+ Bronze", url: "https://skillrack.com" },
              ].map(p => (
                <a key={p.name} href={p.url} target="_blank" rel="noreferrer"
                  className="glass-card rounded-lg px-4 py-3 border border-white/10 hover:border-white/30 transition-all group">
                  <div className="font-display font-bold text-xs text-white group-hover:text-neutral-300">{p.name}</div>
                  <div className="font-mono text-[9px] text-slate-500 mt-0.5">{p.stat}</div>
                </a>
              ))}
            </div>
          </CVSection>

          {/* Achievements */}
          <CVSection title="ACHIEVEMENTS">
            {[
              { t: "Runner-Up — Creatathon, Sri Eshwar College of Engineering", y: "2025" },
              { t: "Finalist — Agentica 2.0 Hackathon, IIIT Sri City", y: "2026" },
              { t: "Participated — Kalam (Paper Presentation), Karpagam COE", y: "2025" },
              { t: "Participated — Hilaricas (Web Design), Hindusthan CAS", y: "2025" },
              { t: "Participated — Fiestaa '25 (Paper Presentation), KPR COE", y: "2025" },
            ].map(a => (
              <div key={a.t} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                <span className="text-slate-300 text-xs">{a.t}</span>
                <span className="font-mono text-[9px] text-slate-600 ml-4 whitespace-nowrap">{a.y}</span>
              </div>
            ))}
          </CVSection>

          {/* Certifications */}
          <CVSection title="CERTIFICATIONS">
            <CVItem title="C Programming Course (Hands-On) — SkillRack" meta="2025" />
            <CVItem title="C++ Programming Course — SkillRack" meta="2025" />
          </CVSection>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 items-center mt-8">
            <button
              onClick={handleDownload}
              disabled={downloading || completed}
              className="flex items-center gap-2 bg-white text-black font-mono text-xs font-bold px-6 py-3 rounded-full hover:bg-neutral-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all duration-300 cursor-pointer disabled:opacity-80"
            >
              {downloading ? (
                <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />DOWNLOAD_SYNCHRONIZING...</>
              ) : completed ? (
                <><CheckCircle className="w-4 h-4" />DOWNLOAD_COMPLETED</>
              ) : (
                <><Download className="w-4 h-4" />DOWNLOAD_CV_PDF</>
              )}
            </button>
            <a href="https://github.com/Raja-r-art" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-transparent text-white border border-white/25 hover:border-white hover:bg-white/10 font-mono text-xs font-bold px-6 py-3 rounded-full transition-all duration-300 cursor-pointer">
              <Eye className="w-4 h-4" />VIEW_IN_BROWSER
            </a>
          </div>
        </div>

        {/* Resume paper illustration */}
        <motion.div
          className="lg:col-span-5 h-[600px] sm:h-[680px] lg:h-[740px]"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <ResumePreview />
        </motion.div>

      </div>
    </section>
  );
}

function CVSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest">{title}</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>
      {children}
    </div>
  );
}

function CVItem({ title, meta, children }: { title: string; meta: string; children?: React.ReactNode }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline gap-4 flex-wrap">
        <span className="font-display font-bold text-xs text-white">{title}</span>
        <span className="font-mono text-[9px] text-slate-500 whitespace-nowrap">{meta}</span>
      </div>
      {children}
    </div>
  );
}
