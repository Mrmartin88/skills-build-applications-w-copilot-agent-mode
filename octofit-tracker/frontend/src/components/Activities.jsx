import React, { useEffect, useState } from 'react'

export default function Activities() {
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
    : 'http://localhost:8000/api/activities'

  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchActivities() {
      try {
        const res = await fetch(apiUrl)
        const data = await res.json()
        setActivities(Array.isArray(data.data) ? data.data : [])
      } catch (err) {
        setError('No se pudo cargar las actividades.')
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [apiUrl])

  return (
    <div>
      <h2>Actividades</h2>
      {loading && <p>Cargando...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="list-group">
          {activities.map((activity) => (
            <div key={activity._id || activity.type} className="list-group-item">
              <strong>{activity.type}</strong> · {activity.durationMinutes} min · {activity.caloriesBurned} kcal
              <div className="text-muted small">{new Date(activity.timestamp).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
