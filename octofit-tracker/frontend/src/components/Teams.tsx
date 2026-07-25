import React, { useEffect, useState } from 'react'
import { getApiBase } from '../api'

interface Team {
  _id?: string
  name: string
  description: string
  members?: { name: string }[]
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTeams() {
      try {
        const res = await fetch(`${getApiBase()}/api/teams`)
        const data = await res.json()
        const items = Array.isArray(data.data)
          ? data.data
          : data.data?.items || []
        setTeams(items)
      } catch (err) {
        setError('No se pudo cargar los equipos.')
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  return (
    <div>
      <h2>Equipos</h2>
      <p className="text-muted">Usa VITE_CODESPACE_NAME en <code>.env.local</code> para Codespaces.</p>
      {loading && <p>Cargando...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id ?? team.name} className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                  <p className="card-text"><strong>Miembros:</strong> {team.members?.map((member) => member.name).join(', ') || 'Ninguno'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
