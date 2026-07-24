import { useState } from "react";
import { motion } from "motion/react";
import { longFormProjects, LongFormProject } from "./portfolioData";
import LongVideoCard from "./LongVideoCard";
import VideoModal from "./VideoModal";

export default function LongFormPortfolio() {
  const [activeProject, setActiveProject] = useState<LongFormProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectProject = (project: LongFormProject) => {
    setActiveProject(project);
    setIsModalOpen(true);
  };

  // Heading Split Text for Word Stagger Reveal
  const headingWords = "Explore My Long Form Video Projects".split(" ");

  // Subtle floating background particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * -20
  }));

  return (
    <section
      className="pt-12 pb-20 relative bg-transparent overflow-hidden"
      id="longform-portfolio-section"
      style={{ contentVisibility: "auto" }}
    >
      {/* 1. Dynamic Background Aurora & Lighting */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />

      {/* Film Grain Texture Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZHRoPSI0IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] pointer-events-none opacity-30" />

      {/* 2. Floating Shimmering Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-brand-green/10"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: ["0%", "-30%", "0%"],
              x: ["0%", "10%", "0%"],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 3. Section Header */}
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center mb-12 sm:mb-16">
        {/* Pulsating Micro Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
          <span className="font-mono text-[10px] text-gray-300 uppercase tracking-[0.25em] font-bold">
            Featured Long Form Work
          </span>
        </motion.div>

        {/* Large Cinematic Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-white tracking-tight mb-6 leading-[1.1] max-w-[800px] mx-auto">
          {headingWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.05,
                type: "spring",
                damping: 20,
                stiffness: 100,
              }}
              className="inline-block mr-3"
            >
              {word === "Long" || word === "Form" ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-emerald-400 to-lime-300">
                  {word}
                </span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gray-400 font-sans text-sm sm:text-base md:text-lg leading-relaxed max-w-[720px] mx-auto"
        >
          A collection of premium documentaries, podcasts, YouTube productions, SaaS videos, commercials, and cinematic storytelling — presented line by line.
        </motion.p>
      </div>

      {/* 4. Line By Line Video Stack */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col gap-8 sm:gap-12 relative z-10" id="long-portfolio-line-stack">
        {longFormProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
            className="w-full flex justify-center"
          >
            {/* Video Player / Preview Card */}
            <LongVideoCard
              project={project}
              idx={idx}
              onSelect={handleSelectProject}
            />
          </motion.div>
        ))}
      </div>

      {/* 5. Fullscreen Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        project={activeProject}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
