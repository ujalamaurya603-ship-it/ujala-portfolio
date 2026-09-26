import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Trash2, Plus } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import api from '../utils/api.js'

const emptyProject = { title: '', subtitle: '', description: '', tech: '', githubUrl: '', liveUrl: '' }

export default function AdminDashboard() {
  const { logout, isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [tab, setTab] = useState('projects')
  const [projects, setProjects] = useState([])
  const [messages, setMessages] = useState([])
  const [certificates, setCertificates] = useState([])
const [certificateForm, setCertificateForm] = useState({
  title: '',
  organization: '',
  date: '',
  imageUrl: '',
  verifyUrl: '',
  order: 0,
})
  const [form, setForm] = useState(emptyProject)

  useEffect(() => {
    if (!isAuthenticated) navigate('/admin/login')
  }, [isAuthenticated, navigate])

  useEffect(() => {
    api.getProjects().then(setProjects).catch(() => {})
    api.getMessages().then(setMessages).catch(() => {})
    api.getCertificates().then(setCertificates).catch(() => {})
  }, [])
  

  async function handleAddProject(e) {
    e.preventDefault()
    try {
      const payload = { ...form, tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean) }
      const created = await api.createProject(payload)
      setProjects((p) => [created, ...p])
      setForm(emptyProject)
      showToast('Project added', 'success')
    } catch (err) {
      showToast(err.message || 'Failed to add project', 'error')
    }
  }
async function handleAddCertificate(e) {
  e.preventDefault()

  try {
    const created = await api.createCertificate({
      ...certificateForm,
      order: Number(certificateForm.order) || 0,
    })

    setCertificates((c) => [created, ...c])

    setCertificateForm({
      title: '',
      organization: '',
      date: '',
      imageUrl: '',
      verifyUrl: '',
      order: 0,
    })

    showToast('Certificate added', 'success')
  } catch (err) {
    showToast(err.message || 'Failed to add certificate', 'error')
  }
}
  async function handleDelete(id) {
    try {
      await api.deleteProject(id)
      setProjects((p) => p.filter((proj) => proj._id !== id))
      showToast('Project deleted', 'success')
    } catch (err) {
      showToast(err.message || 'Failed to delete project', 'error')
    }
  }

  return (
    <div className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-bold text-2xl">Admin Dashboard</h1>
        <button onClick={() => { logout(); navigate('/admin/login') }} className="btn btn-ghost text-sm">
          <LogOut size={15} /> Log Out
        </button>
      </div>

      <div className="flex gap-3 mb-8">
        <button onClick={() => setTab('projects')} className={`btn ${tab === 'projects' ? 'btn-primary' : 'btn-ghost'} text-sm`}>Projects</button>
        <button onClick={() => setTab('messages')} className={`btn ${tab === 'messages' ? 'btn-primary' : 'btn-ghost'} text-sm`}>Messages</button>
        <button
  onClick={() => setTab('certificates')}
  className={`btn ${tab === 'certificates' ? 'btn-primary' : 'btn-ghost'} text-sm`}
>
  Certificates
</button>
      </div>

      {tab === 'projects' && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2"><Plus size={18} /> Add Project</h2>
            <form onSubmit={handleAddProject} className="space-y-3">
              <input required placeholder="Title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="field" />
              <input placeholder="Subtitle" value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} className="field" />
              <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="field" rows={3} />
              <input placeholder="Tech (comma separated)" value={form.tech} onChange={(e) => setForm((f) => ({ ...f, tech: e.target.value }))} className="field" />
              <input placeholder="GitHub URL" value={form.githubUrl} onChange={(e) => setForm((f) => ({ ...f, githubUrl: e.target.value }))} className="field" />
              <input placeholder="Live Demo URL" value={form.liveUrl} onChange={(e) => setForm((f) => ({ ...f, liveUrl: e.target.value }))} className="field" />
              <button type="submit" className="btn btn-primary w-full justify-center">Add Project</button>
            </form>
          </div>

          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg mb-1">Existing Projects</h2>
            {projects.length === 0 && <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>No projects yet.</p>}
            {projects.map((p) => (
              <div key={p._id} className="glass rounded-xl p-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-sm">{p.title}</p>
                  <p className="text-xs" style={{ color: 'var(--ink-dim)' }}>{p.subtitle}</p>
                </div>
                <button onClick={() => handleDelete(p._id)} className="w-8 h-8 rounded-lg flex items-center justify-center glass" aria-label="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'messages' && (
        <div className="space-y-3">
          <h2 className="font-display font-bold text-lg mb-1">Contact Messages</h2>
          {messages.length === 0 && <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>No messages yet.</p>}
          {messages.map((m) => (
            <div key={m._id} className="glass rounded-xl p-5">
              <div className="flex justify-between mb-1">
                <p className="font-semibold text-sm">{m.name} &middot; {m.email}</p>
                <p className="text-xs" style={{ color: 'var(--ink-faint)' }}>{new Date(m.createdAt).toLocaleString()}</p>
              </div>
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--accent-2)' }}>{m.subject}</p>
              <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>{m.message}</p>
            </div>
          ))}
        </div>
      )}
      {tab === 'certificates' && (
  <div className="grid md:grid-cols-2 gap-8">
    <div className="glass rounded-2xl p-6">
      <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
        <Plus size={18} /> Add Certificate
      </h2>

      <form onSubmit={handleAddCertificate} className="space-y-3">
        <input
          required
          placeholder="Certificate Title"
          value={certificateForm.title}
          onChange={(e) =>
            setCertificateForm((f) => ({ ...f, title: e.target.value }))
          }
          className="field"
        />

        <input
          required
          placeholder="Organization"
          value={certificateForm.organization}
          onChange={(e) =>
            setCertificateForm((f) => ({ ...f, organization: e.target.value }))
          }
          className="field"
        />

        <input
          placeholder="Date"
          value={certificateForm.date}
          onChange={(e) =>
            setCertificateForm((f) => ({ ...f, date: e.target.value }))
          }
          className="field"
        />

        <input
          required
          placeholder="Certificate Image URL"
          value={certificateForm.imageUrl}
          onChange={(e) =>
            setCertificateForm((f) => ({ ...f, imageUrl: e.target.value }))
          }
          className="field"
        />

        <input
          placeholder="Verification URL"
          value={certificateForm.verifyUrl}
          onChange={(e) =>
            setCertificateForm((f) => ({ ...f, verifyUrl: e.target.value }))
          }
          className="field"
        />

        <input
          type="number"
          placeholder="Order"
          value={certificateForm.order}
          onChange={(e) =>
            setCertificateForm((f) => ({ ...f, order: e.target.value }))
          }
          className="field"
        />

        <button
          type="submit"
          className="btn btn-primary w-full justify-center"
        >
          Add Certificate
        </button>
      </form>
    </div>

    <div className="space-y-3">
      <h2 className="font-display font-bold text-lg mb-1">
        Existing Certificates
      </h2>

      {certificates.length === 0 && (
        <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
          No certificates yet.
        </p>
      )}

      {certificates.map((certificate) => (
        <div
          key={certificate._id}
          className="glass rounded-xl p-4"
        >
          <p className="font-semibold text-sm">{certificate.title}</p>
          <p
            className="text-xs"
            style={{ color: 'var(--ink-dim)' }}
          >
            {certificate.organization}
          </p>
          <p
            className="text-xs mt-1"
            style={{ color: 'var(--ink-faint)' }}
          >
            {certificate.date}
          </p>
        </div>
      ))}
    </div>
  </div>
)}
    </div>
  )
}