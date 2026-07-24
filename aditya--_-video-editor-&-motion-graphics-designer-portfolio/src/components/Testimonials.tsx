import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import TestimonialsMarquee from "./TestimonialsMarquee";

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

interface TestimonialsProps {
  onSelectVideoTestimonial: (url: string) => void;
}

export default function Testimonials({ onSelectVideoTestimonial }: TestimonialsProps) {
  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-14 md:py-20 px-6 relative bg-transparent overflow-hidden" 
      id="testimonials"
      style={{ contentVisibility: "auto" }}
    >
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* ================= SECTION 01: TESTIMONIALS ================= */}
        <div className="space-y-16 md:space-y-24">
          
          {/* Centered Heading with Blur Reveal & Word Stagger styling */}
          <div className="text-center max-w-2xl mx-auto space-y-4" id="testimonials-header">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-[0.25em] text-brand-green uppercase"
            >
              <Sparkles className="w-3 h-3 text-brand-green" /> TESTIMONIALS
            </motion.div>

            <motion.h2 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-white tracking-tight"
            >
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400">
                Clients
              </span>{" "}
              ❤️ Us
            </motion.h2>

            <motion.p 
              variants={itemVariants}
              className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed"
            >
              Trusted by creators, startups, agencies, and businesses worldwide.
            </motion.p>
          </div>

          {/* Continuous Testimonial Marquee */}
          <motion.div
            variants={itemVariants}
          >
            <TestimonialsMarquee onPlayVideo={onSelectVideoTestimonial} />
          </motion.div>

        </div>

      </div>
    </motion.section>
  );
}
