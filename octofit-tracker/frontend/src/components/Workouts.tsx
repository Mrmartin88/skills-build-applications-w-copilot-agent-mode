import React, { useEffect, useState } from 'react'
import { getApiBase } from '../api'

interface Workout {
  _id?: string
  name: string
  goal: string
  difficulty: string
  durationMinutes: number
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch(`${getApiBase()}/api/workouts`)
        const data = await res.json()
        const list = Array.isArray(data.data)
          ? data.data
          : data.data?.items || []
        setWorkouts(list)
      } catch (err) {
        setError('No se pudo cargar los entrenamientos.')
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  return (
    <div>
      <h2>Entrenamientos</h2>
      <p className="text-muted">Usa VITE_CODESPACE_NAME en <code>.env.local</code> para Codespaces.</p>
      {loading && <p>Cargando...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id ?? workout.name} className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">{workout.goal}</p>
                  <p className="card-text">Dificultad: {workout.difficulty}</p>
                  <p className="card-text">Duración: {workout.durationMinutes} min</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
