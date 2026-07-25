import React, { useEffect, useState } from 'react'
import { getApiBase } from '../api'

interface LeaderboardItem {
  _id?: string
  name: string
  score: number
  team?: string
}

export default function Leaderboard() {
  const [items, setItems] = useState<LeaderboardItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch(`${getApiBase()}/api/leaderboard`)
        const data = await res.json()
        const list = Array.isArray(data.data)
          ? data.data
          : data.data?.items || []
        setItems(list)
      } catch (err) {
        setError('No se pudo cargar el leaderboard.')
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <div>
      <h2>Leaderboard</h2>
      <p className="text-muted">Usa VITE_CODESPACE_NAME en <code>.env.local</code> para Codespaces.</p>
      {loading && <p>Cargando...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Posición</th>
                <th>Nombre</th>
                <th>Equipo</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? `${item.name}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.team || '—'}</td>
                  <td>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
