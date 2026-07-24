import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Sparkles } from "lucide-react";
import { faqs } from "../data";

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

export default function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    if (expandedIndex === idx) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(idx);
    }
  };

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-14 md:py-20 px-6 relative bg-transparent overflow-hidden scroll-mt-20" 
      id="faq"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-24" id="faq-header">
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 mb-4 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-green animate-pulse" />
            <span className="font-mono text-[10px] text-gray-300 uppercase tracking-widest font-semibold">
              Frequently Asked Questions
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-white mb-6"
          >
            Got <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-green">questions?</span> We've got answers.
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            Everything you need to know about the video production workflow, deliverables, revisions, retainers, and general timelines.
          </motion.p>
        </div>

        {/* Accordions Listing */}
        <div className="space-y-4" id="faq-accordions-container">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <motion.div
                variants={itemVariants}
                key={idx}
                className={`group rounded-2xl border transition-all duration-500 overflow-hidden relative ${
                  isExpanded
                    ? "border-brand-purple/30 bg-surface-dark/90 shadow-xl shadow-brand-purple/5"
                    : "border-white/5 bg-surface-dark/40 hover:border-white/10 hover:bg-surface-dark/60"
                }`}
                id={`faq-item-${idx}`}
              >
                {/* Active Left Indicator Strip */}
                <span 
                  className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 ease-out ${
                    isExpanded 
                      ? "bg-gradient-to-b from-brand-purple to-brand-green h-full" 
                      : "bg-transparent h-0"
                  }`} 
                />

                {/* Accordion Toggle Header */}
                <button
                  onClick={() => toggleExpand(idx)}
                  className="w-full px-6 sm:px-8 py-6 flex items-center justify-between text-left focus:outline-none cursor-pointer relative"
                  id={`faq-toggle-btn-${idx}`}
                >
                  <div className="flex items-center gap-5 pr-4">
                    {/* Unique Modern Number Indicator */}
                    <span className={`font-mono text-sm tracking-wider transition-colors duration-300 ${
                      isExpanded ? "text-brand-green font-bold" : "text-white/30 group-hover:text-white/60"
                    }`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className={`text-sm sm:text-base font-heading font-semibold transition-colors duration-300 ${
                      isExpanded ? "text-white" : "text-gray-300 group-hover:text-white"
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Styled Chevron container */}
                  <div className={`p-2 rounded-xl transition-all duration-300 flex-shrink-0 ${
                    isExpanded 
                      ? "bg-brand-purple/10 text-brand-purple" 
                      : "bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white"
                  }`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-500 ease-out ${
                      isExpanded ? "rotate-180" : "rotate-0"
                    }`} />
                  </div>
                </button>

                {/* Animated expander body */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 sm:px-8 pb-7 pt-1 border-t border-white/5 font-sans text-xs sm:text-sm text-gray-400 leading-relaxed pl-[4.5rem] pr-12">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

      </div>
    </motion.section>
  );
}
