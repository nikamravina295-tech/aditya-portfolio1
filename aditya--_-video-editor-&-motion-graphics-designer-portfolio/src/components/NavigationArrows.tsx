import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigationArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}

export default function NavigationArrows({
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
}: NavigationArrowsProps) {
  return (
    <div className="flex items-center gap-6 justify-center mt-12" id="portfolio-nav-arrows">
      {/* Prev Button */}
      <motion.button
        whileHover={!prevDisabled ? { scale: 1.1, boxShadow: "0 0 30px rgba(215,255,74,0.5)" } : {}}
        whileTap={!prevDisabled ? { scale: 0.95 } : {}}
        onClick={onPrev}
        disabled={prevDisabled}
        className={`w-[60px] h-[60px] rounded-full flex items-center justify-center border transition-all duration-300 group cursor-pointer focus:outline-none ${
          prevDisabled 
            ? "bg-brand-green/10 border-brand-green/20 text-brand-green/30 cursor-not-allowed" 
            : "bg-brand-green text-bg-dark border-brand-green shadow-[0_0_25px_rgba(215,255,74,0.35)] hover:bg-brand-green/90"
        }`}
        aria-label="Previous Project"
        id="nav-arrow-prev"
      >
        <ArrowLeft className="w-5 h-5 stroke-[2.5] text-bg-dark transition-transform duration-300 group-hover:-translate-x-1.5" />
      </motion.button>

      {/* Next Button */}
      <motion.button
        whileHover={!nextDisabled ? { scale: 1.1, boxShadow: "0 0 30px rgba(215,255,74,0.5)" } : {}}
        whileTap={!nextDisabled ? { scale: 0.95 } : {}}
        onClick={onNext}
        disabled={nextDisabled}
        className={`w-[60px] h-[60px] rounded-full flex items-center justify-center border transition-all duration-300 group cursor-pointer focus:outline-none ${
          nextDisabled 
            ? "bg-brand-green/10 border-brand-green/20 text-brand-green/30 cursor-not-allowed" 
            : "bg-brand-green text-bg-dark border-brand-green shadow-[0_0_25px_rgba(215,255,74,0.35)] hover:bg-brand-green/90"
        }`}
        aria-label="Next Project"
        id="nav-arrow-next"
      >
        <ArrowRight className="w-5 h-5 stroke-[2.5] text-bg-dark transition-transform duration-300 group-hover:translate-x-1.5" />
      </motion.button>
    </div>
  );
}
