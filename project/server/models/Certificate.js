import mongoose from 'mongoose'

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    date: { type: String },
    imageUrl: { type: String, required: true },
    verifyUrl: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Certificate', certificateSchema)
