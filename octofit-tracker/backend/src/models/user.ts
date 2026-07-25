import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  role: 'member' | 'coach' | 'admin'
  joinedAt: Date
  team: mongoose.Types.ObjectId | null
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['member', 'coach', 'admin'], default: 'member' },
  joinedAt: { type: Date, default: Date.now },
  team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
})

export default mongoose.model<IUser>('User', userSchema)
