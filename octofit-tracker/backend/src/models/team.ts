import mongoose, { Schema, Document } from 'mongoose'

export interface ITeam extends Document {
  name: string
  description: string
  members: mongoose.Types.ObjectId[]
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

export default mongoose.model<ITeam>('Team', teamSchema)
