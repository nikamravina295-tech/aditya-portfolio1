import React from "react";
import { motion } from "motion/react";

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: FilterTabsProps) {
  return (
    <div 
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 bg-white/[0.02] border border-white/[0.06] rounded-full backdrop-blur-md max-w-fit mx-auto"
      id="portfolio-filter-tabs"
    >
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className="relative px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-colors duration-300 focus:outline-none select-none cursor-pointer text-gray-400 hover:text-white"
            id={`filter-tab-${category.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilterBg"
                className="absolute inset-0 bg-brand-green text-bg-dark rounded-full shadow-[0_4px_15px_rgba(215,255,74,0.2)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className={`relative z-10 font-bold transition-colors duration-300 ${isActive ? "text-bg-dark font-black" : ""}`}>
              {category}
            </span>
          </button>
        );
      })}
    </div>
  );
}
