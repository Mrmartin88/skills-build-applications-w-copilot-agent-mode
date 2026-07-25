import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { getApiBase } from '../api';
export default function Teams() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchTeams() {
            try {
                const res = await fetch(`${getApiBase()}/api/teams`);
                const data = await res.json();
                const items = Array.isArray(data.data)
                    ? data.data
                    : data.data?.items || [];
                setTeams(items);
            }
            catch (err) {
                setError('No se pudo cargar los equipos.');
            }
            finally {
                setLoading(false);
            }
        }
        fetchTeams();
    }, []);
    return (_jsxs("div", { children: [_jsx("h2", { children: "Equipos" }), _jsxs("p", { className: "text-muted", children: ["Usa VITE_CODESPACE_NAME en ", _jsx("code", { children: ".env.local" }), " para Codespaces."] }), loading && _jsx("p", { children: "Cargando..." }), error && _jsx("div", { className: "alert alert-danger", children: error }), !loading && !error && (_jsx("div", { className: "row", children: teams.map((team) => (_jsx("div", { className: "col-md-6 mb-3", children: _jsx("div", { className: "card h-100", children: _jsxs("div", { className: "card-body", children: [_jsx("h5", { className: "card-title", children: team.name }), _jsx("p", { className: "card-text", children: team.description }), _jsxs("p", { className: "card-text", children: [_jsx("strong", { children: "Miembros:" }), " ", team.members?.map((member) => member.name).join(', ') || 'Ninguno'] })] }) }) }, team._id ?? team.name))) }))] }));
}
