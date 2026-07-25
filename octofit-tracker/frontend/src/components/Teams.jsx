import React, { useEffect, useState } from 'react'

export default function Teams() {
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
    : 'http://localhost:8000/api/teams'

  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchTeams() {
      try {
        const res = await fetch(apiUrl)
        const data = await res.json()
        setTeams(Array.isArray(data.data) ? data.data : [])
      } catch (err) {
        setError('No se pudo cargar los equipos.')
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [apiUrl])

  return (
    <div>
      <h2>Equipos</h2>
      {loading && <p>Cargando...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id || team.name} className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p>{team.description}</p>
                  <p className="small text-muted">Miembros: {team.members?.length || 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
