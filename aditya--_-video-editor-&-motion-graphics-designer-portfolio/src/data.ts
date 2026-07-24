// Portfolio data for Aditya

export interface Project {
  id: string;
  title: string;
  client: string;
  views: string;
  duration?: string;
  category: string;
  platform: 'Instagram' | 'TikTok' | 'YouTube' | 'YouTube Shorts';
  software: string[];
  thumbnailUrl: string;
  videoUrl: string;
  youtubeId?: string;
  description?: string;
  stats?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatarUrl: string;
  content: string;
  rating: number;
  videoUrl?: string; // If there is a video testimonial preview
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  priceRange?: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

export interface Skill {
  name: string;
  iconName: string;
  color: string;
}

// Interactive vertical video samples (mixkit public preview clips represent various styles)
export const shortFormProjects: Project[] = [
  {
    id: 'sf-1',
    title: 'The Future of AI Technology',
    client: 'Abhi Rajput (Tech UGC)',
    views: '1.2M',
    duration: '0:35',
    category: 'Infotainment & Tech',
    platform: 'YouTube Shorts',
    software: ["After Effects", "Premiere Pro", "Figma", "ChatGPT", "Epidemic Sound"],
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-street-with-neon-lights-40134-large.mp4',
    youtubeId: 'uVprZqg-Sno',
    description: 'Dynamic captions, interactive pop-up infographics, and tight-loop editing that keeps retention rate above 85%.'
  },
  {
    id: 'sf-2',
    title: 'Solving Client Acquisition',
    client: 'Saurav Dhul (Career Coach)',
    views: '840K',
    duration: '0:45',
    category: 'Business & Finance',
    platform: 'Instagram',
    software: ['Premiere Pro', 'After Effects'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-smartphone-filming-cinematic-video-41584-large.mp4',
    description: 'High-energy storytelling with colored keyword emphasizes, sound design, and custom background graphic assets.'
  },
  {
    id: 'sf-3',
    title: 'Visual Hook Secrets for Retention',
    client: 'Nikhil Kamath (Podcast Highlight)',
    views: '1.5M',
    duration: '0:40',
    category: 'Infotainment & Podcast',
    platform: 'YouTube Shorts',
    software: ["After Effects", "Premiere Pro", "Figma", "ChatGPT", "Epidemic Sound"],
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-street-with-neon-lights-40134-large.mp4',
    youtubeId: 'l88yy4uBR6k',
    description: 'Ultra-fast visual hooks, custom typography popups, custom camera-shake effects, and premium sound layering to optimize retention.'
  }
];

// Interactive long-form video projects
export const longFormProjects: Project[] = [
  {
    id: 'lf-2',
    title: 'The Testosterone Miracle: Emotional Zombie Explained',
    client: 'Dr. Rohan (Health & Biotech)',
    views: '980K',
    duration: '0:55',
    category: 'Health Documentary',
    platform: 'YouTube Shorts',
    software: ["Premiere Pro", "ChatGPT", "Figma", "Epidemic Sound"],
    thumbnailUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-street-with-neon-lights-40134-large.mp4',
    youtubeId: 'm8_O8yHkDso',
    description: 'Visualizing biological pathways with crisp medical infographics, smooth camera pans, and a gripping mystery-style edit structure.'
  },
  {
    id: 'lf-3',
    title: 'Sex 101: Navigating Modern Marriage & Divorce',
    client: 'Relate Podcast',
    views: '2.1M',
    duration: '0:30',
    category: 'Talkshow / Podcast',
    platform: 'YouTube Shorts',
    software: ["Premiere Pro", "ChatGPT", "Figma", "Epidemic Sound"],
    thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dj-mixing-music-at-a-party-42564-large.mp4',
    youtubeId: 'VvRlRoy5aUM',
    description: 'Dynamic multi-cam switching, ambient background noise removal, custom animated overlays for statistics, and highlight retention hooks.'
  },
  {
    id: 'lf-4',
    title: 'A Global Game-Changer: The Biotech Revolution',
    client: 'Future Corp',
    views: '3.5M',
    duration: '0:50',
    category: 'Corporate Promo / Vision',
    platform: 'YouTube Shorts',
    software: ["Figma", "After Effects", "Premiere Pro", "Epidemic Sound", "ElevenLabs", "ChatGPT"],
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-video-editing-software-timeline-close-up-34533-large.mp4',
    youtubeId: '5teWjN07nCI',
    description: 'Sleek motion design representing genetic strands and global networks. Perfect sound syncing, heavy industrial drone soundtrack integration.'
  }
];

// Featured Projects: A mix of the absolute best work with large cinematic representations
export const featuredProjects: Project[] = [
  {
    id: 'feat-1',
    title: 'Beyond the Peak: Alpine Cinematic Story',
    client: 'Outdoor Expedition Co.',
    views: '4.8M',
    duration: '0:55',
    category: 'Cinematic Branding',
    platform: 'YouTube Shorts',
    software: ["ChatGPT", "After Effects", "Premiere Pro", "Photoshop", "Google Gemini", "ChatGPT"],
    thumbnailUrl: 'https://i.ytimg.com/vi/hXsJhzwsA5o/hqdefault.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cinematic-view-of-a-mountain-valley-during-sunset-41712-large.mp4',
    youtubeId: 'hXsJhzwsA5o',
    description: 'Award-winning landscape grading and sound design. Combining atmospheric orchestral arrangements with wind, crunching snow, and heavy heartbeats.'
  },
  {
    id: 'feat-2',
    title: 'Retro-Futuristic City Lights: Cyberpunk Motion Design',
    client: 'Synthwave Records',
    views: '2.9M',
    duration: '1:00',
    category: 'Motion Graphics & music visualizer',
    platform: 'YouTube Shorts',
    software: ['After Effects', 'Premiere Pro', 'Figma', 'ChatGPT', 'Epidemic Sound'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-street-with-neon-lights-40134-large.mp4',
    youtubeId: 'baBqbDcar14',
    description: 'Immersive neon lighting and depth modeling in Blender. Integrates seamlessly with audio waveforms, reactive visualizer elements, and organic glow layers.'
  },
  {
    id: 'feat-3',
    title: 'Empty Spacer Card 1',
    client: 'Spacer',
    views: '0',
    duration: '0:00',
    category: 'Spacer',
    platform: 'YouTube Shorts',
    software: [],
    thumbnailUrl: '',
    videoUrl: ''
  },
  {
    id: 'feat-4',
    title: 'Empty Spacer Card 2',
    client: 'Spacer',
    views: '0',
    duration: '0:00',
    category: 'Spacer',
    platform: 'YouTube Shorts',
    software: [],
    thumbnailUrl: '',
    videoUrl: ''
  }
];

// Motion Graphics Showcase Items
export interface MotionShowcaseItem {
  id: string;
  title: string;
  category: string;
  thumbnailBefore: string;
  thumbnailAfter: string;
  description: string;
  gifUrl: string; // fallback or primary visual asset
}

export const motionShowcase: MotionShowcaseItem[] = [
  {
    id: 'm-1',
    title: '3D Interface Map HUD Tracking',
    category: 'UGC Infographics / Tech Overlay',
    thumbnailBefore: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80', // raw map
    thumbnailAfter: 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=800&q=80', // detailed hud
    description: 'Camera tracked graphic layout depicting a 3D topographic grid. Custom-drawn vectors glow and project coordinates dynamically matching camera rotation.',
    gifUrl: 'https://assets.mixkit.co/videos/preview/mixkit-video-editing-software-timeline-close-up-34533-large.mp4' // Using interactive loop representation
  },
  {
    id: 'm-2',
    title: 'Isometric Product Explainer Glow',
    category: 'E-commerce SaaS Animation',
    thumbnailBefore: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', // simple design
    thumbnailAfter: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', // glowing analytic chart
    description: 'Bringing an abstract SaaS dashboard to life with isometric projections, fluid charts growth, and neon-particle flows representing data stream packets.',
    gifUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-video-editor-using-a-keyboard-and-mouse-34534-large.mp4'
  }
];

// Services Offered
export const services: Service[] = [
  {
    id: 'ser-1',
    title: 'High-Retention Short Form Editing',
    description: 'Optimized for TikTok, Reels & Shorts. Crafting hooks, dynamic kinetic text, custom graphics, and fast-paced sound design that double watch time.',
    features: ['Hook optimization & scripting tweaks', 'Dynamic premium captions with highlights', 'Relevant sound effects (SFX) & custom soundscapes', 'B-Roll selection & stock overlays', 'Fast 24-48 hours turnaround'],
    priceRange: 'Custom Quote / Retainer'
  },
  {
    id: 'ser-2',
    title: 'Cinematic Long Form Video Editing',
    description: 'Full video production edits for YouTube, mini-documentaries, and educational series. Building solid storytelling structure and pacing.',
    features: ['Multi-cam cutting & sync setup', 'Story narrative restructuring & pacing flow', 'Custom motion titles & slide designs', 'Premium transition animations', 'Engaging zooms, pans and dynamic overlays'],
    priceRange: 'Custom Quote / Per Project'
  },
  {
    id: 'ser-3',
    title: 'Custom Motion Graphics & 3D',
    description: 'Taking videos to the absolute next level with 3D product projection, kinetic typography layouts, custom map animations, and SaaS interface explainers.',
    features: ['Custom AE template building', '2D/3D tracking onto real footage', 'Logo reveals & brand intro/outro animations', 'Lottie / vector exports for web', 'Interactive HUD & analytical charts'],
    priceRange: 'Hourly or Project-Based'
  },
  {
    id: 'ser-4',
    title: 'Professional Color Grading & Sound',
    description: 'Giving your raw footage that high-budget Hollywood gloss. Balancing exposures, skin tones, custom LUT stylings, and professional sound mastering.',
    features: ['Color matching between multiple cameras', 'LUT design & film emulation grading', 'Background noise reduction & dialog mastering', 'Subtle Foley & transition swoosh design', 'True-to-life skin tones restoration'],
    priceRange: 'Add-on / Standalone'
  }
];

// Creative Process
export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Discovery & Mood-boarding',
    subtitle: 'Strategic Alignment',
    description: 'We hop on a brief call to align on your content goals, audience demographic, references, and establish a shared aesthetic mood-board.'
  },
  {
    id: 2,
    title: 'Scripting & Style Layout',
    subtitle: 'Narrative Framing',
    description: 'For short-form or explainers, we map out the primary visual hooks, highlight keywords, frame sizes, and review sound palette selections.'
  },
  {
    id: 3,
    title: 'Core Editing & Motion Pass',
    subtitle: 'Assembling the Craft',
    description: 'The real magic happens. Pacing is dialed-in, B-roll is overlayed, custom motion graphics are integrated, and complex camera pans are modeled.'
  },
  {
    id: 4,
    title: 'Sound Design & Polish',
    subtitle: 'Immersive Details',
    description: 'We wrap up by adding layers of dynamic SFX, color-grading Log profiles, cleaning dialogs, and mastering audio levels for modern platforms.'
  },
  {
    id: 5,
    title: 'Delivery & Iteration',
    subtitle: 'Perfecting Outcomes',
    description: 'Your premium masterfile is delivered in ultra-high resolution (4K 10-bit). We execute quick adjustments as requested to ensure absolute satisfaction.'
  }
];

// Software details
export const softwares = [
  { name: 'Adobe Premiere Pro', icon: 'Film', imageUrl: 'https://lh3.googleusercontent.com/d/1_KUSoazKJOhh_k9iV0iWbPLXrQubCRsa', glow: 'shadow-[0_0_20px_rgba(234,38,255,0.45)]', color: '#130022', textColor: '#EA26FF' },
  { name: 'After Effects', icon: 'Sparkles', imageUrl: 'https://lh3.googleusercontent.com/d/1jLl48wNPFX3Jy11vJcJRbEo7WK0oU9Jm', glow: 'shadow-[0_0_20px_rgba(153,102,255,0.4)]', color: '#1B003A', textColor: '#9966FF' },
  { name: 'Photoshop', icon: 'Image', imageUrl: 'https://lh3.googleusercontent.com/d/1BDEltJf_8MFmxf_vI8Y_uhaw2nZFUu5V', glow: 'shadow-[0_0_20px_rgba(0,230,255,0.4)]', color: '#01151A', textColor: '#00E6FF' },
  { name: 'Claude AI', icon: 'Bot', imageUrl: 'https://lh3.googleusercontent.com/d/1zoT8bLMtgzNDU4Wtxzxpw4_aEcDsMift', glow: 'shadow-[0_0_20px_rgba(0,255,150,0.45)]', color: '#001A0F', textColor: '#00FF96' },
  { name: 'DaVinci Resolve', icon: 'Sliders', imageUrl: 'https://lh3.googleusercontent.com/d/1kYTABImZN06EefqDK-euV9NUm_ZAmsnm', glow: 'shadow-[0_0_20px_rgba(215,255,74,0.45)]', color: '#111804', textColor: '#D7FF4A' },
  { name: 'ChatGPT', icon: 'Cpu', imageUrl: 'https://lh3.googleusercontent.com/d/1W-_LLjEE1iFAQRlb057Hq7ifI8hWpVQO', glow: 'shadow-[0_0_20px_rgba(255,255,255,0.25)]', color: '#121212', textColor: '#FFFFFF' },
  { name: 'Higgsfield AI', icon: 'Video', imageUrl: 'https://lh3.googleusercontent.com/d/19P4Fie3R5vuEvuPwvChVbmDud-V3UPKM', glow: 'shadow-[0_0_20px_rgba(255,59,111,0.4)]', color: '#1B0511', textColor: '#FF3B6F' },
  { name: 'Figma', icon: 'Layout', imageUrl: 'https://lh3.googleusercontent.com/d/1BGCJuNXg4RfI2EpIMrX7r_vXfgLAQzwk', glow: 'shadow-[0_0_20px_rgba(255,170,0,0.45)]', color: '#191100', textColor: '#FFAA00' },
  { name: 'Adobe Illustrator', icon: 'PenTool', imageUrl: 'https://lh3.googleusercontent.com/d/1tWJ695b3yP43qN_CFZebSBSypo39xB7a', glow: 'shadow-[0_0_20px_rgba(255,154,0,0.45)]', color: '#261200', textColor: '#FF9A00' }
];

// Testimonials list
export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'Manoj Chopra',
    role: 'Tech UGC Creator',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80',
    content: 'Fast delivery with excellent quality. Even with a short deadline, you managed everything smoothly and delivered a high-quality edit. Great communication and professional work. Our watch time on YouTube spiked by 35%!',
    rating: 5,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-smartphone-filming-cinematic-video-41584-large.mp4'
  },
  {
    id: 't-2',
    name: 'Payal',
    role: 'Lifestyle & Travel Content Creator',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80',
    content: 'After using your editing service, my content quality improved a lot. My audience engagement also increased significantly. I really appreciate your creativity and meticulous attention to sound effects and visual transitions!',
    rating: 5,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-vertical-cinematic-videos-of-nature-and-city-43093-large.mp4'
  },
  {
    id: 't-3',
    name: 'Manoj Jha',
    role: 'Founder',
    company: 'SaaS Builder Co.',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80',
    content: 'One of the best editing services I have used so far. The quality, speed, and creativity are all top-notch. Looking forward to working with you long term to produce our monthly marketing video ads and tutorials.',
    rating: 5
  },
  {
    id: 't-4',
    name: 'Ruchi Sharma',
    role: 'Host',
    company: 'MindTalk Podcast',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
    content: 'This is one of the most reliable editors I have ever worked with. The quality of multi-camera switching, the clarity of sound denoising, and the subtle background soundtracks were outstanding. 100% satisfied and highly recommended!',
    rating: 5
  }
];

// FAQs list
export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: 'What is your turnaround time for a standard video?',
    answer: 'For short-form content (TikTok, Reels, Shorts), our turnaround time is usually 24 to 48 hours. For standard long-form videos (10-15 minutes), it ranges between 3 to 5 business days, depending on the complexity of motion graphics, visual assets, and B-roll requirements.'
  },
  {
    question: 'Which software packages do you utilize?',
    answer: 'We primarily edit in Premiere Pro for narrative assembly, DaVinci Resolve for professional color grading, After Effects for motion graphics and 2D/3D tracking, Photoshop/Illustrator for custom design assets, and Blender for 3D modeling and environment styling.'
  },
  {
    question: 'How do you handle footage sharing and file delivery?',
    answer: 'We use high-speed cloud networks like Google Drive, Dropbox, or Frame.io. You can upload raw files into a shared folder, and we will deliver drafts and final cuts via Frame.io, allowing you to add direct, timestamped feedback easily.'
  },
  {
    question: 'Do you offer monthly retainers or package deals?',
    answer: 'Yes! We offer monthly retainer packages for creators and businesses who need a steady stream of content (e.g., 12 short-form videos per month, or weekly long-form YouTube episodes). Retainers offer priority turnaround and discounted rates.'
  },
  {
    question: 'What is your revision policy?',
    answer: 'We include 2 rounds of revisions with every project to ensure we perfect the pacing, captions, and colors. Our process steps (Moodboarding & Script reviews) are designed to align our vision early and minimize revisions later.'
  }
];

// Overlapping floating clients avatar mock
export const clientAvatars = [
  { name: 'Manoj Chopra', src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80', description: 'Tech UGC' },
  { name: 'Payal', src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80', description: 'Lifestyle' },
  { name: 'Abhi Rajput', src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80', description: 'Tech Review' },
  { name: 'Saurav Dhul', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80', description: 'Career Coach' },
  { name: 'Bhanu Pathak', src: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=150&h=150&q=80', description: 'Travel Vlogger' },
  { name: 'Naiya Sehgal', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80', description: 'Productivity' },
  { name: 'Ruchi Sharma', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80', description: 'MindTalk Podcast' },
  { name: 'Manoj Jha', src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80', description: 'SaaS Founder' }
];
