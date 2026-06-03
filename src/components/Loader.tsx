import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [logText, setLogText] = useState("Initializing kernel...");

  useEffect(() => {
    const logs = [
      "Initializing core modules...",
      "Connecting WebGL renderer...",
      "Compiling vertex and fragment shaders...",
      "Compiling algorithm structures...",
      "Loading neural communication modules...",
      "Establishing link with Github/LeetCode...",
      "Syncing workspace controls...",
      "Ready. Booting workstation..."
    ];

    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logs.length - 1) {
        currentLogIndex++;
        setLogText(logs[currentLogIndex]);
      }
    }, 450);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(logInterval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        // Random progress increments for cyber-realistic loading speed
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center font-sans overflow-hidden"
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: "blur(20px)",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Background ambient grids */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-45"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_65%)]"></div>

      <div className="relative flex flex-col items-center max-w-md w-full px-8">
        
        {/* Futuristic CPU Chip Representation */}
        <motion.div 
          className="relative w-44 h-44 mb-10 flex items-center justify-center"
          initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 360, scale: 1, opacity: 1 }}
          transition={{ 
            rotate: { repeat: Infinity, duration: 25, ease: "linear" },
            scale: { duration: 1, ease: "easeOut" },
            opacity: { duration: 0.8 }
          }}
        >
          {/* External Pins Glowing effect */}
          <div className="absolute inset-0 border border-dashed border-[#8f8f8f]/40 rounded-3xl animate-[spin_50s_linear_infinite]"></div>
          
          {/* CPU Outer Case */}
          <div className="absolute w-36 h-36 border-2 border-[#d6d6d6] bg-[#111111]/90 rounded-2xl flex items-center justify-center shadow-[0_0_35px_rgba(255,255,255,0.18)]">
            
            {/* Silicon Circuits Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" viewBox="0 0 100 100">
              <path d="M 10,10 L 30,30 L 70,30 L 90,10" fill="none" stroke="#8f8f8f" strokeWidth="1" />
              <path d="M 10,90 L 30,70 L 70,70 L 90,90" fill="none" stroke="#8f8f8f" strokeWidth="1" />
              <path d="M 30,30 L 30,70" fill="none" stroke="#ffffff" strokeWidth="1" />
              <path d="M 70,30 L 70,70" fill="none" stroke="#ffffff" strokeWidth="1" />
              <circle cx="30" cy="30" r="1.5" fill="#ffffff" />
              <circle cx="70" cy="30" r="1.5" fill="#ffffff" />
              <circle cx="30" cy="70" r="1.5" fill="#ffffff" />
              <circle cx="70" cy="70" r="1.5" fill="#ffffff" />
            </svg>

            {/* Glowing Core */}
            <motion.div 
              className="w-16 h-16 rounded-lg bg-gradient-to-tr from-[#8f8f8f] to-[#ffffff] p-[2px] shadow-[0_0_25px_rgba(255,255,255,0.35)] flex items-center justify-center"
              animate={{ 
                scale: [1, 1.08, 1],
                boxShadow: [
                  "0 0 20px rgba(255,255,255,0.22)",
                  "0 0 35px rgba(255,255,255,0.36)",
                  "0 0 20px rgba(255,255,255,0.22)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg-black rounded-[6px] flex items-center justify-center font-mono text-xs font-bold text-[#ffffff]">
                SYS_INIT
              </div>
            </motion.div>
          </div>

          {/* Glowing Ring Satellites */}
          <div className="absolute w-40 h-40 border border-[#ffffff]/20 rounded-full animate-ping opacity-30"></div>
        </motion.div>

        {/* Loading status panel */}
        <div className="w-full flex flex-col items-center">
          <motion.h2 
            className="text-lg font-display font-semibold text-[#d6d6d6] tracking-wider mb-2"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Initializing Developer Workspace...
          </motion.h2>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-[#141414] border border-[#8f8f8f]/20 rounded-full overflow-hidden mb-4 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#8f8f8f] via-[#d6d6d6] to-[#ffffff]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Diagnostic Console logs */}
          <div className="w-full h-16 bg-black/70 border border-white/10 rounded-lg p-3 font-mono text-[11px] text-neutral-400 overflow-hidden flex flex-col justify-end">
            <div className="text-left font-semibold text-[#ffffff]/90">
              $ {progress}% COMPLETED
            </div>
            <div className="text-left truncate text-[#8f8f8f]">
              &gt; {logText}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
