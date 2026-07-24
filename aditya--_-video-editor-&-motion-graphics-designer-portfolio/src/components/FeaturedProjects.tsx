import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Eye, ArrowRight, Sparkles } from "lucide-react";
import { featuredProjects, Project } from "../data";

interface PremiumFeaturedCardProps {
  key?: string | number;
  project: Project;
  idx: number;
  onSelectProject: (project: Project) => void;
}

function PremiumFeaturedCard({ project, idx, onSelectProject }: PremiumFeaturedCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle local mouse spotlight coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Video autoplay/pause logic on hover
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isHovered]);

  const isEmptyCard = project.id !== "feat-1";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: idx * 0.15, type: "spring" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { if (!isEmptyCard) setIsHovered(true); }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => { if (!isEmptyCard) onSelectProject(project); }}
      className={`group relative aspect-[16/9] rounded-[28px] overflow-hidden ${
        isEmptyCard ? "cursor-default" : "cursor-pointer"
      } bg-[#050505] border border-white/[0.06] ${
        !isEmptyCard ? "hover:border-brand-green/30 hover:shadow-[0_20px_50px_rgba(215,255,74,0.05),0_15px_40px_rgba(0,0,0,0.8)]" : ""
      } transition-all duration-700`}
      id={`featured-grid-card-${project.id}`}
    >
      {/* Interactive Mouse Spotlight Overlay */}
      {isHovered && !isEmptyCard && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20 mix-blend-screen"
          style={{
            background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(215, 255, 74, 0.12), transparent 80%)`,
          }}
        />
      )}

      {/* Animated Glow Border Frame */}
      {isHovered && !isEmptyCard && (
        <motion.div
          animate={{
            borderColor: [
              "rgba(215, 255, 74, 0.25)",
              "rgba(139, 92, 246, 0.4)",
              "rgba(215, 255, 74, 0.25)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-[28px] border-2 pointer-events-none z-30"
        />
      )}

      {/* Image & Video Layers with Zoom */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {!isEmptyCard && (
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
              isHovered ? "scale-105 opacity-0" : "scale-100 opacity-100"
            }`}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        )}

        {!isEmptyCard && (
          project.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&cc_load_policy=0&cc_lang_pref=none&hl=en`}
              title="YouTube Preview"
              className="absolute inset-0 w-full h-full border-none pointer-events-none z-10"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <video
              ref={videoRef}
              src={project.videoUrl}
              loop
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )
        )}

        {/* Ambient vignette and overlay gradients */}
        {!isEmptyCard && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-95 transition-all duration-500 pointer-events-none z-15" />
            <div className="absolute inset-0 bg-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-15" />
          </>
        )}
      </div>

      {/* Top platform/metadata tag */}
      {!isEmptyCard && (
        <div className="absolute top-5 left-5 z-20 pointer-events-none">
          <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-mono uppercase tracking-wider text-brand-green border border-white/[0.08]">
            {project.category}
          </span>
        </div>
      )}

      {/* Centered play button with hover animation */}
      {!isEmptyCard && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <motion.div
            animate={{
              scale: isHovered ? 1.15 : 1,
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-16 h-16 rounded-full bg-brand-green flex items-center justify-center text-bg-dark shadow-[0_0_30px_rgba(215,255,74,0.35)]"
          >
            <Play className="w-5 h-5 fill-current ml-1 text-bg-dark" />
          </motion.div>
        </div>
      )}

      {/* Bottom Glass Overlay Info Panel */}
      {!isEmptyCard && (
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black via-black/80 to-transparent sm:bg-black/25 sm:backdrop-blur-xl sm:border-t sm:border-white/[0.08] transition-all duration-500 pointer-events-none z-20">
          <div className="space-y-2">
            <p className="text-[10px] font-mono text-brand-green uppercase tracking-widest font-black">
              {project.client}
            </p>
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-lg sm:text-xl font-heading font-black text-white tracking-tight leading-tight line-clamp-1">
                {project.title}
              </h4>
              {project.views && (
                <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1 whitespace-nowrap">
                  <Eye className="w-3.5 h-3.5 text-brand-green" /> {project.views}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
}

export default function FeaturedProjects({ onSelectProject }: FeaturedProjectsProps) {
  // Display top 4 projects as the premium 16:9 bottom showcase cards
  const premiumProjects = featuredProjects.slice(0, 4);

  return (
    <div className="w-full mt-32" id="portfolio-featured-showcase">
      {/* 1. Header with subtle border indicator */}
      <div className="flex items-center gap-3 mb-12 justify-center lg:justify-start">
        <span className="w-8 h-px bg-brand-green/40" />
        <h3 className="font-mono text-xs text-gray-400 uppercase tracking-[0.2em] font-black flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-green" /> Premium Production Spotlights
        </h3>
      </div>

      {/* 2. Grid Container (2 Columns on Desktop/Tablet, 1 Column on Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12" id="bottom-showcase-grid">
        {premiumProjects.map((project, idx) => (
          <PremiumFeaturedCard
            key={project.id}
            project={project}
            idx={idx}
            onSelectProject={onSelectProject}
          />
        ))}
      </div>

      {/* 3. Centered Premium CTA Button below the projects */}
      <div className="flex justify-center mt-16" id="complete-portfolio-cta">
        <motion.a
          href="#contact"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 35px rgba(215,255,74,0.18)",
            border: "1px solid rgba(215,255,74,0.4)" 
          }}
          whileTap={{ scale: 0.98 }}
          className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white/[0.02] backdrop-blur-md border border-white/[0.08] text-white font-heading font-black text-xs tracking-[0.12em] uppercase transition-all duration-500 cursor-pointer overflow-hidden shadow-2xl"
        >
          {/* Shimmer gradient overlay */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-green/5 via-white/5 to-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          View Complete Portfolio
          <ArrowRight className="w-4 h-4 text-brand-green transition-transform duration-300 group-hover:translate-x-1.5" />
        </motion.a>
      </div>
    </div>
  );
}
