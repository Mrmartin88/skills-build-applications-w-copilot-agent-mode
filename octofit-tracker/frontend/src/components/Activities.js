import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { getApiBase } from '../api';
export default function Activities() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchActivities() {
            try {
                const res = await fetch(`${getApiBase()}/api/activities`);
                const data = await res.json();
                const items = Array.isArray(data.data)
                    ? data.data
                    : data.data?.items || [];
                setActivities(items);
            }
            catch (err) {
                setError('No se pudo cargar las actividades.');
            }
            finally {
                setLoading(false);
            }
        }
        fetchActivities();
    }, []);
    return (_jsxs("div", { children: [_jsx("h2", { children: "Actividades" }), _jsxs("p", { className: "text-muted", children: ["Usa VITE_CODESPACE_NAME en ", _jsx("code", { children: ".env.local" }), " para Codespaces."] }), loading && _jsx("p", { children: "Cargando..." }), error && _jsx("div", { className: "alert alert-danger", children: error }), !loading && !error && (_jsx("div", { className: "list-group", children: activities.map((activity) => (_jsxs("div", { className: "list-group-item", children: [_jsx("strong", { children: activity.type }), " por ", activity.user?.name || 'desconocido', " \u00B7 ", activity.durationMinutes, " min \u00B7 ", activity.caloriesBurned, " kcal", _jsx("div", { className: "text-muted small", children: new Date(activity.timestamp).toLocaleString() })] }, activity._id ?? `${activity.type}-${activity.timestamp}`))) }))] }));
}
