import { useState } from 'react'
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react'
import { profileApi } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

export default function EditProfileForm({ user }) {
  const { setUser } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const res = await profileApi.update(formData)
      setStatus('success')
      setFormData(prev => ({ ...prev, password: '' }))
      
      // Update data user di context & localStorage
      if (res.data.user) {
        setUser(res.data.user)
        localStorage.setItem('user', JSON.stringify(res.data.user))
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 animate-fadeIn" style={{animationDelay: '200ms'}}>
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Save className="w-6 h-6 text-green-500" />
        Edit Profile
      </h2>

      {status === 'success' && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3 animate-scaleIn">
          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-green-800">Profile berhasil diperbarui!</p>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 animate-scaleIn">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-red-800">Terjadi kesalahan. Silakan coba lagi.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Lengkap</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm text-gray-900 bg-gray-50/50 focus:bg-white"
            placeholder="Masukkan nama Anda"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm text-gray-900 bg-gray-50/50 focus:bg-white"
            placeholder="nama@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password Baru (Opsional)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm text-gray-900 bg-gray-50/50 focus:bg-white"
            placeholder="Kosongkan jika tidak ingin mengubah"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 h-11 rounded-xl bg-green-500 text-white font-bold text-sm hover:bg-green-600 hover:shadow-lg hover:shadow-green-100 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Menyimpan...
            </>
          ) : (
            'Simpan Perubahan'
          )}
        </button>
      </form>
    </div>
  )
}
