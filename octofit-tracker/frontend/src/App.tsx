import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

export default function App() {
  return (
    <BrowserRouter>
      <div className="container mt-4">
        <header className="mb-4">
          <h1>OctoFit Tracker</h1>
          <p className="text-muted">React 19 + Vite con rutas y soporte Codespaces.</p>
        </header>

        <nav className="nav nav-pills mb-4 flex-wrap">
          <Link className="nav-link" to="/">Inicio</Link>
          <Link className="nav-link" to="/users">Usuarios</Link>
          <Link className="nav-link" to="/teams">Equipos</Link>
          <Link className="nav-link" to="/activities">Actividades</Link>
          <Link className="nav-link" to="/workouts">Workouts</Link>
          <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <div>
              <h2>Bienvenido a OctoFit Tracker</h2>
              <p>Usa la navegación para ver usuarios, equipos, actividades, entrenamientos y el leaderboard.</p>
              <div className="alert alert-info">
                Si ejecutas en Codespaces, define <code>VITE_CODESPACE_NAME</code> en <code>.env.local</code>.
              </div>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={
            <div>
              <h2>Página no encontrada</h2>
              <p>Regresa a <Link to="/">Inicio</Link> para continuar.</p>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
