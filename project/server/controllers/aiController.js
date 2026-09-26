import { sanitizeText } from '../utils/validators.js'

// Rule-based knowledge base used as a safe, always-available fallback —
// and as the entire response engine if no AI_API_KEY is configured.
const KB = {
  technologies: 'Ujala works with C, C++, Python, JavaScript, HTML, CSS and React on the front end, MySQL and MongoDB for databases, and Git/GitHub/VS Code as daily tools.',
  projects: "She's built SkillSwap (a skill-exchange platform concept), her personal portfolio site, and an IoT-based mathematical model project from her coursework.",
  learning: "She's currently a BCA student continuing to sharpen her programming and web development skills, and exploring more advanced React and backend development.",
  contact: 'You can reach Ujala by email at ujalamaurya603@gmail.com, by phone at +91 6386666767, or through the contact form on her portfolio.',
  certificates: "She holds certificates from TechnoRhythm, Super77, HP LIFE, Google Analytics, LinkedIn Learning, Simplilearn, HackerRank, and UNICEF's YuWaah program.",
  education: 'Ujala is currently pursuing her Bachelor of Computer Applications (BCA).',
  default: "I can tell you about Ujala's technologies, projects, certificates, education, or how to contact her. Try asking one of those!",
}

function ruleBasedReply(query) {
  const q = query.toLowerCase()
  if (/tech|know|skill|stack|language/.test(q)) return KB.technologies
  if (/project|built|build|work/.test(q)) return KB.projects
  if (/learn|currently|now/.test(q)) return KB.learning
  if (/contact|reach|email|phone|call/.test(q)) return KB.contact
  if (/certificat|course|achievement/.test(q)) return KB.certificates
  if (/educat|bca|degree|college|study/.test(q)) return KB.education
  return KB.default
}

// If AI_API_KEY + AI_PROVIDER are configured, this is where you would call the
// real provider (kept generic here so no vendor SDK is force-installed).
// The API key is read only from environment variables and never sent to the client.
async function callConfiguredProvider(query) {
  const provider = (process.env.AI_PROVIDER || 'none').toLowerCase()
  const apiKey = process.env.AI_API_KEY

  if (provider === 'none' || !apiKey) return null

  // Example shape for wiring up a real provider (left inactive by default):
  //
  // if (provider === 'openai') {
  //   const res = await fetch('https://api.openai.com/v1/chat/completions', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
  //     body: JSON.stringify({
  //       model: 'gpt-4o-mini',
  //       messages: [
  //         { role: 'system', content: 'You are a helpful assistant answering questions about Ujala Maurya\'s portfolio.' },
  //         { role: 'user', content: query },
  //       ],
  //     }),
  //   })
  //   const data = await res.json()
  //   return data.choices?.[0]?.message?.content || null
  // }

  return null
}

export async function askAI(req, res) {
  const query = sanitizeText(req.body.message, 500)
  if (!query) {
    return res.status(400).json({ message: 'A message is required.' })
  }

  try {
    const providerReply = await callConfiguredProvider(query)
    const reply = providerReply || ruleBasedReply(query)
    res.json({ reply })
  } catch (err) {
    // Never fail the chat experience — fall back gracefully.
    res.json({ reply: ruleBasedReply(query) })
  }
}
