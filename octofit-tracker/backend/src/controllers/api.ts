import express from 'express'
import User from '../models/user'
import Team from '../models/team'
import Activity from '../models/activity'
import Leaderboard from '../models/leaderboard'
import Workout from '../models/workout'

const router = express.Router()

router.get('/users', async (req, res) => {
  const users = await User.find().populate('team', 'name')
  res.json({ message: 'Users endpoint', data: users })
})

router.get('/teams', async (req, res) => {
  const teams = await Team.find().populate('members', 'name email')
  res.json({ message: 'Teams endpoint', data: teams })
})

router.get('/activities', async (req, res) => {
  const activities = await Activity.find().populate('user', 'name email')
  res.json({ message: 'Activities endpoint', data: activities })
})

router.get('/leaderboard', async (req, res) => {
  const leaderboard = await Leaderboard.find().populate('user', 'name email')
  res.json({ message: 'Leaderboard endpoint', data: leaderboard })
})

router.get('/workouts', async (req, res) => {
  const workouts = await Workout.find()
  res.json({ message: 'Workouts endpoint', data: workouts })
})

export default router
