import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Volume2 } from "lucide-react";
import { LongFormProject } from "./portfolioData";

interface LongVideoCardProps {
  project: LongFormProject;
  idx: number;
  onSelect: (project: LongFormProject) => void;
}

export default function LongVideoCard({ project, idx, onSelect }: LongVideoCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  // Spotlight Mouse Tracking & 3D Tilt Calculation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    const width = rect.width;
    const height = rect.height;
    const normX = (x / width) - 0.5;
    const normY = (y / height) - 0.5;
    setTiltX(-normY * 8); // Maximum 8 degrees pitch
    setTiltY(normX * 8);  // Maximum 8 degrees yaw
  };

  // Intersection Observer for autoplay/autopause on scroll or slide
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5, // require 50% visibility to trigger preview play
        rootMargin: "0px"
      }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Handle playing/pausing the muted preview based on visibility and hover states
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      // Play if visible and muted
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltX(0);
    setTiltY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: idx * 0.1, type: "spring" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      style={{ originX: 0.5, originY: 0.5, transformStyle: "preserve-3d", perspective: 1000 }}
      animate={{
        scale: isHovered ? 1.015 : 1,
        rotateX: isHovered ? tiltX : 0,
        rotateY: isHovered ? tiltY : 0,
      }}
      className="group relative w-full max-w-4xl mx-auto aspect-[16/9] rounded-[24px] sm:rounded-[32px] overflow-hidden cursor-pointer bg-[#050505] border border-white/[0.08] hover:border-brand-green/40 hover:shadow-[0_20px_60px_rgba(215,255,74,0.08),0_15px_40px_rgba(0,0,0,0.9)] transition-all duration-500 z-10"
      id={`longform-card-${project.id}`}
    >
      {/* 1. Mouse Spotlight Glow Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at ${spotlightX}px ${spotlightY}px, rgba(215, 255, 74, 0.08), transparent 80%)`,
        }}
      />

      {/* 2. Glass Reflection Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.015] to-white/0 pointer-events-none z-15 group-hover:translate-x-12 transition-transform duration-1000 ease-out" />

      {/* 3. Media Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {project.fullVideo && !project.uploadingSoon ? (
          <iframe
            src={`https://www.youtube.com/embed/${project.fullVideo}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.fullVideo}&playsinline=1&enablejsapi=1&rel=0&modestbranding=1&iv_load_policy=3&showinfo=0`}
            title={project.title}
            className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-1000 ${
              isHovered ? "scale-[1.3]" : "scale-[1.2]"
            }`}
            style={{ border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <div className="relative w-full h-full bg-gradient-to-b from-neutral-900 via-neutral-950 to-black overflow-hidden flex flex-col items-center justify-center p-6">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                  isHovered ? "scale-105 brightness-[0.4]" : "scale-100 brightness-[0.3]"
                }`}
              />
            ) : (
              /* Grid texture for non-image placeholders */
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:20px_20px]" />
            )}

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
      </div>



      {/* Tap to play indicator for video cards */}
      {project.fullVideo && !project.uploadingSoon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0.85, scale: isHovered ? 1 : 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 bg-black/85 backdrop-blur-md border border-brand-green/40 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider font-bold shadow-2xl uppercase"
          >
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-green animate-bounce" />
            <span>Tap to play with sound</span>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
