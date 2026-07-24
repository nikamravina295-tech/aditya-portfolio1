import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { shortFormProjects, longFormProjects, featuredProjects, Project } from "../data";
import FilterTabs from "./FilterTabs";
import PortfolioCarousel from "./PortfolioCarousel";

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

interface FeaturedWorkProps {
  onSelectProject: (project: Project) => void;
}

export default function FeaturedWork({ onSelectProject }: FeaturedWorkProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Short Form",
    "Long Form",
    "SaaS",
    "Documentary",
    "Talking Head",
    "Commercial Ads",
    "Motion Graphics",
  ];

  // Combine and augment projects from data.ts (filter out empty/spacer cards)
  const allProjects = useMemo(() => {
    return [...featuredProjects, ...shortFormProjects, ...longFormProjects].filter(
      (project) => project.thumbnailUrl && project.thumbnailUrl.trim() !== ""
    );
  }, []);

  // Classification logic to populate categories beautifully
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return allProjects;

    return allProjects.filter((project) => {
      const titleLower = project.title.toLowerCase();
      const descLower = (project.description || "").toLowerCase();
      const categoryLower = project.category.toLowerCase();
      const swJoined = project.software.map(s => s.toLowerCase()).join(" ");

      switch (activeCategory) {
        case "Short Form":
          return (
            project.platform === "Instagram" ||
            project.platform === "TikTok" ||
            project.platform === "YouTube Shorts"
          );
        case "Long Form":
          return project.platform === "YouTube" && !titleLower.includes("doc");
        case "SaaS":
          return (
            titleLower.includes("saas") ||
            descLower.includes("saas") ||
            titleLower.includes("agency") ||
            titleLower.includes("tools") ||
            descLower.includes("productivity") ||
            titleLower.includes("biotech")
          );
        case "Documentary":
          return (
            titleLower.includes("documentary") ||
            descLower.includes("documentary") ||
            titleLower.includes("doc") ||
            categoryLower.includes("doc")
          );
        case "Talking Head":
          return (
            titleLower.includes("talking") ||
            descLower.includes("talking") ||
            titleLower.includes("podcast") ||
            categoryLower.includes("talking")
          );
        case "Commercial Ads":
          return (
            categoryLower.includes("branding") ||
            categoryLower.includes("promo") ||
            categoryLower.includes("ad") ||
            categoryLower.includes("campaign") ||
            project.client.toLowerCase().includes("co.") ||
            project.client.toLowerCase().includes("records") ||
            project.client.toLowerCase().includes("corp")
          );
        case "Motion Graphics":
          return (
            swJoined.includes("after effects") ||
            swJoined.includes("blender") ||
            categoryLower.includes("motion") ||
            categoryLower.includes("hud")
          );
        default:
          return true;
      }
    });
  }, [activeCategory, allProjects]);

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="pt-20 pb-12 px-6 sm:px-12 relative bg-transparent overflow-hidden select-none" 
      id="featured-work-section"
    >
      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto relative px-4" id="featured-header">
          {/* Subtle Ambient Radial Glow behind the title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-brand-green/8 rounded-full blur-[80px] pointer-events-none" />

          {/* Subtle Curated Label */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] mb-5 shadow-[inset_0_1px_12px_rgba(255,255,255,0.02)] backdrop-blur-sm relative z-10"
          >
            <Sparkles className="w-3 h-3 text-brand-green" />
            <span className="font-mono text-[9px] text-gray-300 uppercase tracking-[0.25em] font-bold">
              CURATED SHOWCASE
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5.5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white tracking-tight mb-5 leading-[1.1] relative z-10"
          >
            Explore My <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-emerald-400 to-brand-purple">
              Creative Portfolio
            </span>
          </motion.h2>

          {/* Minimalist gradient separator */}
          <motion.div 
            variants={itemVariants}
            className="h-[1px] bg-gradient-to-r from-transparent via-brand-green/30 to-transparent mx-auto mb-5 relative z-10 w-[60px]"
          />

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto relative z-10"
          >
            A high-performance collection of premium edits: viral short-form, immersive SaaS product animations, cinematic mini-documentaries, talking-heads, and strategic commercial ads designed to capture, retain, and convert.
          </motion.p>
        </div>



        {/* Horizontal Carousel Section */}
        <motion.div variants={itemVariants} className="w-full">
          {filteredProjects.length > 0 ? (
            <PortfolioCarousel
              projects={filteredProjects}
              onSelectProject={onSelectProject}
            />
          ) : (
            <div className="text-center py-24 text-gray-500 font-mono text-sm">
              No featured projects found in this category.
            </div>
          )}
        </motion.div>

      </div>
    </motion.section>
  );
}
