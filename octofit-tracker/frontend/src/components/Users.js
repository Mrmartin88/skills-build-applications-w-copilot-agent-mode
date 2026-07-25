import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { getApiBase } from '../api';
export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch(`${getApiBase()}/api/users`);
                const data = await res.json();
                const items = Array.isArray(data.data)
                    ? data.data
                    : data.data?.items || [];
                setUsers(items);
            }
            catch (err) {
                setError('No se pudo cargar la lista de usuarios.');
            }
            finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);
    return (_jsxs("div", { children: [_jsx("h2", { children: "Usuarios" }), _jsxs("p", { className: "text-muted", children: ["Usa VITE_CODESPACE_NAME en ", _jsx("code", { children: ".env.local" }), " para Codespaces."] }), loading && _jsx("p", { children: "Cargando..." }), error && _jsx("div", { className: "alert alert-danger", children: error }), !loading && !error && (_jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-striped", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Nombre" }), _jsx("th", { children: "Email" }), _jsx("th", { children: "Rol" }), _jsx("th", { children: "Equipo" })] }) }), _jsx("tbody", { children: users.map((user) => (_jsxs("tr", { children: [_jsx("td", { children: user.name }), _jsx("td", { children: user.email }), _jsx("td", { children: user.role }), _jsx("td", { children: user.team?.name || '—' })] }, user._id ?? user.email))) })] }) }))] }));
}
