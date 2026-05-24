import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../services/api'

// Buat context untuk auth (biar bisa dipakai global)
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  // State untuk simpan user & loading
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Cek apakah user sudah login (dari localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const token = localStorage.getItem('auth_token')

    if (savedUser && token) {
      setUser(JSON.parse(savedUser)) // set user dari localStorage
    }

    setLoading(false) // selesai loading
  }, [])

  // FUNCTION LOGIN
  const login = async (email, password) => {
    const response = await authApi.login({ email, password })

    const { user, token } = response.data

    // Simpan token & user ke localStorage
    localStorage.setItem('auth_token', token)
    localStorage.setItem('user', JSON.stringify(user))

    setUser(user) // update state
    return response.data
  }

  // FUNCTION REGISTER
  const register = async (name, email, password, password_confirmation) => {
    const response = await authApi.register({ name, email, password, password_confirmation })

    const { user, token } = response.data

    // Simpan token & user
    localStorage.setItem('auth_token', token)
    localStorage.setItem('user', JSON.stringify(user))

    setUser(user)
    return response.data
  }

  // FUNCTION LOGOUT
  const logout = async () => {
    try {
      await authApi.logout() // request ke backend
    } catch (err) {}

    // Hapus data dari localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')

    setUser(null) // reset user
  }

  // Provider supaya bisa dipakai di seluruh app
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook biar gampang dipakai
export const useAuth = () => {
  const context = useContext(AuthContext)

  // Error kalau dipakai di luar AuthProvider
  if (!context) throw new Error('useAuth must be used within AuthProvider')

  return context
}