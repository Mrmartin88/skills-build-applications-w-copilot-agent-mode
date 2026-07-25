import express from 'express'

const router = express.Router()

router.get('/users', (req, res) => {
  res.json({ message: 'Users endpoint', data: [] })
})

router.get('/teams', (req, res) => {
  res.json({ message: 'Teams endpoint', data: [] })
})

router.get('/activities', (req, res) => {
  res.json({ message: 'Activities endpoint', data: [] })
})

router.get('/leaderboard', (req, res) => {
  res.json({ message: 'Leaderboard endpoint', data: [] })
})

router.get('/workouts', (req, res) => {
  res.json({ message: 'Workouts endpoint', data: [] })
})

export default router
