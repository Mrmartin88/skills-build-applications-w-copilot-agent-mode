import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { getApiBase } from '../api';
export default function Leaderboard() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const res = await fetch(`${getApiBase()}/api/leaderboard`);
                const data = await res.json();
                const list = Array.isArray(data.data)
                    ? data.data
                    : data.data?.items || [];
                setItems(list);
            }
            catch (err) {
                setError('No se pudo cargar el leaderboard.');
            }
            finally {
                setLoading(false);
            }
        }
        fetchLeaderboard();
    }, []);
    return (_jsxs("div", { children: [_jsx("h2", { children: "Leaderboard" }), _jsxs("p", { className: "text-muted", children: ["Usa VITE_CODESPACE_NAME en ", _jsx("code", { children: ".env.local" }), " para Codespaces."] }), loading && _jsx("p", { children: "Cargando..." }), error && _jsx("div", { className: "alert alert-danger", children: error }), !loading && !error && (_jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-hover", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Posici\u00F3n" }), _jsx("th", { children: "Nombre" }), _jsx("th", { children: "Equipo" }), _jsx("th", { children: "Puntos" })] }) }), _jsx("tbody", { children: items.map((item, index) => (_jsxs("tr", { children: [_jsx("td", { children: index + 1 }), _jsx("td", { children: item.name }), _jsx("td", { children: item.team || '—' }), _jsx("td", { children: item.score })] }, item._id ?? `${item.name}-${index}`))) })] }) }))] }));
}
