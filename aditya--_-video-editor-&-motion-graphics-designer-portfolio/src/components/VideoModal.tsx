import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Bot, Image, Video, Layers, Music, Figma, Mic } from "lucide-react";
import { Project } from "../data";

const getSoftwareIcon = (name: string) => {
  const norm = name.toLowerCase();
  if (norm.includes("gemini") || norm.includes("gamini")) return <Sparkles className="w-2.5 h-2.5 text-brand-green" />;
  if (norm.includes("chatgpt") || norm.includes("gpt") || norm.includes("chart gpt")) return <Bot className="w-2.5 h-2.5 text-[#10a37f]" />;
  if (norm.includes("photoshop")) return <Image className="w-2.5 h-2.5 text-blue-400" />;
  if (norm.includes("after effects") || norm.includes("after effect")) return <Layers className="w-2.5 h-2.5 text-purple-400" />;
  if (norm.includes("premiere")) return <Video className="w-2.5 h-2.5 text-purple-500" />;
  if (norm.includes("epidemic sound") || norm.includes("sound") || norm.includes("music")) return <Music className="w-2.5 h-2.5 text-rose-400" />;
  if (norm.includes("figma")) return <Figma className="w-2.5 h-2.5 text-amber-500" />;
  if (norm.includes("elevenlabs") || norm.includes("eleven labs") || norm.includes("voice")) return <Mic className="w-2.5 h-2.5 text-cyan-400" />;
  return <Layers className="w-2.5 h-2.5 text-gray-400" />;
};

interface VideoModalProps {
  isOpen: boolean;
  project: Project | null;
  videoUrl: string | null; // direct video clip url for testimonial or override
  onClose: () => void;
}

export default function VideoModal({ isOpen, project, videoUrl, onClose }: VideoModalProps) {
  const finalVideoUrl =
    videoUrl ||
    (project
      ? project.youtubeId
        ? `https://www.youtube.com/watch?v=${project.youtubeId}`
        : project.videoUrl
      : "");

  const isVertical = project
    ? project.platform === "Instagram" ||
      project.platform === "TikTok" ||
      project.platform === "YouTube Shorts"
    : false;

  const hasYouTube = !!project?.youtubeId;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && finalVideoUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4">
          
          {/* Heavy Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal content container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`relative w-full ${isVertical ? "max-w-[380px] sm:max-w-[420px]" : "max-w-4xl"} max-h-[92vh] bg-card-dark border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col`}
            id="video-player-modal"
          >
            
            {/* Header section */}
            <div className="px-4 sm:px-6 py-2.5 border-b border-white/5 flex items-center justify-between bg-surface-dark flex-shrink-0">
              <div className="text-[11px] sm:text-sm font-mono tracking-wider text-brand-green uppercase font-bold truncate max-w-[80%]" id="video-frame-label">
                {project?.id === "lf-3" ? "Prodcast Cinematic Short-Film edits" : project?.id === "feat-2" ? "Devin Jatho style edits" : project?.id === "lf-4" ? "Viral 3D Saas Editing" : project?.id === "lf-2" ? "Cinematic Short-Film edits" : project?.id === "sf-3" ? "Viral podcast hook edits" : project?.id === "sf-1" ? "talking head video edits" : project?.id === "feat-1" || project?.id === "lf-doc-1" || project?.id === "lf-1" ? "3d camera parallax edits" : "Talking head edits"}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-brand-green border border-white/5 text-gray-400 transition-all focus:outline-none"
                  id="modal-close-btn"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

             {/* Video Screen stage */}
            <div className={`relative ${isVertical ? "aspect-[9/16] max-h-[68vh] sm:max-h-[75vh] w-full mx-auto" : "aspect-video max-h-[75vh]"} bg-black flex items-center justify-center overflow-hidden flex-1`}>
              {hasYouTube ? (
                <iframe
                  src={`https://www.youtube.com/embed/${project?.youtubeId}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=1`}
                  title={project?.title}
                  className="w-full h-full absolute inset-0 border-0 z-10"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  src={finalVideoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                  id="modal-html5-video"
                />
              )}
            </div>

            {/* Info and Tech details (only if project object is supplied) */}
            {project && (
              <div className="p-3 sm:p-4 bg-surface-dark/40 border-t border-white/5 flex flex-col md:flex-row justify-end gap-3" id="modal-project-details">
                <div className="space-y-2 flex-shrink-0 w-full">
                  <div className="flex flex-wrap gap-2">
                    {(project.software || []).map((sw, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-gray-300 bg-white/5 border border-white/[0.06] hover:border-white/15 px-2 py-1 rounded-lg transition-colors"
                      >
                        {getSoftwareIcon(sw)}
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
