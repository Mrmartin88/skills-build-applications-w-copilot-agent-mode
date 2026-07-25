import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

import './config/database'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ status: 'OctoFit Tracker API', env: process.env.NODE_ENV || 'development' })
})

const PORT = Number(process.env.PORT || 8000)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
