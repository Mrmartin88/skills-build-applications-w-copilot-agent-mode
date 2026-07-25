import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { getApiBase } from '../api';
export default function Workouts() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchWorkouts() {
            try {
                const res = await fetch(`${getApiBase()}/api/workouts`);
                const data = await res.json();
                const list = Array.isArray(data.data)
                    ? data.data
                    : data.data?.items || [];
                setWorkouts(list);
            }
            catch (err) {
                setError('No se pudo cargar los entrenamientos.');
            }
            finally {
                setLoading(false);
            }
        }
        fetchWorkouts();
    }, []);
    return (_jsxs("div", { children: [_jsx("h2", { children: "Entrenamientos" }), _jsxs("p", { className: "text-muted", children: ["Usa VITE_CODESPACE_NAME en ", _jsx("code", { children: ".env.local" }), " para Codespaces."] }), loading && _jsx("p", { children: "Cargando..." }), error && _jsx("div", { className: "alert alert-danger", children: error }), !loading && !error && (_jsx("div", { className: "row", children: workouts.map((workout) => (_jsx("div", { className: "col-md-6 mb-3", children: _jsx("div", { className: "card h-100", children: _jsxs("div", { className: "card-body", children: [_jsx("h5", { className: "card-title", children: workout.name }), _jsx("p", { className: "card-text", children: workout.goal }), _jsxs("p", { className: "card-text", children: ["Dificultad: ", workout.difficulty] }), _jsxs("p", { className: "card-text", children: ["Duraci\u00F3n: ", workout.durationMinutes, " min"] })] }) }) }, workout._id ?? workout.name))) }))] }));
}
