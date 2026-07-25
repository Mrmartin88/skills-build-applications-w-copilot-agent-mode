import React, { useEffect, useState } from 'react'
import { getApiBase } from '../api'

interface User {
  _id?: string
  name: string
  email: string
  role: string
  joinedAt?: string
  team?: { name: string }
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`${getApiBase()}/api/users`)
        const data = await res.json()

        const items = Array.isArray(data.data)
          ? data.data
          : data.data?.items || []

        setUsers(items)
      } catch (err) {
        setError('No se pudo cargar la lista de usuarios.')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <h2>Usuarios</h2>
      <p className="text-muted">Usa VITE_CODESPACE_NAME en <code>.env.local</code> para Codespaces.</p>
      {loading && <p>Cargando...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Equipo</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.team?.name || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
