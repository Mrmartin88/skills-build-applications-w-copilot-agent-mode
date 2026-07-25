import mongoose, { Schema, Document } from 'mongoose'

export interface ILeaderboardEntry extends Document {
  user: mongoose.Types.ObjectId
  score: number
  rank: number
  category: string
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  category: { type: String, required: true },
})

export default mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema)
