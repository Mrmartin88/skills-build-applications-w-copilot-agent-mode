import React, { useEffect, useState } from 'react'

export default function Workouts() {
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
    : 'http://localhost:8000/api/workouts'

  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch(apiUrl)
        const data = await res.json()
        setWorkouts(Array.isArray(data.data) ? data.data : [])
      } catch (err) {
        setError('No se pudo cargar los entrenamientos.')
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [apiUrl])

  return (
    <div>
      <h2>Entrenamientos</h2>
      {loading && <p>Cargando...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id || workout.title} className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.title}</h5>
                  <p>{workout.description}</p>
                  <p className="small text-muted">Duración: {workout.durationMinutes} min</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
