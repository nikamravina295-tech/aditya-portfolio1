import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Users, Tv, Sparkles } from "lucide-react";

export default function SocialProof() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [count, setCount] = useState<number>(0);
  const targetCount = 100;

  // Spotlight mouse interaction states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Count up animation triggered once when component enters viewport
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = targetCount;
      const duration = 2000; // 2 seconds
      const stepTime = Math.abs(Math.floor(duration / end));
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) {
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  // Handle mouse move for the high-end spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const avatars = [
    {
      name: "Alex Rivera",
      role: "Elite Fitness Coach",
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Marcus Chen",
      role: "Tech YouTuber",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Sarah Jenkins",
      role: "Startup Founder",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    },
  ];

  return (
    <div className="relative w-full select-none" ref={containerRef}>
      
      {/* 2. Main Luxury Floating Glass Pill Container */}
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative mx-auto max-w-[340px] min-h-[48px] rounded-full bg-white/[0.02] border border-white/[0.03] hover:border-brand-green/20 backdrop-blur-xl px-3.5 py-1 shadow-lg transition-all duration-500 overflow-hidden group flex flex-row items-center justify-between gap-2 sm:gap-3"
        style={{
          boxShadow: isHovered 
            ? "0 15px 30px -12px rgba(215,255,74,0.01), inset 0 1px 0 0 rgba(255,255,255,0.04)"
            : "0 8px 16px -8px rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.02)"
        }}
        id="social-proof-pill"
      >
        {/* Dynamic mouse spotlight gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(215, 255, 74, 0.03), transparent 80%)`
          }}
        />

        {/* Shimmering border glow element */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-brand-green/20 transition-all duration-700 ease-in-out" />

        {/* LEFT SIDE: Floating overlapping avatars */}
        <div className="flex items-center gap-1" id="sp-left-avatars">
          <div className="flex -space-x-2 items-center">
            {avatars.map((avatar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.15, type: "spring" }}
                whileHover={{ 
                  y: -2, 
                  scale: 1.05,
                  rotate: idx % 2 === 0 ? 3 : -3,
                  zIndex: 20,
                  boxShadow: "0 0 10px rgba(215,255,74,0.2)" 
                }}
                className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/30 overflow-hidden shadow-sm cursor-pointer transition-shadow"
              >
                <img
                  src={avatar.src}
                  alt={avatar.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
            
            {/* The Last Circle - Dark background with modern company logo indicator */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45, type: "spring" }}
              whileHover={{ 
                y: -2, 
                scale: 1.05, 
                rotate: 5,
                zIndex: 20,
                boxShadow: "0 0 10px rgba(255,255,255,0.12)" 
              }}
              className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/30 bg-[#121212] flex items-center justify-center shadow-sm cursor-pointer transition-shadow"
            >
              <Tv className="w-3 h-3 text-white/70 group-hover:text-brand-green transition-colors" />
            </motion.div>
          </div>
        </div>

        {/* CENTER: Large dynamic counter */}
        <div className="flex flex-col items-center justify-center min-w-[70px]" id="sp-center-counter">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="flex items-baseline"
          >
            <span className="text-lg sm:text-xl font-heading font-medium text-white tracking-tight select-none">
              {count}
            </span>
            <span className="text-base sm:text-lg font-heading font-medium text-white ml-0.5 select-none animate-pulse">
              +
            </span>
          </motion.div>
          <span className="text-[7px] font-mono tracking-wider text-white uppercase mt-0.5 whitespace-nowrap">
            Videos Delivered
          </span>
        </div>

        {/* RIGHT SIDE: Text summary details */}
        <div className="text-left max-w-[150px] sm:max-w-[190px]" id="sp-right-content">
          <h3 className="text-[9px] sm:text-[10px] font-heading font-medium text-white flex items-center gap-1 tracking-wide uppercase">
            <Sparkles className="w-2.5 h-2.5 text-brand-green animate-pulse" />
            Happy Clients
          </h3>
        </div>

      </motion.div>

    </div>
  );
}
