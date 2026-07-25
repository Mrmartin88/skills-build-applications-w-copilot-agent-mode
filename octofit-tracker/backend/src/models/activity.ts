import mongoose, { Schema, Document } from 'mongoose'

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId
  type: string
  durationMinutes: number
  caloriesBurned: number
  timestamp: Date
}

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  timestamp: { type: Date, required: true },
})

export default mongoose.model<IActivity>('Activity', activitySchema)
