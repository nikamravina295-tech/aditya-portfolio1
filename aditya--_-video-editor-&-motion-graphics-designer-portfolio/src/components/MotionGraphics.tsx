import { useState, useRef, MouseEvent, TouchEvent } from "react";
import { motion } from "motion/react";
import { Sliders, Sparkles, Move, Zap, Play } from "lucide-react";
import { motionShowcase } from "../data";

export default function MotionGraphics() {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="py-16 px-6 relative bg-[#050505]" id="motiongraphics">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6" id="motion-header">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-brand-green" />
              <span className="font-mono text-xs text-brand-green uppercase tracking-widest font-semibold">
                Dynamic VFX &amp; 3D tracking
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
              Motion Graphics <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-pink-500">Showcase</span>
            </h2>
          </div>
          <p className="text-gray-400 font-sans max-w-md text-sm sm:text-base leading-relaxed">
            Witness the transformations. Interactive slider comparisons showing flat, raw footage morphing into rich 3D dynamic environments.
          </p>
        </div>

        {/* Interactive Before/After Section Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="motion-interactive-container">
          
          {/* Left Column: Interactive Slider Container */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-brand-green animate-bounce" /> Drag the handle left or right to compare
            </span>

            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onTouchEnd={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] select-none cursor-ew-resize"
              id="before-after-slider-box"
            >
              {/* "After" Image (Background - fills container completely) */}
              <img
                src={motionShowcase[0].thumbnailAfter}
                alt="After VFX"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* Overlay: "Before" Image (Clipped dynamically based on sliderPosition) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                {/* Notice the width: containerRef's width * (sliderPosition/100).
                    We must ensure the image is NOT scaled by setting a fixed width equal to the parent. */}
                <div className="absolute inset-0 w-full aspect-video">
                  <img
                    src={motionShowcase[0].thumbnailBefore}
                    alt="Before VFX"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none filter grayscale opacity-80"
                    style={{
                      width: containerRef.current ? `${containerRef.current.getBoundingClientRect().width}px` : "100%",
                      maxWidth: "none"
                    }}
                  />
                </div>
              </div>

              {/* Overlay Labels (Static) */}
              <span className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] font-mono uppercase tracking-widest text-gray-400 z-10 border border-white/5">
                Before: RAW Map
              </span>
              <span className="absolute bottom-4 right-4 px-3 py-1 bg-brand-green/80 backdrop-blur-md rounded text-[10px] font-mono uppercase tracking-widest text-bg-dark font-extrabold z-10 border border-white/5">
                After: 3D tracked HUD
              </span>

              {/* Slider Split Line Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-brand-green pointer-events-none z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Circular slider grip icon */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-green text-bg-dark shadow-[0_0_20px_rgba(215,255,74,0.6)] flex items-center justify-center border-2 border-white pointer-events-none">
                  <Move className="w-5 h-5 text-bg-dark" />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Case description & extra details */}
          <div className="lg:col-span-5 space-y-6" id="motion-case-text">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20">
              <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-purple">
                Motion Analytics case
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white leading-tight">
              {motionShowcase[0].title}
            </h3>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              {motionShowcase[0].description}
            </p>

            {/* Bullet list features */}
            <ul className="space-y-3.5 text-xs text-gray-300 font-sans">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                <span>Camera path solving &amp; high-precision 3D tracker markers</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                <span>Dynamic lighting matches, chromatic aberration and lens glow</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                <span>Seamless Adobe After Effects to Illustrator vector alignments</span>
              </li>
            </ul>

            {/* Mini active thumbnail showcasing other elements */}
            <div className="p-4 rounded-2xl bg-card-dark/40 border border-white/5 flex gap-4 items-center">
              <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-black flex-shrink-0">
                <img
                  src={motionShowcase[1].thumbnailAfter}
                  alt={motionShowcase[1].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-75"
                />
                <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-brand-green fill-brand-green" />
              </div>
              <div>
                <p className="text-xs font-bold text-white line-clamp-1">{motionShowcase[1].title}</p>
                <p className="text-[10px] font-mono text-gray-500">{motionShowcase[1].category}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
