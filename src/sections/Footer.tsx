import { useState, useEffect } from "react";
import { Terminal, Clock, ShieldCheck } from "lucide-react";

export default function Footer() {
  const [time, setTime] = useState("");
  const [commandInput, setCommandInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Terminal initialization: OK",
    "Session location: Bangalore, India",
    "Type 'help' for available workspace commands."
  ]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().replace("T", " ").substring(0, 19));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const cmd = commandInput.trim().toLowerCase();
    let response = "";

    switch (cmd) {
      case "help":
        response = "Available commands: status, tech, ping, clear";
        break;
      case "status":
        response = "Status: Available for Opportunities (Full-Time / Contract)";
        break;
      case "tech":
        response = "Core Stack: React, Node, Python, Docker, Three.js";
        break;
      case "ping":
        response = "pong - Latency: 12ms";
        break;
      case "clear":
        setTerminalLogs([]);
        setCommandInput("");
        return;
      default:
        response = `Command not recognized: '${cmd}'. Type 'help' for options.`;
    }

    setTerminalLogs((prev) => [...prev, `$ ${commandInput}`, response]);
    setCommandInput("");
  };

  return (
    <footer className="bg-[#03050f] border-t border-white/5 py-12 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Terminal Section */}
        <div className="lg:col-span-7 w-full text-left">
          <div className="terminal-window rounded-xl p-5 border border-white/10 font-mono text-[11px] text-slate-300">
            
            {/* Title Bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 text-slate-500">
              <span className="flex items-center gap-1.5 font-bold">
                <Terminal className="w-3.5 h-3.5 text-white" />
                SYSTEM_TERMINAL
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {time}
              </span>
            </div>

            {/* Terminal Body Console */}
            <div className="h-36 overflow-y-auto space-y-1.5 no-scrollbar pr-2 select-text">
              {terminalLogs.map((log, i) => (
                <div key={i} className={log.startsWith("$") ? "text-white font-bold" : "text-slate-400"}>
                  {log}
                </div>
              ))}
            </div>

            {/* Terminal Input Form */}
            <form onSubmit={handleCommandSubmit} className="flex items-center gap-1.5 border-t border-white/5 pt-3 mt-3">
              <span className="text-white font-bold select-none">$</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="Enter command here..."
                className="flex-1 bg-transparent border-none outline-none font-mono text-[11px] text-white placeholder-slate-700"
              />
              <span className="w-1.5 h-3.5 bg-white animate-[pulse_1s_infinite] select-none"></span>
            </form>

          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full lg:h-[235px] text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-4 w-fit">
              <ShieldCheck className="w-5 h-5 text-white" />
              <div>
                <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">Current Availability</span>
                <span className="text-xs font-bold text-white">ACTIVE_FOR_OPPORTUNITIES</span>
              </div>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              Designed and programmed procedurally to showcase high performance web architectures. Built using React, Vite, Framer Motion, and Three.js.
            </p>
          </div>

          <div className="border-t border-white/5 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] font-mono text-slate-600 gap-4">
            <span>© {new Date().getFullYear()} RAJAS. All rights reserved.</span>
            <span>IP_STATUS: 127.0.0.1 // PORT_LISTEN: 3000</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
