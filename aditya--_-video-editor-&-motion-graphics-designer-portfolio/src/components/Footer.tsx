import { useState } from "react";
import { motion } from "motion/react";
import { Mail, ArrowUp, Sparkles, Youtube, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    { icon: Youtube, url: "https://youtube.com", label: "YouTube", color: "hover:text-[#FF0000] hover:border-[#FF0000]/30 hover:bg-[#FF0000]/5" },
    { icon: Instagram, url: "https://instagram.com", label: "Instagram", color: "hover:text-[#E1306C] hover:border-[#E1306C]/30 hover:bg-[#E1306C]/5" },
    { icon: Linkedin, url: "https://www.linkedin.com/in/aditya-shinde-571b6a280/", label: "LinkedIn", color: "hover:text-[#0077B5] hover:border-[#0077B5]/30 hover:bg-[#0077B5]/5" },
    { icon: Twitter, url: "https://twitter.com", label: "Twitter", color: "hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/5" }
  ];

  return (
    <footer 
      className="bg-transparent pt-28 pb-16 px-6 sm:px-12 relative overflow-hidden" 
      id="main-footer"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Grid: Info, Navigation / Contact, and Socials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-white/5">
          
          {/* Column 1: Brand & vision (spanning 6 columns on desktop) */}
          <div className="lg:col-span-6 flex flex-col items-start gap-3">
            <div className="flex items-center gap-3">
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.05 }}
                className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-surface-dark"
              >
                <img
                  src="https://lh3.googleusercontent.com/d/1Lzw_kLpEL-0bHOItqE0Q9p9kNsiiTSDt"
                  alt="Aditya"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div>
                <span className="font-heading font-black text-base text-white tracking-widest leading-none">
                  ADITYA SHINDE
                </span>
                <span className="text-[9px] text-brand-green font-mono block tracking-widest mt-0.5 uppercase">
                  Video Editor
                </span>
              </div>
            </div>

            <p className="text-gray-400 font-sans text-sm max-w-sm leading-relaxed mt-1">
              Designing premium high-retention video stories and next-gen content blue-prints that capture, retain, and convert audiences worldwide.
            </p>
          </div>

          {/* Column 2: Direct CTA & Mail Contact (spanning 3 columns) */}
          <div className="lg:col-span-3 flex flex-col items-start gap-2">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              Inquiries
            </span>
            <a 
              href="mailto:aditya129shinde@gmail.com" 
              className="group flex items-center gap-2.5 text-sm font-sans text-gray-300 hover:text-white transition-colors duration-300"
            >
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-brand-green/30 group-hover:bg-brand-green/10 transition-all duration-300">
                <Mail className="w-4 h-4 text-brand-green" />
              </div>
              <span className="group-hover:underline underline-offset-4 decoration-brand-green">
                aditya129shinde@gmail.com
              </span>
            </a>
          </div>

          {/* Column 3: Custom Socials Box (spanning 3 columns) */}
          <div className="lg:col-span-3 flex flex-col items-start gap-2">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              Follow the journey
            </span>
            
            <div className="flex items-center gap-3 flex-wrap">
              {socials.map((social, idx) => {
                const Icon = social.icon;
                const isHovered = hoveredSocial === social.label;

                return (
                  <motion.a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    onMouseEnter={() => setHoveredSocial(social.label)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className={`p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 ${social.color} relative`}
                    id={`footer-social-${social.label.toLowerCase()}`}
                  >
                    <Icon className="w-4 h-4 relative z-10" />
                    
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded bg-surface-dark border border-white/10 text-[9px] font-mono text-white tracking-wider whitespace-nowrap pointer-events-none z-20"
                      >
                        {social.label}
                      </motion.span>
                    )}
                  </motion.a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          
          {/* Copyright block */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-purple animate-pulse" />
            <p className="text-xs text-gray-500 font-sans">
              © {new Date().getFullYear()} Aditya. All rights reserved. Crafted for visual creators.
            </p>
          </div>

          {/* Scroll Back to Top Trigger */}
          <motion.button
            onClick={handleScrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-brand-green/30 hover:bg-brand-green/5 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-brand-green transition-all duration-300 focus:outline-none cursor-pointer"
            id="footer-back-to-top-btn"
          >
            <span>Back to Top</span>
            <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-brand-green group-hover:text-bg-dark transition-all duration-300">
              <ArrowUp className="w-3.5 h-3.5 group-hover:animate-bounce" />
            </div>
          </motion.button>

        </div>

      </div>
    </footer>
  );
}

