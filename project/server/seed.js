// Run with: npm run seed
// Populates initial projects, skills and certificates, and creates the admin user
// from ADMIN_EMAIL / ADMIN_PASSWORD in .env, so the site has real data on first run.
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
import User from './models/User.js'
import Project from './models/Project.js'
import Skill from './models/Skill.js'
import Certificate from './models/Certificate.js'

dotenv.config()

const projects = [
  {
    title: 'SkillSwap', subtitle: 'Skill Exchange Platform',
    description: 'A platform concept where users can trade skills with one another.',
    longDescription: "SkillSwap explores what it takes to design a two-sided marketplace: user profiles, skill listings, and a matching flow connecting people who want to teach with people who want to learn.",
    tech: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
    githubUrl: 'https://github.com/ujalamaurya603-ship-it', order: 1,
  },
  {
    title: 'Personal Portfolio', subtitle: 'Responsive Developer Portfolio',
    description: 'A fully responsive personal site showcasing skills, projects and certifications.',
    longDescription: 'Iterated from a simple layout into a fuller, animated experience, focused on clarity, responsiveness, and a professional first impression.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/ujalamaurya603-ship-it', order: 2,
  },
  {
    title: 'IoT-Based Mathematical Model', subtitle: 'Academic Project',
    description: 'An applied academic project combining mathematical modeling with IoT-based data ideas.',
    tech: ['Mathematical Modeling', 'IoT Concepts', 'Problem Solving'], order: 3,
  },
]

const skills = [
  { name: 'C', category: 'Programming', description: 'Core procedural programming and problem solving fundamentals.', icon: 'code', order: 1 },
  { name: 'C++', category: 'Programming', description: 'Object-oriented programming and data structure basics.', icon: 'code', order: 2 },
  { name: 'Python', category: 'Programming', description: 'Scripting, automation, and beginner-level AI concepts.', icon: 'code', order: 3 },
  { name: 'JavaScript', category: 'Web', description: 'Interactivity, DOM manipulation, and modern ES6+ syntax.', icon: 'js', order: 4 },
  { name: 'HTML', category: 'Web', description: 'Semantic, accessible markup for every project.', icon: 'html', order: 5 },
  { name: 'CSS', category: 'Web', description: 'Responsive layouts, animations, and modern styling.', icon: 'css', order: 6 },
  { name: 'React', category: 'Web', description: 'Component-based UIs for interactive, dynamic interfaces.', icon: 'react', order: 7 },
  { name: 'MySQL', category: 'Database', description: 'Relational database design and query fundamentals.', icon: 'db', order: 8 },
  { name: 'MongoDB', category: 'Database', description: 'NoSQL document storage for flexible app data.', icon: 'db', order: 9 },
  { name: 'Git', category: 'Tools', description: 'Version control for tracking and managing code changes.', icon: 'git', order: 10 },
  { name: 'GitHub', category: 'Tools', description: 'Hosting repositories and collaborating on projects.', icon: 'github', order: 11 },
  { name: 'VS Code', category: 'Tools', description: 'Daily code editor of choice, tuned with extensions.', icon: 'tool', order: 12 },
]

// NOTE: imageUrl values below are placeholders. Upload your certificate images
// somewhere (e.g. Cloudinary, S3, or the client's own /public folder) and replace
// these with real URLs before seeding for production use.
const certificates = [
  { title: 'Certificate of Achievement', organization: 'TechnoRhythm', date: 'Coding Competition', imageUrl: 'https://your-image-host.com/technorhythm.jpg', order: 1 },
  { title: 'Basic Leadership Development Program', organization: 'Super77 by Human Charger', date: 'Certificate of Completion', imageUrl: 'https://your-image-host.com/super77.jpg', order: 2 },
  { title: 'AI for Beginners', organization: 'HP LIFE · HP Foundation', date: 'May 2026', imageUrl: 'https://your-image-host.com/hp-life.jpg', order: 3 },
  { title: 'Google Analytics Certification', organization: 'Google', date: 'Issued May 2026', imageUrl: 'https://your-image-host.com/google-analytics.jpg', order: 4 },
  { title: 'What Is Generative AI?', organization: 'LinkedIn Learning', date: 'May 2026', imageUrl: 'https://your-image-host.com/linkedin.jpg', order: 5 },
  { title: 'Python for Beginners', organization: 'Simplilearn SkillUp', date: 'Feb 2026', imageUrl: 'https://your-image-host.com/simplilearn.jpg', order: 6 },
  { title: 'CodeX Challenge 2026', organization: 'HackerRank', date: 'Certificate of Participation', imageUrl: 'https://your-image-host.com/hackerrank.jpg', order: 7 },
  { title: 'Digital Productivity with AI', organization: 'UNICEF · YuWaah', date: '100% score · Mar 2026', imageUrl: 'https://your-image-host.com/unicef.jpg', order: 8 },
]

async function seed() {
  await connectDB()

  await Promise.all([Project.deleteMany({}), Skill.deleteMany({}), Certificate.deleteMany({})])
  await Project.insertMany(projects)
  await Skill.insertMany(skills)
  await Certificate.insertMany(certificates)

  const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase().trim()
  const adminPassword = process.env.ADMIN_PASSWORD

  if (adminEmail && adminPassword) {
    const existing = await User.findOne({ email: adminEmail })
    if (!existing) {
      const passwordHash = await User.hashPassword(adminPassword)
      await User.create({ email: adminEmail, passwordHash })
      console.log(`Admin user created: ${adminEmail}`)
    } else {
      console.log('Admin user already exists, skipping.')
    }
  } else {
    console.log('ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin user creation.')
  }

  console.log('Seed complete.')
  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
