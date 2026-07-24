import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import Navbar from "./components/Navbar";
import InteractiveHero from "./components/InteractiveHero";
import SkillsMarquee from "./components/SkillsMarquee";
import FeaturedWork from "./components/FeaturedWork";
import LongFormPortfolio from "./components/Portfolio/LongFormPortfolio";
import CreativeProcess from "./components/CreativeProcess";
import Testimonials from "./components/Testimonials";
import AboutMe from "./components/AboutMe";
import FAQSection from "./components/FAQSection";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";
import VideoModal from "./components/VideoModal";
import { Project } from "./data";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const isProgrammaticScroll = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  
  // Video Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  // Smooth scroll click handler
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      isProgrammaticScroll.current = true;
      setActiveSection(id);

      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // Clear the programmatic scroll flag after scroll finishes
      scrollTimeoutRef.current = window.setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 1000);
    }
  };

  // Scroll active section listener
  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;
      const scrollPosition = window.scrollY + 180; // offset for navbar height + buffer

      const sections = ["hero", "work", "process", "about", "faq"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Handle clicking a project to open the player
  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setSelectedVideoUrl(null); // Clear video override url
    setIsModalOpen(true);
  };

  // Handle clicking a testimonial video bubble
  const handleSelectVideoTestimonial = (url: string) => {
    setSelectedProject(null); // Clear project reference
    setSelectedVideoUrl(url); // Set direct mp4 override
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] selection:bg-brand-green selection:text-bg-dark overflow-x-hidden">
      
      {/* Dynamic noise layer for film grain look */}
      <div className="noise-overlay" />

      {/* Global Seamless Cyberpunk Grid, Glowing Spotlights, and Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" 
        />
        
        {/* Scattered Floating Sparks/Particles */}
        <div className="absolute top-[8%] left-[6%] w-2 h-2 rounded-full bg-brand-green animate-ping opacity-30" />
        <div className="absolute top-[18%] right-[10%] w-1.5 h-1.5 rounded-full bg-brand-purple animate-ping opacity-40 [animation-delay:1.2s]" />
        <div className="absolute top-[32%] left-[12%] w-2 h-2 rounded-full bg-white animate-pulse opacity-25" />
        <div className="absolute top-[48%] right-[8%] w-2 h-2 rounded-full bg-brand-green animate-ping opacity-30 [animation-delay:1.8s]" />
        <div className="absolute top-[62%] left-[8%] w-1.5 h-1.5 rounded-full bg-brand-purple animate-ping opacity-40 [animation-delay:0.6s]" />
        <div className="absolute top-[78%] right-[14%] w-2 h-2 rounded-full bg-white animate-pulse opacity-25" />
        <div className="absolute top-[92%] left-[10%] w-2 h-2 rounded-full bg-brand-green animate-ping opacity-35 [animation-delay:2.2s]" />

        {/* Global Continuous Atmospheric Aura Flows */}
        <div className="absolute top-[5%] left-1/4 w-[750px] h-[750px] bg-brand-green/2 rounded-full blur-[190px]" />
        <div className="absolute top-[22%] right-1/4 w-[850px] h-[850px] bg-brand-purple/3 rounded-full blur-[220px] animate-pulse [animation-duration:15s]" />
        <div className="absolute top-[46%] left-1/3 w-[750px] h-[750px] bg-brand-green/2 rounded-full blur-[200px]" />
        <div className="absolute top-[68%] right-1/3 w-[800px] h-[800px] bg-brand-purple/2.5 rounded-full blur-[210px]" />
        <div className="absolute bottom-[2%] left-1/4 w-[650px] h-[650px] bg-brand-green/1.5 rounded-full blur-[170px]" />
      </div>

      {/* Sticky Top Header */}
      <Navbar activeSection={activeSection} onNavClick={handleNavClick} />

      {/* Immersive Main Sections */}
      <InteractiveHero
        onExplorePortfolio={() => handleNavClick("work")}
        onBookCall={() => handleNavClick("about")}
      />

      <SkillsMarquee />

      {/* Showcase Wrapper */}
      <motion.div 
        id="work"
        className="scroll-mt-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <FeaturedWork onSelectProject={handleSelectProject} />
        <LongFormPortfolio />
      </motion.div>

      <CreativeProcess />

      <Testimonials onSelectVideoTestimonial={handleSelectVideoTestimonial} />

      <AboutMe />

      <FAQSection />

      <ContactCTA />

      <Footer />

      {/* Custom Global Video Player Modal Overlay */}
      <VideoModal
        isOpen={isModalOpen}
        project={selectedProject}
        videoUrl={selectedVideoUrl}
        onClose={handleCloseModal}
      />

    </div>
  );
}
