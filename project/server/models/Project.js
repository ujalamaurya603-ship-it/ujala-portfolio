import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    tech: [{ type: String }],
    imageUrl: { type: String },
    githubUrl: { type: String },
    liveUrl: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Project', projectSchema)
