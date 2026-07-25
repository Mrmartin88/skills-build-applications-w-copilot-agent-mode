import React, { useEffect, useState } from 'react'

export default function Leaderboard() {
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
    : 'http://localhost:8000/api/leaderboard'

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch(apiUrl)
        const data = await res.json()
        setItems(Array.isArray(data.data) ? data.data : [])
      } catch (err) {
        setError('No se pudo cargar el leaderboard.')
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [apiUrl])

  return (
    <div>
      <h2>Leaderboard</h2>
      {loading && <p>Cargando...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Equipo</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id || item.name}>
                <td>{item.user?.name || item.name}</td>
                <td>{item.team || '—'}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
