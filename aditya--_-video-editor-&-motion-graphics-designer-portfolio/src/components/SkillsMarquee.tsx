import React from "react";
import { motion } from "motion/react";
import { 
  Film, Sparkles, Image, Bot, Sliders, Cpu, Video, Layout, PenTool,
  Flame, Award, Eye, Layers, Zap, Heart, Target, Music 
} from "lucide-react";
import { softwares } from "../data";

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function SkillsMarquee() {
  // Mapping names to actual lucide icons
  const iconMap: { [key: string]: any } = {
    Film,
    Sparkles,
    Image,
    Bot,
    Sliders,
    Cpu,
    Video,
    Layout,
    PenTool
  };

  // Duplicate softwares for Row 1
  const softwaresLoop = [...softwares, ...softwares, ...softwares];

  // Core capabilities list for Row 2
  const capabilities = [
    { name: "Cinematic Color Grading", icon: Sliders, color: "#111804", textColor: "#D7FF4A", glow: "rgba(215,255,74,0.3)" },
    { name: "Meticulous Sound Foley", icon: Music, color: "#130022", textColor: "#EA26FF", glow: "rgba(234,38,255,0.3)" },
    { name: "Retention Hook Engineering", icon: Target, color: "#1B003A", textColor: "#9966FF", glow: "rgba(153,102,255,0.3)" },
    { name: "3D Camera Projection", icon: Layers, color: "#01151A", textColor: "#00E6FF", glow: "rgba(0,230,255,0.3)" },
    { name: "Dynamic Kinetic Typography", icon: Sparkles, color: "#001A0F", textColor: "#00FF96", glow: "rgba(0,255,150,0.3)" },
    { name: "Multi-Camera Syncing", icon: Film, color: "#191100", textColor: "#FFAA00", glow: "rgba(255,170,0,0.3)" },
    { name: "Retention Rate Optimization", icon: Flame, color: "#1B0511", textColor: "#FF3B6F", glow: "rgba(255,59,111,0.3)" },
    { name: "High-Impact Visual Hooks", icon: Zap, color: "#0a0a0a", textColor: "#FFFFFF", glow: "rgba(255,255,255,0.2)" },
  ];

  const capabilitiesLoop = [...capabilities, ...capabilities, ...capabilities];

  return (
    <section 
      className="py-14 md:py-20 bg-transparent overflow-hidden relative select-none" 
      id="skills-marquee-section"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10"
      >
        
        {/* Section Header with Premium Badges */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-5 shadow-lg backdrop-blur-md"
          >
            <Zap className="w-3.5 h-3.5 text-brand-green animate-pulse" />
            <span className="font-mono text-[9px] text-gray-300 uppercase tracking-[0.25em] font-black">
              Ecosystem &amp; Arsenal
            </span>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-white leading-none"
          >
            Next-Gen Tools &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-green">Superpowers</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xs sm:text-sm text-gray-400 font-sans mt-4 max-w-xl mx-auto leading-relaxed"
          >
            Integrating industry-standard specialized production suite softwares with advanced AI assistance and peak retention mechanics to optimize viewer analytics.
          </motion.p>
        </div>

        {/* Dual-Marquee Layout Container */}
        <motion.div variants={itemVariants} className="space-y-6 w-full relative">
          
          {/* Row 1: Core Softwares Moving Left */}
          <div className="w-full flex overflow-hidden group/row1">
            <div className="flex gap-5 items-center animate-[marquee-left_45s_linear_infinite] group-hover/row1:[animation-play-state:paused] whitespace-nowrap py-3">
              {softwaresLoop.map((sw, idx) => {
                const IconComp = iconMap[sw.icon] || Sparkles;

                return (
                  <div
                    key={`sw-${idx}`}
                    className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-surface-dark/60 border border-white/10 hover:border-white/25 transition-all duration-500 group cursor-pointer relative overflow-hidden backdrop-blur-md"
                    style={{
                      boxShadow: `0 10px 32px rgba(0, 0, 0, 0.6)`
                    }}
                    id={`marquee-sw-${idx}`}
                  >
                    {/* Inner subtle colored glow overlay on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 20% 20%, ${sw.textColor}25, transparent 70%)`
                      }}
                    />
                    
                    {/* Icon container - increased size from w-10 h-10 to w-12 h-12 with p-1 and subtle glow */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 overflow-hidden p-1 shrink-0 border border-white/10 relative"
                      style={{ 
                        backgroundColor: `${sw.textColor}15`,
                        boxShadow: `0 4px 16px ${sw.textColor}20`
                      }}
                    >
                      {(sw as any).imageUrl ? (
                        <img 
                          src={(sw as any).imageUrl} 
                          alt={sw.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            if (!img.src.includes('export=view')) {
                              const match = (sw as any).imageUrl?.match(/\/d\/([a-zA-Z0-9_-]+)/) || (sw as any).imageUrl?.match(/id=([a-zA-Z0-9_-]+)/);
                              if (match && match[1]) {
                                img.src = `https://drive.google.com/uc?export=view&id=${match[1]}`;
                              }
                            }
                          }}
                        />
                      ) : (
                        <IconComp
                          className="w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                          style={{ color: sw.textColor }}
                        />
                      )}
                    </div>
                    
                    <span
                      className="font-heading font-bold text-xs uppercase tracking-widest text-white/90 group-hover:text-white transition-colors duration-300"
                    >
                      {sw.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 2: Capabilities & Skills Moving Right */}
          <div className="w-full flex overflow-hidden group/row2">
            <div className="flex gap-5 items-center animate-[marquee-right_48s_linear_infinite] group-hover/row2:[animation-play-state:paused] whitespace-nowrap py-3">
              {capabilitiesLoop.map((cap, idx) => {
                const IconComp = cap.icon;

                return (
                  <div
                    key={`cap-${idx}`}
                    className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-surface-dark/40 border border-white/5 hover:border-white/15 transition-all duration-500 group cursor-pointer relative overflow-hidden"
                    style={{
                      boxShadow: `0 8px 30px rgba(0, 0, 0, 0.5)`
                    }}
                    id={`marquee-cap-${idx}`}
                  >
                    {/* Inner subtle colored glow overlay on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 10% 10%, ${cap.textColor}15, transparent 70%)`
                      }}
                    />

                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-105"
                      style={{ backgroundColor: `${cap.textColor}10` }}
                    >
                      <IconComp
                        className="w-5 h-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                        style={{ color: cap.textColor }}
                      />
                    </div>
                    <span
                      className="font-heading font-bold text-xs uppercase tracking-widest text-white/90 group-hover:text-white transition-colors duration-300"
                    >
                      {cap.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </motion.div>
      </motion.div>

      {/* High-Performance Infinite Loop Animations */}
      <style>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-33.3333%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>

    </section>
  );
}
