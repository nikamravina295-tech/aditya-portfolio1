import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Clock,
  Tv,
  Briefcase,
  Layers,
  Sparkles,
  ChevronDown,
  Image,
  Video,
  Music,
  Bot,
  Layout,
  PenTool,
  Sun,
  Box,
  Figma,
  Mic
} from "lucide-react";
import { LongFormProject } from "./portfolioData";

const getSoftwareIcon = (name: string) => {
  const norm = name.toLowerCase();
  if (norm.includes("gemini") || norm.includes("gamini")) return <Sparkles className="w-3.5 h-3.5 text-brand-green" />;
  if (norm.includes("chatgpt") || norm.includes("gpt") || norm.includes("chart gpt")) return <Bot className="w-3.5 h-3.5 text-[#10a37f]" />;
  if (norm.includes("photoshop")) return <Image className="w-3.5 h-3.5 text-blue-400" />;
  if (norm.includes("after effects") || norm.includes("after effect")) return <Layers className="w-3.5 h-3.5 text-purple-400" />;
  if (norm.includes("premiere")) return <Video className="w-3.5 h-3.5 text-purple-500" />;
  if (norm.includes("epidemic") || norm.includes("sound") || norm.includes("music")) return <Music className="w-3.5 h-3.5 text-pink-400" />;
  if (norm.includes("audition")) return <Volume2 className="w-3.5 h-3.5 text-green-400" />;
  if (norm.includes("framer")) return <Layout className="w-3.5 h-3.5 text-blue-500" />;
  if (norm.includes("illustrator")) return <PenTool className="w-3.5 h-3.5 text-orange-400" />;
  if (norm.includes("resolve")) return <Sun className="w-3.5 h-3.5 text-orange-500" />;
  if (norm.includes("fusion") || norm.includes("cinema 4d") || norm.includes("blender")) return <Box className="w-3.5 h-3.5 text-yellow-500" />;
  if (norm.includes("figma")) return <Figma className="w-3.5 h-3.5 text-amber-500" />;
  if (norm.includes("elevenlabs") || norm.includes("eleven labs") || norm.includes("voice")) return <Mic className="w-3.5 h-3.5 text-cyan-400" />;
  return <Layers className="w-3.5 h-3.5 text-gray-400" />;
};

interface VideoModalProps {
  isOpen: boolean;
  project: LongFormProject | null;
  onClose: () => void;
}

export default function VideoModal({ isOpen, project, onClose }: VideoModalProps) {
  // Video Ref
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  // Custom Video Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // If the video is a YouTube ID (11 chars, e.g. "dQw4w9WgXcQ")
  const isYouTube = project ? (project.fullVideo.length === 11 && !project.fullVideo.includes("http")) : false;

  // ESC key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === " " && !isYouTube) {
        e.preventDefault();
        togglePlay();
      }
    };
    if (isOpen && project) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPlaying, isYouTube, project]);

  // Handle playing when media is loaded
  useEffect(() => {
    if (isOpen && project) {
      setIsPlaying(true);
      setCurrentTime(0);
      setPlaybackRate(1);
      // Reset full screen status on open
      setIsFullscreen(false);
    } else {
      setIsPlaying(false);
    }
  }, [isOpen, project]);

  // Video element effects
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying && project) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [isPlaying, project]);

  // Sync volume & muted state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume;
    video.muted = isMuted;
  }, [volume, isMuted]);

  // Sync playback speed
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = playbackRate;
  }, [playbackRate]);

  // Custom Player Handlers
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const seekTime = parseFloat(e.target.value);
    video.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleSpeedSelect = (rate: number) => {
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    const container = playerContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Sync fullscreen change back to state if triggered via default keys
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Format Time Helper (e.g. 01:23)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Video Speed List
  const speeds = [0.5, 1, 1.25, 1.5, 2];

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto"
          id="long-video-modal"
        >
          {/* Subtle light leak backgrounds */}
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-brand-green/3 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-emerald-500/3 rounded-full blur-[120px] pointer-events-none" />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1300px] bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/[0.08] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] z-10 grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] lg:max-h-[85vh]"
          >
            {/* Fullscreen Modal Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-black/60 hover:bg-brand-green hover:text-bg-dark border border-white/[0.08] text-white flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95"
              title="Close Modal (ESC)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Section: Video Player Area (8 columns) */}
            <div className="col-span-1 lg:col-span-8 bg-[#030303] flex flex-col justify-center relative aspect-video lg:aspect-auto">
              <div ref={playerContainerRef} className="relative w-full h-full aspect-video flex items-center bg-black overflow-hidden">
                {isYouTube ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${project.fullVideo}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=1`}
                    title={project.title}
                    className="w-full h-full absolute inset-0 border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      src={project.previewVideo} // Using preview video as playable MP4 source
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onClick={togglePlay}
                      className="w-full h-full object-contain cursor-pointer"
                      playsInline
                    />

                    {/* Handcrafted Cinematic Control Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-3 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 z-30">
                      {/* Timeline / Progress bar */}
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-gray-400">
                          {formatTime(currentTime)}
                        </span>
                        <input
                          type="range"
                          min={0}
                          max={duration || 100}
                          step={0.1}
                          value={currentTime}
                          onChange={handleSeek}
                          className="w-full h-1 bg-white/10 hover:h-2 rounded-lg appearance-none cursor-pointer accent-brand-green transition-all"
                        />
                        <span className="font-mono text-[10px] text-gray-400">
                          {formatTime(duration)}
                        </span>
                      </div>

                      {/* Control Buttons Panel */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Play/Pause */}
                          <button
                            onClick={togglePlay}
                            className="text-white hover:text-brand-green transition-colors focus:outline-none"
                            title={isPlaying ? "Pause" : "Play"}
                          >
                            {isPlaying ? (
                              <Pause className="w-5 h-5 fill-current" />
                            ) : (
                              <Play className="w-5 h-5 fill-current" />
                            )}
                          </button>

                          {/* Mute/Volume controls */}
                          <div className="flex items-center gap-2 group/volume">
                            <button
                              onClick={toggleMute}
                              className="text-white hover:text-brand-green transition-colors focus:outline-none"
                              title={isMuted ? "Unmute" : "Mute"}
                            >
                              {isMuted || volume === 0 ? (
                                <VolumeX className="w-5 h-5" />
                              ) : (
                                <Volume2 className="w-5 h-5" />
                              )}
                            </button>
                            <input
                              type="range"
                              min={0}
                              max={1}
                              step={0.05}
                              value={isMuted ? 0 : volume}
                              onChange={handleVolumeChange}
                              className="w-0 group-hover/volume:w-16 focus-within:w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-green transition-all duration-300"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-4 relative">
                          {/* Speed Menu Toggle */}
                          <div className="relative">
                            <button
                              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                              className="flex items-center gap-1.5 text-xs font-mono text-gray-300 hover:text-brand-green bg-white/5 border border-white/10 px-2.5 py-1 rounded-full transition-colors focus:outline-none"
                              title="Playback Speed"
                            >
                              <span>{playbackRate}x</span>
                              <ChevronDown className="w-3 h-3" />
                            </button>

                            {showSpeedMenu && (
                              <div className="absolute bottom-full right-0 mb-2 w-24 rounded-xl bg-black/90 border border-white/10 p-1 flex flex-col gap-0.5 shadow-xl z-40">
                                {speeds.map((rate) => (
                                  <button
                                    key={rate}
                                    onClick={() => handleSpeedSelect(rate)}
                                    className={`w-full text-left font-mono text-xs px-2 py-1.5 rounded-lg transition-colors ${
                                      playbackRate === rate
                                        ? "bg-brand-green text-bg-dark font-bold"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }`}
                                  >
                                    {rate}x
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Fullscreen Toggle */}
                          <button
                            onClick={toggleFullscreen}
                            className="text-white hover:text-brand-green transition-colors focus:outline-none"
                            title="Fullscreen"
                          >
                            <Maximize className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Section: Details Panel (4 columns) */}
            <div className="col-span-1 lg:col-span-4 bg-[#0a0a0c]/90 border-t lg:border-t-0 lg:border-l border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[40vh] lg:max-h-none">
              <div className="space-y-6">


                {/* Title */}
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-heading font-black text-white leading-tight tracking-tight">
                    {project.title}
                  </h3>

                </div>

                {/* Divider */}
                <div className="h-[1px] bg-white/[0.06]" />

                {/* Description */}
                {project.description && (
                  <>
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">Workflow</span>
                      <p className="text-gray-300 text-sm font-sans leading-relaxed whitespace-pre-line">
                        {project.description}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] bg-white/[0.06]" />
                  </>
                )}

                {/* Software / Tools Used */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" /> Tech Stack & Tools
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.software.map((sw, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 text-[10px] font-mono text-gray-400 bg-white/5 border border-white/[0.06] px-2.5 py-1 rounded"
                      >
                        {getSoftwareIcon(sw)}
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>


            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
