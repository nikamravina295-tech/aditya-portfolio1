import React from "react";
import { Star } from "lucide-react";

export interface TestimonialType {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatarUrl: string;
  content: string;
  rating: number;
  countryFlag?: string;
  videoUrl?: string;
}

interface ClientCardProps {
  testimonial: TestimonialType;
  onPlayVideo?: (url: string) => void;
  key?: React.Key;
}

export default function ClientCard({ testimonial }: ClientCardProps) {
  return (
    <div
      className="w-[380px] h-auto min-h-[140px] flex-shrink-0 relative group flex flex-col justify-start gap-4 bg-white/[0.03] border border-white/[0.08] rounded-[24px] p-6 overflow-hidden select-none transition-all duration-500 ease-out hover:border-brand-green/30 hover:bg-white/[0.06] hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(215,255,74,0.08)] cursor-default"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Decorative subtle background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-brand-green/[0.01] group-hover:bg-brand-green/[0.03] rounded-full blur-[40px] transition-all duration-700 pointer-events-none" />

      {/* Top row: Rating Stars */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < testimonial.rating
                  ? "text-brand-green fill-brand-green"
                  : "text-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Middle row: Review Content (clamped) */}
      <p className="text-gray-300 font-sans text-xs sm:text-[13px] leading-relaxed italic line-clamp-4 relative z-10 select-text">
        "{testimonial.content}"
      </p>
    </div>
  );
}
