import { useState } from 'react'
import { contactApi } from '../services/api'

export default function ContactForm() {
  const [form, setForm] = useState({ nama: '', email: '', organisasi: '', pesan: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    setErrors({})
    try {
      const res = await contactApi.send(form)
      setSuccess(res.data.message)
      setForm({ nama: '', email: '', organisasi: '', pesan: '' })
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors)
      } else {
        setError('Gagal mengirim pesan. Coba lagi.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
          ✓ {success}
        </div>
      )}
      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nama"
          placeholder="Masukkan nama lengkap"
          value={form.nama}
          onChange={handleChange}
          required
          className="input-field"
        />
        {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alamat Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="Masukkan alamat email"
          value={form.email}
          onChange={handleChange}
          required
          className="input-field"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Organisasi</label>
        <input
          type="text"
          name="organisasi"
          placeholder="Masukkan organisasi"
          value={form.organisasi}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pesan <span className="text-red-500">*</span>
        </label>
        <textarea
          name="pesan"
          placeholder="Tulis pesan Anda"
          value={form.pesan}
          onChange={handleChange}
          required
          rows={5}
          className="input-field resize-none"
        />
        {errors.pesan && <p className="text-red-500 text-xs mt-1">{errors.pesan[0]}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        {loading ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
    </form>
  )
}
