import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, ArrowRight, Award, Eye, Flame, Layers, ExternalLink, Mail, ArrowUpRight, MessageCircle, FileText, Linkedin, Check } from "lucide-react";

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

export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Copy email to clipboard as guaranteed fallback
    navigator.clipboard.writeText("aditya129shinde@gmail.com").then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    }).catch(() => {});
  };

  // Parallax / Scroll animations for cinematic entries
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.6, 1, 1, 0.6]);

  // Spotlight coordinates handler for portrait card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const quickStats = [
    { label: "Total Views Generated", value: "25M+", icon: Eye, color: "text-brand-green", desc: "Across Instagram and YT" },
    { label: "Years of Experience", value: "1.5+", icon: Flame, color: "text-orange-400", desc: "Professional video editing" },
    { label: "Premium Projects Done", value: "100+", icon: Award, color: "text-purple-400", desc: "Collaborating with elite creators" },
    { label: "Retention Rate Boost", value: "85%", icon: Layers, color: "text-cyan-400", desc: "Hook & pacing optimization" },
  ];

  return (
    <motion.section 
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-14 md:py-20 px-6 sm:px-12 relative bg-transparent overflow-hidden select-none scroll-mt-20" 
      id="about"
    >
      <motion.div 
        style={{ opacity: opacityTransform }}
        className="max-w-[1300px] mx-auto relative z-10"
      >
        {/* Ambient background glows */}
        <div className="absolute -top-12 -left-20 w-80 h-80 rounded-full bg-brand-green/5 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-16 -right-20 w-96 h-96 rounded-full bg-brand-purple/5 blur-[140px] pointer-events-none" />

        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-center lg:text-left relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-5 shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-brand-green" />
            <span className="font-mono text-[9px] text-gray-400 uppercase tracking-[0.25em] font-bold">
              Creative Biography
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white tracking-tight leading-[1.05]"
          >
            The Visionary Behind <br className="hidden sm:inline" />
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-emerald-400 to-lime-300">Cinematic Cut</span>
          </motion.h2>
        </div>

        {/* Bento-Style Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Portrait and Status (5 Cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            
            {/* Interactive Portrait Card */}
            <motion.div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative rounded-3xl overflow-hidden border border-white/[0.08] hover:border-brand-green/20 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-card-dark aspect-[4/5] cursor-pointer"
              id="about-portrait-card"
            >
              {/* Premium Glass Reflection Effect on hover */}
              <div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/0 via-white/[0.04] to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

              {/* Image with subtle hover zoom and high-contrast styling */}
              <img
                src="https://lh3.googleusercontent.com/d/1zgBT0tnQBhjp0ZIpXAy8uKO_4uifx6hC"
                alt="Aditya Portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-90 contrast-[1.02] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
              />

              {/* Gradient Shimmers & vignette layering */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-95 pointer-events-none" />
              <div className="absolute inset-0 bg-brand-green/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Spotlight overlay effect on hover */}
              {isHovered && (
                <div
                  className="absolute inset-0 pointer-events-none z-20 mix-blend-screen"
                  style={{
                    background: `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, rgba(215,255,74,0.12), transparent 80%)`,
                  }}
                />
              )}

              {/* Custom border glow stroke animation */}
              {isHovered && (
                <motion.div
                  animate={{
                    borderColor: [
                      "rgba(215, 255, 74, 0.2)",
                      "rgba(139, 92, 246, 0.35)",
                      "rgba(215, 255, 74, 0.2)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-3xl border border-brand-green/20 pointer-events-none z-30"
                />
              )}

              {/* Overlaid Float Status Badge inside portrait card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 sm:p-5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/[0.08] flex items-center justify-between z-10 shadow-xl">
                <div>
                  <p className="text-sm font-heading font-black text-white tracking-wide">Aditya Shinde</p>
                  <p className="text-[9px] font-mono text-brand-green uppercase tracking-wider mt-0.5">Editor &amp; Motion Designer</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-green/10 text-brand-green font-mono text-[9px] font-bold border border-brand-green/20 tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" /> INDIA 🇮🇳
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Bio details and Stats Cards (7 Cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-10" id="about-info-panel">
            
            {/* The main bio text blocks with gorgeous typographies */}
            <div className="space-y-6">
              <p className="text-white font-sans text-lg sm:text-xl font-light leading-relaxed tracking-wide">
                My name is <span className="font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-emerald-400 to-white">Aditya</span>, a professional <span className="text-white font-semibold">Video Editor &amp; Motion Designer</span> based in India. I help creators, brands, and agencies transform raw footage into highly engaging, thumb-stopping digital experiences.
              </p>
              
              <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
                I specialize in high-retention short-form videos, TikToks, YouTube shorts, and cinematic long-form stories. By pairing flawless pacing with modern visual styles, custom colored keyword subtitles, sound mastery, and dynamic zoom frames, I help lower video drop-offs and drive outstanding audience metrics.
              </p>
              
              <div className="flex items-center gap-3 pt-2">
                <span className="w-6 h-px bg-brand-green/40" />
                <p className="text-brand-green font-heading font-bold text-[10px] tracking-[0.2em] uppercase">
                  Let’s build something extraordinary together.
                </p>
              </div>
            </div>

            {/* Quick stats bento grid */}
            <div className="grid grid-cols-2 gap-5 md:gap-6" id="about-quick-stats">
              {quickStats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -4, borderColor: "rgba(215,255,74,0.25)", backgroundColor: "rgba(255,255,255,0.01)" }}
                  className="p-5 sm:p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] transition-all duration-300 flex flex-col justify-between min-h-[130px] group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest leading-none">
                      {stat.label}
                    </span>
                    <stat.icon className={`w-3.5 h-3.5 ${stat.color} opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110`} />
                  </div>
                  <div className="mt-3">
                    <h4 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight leading-none">
                      {stat.value}
                    </h4>
                    <p className="text-[10px] text-gray-500 font-sans mt-2 line-clamp-1">
                      {stat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Luxurious Premium Contact Actions Grid */}
            <div className="mt-6 pt-6 border-t border-white/[0.04]" id="about-contact-section">
              <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2" id="about-contact-title">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green inline-block animate-pulse" />
                Contact Aditya
              </h3>
              
              {/* Elegant Visual Hierarchy Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3.5" id="about-action-links">
                
                {/* Primary Button - Chat on WhatsApp with Glow */}
                <motion.a
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(215,255,74,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/917447501235?text=Hi,%20I'm%20interested%20in%20your%20services."
                  target="_blank"
                  rel="noreferrer"
                  className="hover-shine px-6 py-3.5 rounded-xl bg-brand-green text-bg-dark font-heading font-black text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(215,255,74,0.08)] cursor-pointer"
                  id="cta-whatsapp-about"
                >
                  WhatsApp Us
                  <MessageCircle className="w-3.5 h-3.5 text-bg-dark" />
                </motion.a>

                {/* Secondary Button - Instagram in solid green style */}
                <motion.a
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(215,255,74,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  href="https://www.instagram.com/aady.fx/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover-shine px-6 py-3.5 rounded-xl bg-brand-green text-bg-dark font-heading font-black text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(215,255,74,0.08)] cursor-pointer"
                  id="cta-instagram-about"
                >
                  Instagram Chat
                  <ArrowUpRight className="w-3.5 h-3.5 text-bg-dark" />
                </motion.a>

                {/* LinkedIn Button */}
                <motion.a
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(215,255,74,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  href="https://www.linkedin.com/in/aditya-shinde-571b6a280/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover-shine px-6 py-3.5 rounded-xl bg-brand-green text-bg-dark font-heading font-black text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(215,255,74,0.08)] cursor-pointer"
                  id="cta-linkedin-about"
                >
                  LinkedIn
                  <Linkedin className="w-3.5 h-3.5 text-bg-dark" />
                </motion.a>

                {/* Tertiary Button - Email in solid green style */}
                <motion.a
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(215,255,74,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  href="mailto:aditya129shinde@gmail.com?subject=Video%20Editing%20Project%20Inquiry"
                  onClick={handleEmailClick}
                  className="hover-shine px-6 py-3.5 rounded-xl bg-brand-green text-bg-dark font-heading font-black text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(215,255,74,0.08)] cursor-pointer"
                  id="cta-email-about"
                >
                  {emailCopied ? (
                    <>
                      Email Copied!
                      <Check className="w-3.5 h-3.5 text-bg-dark" />
                    </>
                  ) : (
                    <>
                      Send Email
                      <Mail className="w-3.5 h-3.5 text-bg-dark" />
                    </>
                  )}
                </motion.a>

              </div>

            </div>

          </motion.div>

        </div>
      </motion.div>
    </motion.section>
  );
}

