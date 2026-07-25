import express from 'express'
import dotenv from 'dotenv'
import routes from './controllers/api'

dotenv.config()

const app = express()
app.use(express.json())

const apiBase = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.githubpreview.dev`
  : `http://localhost:8000`

app.use('/api', routes)

app.get('/', (req, res) => {
  res.json({
    status: 'OctoFit Tracker API',
    env: process.env.NODE_ENV || 'development',
    apiUrl: apiBase,
  })
})

const PORT = Number(process.env.PORT || 8000)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
