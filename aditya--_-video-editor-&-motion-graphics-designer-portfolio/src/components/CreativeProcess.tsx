import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Zap, Target, Edit3, Volume2, HeartHandshake } from "lucide-react";
import { processSteps } from "../data";

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

export default function CreativeProcess() {
  const stepIcons = [Target, Edit3, Zap, Volume2, HeartHandshake];
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-14 md:py-20 px-6 relative bg-transparent overflow-hidden scroll-mt-20" 
      id="process"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24 gap-5" id="process-header">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold tracking-[0.2em] text-gray-300 uppercase backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-green animate-pulse" />
            Strategic Blueprint
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-white tracking-tight leading-none"
          >
            Our Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-purple">Workflow</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed max-w-2xl"
          >
            A carefully fine-tuned, frictionless production pipeline designed to transform raw footage and concepts into highly viral, conversion-focused visual masterpieces.
          </motion.p>
        </div>

        {/* Chronological Grid with Premium Connectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 xl:gap-8 relative" id="process-timeline-grid">
          
          {processSteps.map((step, idx) => {
            const Icon = stepIcons[idx] || Sparkles;
            const isLast = idx === processSteps.length - 1;
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={step.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative group p-7 rounded-2xl bg-surface-dark/30 border transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isHovered 
                    ? "border-brand-green/30 bg-surface-dark/80 shadow-2xl shadow-brand-green/5 -translate-y-2" 
                    : "border-white/5 bg-surface-dark/40 hover:border-white/10"
                }`}
                id={`process-step-${step.id}`}
              >
                {/* Premium Gradient Background Glow */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br from-brand-green/5 via-transparent to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} 
                />

                {/* Left/Top Interactive Gradient Strip */}
                <span 
                  className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 ease-out ${
                    isHovered 
                      ? "bg-gradient-to-b from-brand-green to-brand-purple h-full" 
                      : "bg-transparent h-0"
                  }`} 
                />

                {/* Horizontal Connector Arrow (only visible on large screens) */}
                {!isLast && (
                  <div className="hidden lg:flex absolute top-[44px] -right-5 translate-x-1/2 z-20 items-center justify-center">
                    <ArrowRight className={`w-4 h-4 transition-all duration-500 ${
                      isHovered ? "text-brand-green translate-x-1" : "text-white/10"
                    }`} />
                  </div>
                )}

                <div>
                  {/* Step Circle with icon */}
                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                      isHovered 
                        ? "bg-brand-green text-bg-dark border-brand-green shadow-lg shadow-brand-green/20" 
                        : "bg-surface-dark border-white/10 text-brand-green group-hover:border-white/20"
                    }`}>
                      <Icon className={`w-5 h-5 transition-transform duration-500 ${isHovered ? "scale-110 rotate-3" : "scale-100"}`} />
                    </div>
                    
                    <span className={`font-mono font-bold text-sm tracking-wider px-3 py-1 rounded-full border transition-all duration-500 ${
                      isHovered 
                        ? "bg-brand-purple/10 text-brand-purple border-brand-purple/30 shadow-sm shadow-brand-purple/5" 
                        : "bg-white/5 text-white/30 border-white/5"
                    }`}>
                      {`STEP 0${step.id}`}
                    </span>
                  </div>

                  {/* Subtitle tag */}
                  <span className={`text-[9px] font-mono font-bold tracking-widest uppercase block mb-2.5 transition-colors duration-300 ${
                    isHovered ? "text-brand-green" : "text-gray-500"
                  }`}>
                    {step.subtitle}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-heading font-bold text-white mb-3 tracking-tight leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>

                {/* Subtle shine trail on hover */}
                <div className="absolute inset-0 rounded-2xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              </motion.div>
            );
          })}

        </div>

      </div>
    </motion.section>
  );
}

