// Used when the backend API is unreachable or not yet configured, so the site
// never shows a broken/empty state. Once the backend is running with seeded
// data, the live API response takes priority (see sections/*.jsx).

export const FALLBACK_SKILLS = [
  { name: 'C', category: 'Programming', description: 'Core procedural programming and problem solving fundamentals.', icon: 'code' },
  { name: 'C++', category: 'Programming', description: 'Object-oriented programming and data structure basics.', icon: 'code' },
  { name: 'Python', category: 'Programming', description: 'Scripting, automation, and beginner-level AI concepts.', icon: 'code' },
  { name: 'JavaScript', category: 'Web', description: 'Interactivity, DOM manipulation, and modern ES6+ syntax.', icon: 'js' },
  { name: 'HTML', category: 'Web', description: 'Semantic, accessible markup for every project.', icon: 'html' },
  { name: 'CSS', category: 'Web', description: 'Responsive layouts, animations, and modern styling.', icon: 'css' },
  { name: 'React', category: 'Web', description: 'Component-based UIs for interactive, dynamic interfaces.', icon: 'react' },
  { name: 'MySQL', category: 'Database', description: 'Relational database design and query fundamentals.', icon: 'db' },
  { name: 'MongoDB', category: 'Database', description: 'NoSQL document storage for flexible app data.', icon: 'db' },
  { name: 'Git', category: 'Tools', description: 'Version control for tracking and managing code changes.', icon: 'git' },
  { name: 'GitHub', category: 'Tools', description: 'Hosting repositories and collaborating on projects.', icon: 'github' },
  { name: 'VS Code', category: 'Tools', description: 'Daily code editor of choice, tuned with extensions.', icon: 'tool' },
]

export const FALLBACK_PROJECTS = [
  {
    _id: 'skillswap',
    title: 'SkillSwap',
    subtitle: 'Skill Exchange Platform',
    description: 'A platform concept where users can trade skills with one another — built to practice structuring a real, multi-feature web application.',
    longDescription: 'SkillSwap explores what it takes to design a two-sided marketplace: user profiles, skill listings, and a matching flow connecting people who want to teach with people who want to learn.',
    tech: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
    githubUrl: 'https://github.com/ujalamaurya603-ship-it',
    liveUrl: '',
  },
  {
    _id: 'portfolio',
    title: 'Personal Portfolio',
    subtitle: 'Responsive Developer Portfolio',
    description: 'A fully responsive personal site built to showcase skills, projects and certifications with a clean, modern layout.',
    longDescription: 'This very site — iterated from a simple layout into a fuller, animated experience, focused on clarity, responsiveness, and a professional first impression across devices.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/ujalamaurya603-ship-it',
    liveUrl: '',
  },
  {
    _id: 'iot-model',
    title: 'IoT-Based Mathematical Model',
    subtitle: 'Academic Project',
    description: 'An applied academic project combining mathematical modeling concepts with IoT-based data ideas.',
    longDescription: 'A coursework-driven exploration connecting mathematical modeling with IoT concepts, focused on understanding how sensor data could feed into a structured, computable model.',
    tech: ['Mathematical Modeling', 'IoT Concepts', 'Problem Solving'],
    githubUrl: '',
    liveUrl: '',
  },
]

export const FALLBACK_CERTIFICATES = [
  { title: 'Certificate of Achievement', organization: 'TechnoRhythm', date: 'Coding Competition', image: 'technorhythm' },
  { title: 'Basic Leadership Development Program', organization: 'Super77 by Human Charger', date: 'Certificate of Completion', image: 'super77' },
  { title: 'AI for Beginners', organization: 'HP LIFE · HP Foundation', date: 'May 2026', image: 'hp_life' },
  { title: 'Google Analytics Certification', organization: 'Google', date: 'Issued May 2026', image: 'google_analytics' },
  { title: 'What Is Generative AI?', organization: 'LinkedIn Learning', date: 'May 2026', image: 'linkedin' },
  { title: 'Python for Beginners', organization: 'Simplilearn SkillUp', date: 'Feb 2026', image: 'simplilearn' },
  { title: 'CodeX Challenge 2026', organization: 'HackerRank', date: 'Certificate of Participation', image: 'hackerrank' },
  { title: 'Digital Productivity with AI', organization: 'UNICEF · YuWaah', date: '100% score · Mar 2026', image: 'unicef' },
]

export const TIMELINE = [
  { year: 'Ongoing', title: 'Bachelor of Computer Applications (BCA)', desc: 'Building a foundation in programming, computer science fundamentals, and application development.' },
  { year: '2026', title: 'Google Analytics Certified', desc: "Completed Google's Analytics Certification covering data-driven decision making." },
  { year: '2026', title: 'HackerRank CodeX Challenge', desc: 'Participated in a competitive coding challenge, sharpening problem-solving under time pressure.' },
  { year: '2026', title: 'AI & Productivity Courses', desc: 'Completed HP LIFE, LinkedIn Learning and UNICEF courses exploring AI fundamentals and tools.' },
  { year: 'Ongoing', title: 'Personal Projects', desc: 'Building SkillSwap, this portfolio, and other web projects to apply and extend classroom learning.' },
]

// Fallback knowledge base for the AI chat, used only if the backend /api/ai/ask
// endpoint is unreachable — see server/controllers/aiController.js for the real logic.
export const AI_FALLBACK_KB = {
  technologies: 'Ujala works with C, C++, Python, JavaScript, HTML, CSS and React on the front end, MySQL and MongoDB for databases, and Git/GitHub/VS Code as daily tools.',
  projects: "She's built SkillSwap (a skill-exchange platform concept), this personal portfolio site, and an IoT-based mathematical model project from her coursework.",
  learning: "She's currently a BCA student continuing to sharpen her programming and web development skills, and exploring more advanced React and backend development.",
  contact: 'You can reach Ujala by email at ujalamaurya603@gmail.com, by phone at +91 6386666767, or through the contact form on this page.',
  certificates: "She holds certificates from TechnoRhythm, Super77, HP LIFE, Google Analytics, LinkedIn Learning, Simplilearn, HackerRank, and UNICEF's YuWaah program.",
  education: 'Ujala is currently pursuing her Bachelor of Computer Applications (BCA).',
  default: "I'm a simple demo assistant for now — I can tell you about Ujala's technologies, projects, certificates, education, or how to contact her. Try asking one of those!",
}
