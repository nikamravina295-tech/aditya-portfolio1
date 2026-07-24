import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Eye, Clock, Layers, Sparkles, Smartphone, Youtube, ArrowUpRight, Volume2 } from "lucide-react";
import { Project } from "../data";

interface PortfolioCardProps {
  project: Project;
  isActive: boolean;
  positionIndex: number; // -2, -1, 0, 1, 2 representing distance from center active card
  onClick: () => void;
  onPlay: (project: Project) => void;
  isDragging?: boolean;
}

export default function PortfolioCard({
  project,
  isActive,
  positionIndex,
  onClick,
  onPlay,
  isDragging = false,
}: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  // Handle local mouse spotlight coordinates and 3D tilt calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    if (isActive) {
      const width = rect.width;
      const height = rect.height;
      const normX = (x / width) - 0.5;
      const normY = (y / height) - 0.5;
      setTiltX(-normY * 12); // Maximum 12 degrees pitch rotation
      setTiltY(normX * 12);  // Maximum 12 degrees yaw rotation
    }
  };

  // Auto-play the video when active or hovered
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered && isActive) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else if (project.id === "feat-1" && isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isHovered, isActive, project.id]);

  // Handle click on card: if side card, click to center it. If center card, click can play or show info.
  const handleCardClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    if (!isActive) {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    } else {
      onPlay(project);
    }
  };

  // 3D Tilt calculation based on positionIndex relative to active center
  // Negative index: left, tilt positive. Positive index: right, tilt negative.
  const getTiltAngle = () => {
    if (positionIndex === -1) return 4;
    if (positionIndex === -2) return 8;
    if (positionIndex === 1) return -4;
    if (positionIndex === 2) return -8;
    return 0;
  };

  const tiltAngle = getTiltAngle();

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltX(0);
    setTiltY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => isActive && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ originX: 0.5, originY: 0.5, transformStyle: "preserve-3d", perspective: 1000 }}
      animate={{
        scale: isActive ? (isHovered ? 1.025 : 1.0) : 0.85,
        opacity: isActive ? 1.0 : 0.45,
        filter: isActive ? "blur(0px)" : "blur(2px)",
        rotateX: isActive && isHovered ? tiltX : 0,
        rotateY: isActive ? (isHovered ? tiltY : tiltAngle) : tiltAngle,
        z: isActive ? 100 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 20,
        mass: 0.8,
      }}
      className={`relative w-[295px] min-[380px]:w-[340px] sm:w-[380px] h-[520px] min-[380px]:h-[580px] sm:h-[650px] rounded-[24px] sm:rounded-[28px] overflow-hidden cursor-pointer select-none bg-zinc-950/80 border transition-colors duration-500 ${
        isActive 
          ? "border-brand-green/30 shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(215,255,74,0.04)]" 
          : "border-white/5 hover:border-white/10"
      }`}
      id={`portfolio-card-${project.id}`}
    >
      {/* Interactive Mouse Spotlight Layer */}
      {isActive && isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20 mix-blend-screen"
          style={{
            background: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, rgba(215, 255, 74, 0.15), transparent 80%)`,
          }}
        />
      )}

      {/* Animated Glow Border Frame using Framer Motion */}
      {isActive && (
        <motion.div
          animate={{
            borderColor: [
              "rgba(215, 255, 74, 0.2)",
              "rgba(139, 92, 246, 0.4)",
              "rgba(215, 255, 74, 0.2)",
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
      {/* 1. Video and Thumbnail Layer */}
      <div className="absolute inset-0 w-full h-full bg-black">
        {["lf-2", "lf-3", "lf-4", "feat-1", "feat-2", "sf-1", "sf-3"].includes(project.id) ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-black">
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <iframe
              src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&cc_load_policy=0&cc_lang_pref=none&hl=en`}
              title="YouTube Preview"
              className={`absolute pointer-events-none border-none z-10 ${
                project.platform === 'YouTube Shorts'
                  ? 'left-[-20%] w-[140%] h-[115%] top-[-7.5%]'
                  : 'top-0 h-full left-[-108%] w-[316%]'
              }`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        ) : (
          <>
            {!["sf-2", "sf-3"].includes(project.id) && (
              <img
                src={project.thumbnailUrl}
                alt={project.title}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
                  isHovered && isActive ? "scale-105 opacity-0" : "scale-100 opacity-100"
                }`}
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            )}

            {project.id === "sf-2" && (
              <div className="relative w-full h-full bg-gradient-to-b from-neutral-900 via-neutral-950 to-black overflow-hidden flex flex-col items-center justify-center p-6">
                {/* Radial Grid Texture */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:20px_20px]" />

                {/* Glowing Accent Glow */}
                <div className="absolute w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

                {/* Futuristic Viewfinder Corners */}
                <div className="absolute top-4 left-4 text-xs font-mono text-amber-500/40 select-none">┌</div>
                <div className="absolute top-4 right-4 text-xs font-mono text-amber-500/40 select-none">┐</div>
                <div className="absolute bottom-4 left-4 text-xs font-mono text-amber-500/40 select-none">└</div>
                <div className="absolute bottom-4 right-4 text-xs font-mono text-amber-500/40 select-none">┘</div>

                {/* Card Badge Content */}
                <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/80 backdrop-blur-xl border border-amber-500/40 text-amber-400 text-xs font-mono tracking-widest font-bold shadow-2xl uppercase">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span>Uploading Soon</span>
                  </div>
                  <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">
                    Final Render in Progress
                  </p>
                </div>
              </div>
            )}

            {isActive && project.id !== "sf-3" && project.id !== "sf-2" && (
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
            )}
          </>
        )}

        {/* Cinematic ambient overlay shadow */}
        {!["lf-2", "lf-3", "lf-4", "feat-1", "feat-2", "sf-1", "sf-2", "sf-3"].includes(project.id) && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 pointer-events-none" />
        )}
      </div>

      {/* 2. Platform Logo and Top Indicators */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10 pointer-events-none">
        {project.platform !== "Instagram" && !project.platform.includes("Shorts") && (
          <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-[10px] font-mono text-gray-300 px-3 py-1.5 rounded-full border border-white/[0.08]">
            {project.platform === "TikTok" && <Smartphone className="w-3.5 h-3.5 text-cyan-400" />}
            {project.platform === "YouTube" && <Youtube className="w-3.5 h-3.5 text-red-500" />}
            {project.platform}
          </span>
        )}
        
        {isActive && isHovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1 bg-brand-green/20 text-brand-green border border-brand-green/30 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold"
          >
            <Sparkles className="w-2.5 h-2.5 animate-spin" /> PLAYING PREVIEW
          </motion.span>
        )}
      </div>

      {/* 2.5 Click to play full video with voice indicator */}
      {isActive && project.id !== "sf-2" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0.85, scale: isHovered ? 1 : 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 bg-black/85 backdrop-blur-md border border-brand-green/40 text-white px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider font-bold shadow-2xl uppercase"
          >
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-green animate-bounce" />
            <span>Tap to play with sound</span>
          </motion.div>
        </div>
      )}

      {/* 3. Inactive Card Glass Filter overlay */}
      {!isActive && (
        <div className="absolute inset-0 bg-[#050505]/20 hover:bg-transparent transition-colors duration-500 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white/50 group-hover:text-white transition-all">
            <Layers className="w-5 h-5" />
          </div>
        </div>
      )}

      {/* 4. Bottom Glassmorphic Interactive Details Panel */}
      {!["lf-2", "lf-3", "lf-4", "feat-1", "feat-2", "sf-1", "sf-2", "sf-3"].includes(project.id) && (
        <div 
          className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent sm:bg-black/20 sm:backdrop-blur-xl sm:border-t sm:border-white/[0.08] transition-all duration-500 translate-y-0 ${
            isActive ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          id={`card-panel-${project.id}`}
        >
          <div className="space-y-4">
            {/* Metadata Grid row */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-brand-green uppercase tracking-widest font-black">
                {project.category}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-mono text-gray-400">
                <Eye className="w-3.5 h-3.5 text-brand-green" /> {project.views} Views
              </span>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-lg sm:text-xl font-heading font-black text-white tracking-tight leading-tight">
                {project.title}
              </h4>
              <p className="text-xs text-gray-400 font-sans line-clamp-2">
                {project.description || "Designed with premium editing aesthetics, high-impact hooks and custom graphic assets to optimize user retention."}
              </p>
            </div>

            {/* Software used badges */}
            <div className="flex flex-wrap gap-1.5">
              {project.software.map((sw, idx) => (
                <span 
                  key={idx} 
                  className="text-[9px] font-mono bg-white/[0.05] border border-white/[0.06] px-2 py-0.5 rounded text-gray-300"
                >
                  {sw}
                </span>
              ))}
              {project.duration && (
                <span className="text-[9px] font-mono bg-brand-green/10 text-brand-green border border-brand-green/10 px-2 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" /> {project.duration}
                </span>
              )}
            </div>

            {/* Client & Bottom Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <div>
                <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Client</p>
                <p className="text-xs font-sans font-bold text-white">{project.client}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlay(project);
                  }}
                  className="px-4 py-2 rounded-xl bg-brand-green hover:bg-white text-bg-dark font-heading font-black text-xs tracking-wider uppercase flex items-center gap-1.5 transition-all duration-300 shadow-[0_4px_12px_rgba(215,255,74,0.15)] cursor-pointer"
                  id={`card-play-btn-${project.id}`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Play
                </button>
                
                {project.youtubeId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlay(project);
                    }}
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.08] transition-all cursor-pointer"
                    title="View Case Study / Full Video"
                    id={`card-casestudy-btn-${project.id}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
