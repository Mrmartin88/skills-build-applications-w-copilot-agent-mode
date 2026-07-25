export function getApiBase() {
  const codespace = import.meta.env.VITE_CODESPACE_NAME
  return codespace
    ? `https://${codespace}-8000.app.github.dev`
    : 'http://localhost:8000'
}
