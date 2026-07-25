import React, { useEffect, useState } from 'react'
import { getApiBase } from '../api'

interface Activity {
  _id?: string
  type: string
  durationMinutes: number
  caloriesBurned: number
  timestamp: string
  user?: { name: string }
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchActivities() {
      try {
        const res = await fetch(`${getApiBase()}/api/activities`)
        const data = await res.json()
        const items = Array.isArray(data.data)
          ? data.data
          : data.data?.items || []
        setActivities(items)
      } catch (err) {
        setError('No se pudo cargar las actividades.')
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  return (
    <div>
      <h2>Actividades</h2>
      <p className="text-muted">Usa VITE_CODESPACE_NAME en <code>.env.local</code> para Codespaces.</p>
      {loading && <p>Cargando...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="list-group">
          {activities.map((activity) => (
            <div key={activity._id ?? `${activity.type}-${activity.timestamp}`} className="list-group-item">
              <strong>{activity.type}</strong> por {activity.user?.name || 'desconocido'} · {activity.durationMinutes} min · {activity.caloriesBurned} kcal
              <div className="text-muted small">{new Date(activity.timestamp).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
