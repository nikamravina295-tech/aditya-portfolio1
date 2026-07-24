import { useState, useEffect } from "react";
import { Menu, X, Sparkles, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  activeSection: string;
  onNavClick: (id: string) => void;
}

export default function Navbar({ activeSection, onNavClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "work", label: "Work" },
    { id: "process", label: "Process" },
    { id: "about", label: "About" },
    { id: "faq", label: "FAQ" }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "py-3 md:py-4 px-4 md:px-8"
          : "py-6 px-6"
      }`}
      id="main-nav"
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-500 ease-in-out w-full ${
          isScrolled
            ? "max-w-5xl bg-surface-dark/85 backdrop-blur-md border border-brand-green/35 rounded-full px-6 py-2 shadow-[0_0_30px_rgba(215,255,74,0.18),0_12px_40px_rgba(0,0,0,0.5)] hover:border-brand-green/50 hover:shadow-[0_0_40px_rgba(215,255,74,0.25),0_12px_40px_rgba(0,0,0,0.5)]"
            : "max-w-7xl bg-transparent border-transparent px-2 py-0"
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => onNavClick("hero")}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
          id="nav-logo"
        >
          <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-surface-dark group-hover:scale-105 transition-transform duration-300">
            <img
              src="https://lh3.googleusercontent.com/d/1Lzw_kLpEL-0bHOItqE0Q9p9kNsiiTSDt"
              alt="Aditya"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-heading font-extrabold text-sm tracking-[0.14em] bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-brand-green transition-all duration-300 block leading-none whitespace-nowrap">
              ADITYA SHINDE
            </span>
            <span className="text-[7.5px] text-gray-400 font-mono tracking-[0.28em] block uppercase group-hover:text-brand-purple transition-all duration-300 mt-1">
              Video & Motion
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <div
          className={`hidden md:flex items-center gap-1 transition-all duration-500 ${
            isScrolled
              ? "bg-transparent border-transparent"
              : "bg-surface-dark/50 border border-white/5 backdrop-blur-sm"
          } px-2 py-1 rounded-full`}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className={`relative px-4 py-2 rounded-full font-heading text-xs tracking-wide transition-colors duration-200 focus:outline-none ${
                activeSection === item.id
                  ? "text-bg-dark font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
              id={`nav-link-${item.id}`}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNavBackground"
                  className="absolute inset-0 bg-brand-green rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => onNavClick("about")}
            className="flex items-center gap-2 bg-brand-green text-bg-dark hover:bg-white hover:text-bg-dark font-heading text-xs font-semibold px-5 py-2 rounded-full transition-all duration-300 group focus:outline-none shadow-md shadow-brand-green/10 hover:shadow-xl hover:shadow-brand-green/20"
            id="nav-cta-hire"
          >
            <Sparkles className="w-3.5 h-3.5 text-bg-dark group-hover:animate-pulse" />
            Hire Me
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2.5 rounded-full bg-surface-dark border border-white/5 text-gray-400 hover:text-white focus:outline-none flex items-center justify-center transition-all duration-300 hover:border-brand-green/30"
          id="mobile-nav-toggle"
        >
          <svg width="20" height="20" viewBox="0 0 22 22" className="text-white">
            <motion.path
              fill="transparent"
              strokeWidth="2.2"
              stroke="currentColor"
              strokeLinecap="round"
              variants={{
                closed: { d: "M 2 5 L 20 5" },
                open: { d: "M 4 18 L 18 4" }
              }}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.path
              fill="transparent"
              strokeWidth="2.2"
              stroke="currentColor"
              strokeLinecap="round"
              d="M 2 11 L 20 11"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
            <motion.path
              fill="transparent"
              strokeWidth="2.2"
              stroke="currentColor"
              strokeLinecap="round"
              variants={{
                closed: { d: "M 2 17 L 20 17" },
                open: { d: "M 4 4 L 18 18" }
              }}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </svg>
        </button>
      </div>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden absolute top-full left-4 right-4 mt-2 bg-surface-dark/95 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl z-50 overflow-hidden"
              id="mobile-nav-drawer"
            >
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavClick(item.id);
                      setIsOpen(false);
                    }}
                    className={`text-left py-3 px-4 rounded-xl font-heading text-sm transition-all flex items-center justify-between active:scale-[0.99] ${
                      activeSection === item.id
                        ? "bg-brand-green/10 text-brand-green font-bold border border-brand-green/20"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                    id={`mobile-nav-link-${item.id}`}
                  >
                    <span>{item.label}</span>
                    {activeSection === item.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                    )}
                  </button>
                ))}
                <button
                  onClick={() => {
                    onNavClick("about");
                    setIsOpen(false);
                  }}
                  className="w-full mt-2 flex items-center justify-center gap-2 bg-brand-green text-bg-dark font-heading text-sm font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-brand-green/15 active:scale-[0.98]"
                  id="mobile-nav-cta"
                >
                  <Sparkles className="w-4 h-4 fill-bg-dark" />
                  Hire Me / Book a Call
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
