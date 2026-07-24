export interface LongFormProject {
  id: string;
  title: string;
  client: string;
  category: string;
  thumbnail: string;
  previewVideo: string;
  fullVideo: string; // YouTube embed ID or direct URL
  duration: string;
  views: string;
  uploadDate: string;
  software: string[];
  description: string;
  uploadingSoon?: boolean;
}

export const longFormProjects: LongFormProject[] = [
  {
    id: "lf-doc-1",
    title: "Nicolae Ceausescu Documentary Part 1",
    client: "Kinfolk & Co.",
    category: "Documentary",
    thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-view-of-a-mountain-valley-during-sunset-41712-large.mp4",
    fullVideo: "5Yn7rOa7ysg", // User requested YouTube video
    duration: "18:45",
    views: "1.2M",
    uploadDate: "June 2026",
    software: ["Photoshop", "After Effects", "Premiere Pro", "Epidemic Sound", "Google Gemini", "ChatGPT"],
    description: `1. Generate a high-resolution image using AI with strong depth and cinematic composition.
2. Import the image into Photoshop and separate every object into individual layers.
3. Rebuild hidden background areas using Generative Fill or Content-Aware Fill.
4. Import the layered PSD into After Effects as a composition with retained layer sizes.
5. Convert layers to 3D, position them in Z-space, and animate a cinematic camera for parallax.
6. Add lighting, depth of field, particles, fog, motion blur, and color grading for realism.
7. Finish in Premiere Pro with sound design, music, titles, final color correction, and export`
  },
  {
    id: "lf-pod-2",
    title: "Nicolae Ceausescu Documentary Part 2",
    client: "Kinfolk & Co.",
    category: "Documentary",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80",
    previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-podcaster-talking-into-microphone-40121-large.mp4",
    fullVideo: "91U-djK-JYU",
    duration: "42:10",
    views: "340K",
    uploadDate: "May 2026",
    software: ["Photoshop", "After Effects", "Premiere Pro", "Epidemic Sound", "Google Gemini", "ChatGPT"],
    description: `1. Generate a high-resolution image using AI with strong depth and cinematic composition.
2. Import the image into Photoshop and separate every object into individual layers.
3. Rebuild hidden background areas using Generative Fill or Content-Aware Fill.
4. Import the layered PSD into After Effects as a composition with retained layer sizes.
5. Convert layers to 3D, position them in Z-space, and animate a cinematic camera for parallax.
6. Add lighting, depth of field, particles, fog, motion blur, and color grading for realism.
7. Finish in Premiere Pro with sound design, music, titles, final color correction, and export`
  },
  {
    id: "lf-saas-3",
    title: "Viral 3D Editing",
    client: "Linear Technologies",
    category: "SaaS",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-40096-large.mp4",
    fullVideo: "LR8I08XCSSY",
    duration: "08:15",
    views: "890K",
    uploadDate: "April 2026",
    software: ["After Effects", "Premiere Pro", "Figma", "ChatGPT", "Epidemic Sound"],
    description: ""
  },
  {
    id: "lf-com-4",
    title: "Timeless Precision: The Craftsmanship of Chronos Chronographs",
    client: "Chronos Swiss",
    category: "Commercial",
    thumbnail: "",
    previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-video-editing-software-timeline-close-up-34533-large.mp4",
    fullVideo: "",
    uploadingSoon: true,
    duration: "03:30",
    views: "2.1M",
    uploadDate: "March 2026",
    software: ["DaVinci Resolve", "Fusion", "Cinema 4D", "After Effects"],
    description: "An elegant commercial showcasing mechanical luxury watch movements. Features 3D CAD modeling combined with extreme macroscopic real-world video plates. Slow, suspenseful build-up edits, macro dust particulate motion graphics, and heavy, pristine sound design highlighting gear clicks, ticking, and sweeping dials."
  }
];
