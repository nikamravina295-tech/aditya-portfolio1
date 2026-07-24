import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Eye, Clock, Smartphone, Sparkles, Youtube, Instagram } from "lucide-react";
import { shortFormProjects, Project } from "../data";

interface ShortFormPortfolioProps {
  onSelectProject: (project: Project) => void;
}

export default function ShortFormPortfolio({ onSelectProject }: ShortFormPortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tiltX, setTiltX] = useState<number>(0);
  const [tiltY, setTiltY] = useState<number>(0);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const categories = ["All", "Infotainment & Tech", "Business & Finance", "Lifestyle", "Creative Industry"];

  const filteredProjects = selectedCategory === "All"
    ? shortFormProjects
    : shortFormProjects.filter(p => p.category.includes(selectedCategory) || p.title.includes(selectedCategory));

  const handleMouseEnter = (id: string) => {
    setHoveredId(id);
    const video = videoRefs.current[id];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;
    const normX = (x / width) - 0.5;
    const normY = (y / height) - 0.5;
    setTiltX(-normY * 12); // Maximum 12 degrees pitch
    setTiltY(normX * 12);  // Maximum 12 degrees yaw
  };

  const handleMouseLeave = (id: string) => {
    setHoveredId(null);
    setTiltX(0);
    setTiltY(0);
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
    }
  };

  return (
    <section className="py-16 px-6 relative bg-[#050505] overflow-hidden" id="shortform" style={{ contentVisibility: "auto" }}>
      {/* Soft radial glow behind heading */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Centered Heading */}
        <div className="text-center mb-16 max-w-3xl mx-auto" id="shortform-header">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs text-brand-green uppercase tracking-[0.25em] font-bold mb-4 block"
          >
            PORTFOLIO
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-white tracking-tight mb-6 leading-[1.1]"
          >
            All My <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400">Shortform</span> Content
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Professional edits crafted for Instagram Reels, YouTube Shorts and TikTok.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 pb-4 border-b border-white/5" id="shortform-filters">
          {categories.map((category, idx) => (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-xs font-mono tracking-wider transition-all duration-300 focus:outline-none whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-brand-green text-bg-dark font-bold shadow-[0_4px_20px_rgba(215,255,74,0.25)] border border-brand-green"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
              id={`filter-btn-${category.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Responsive 4-Column Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
          id="shortform-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isHovered = hoveredId === project.id;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  onMouseEnter={() => handleMouseEnter(project.id)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => handleMouseLeave(project.id)}
                  onClick={() => onSelectProject(project)}
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                  animate={{
                    scale: isHovered ? 1.03 : 1.0,
                    y: isHovered ? -8 : 0,
                    rotateX: isHovered ? tiltX : 0,
                    rotateY: isHovered ? tiltY : 0,
                  }}
                  className="group relative aspect-[9/16] rounded-[20px] overflow-hidden cursor-pointer bg-zinc-950 border border-white/8 transition-colors duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                  id={`reel-card-${project.id}`}
                >
                  {/* Subtle hover accent border glow */}
                  <div className="absolute inset-0 rounded-[20px] border border-brand-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none z-20" />

                  {/* Thumbnail Image with elegant zoom on hover */}
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
                      isHovered ? "scale-110 opacity-0" : "scale-100 opacity-100"
                    }`}
                  />

                  {/* Hover Autoplay Portrait Video Stream */}
                  <video
                    ref={(el) => { videoRefs.current[project.id] = el; }}
                    src={project.videoUrl}
                    loop
                    muted
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Bottom Vignette & Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-400" />

                  {/* Content Container (Frosted & Beautiful layout) */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                    
                    {/* Top tags */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md text-[10px] font-mono text-gray-300 px-2.5 py-1 rounded-full border border-white/5">
                        {project.platform === "Instagram" && <Instagram className="w-3 h-3 text-pink-500" />}
                        {project.platform.includes("Shorts") && <Youtube className="w-3 h-3 text-red-500" />}
                        {project.platform === "TikTok" && <Smartphone className="w-3 h-3 text-cyan-400" />}
                        {project.platform}
                      </span>
                      <span className="flex items-center gap-1 bg-brand-green/10 text-brand-green px-2.5 py-1 rounded-full text-[9px] font-mono font-bold border border-brand-green/20">
                        <Sparkles className="w-2.5 h-2.5" /> HOOKED
                      </span>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="space-y-3" id={`reel-meta-${project.id}`}>
                      
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-brand-green uppercase tracking-wider">
                          {project.client}
                        </span>
                        <h4 className="text-sm font-heading font-bold text-white leading-snug line-clamp-2">
                          {project.title}
                        </h4>
                      </div>

                      {/* Views, Software and Duration */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/5 text-[10px] text-gray-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-brand-green" /> {project.views} Views
                        </span>
                        <span className="text-white/20">•</span>
                        <span>{project.duration}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {project.software.slice(0, 2).map((sw, idx) => (
                          <span key={idx} className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-gray-400 font-mono">
                            {sw}
                          </span>
                        ))}
                      </div>

                      {/* Watch Project CTA showing up cleanly on hover */}
                      <div className="pt-2 overflow-hidden">
                        <div className="transform translate-y-0 sm:translate-y-8 sm:group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-start gap-1.5 text-xs font-mono font-bold text-brand-green">
                          <span className="w-5 h-5 rounded-full bg-brand-green text-bg-dark flex items-center justify-center text-[10px]">
                            ▶
                          </span>
                          Watch Project
                        </div>
                      </div>

                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state when no projects found */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-24 text-gray-500 font-mono text-sm" id="shortform-empty">
            No projects found in this category.
          </div>
        )}

      </div>
    </section>
  );
}
