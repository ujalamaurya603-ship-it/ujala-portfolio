const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const token = localStorage.getItem('um-admin-token')
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  const contentType = res.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await res.json() : null

  if (!res.ok) {
    const message = (data && data.message) || `Request failed (${res.status})`
    throw new Error(message)
  }
  return data
}

export const api = {
  getProjects: () => request('/projects'),
  createProject: (payload) => request('/projects', { method: 'POST', body: JSON.stringify(payload) }),
  updateProject: (id, payload) => request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteProject: (id) => request(`/projects/${id}`, { method: 'DELETE' }),

  getSkills: () => request('/skills'),

  getCertificates: () => request('/certificates'),
  createCertificate: (payload) => request('/certificates', { method: 'POST', body: JSON.stringify(payload) }),
updateCertificate: (id, payload) => request(`/certificates/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
deleteCertificate: (id) => request(`/certificates/${id}`, { method: 'DELETE' }),

  sendContact: (payload) => request('/contact', { method: 'POST', body: JSON.stringify(payload) }),
  getMessages: () => request('/contact'),

  askAI: (message) => request('/ai/ask', { method: 'POST', body: JSON.stringify({ message }) }),

  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
}

export default api
