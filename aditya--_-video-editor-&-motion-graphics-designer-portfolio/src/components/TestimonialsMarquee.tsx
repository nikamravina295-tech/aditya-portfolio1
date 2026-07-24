import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimationControls, useMotionValue } from "motion/react";
import ClientCard, { TestimonialType } from "./ClientCard";
import { testimonials } from "../data";

// Enrich testimonials with country flags and video options
const enrichedTestimonials: TestimonialType[] = [
  {
    id: "t-1",
    name: "Manoj Chopra",
    role: "Tech UGC Creator",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
    content: "Fast delivery with excellent quality. Even with a short deadline, you managed everything smoothly and delivered a high-quality edit. Great communication and professional work. Our watch time on YouTube spiked by 35%!",
    rating: 5,
    countryFlag: "🇺🇸",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-smartphone-filming-cinematic-video-41584-large.mp4"
  },
  {
    id: "t-2",
    name: "Payal",
    role: "Lifestyle & Travel Creator",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80",
    content: "After using your editing service, my content quality improved a lot. My audience engagement also increased significantly. I really appreciate your creativity and meticulous attention to sound effects!",
    rating: 5,
    countryFlag: "🇮🇳",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-set-of-vertical-cinematic-videos-of-nature-and-city-43093-large.mp4"
  },
  {
    id: "t-3",
    name: "Manoj Jha",
    role: "Founder",
    company: "SaaS Builder Co.",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
    content: "One of the best editing services I have used so far. The quality, speed, and creativity are all top-notch. Looking forward to working with you long term to produce our monthly marketing video ads and tutorials.",
    rating: 5,
    countryFlag: "🇬🇧"
  },
  {
    id: "t-4",
    name: "Ruchi Sharma",
    role: "Host",
    company: "MindTalk Podcast",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    content: "This is one of the most reliable editors I have ever worked with. The quality of multi-camera switching, clarity of sound denoising, and outstanding background soundtracks was remarkable!",
    rating: 5,
    countryFlag: "🇦🇺"
  },
  {
    id: "t-5",
    name: "David Miller",
    role: "Executive Producer",
    company: "Apex Media",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
    content: "Unbelievable pacing and storytelling. He takes our raw podcast recordings and crafts them into cinematic masterpieces that keep viewers hooked from the first second to the very end.",
    rating: 5,
    countryFlag: "🇨🇦"
  }
];

interface TestimonialsMarqueeProps {
  onPlayVideo: (url: string) => void;
}

export default function TestimonialsMarquee({ onPlayVideo }: TestimonialsMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  // We duplicate the testimonials list to create an endless horizontal marquee.
  // 4 duplicates ensures there is plenty of content to fill even ultra-wide monitors.
  const repeatedTestimonials = [
    ...enrichedTestimonials,
    ...enrichedTestimonials,
    ...enrichedTestimonials,
    ...enrichedTestimonials
  ];

  return (
    <div className="w-full overflow-hidden py-4 relative select-none cursor-grab active:cursor-grabbing">
      {/* Edge gradient overlays for beautiful fading transparency */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

      {/* Styled self-contained CSS marquee for maximum performance and touch scrolling */}
      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          gap: 2rem;
          animation: marqueeScroll 35s linear infinite;
        }
        .marquee-track:hover, .marquee-track-paused {
          animation-play-state: paused;
        }
      `}</style>

      {/* Marquee Track Container */}
      <div 
        ref={containerRef}
        className={`marquee-track ${isPaused ? "marquee-track-paused" : ""}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {repeatedTestimonials.map((testimonial, idx) => (
          <ClientCard 
            key={`${testimonial.id}-${idx}`}
            testimonial={testimonial}
            onPlayVideo={onPlayVideo}
          />
        ))}
      </div>
    </div>
  );
}
