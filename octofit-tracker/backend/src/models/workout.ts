import mongoose, { Schema, Document } from 'mongoose'

export interface IWorkout extends Document {
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  durationMinutes: number
  exercises: string[]
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  durationMinutes: { type: Number, required: true },
  exercises: [{ type: String, required: true }],
})

export default mongoose.model<IWorkout>('Workout', workoutSchema)
