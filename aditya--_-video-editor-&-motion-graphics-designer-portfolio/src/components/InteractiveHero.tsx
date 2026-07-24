import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Play, Sparkles, ArrowRight } from "lucide-react";
import SocialProof from "./SocialProof";

interface InteractiveHeroProps {
  onExplorePortfolio: () => void;
  onBookCall: () => void;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  maxLife: number;
  life: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const scrollIndicatorVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 0.6,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function InteractiveHero({ onExplorePortfolio, onBookCall }: InteractiveHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [hoveredAvatar, setHoveredAvatar] = useState<string | null>(null);

  // Mouse spotlight tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Custom responsive mouse-move parallax offsets for 3D depth against background video
  const parallaxX = useTransform(springX, (value) => {
    if (!containerRef.current) return 0;
    const width = containerRef.current.clientWidth;
    return ((value / width) - 0.5) * 20; // moves up to -10px to +10px
  });

  const parallaxY = useTransform(springY, (value) => {
    if (!containerRef.current) return 0;
    const height = containerRef.current.clientHeight;
    return ((value / height) - 0.5) * 20; // moves up to -10px to +10px
  });

  // Handle canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Particle simulation loop
  useEffect(() => {
    let animationFrameId: number;
    let frameCount = 0;

    const updateParticles = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animationFrameId = requestAnimationFrame(updateParticles);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animationFrameId = requestAnimationFrame(updateParticles);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      // Ambient particle generation (drifting from the bottom or scattered)
      if (frameCount % 8 === 0 && particlesRef.current.length < 80) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          size: Math.random() * 2 + 0.8,
          speedX: (Math.random() - 0.5) * 0.6,
          speedY: -(Math.random() * 0.8 + 0.4), // strictly floating up
          color: Math.random() > 0.4 ? "rgba(215, 255, 74, " : "rgba(255, 255, 255, ",
          maxLife: Math.random() * 120 + 80,
          life: 0,
          alpha: 1,
        });
      }

      // Update and render
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life += 1;
        if (p.life >= p.maxLife) return false;

        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha = 1 - p.life / p.maxLife;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();

        // Optional high-perf glow effect
        if (p.size > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color + p.alpha * 0.15 + ")";
          ctx.fill();
        }

        return true;
      });

      animationFrameId = requestAnimationFrame(updateParticles);
    };

    animationFrameId = requestAnimationFrame(updateParticles);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate local mouse position inside container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);

      // Spawn mouse-trail particles (cap trail density to prevent lag)
      if (particlesRef.current.length < 150) {
        for (let i = 0; i < 2; i++) {
          particlesRef.current.push({
            x,
            y,
            size: Math.random() * 2.5 + 1.2,
            speedX: (Math.random() - 0.5) * 1.8,
            speedY: (Math.random() - 0.5) * 1.8 - 0.3,
            color: Math.random() > 0.6 ? "rgba(215, 255, 74, " : "rgba(255, 255, 255, ",
            maxLife: Math.random() * 35 + 20,
            life: 0,
            alpha: 1,
          });
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  // Social proof stats are managed by the imported SocialProof component

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative min-h-[92vh] md:min-h-screen bg-transparent flex flex-col justify-center items-center px-6 pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden select-none scroll-mt-0"
      id="hero"
    >
      {/* Background Video (showing original color) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260411_104032_69319010-2458-492b-b04d-b40a5dfa4482.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Subtle modern dark gradient overlays to smoothly integrate with the rest of the dark site design while keeping original video colors in the center */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-transparent" />
        {/* Strong bottom vignette/gradient to smoothly blend the sharp video edge into the dark background (#050505) */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
        {/* Soft side vignette to keep focus on the center and blend horizontal edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050505]/40 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050505]/40 to-transparent" />
      </div>

      {/* Cinematic Mouse & Ambient Particle Trail Overlay */}
      <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-[5] w-full h-full"
      />

      {/* 2. Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ x: parallaxX, y: parallaxY }}
        className="relative max-w-4xl mx-auto text-center z-10 flex flex-col items-center px-4"
      >

        {/* Editor Badge */}
        <motion.div
          variants={badgeVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#050505]/85 border border-brand-green/30 backdrop-blur-xl mb-6 hover:bg-[#050505]/95 hover:border-brand-green/60 transition-all duration-500 shadow-[0_6px_24px_rgba(0,0,0,0.8),_inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(215,255,74,0.3)]"
          id="hero-badge"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-gray-200 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-brand-green animate-pulse" /> Hello! I'm a Video Editor
          </span>
        </motion.div>

        {/* Big Personal Title */}
        <motion.div
          variants={itemVariants}
          className="mb-2.5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
          id="hero-greeting"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400 block mb-1">Director's Cut Portfolio</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
            Yo! I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-[#ecffb0] to-white drop-shadow-[0_2px_10px_rgba(215,255,74,0.2)]">Aditya</span>
          </h1>
        </motion.div>

        {/* Hero Headline */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white max-w-3xl leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
          id="hero-headline"
        >
          Creating Videos That <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-[#eaff9e] to-brand-green font-extrabold relative inline-block drop-shadow-[0_2px_15px_rgba(215,255,74,0.3)]">People Actually Watch</span>.
        </motion.h2>

        {/* Sub-headline glassmorphic card */}
        <motion.div
          variants={itemVariants}
          className="mt-6 p-5 rounded-xl bg-black/45 border border-white/10 backdrop-blur-md max-w-xl text-center shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          id="hero-subheadline-card"
        >
          <p
            className="text-sm sm:text-base text-gray-300 font-sans font-normal leading-relaxed"
            id="hero-subheadline"
          >
            Professional Video Editor &amp; Motion Graphics Designer helping creators,
            brands and businesses produce high-performing content that commands attention and drives results.
          </p>
          <div className="flex justify-center gap-5 mt-3 pt-3 border-t border-white/5 text-gray-400 text-[11px] font-mono">
            <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-brand-green" /> Video Editor</span>
            <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-brand-purple" /> Motion Graphics</span>
            <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-brand-green" /> Graphic Design</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-sm sm:max-w-none"
          id="hero-buttons"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBookCall}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-brand-green text-bg-dark font-heading font-extrabold text-xs tracking-wider transition-all duration-300 shadow-[0_8px_20px_rgba(215,255,74,0.25)] hover:shadow-[0_15px_30px_rgba(215,255,74,0.45)] flex items-center justify-center gap-2 group cursor-pointer hover-shine border border-white/5"
            id="cta-book-call-hero"
          >
            <Play className="w-3.5 h-3.5 fill-bg-dark text-bg-dark group-hover:scale-110 transition-transform duration-300" />
            Book a free call!
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExplorePortfolio}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-purple/40 text-white font-heading font-semibold text-xs tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-md relative overflow-hidden backdrop-blur-md"
            id="cta-view-portfolio-hero"
          >
            <div className="absolute inset-0 bg-brand-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-md" />
            <span className="relative z-10 flex items-center gap-2">
              Explore Projects
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-1 group-hover:text-brand-purple transition-all duration-300" />
            </span>
          </motion.button>
        </motion.div>


        {/* Premium Social Proof Section instead of simple grid */}
        <motion.div variants={itemVariants} className="w-full mt-16 md:mt-24 max-w-3xl" id="hero-stats-grid">
          <SocialProof />
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          variants={scrollIndicatorVariants}
          className="mt-8 flex flex-col items-center gap-2 text-gray-500 cursor-pointer hover:text-white transition-colors"
          onClick={onExplorePortfolio}
          id="hero-scroll-indicator"
        >
          <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-gray-400">Scroll to explore</span>
          <div className="w-4.5 h-7 rounded-full border border-gray-600 flex justify-center p-1 bg-black/20 backdrop-blur-[1px]">
            <motion.div
              animate={{
                y: [0, 6, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-1 rounded-full bg-brand-green"
            />
          </div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}
