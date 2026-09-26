import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'code' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Skill', skillSchema)
