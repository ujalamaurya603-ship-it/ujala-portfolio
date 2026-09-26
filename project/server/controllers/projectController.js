import Project from '../models/Project.js'

export async function getProjects(req, res) {
  const projects = await Project.find().sort({ order: 1, createdAt: -1 })
  res.json(projects)
}

export async function createProject(req, res) {
  const { title, subtitle, description, longDescription, tech, imageUrl, githubUrl, liveUrl, featured, order } = req.body
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required.' })
  }
  const project = await Project.create({
    title, subtitle, description, longDescription,
    tech: Array.isArray(tech) ? tech : [],
    imageUrl, githubUrl, liveUrl, featured, order,
  })
  res.status(201).json(project)
}

export async function updateProject(req, res) {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!project) return res.status(404).json({ message: 'Project not found.' })
  res.json(project)
}

export async function deleteProject(req, res) {
  const project = await Project.findByIdAndDelete(req.params.id)
  if (!project) return res.status(404).json({ message: 'Project not found.' })
  res.json({ message: 'Project deleted.' })
}
