import Skill from '../models/Skill.js'

export async function getSkills(req, res) {
  const skills = await Skill.find().sort({ order: 1, category: 1 })
  res.json(skills)
}

export async function createSkill(req, res) {
  const { name, category, description, icon, order } = req.body
  if (!name || !category || !description) {
    return res.status(400).json({ message: 'Name, category and description are required.' })
  }
  const skill = await Skill.create({ name, category, description, icon, order })
  res.status(201).json(skill)
}

export async function updateSkill(req, res) {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!skill) return res.status(404).json({ message: 'Skill not found.' })
  res.json(skill)
}

export async function deleteSkill(req, res) {
  const skill = await Skill.findByIdAndDelete(req.params.id)
  if (!skill) return res.status(404).json({ message: 'Skill not found.' })
  res.json({ message: 'Skill deleted.' })
}
