import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  currentIndex: number;
  totalCount: number;
}

export default function NavigationButtons({
  onPrev,
  onNext,
  canPrev,
  canNext,
  currentIndex,
  totalCount
}: NavigationButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 w-full max-w-[1200px] mx-auto mt-8 px-4 sm:px-6">
      {/* Index Progress Tracker */}
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-brand-green tracking-wider font-semibold">
          {String(currentIndex + 1).padStart(2, "0")}
        </span>
        <div className="h-[2px] w-24 sm:w-32 bg-white/[0.06] rounded-full overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full bg-brand-green transition-all duration-500 ease-out-expo"
            style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
          />
        </div>
        <span className="font-mono text-xs text-gray-500 tracking-wider">
          {String(totalCount).padStart(2, "0")}
        </span>
      </div>

      {/* Elegant Nav Arrows - Centered */}
      <div className="flex items-center gap-3 justify-center">
        <button
          onClick={onPrev}
          disabled={!canPrev}
          className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
            canPrev
              ? "bg-brand-green text-bg-dark border-brand-green shadow-[0_0_20px_rgba(215,255,74,0.3)] hover:bg-brand-green/90 hover:scale-105 active:scale-95 cursor-pointer"
              : "bg-brand-green/10 border-brand-green/20 text-brand-green/30 cursor-not-allowed opacity-40"
          }`}
          aria-label="Previous Project"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        </button>
        <button
          onClick={onNext}
          disabled={!canNext}
          className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
            canNext
              ? "bg-brand-green text-bg-dark border-brand-green shadow-[0_0_20px_rgba(215,255,74,0.3)] hover:bg-brand-green/90 hover:scale-105 active:scale-95 cursor-pointer"
              : "bg-brand-green/10 border-brand-green/20 text-brand-green/30 cursor-not-allowed opacity-40"
          }`}
          aria-label="Next Project"
        >
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
