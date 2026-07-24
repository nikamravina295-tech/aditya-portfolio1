import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import PortfolioCard from "./PortfolioCard";
import NavigationArrows from "./NavigationArrows";
import { Project } from "../data";

interface PortfolioCarouselProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function PortfolioCarousel({
  projects,
  onSelectProject,
}: PortfolioCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [isDragging, setIsDragging] = useState(false);

  // Keep track of resize to update spacing responsively
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const numProjects = projects.length;

  // Reset or clamp index when category/projects list changes
  useEffect(() => {
    if (currentIndex >= numProjects && numProjects > 0) {
      setCurrentIndex(0);
    }
  }, [numProjects, currentIndex]);

  // Next slide handler (infinite loop)
  const handleNext = () => {
    if (numProjects === 0) return;
    setCurrentIndex((prev) => (prev + 1) % numProjects);
  };

  // Prev slide handler (infinite loop)
  const handlePrev = () => {
    if (numProjects === 0) return;
    setCurrentIndex((prev) => (prev - 1 + numProjects) % numProjects);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [numProjects]);

  if (numProjects === 0) return null;

  // Drag handlers for swipe gestures
  const dragThreshold = 40;
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -dragThreshold || velocity < -250) {
      handleNext();
    } else if (offset > dragThreshold || velocity > 250) {
      handlePrev();
    }

    // Delay clearing drag state so click event on card is suppressed
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };

  // Helper to calculate relative distance index in infinite loop
  const getRelativePosition = (index: number) => {
    let diff = index - currentIndex;
    const half = Math.floor(numProjects / 2);

    if (diff > half) {
      diff -= numProjects;
    } else if (diff < -half) {
      diff += numProjects;
    }
    return diff;
  };

  // Spacing calculation for carousel positioning
  const getXOffset = (posIndex: number) => {
    let spacing = 400; // default desktop
    if (windowWidth < 1280) spacing = 340;
    if (windowWidth < 1024) spacing = 290;
    if (windowWidth < 768) spacing = 260;
    if (windowWidth < 640) spacing = Math.min(windowWidth * 0.72, 250); // smooth spacing on mobile

    return posIndex * spacing;
  };

  // Filter visible cards based on screen size to prevent clutter while keeping smooth slide animations
  const isCardVisible = (posIndex: number) => {
    if (windowWidth < 640) return Math.abs(posIndex) <= 1; // mobile: 3 rendered for smooth sliding
    if (windowWidth < 1024) return Math.abs(posIndex) <= 1; // tablet: 3 visible
    return Math.abs(posIndex) <= 2; // desktop: 5 visible
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none" id="portfolio-carousel-wrapper">
      
      {/* 1. Carousel Track */}
      <div className="relative w-full h-[550px] min-[380px]:h-[620px] sm:h-[680px] overflow-hidden flex items-center justify-center">
        
        {/* Unified Draggable Carousel Container */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ touchAction: "pan-y" }}
          id="draggable-carousel-container"
        >
          {projects.map((project, index) => {
            const posIndex = getRelativePosition(index);
            const visible = isCardVisible(posIndex);

            // We render only visible cards to maintain 60 FPS performance
            if (!visible) return null;

            return (
              <motion.div
                key={project.id}
                style={{
                  position: "absolute",
                  x: getXOffset(posIndex),
                }}
                animate={{
                  x: getXOffset(posIndex),
                  scale: posIndex === 0 ? 1 : (windowWidth < 640 ? 0.8 : 0.85),
                  opacity: posIndex === 0 ? 1 : (windowWidth < 640 ? 0.35 : 0.65),
                  zIndex: posIndex === 0 ? 30 : 20 - Math.abs(posIndex),
                }}
                transition={{
                  type: "spring",
                  stiffness: 130,
                  damping: 22,
                  mass: 0.8,
                }}
                className="pointer-events-auto"
                id={`carousel-track-item-${index}`}
              >
                <PortfolioCard
                  project={project}
                  isActive={posIndex === 0}
                  positionIndex={posIndex}
                  isDragging={isDragging}
                  onClick={() => setCurrentIndex(index)}
                  onPlay={onSelectProject}
                />
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      {/* 2. Navigation Arrows */}
      <NavigationArrows
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* Pagination indicators */}
      <div className="flex gap-2 justify-center mt-6 z-20" id="carousel-indicators">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === idx 
                ? "w-6 bg-brand-green" 
                : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
