import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../services/api'

// Context untuk authentication — dipakai global di seluruh app
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Cek localStorage saat pertama kali load
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('user')
        const token = localStorage.getItem('auth_token')

        if (savedUser && token) {
          setUser(JSON.parse(savedUser))
        }
      } catch (err) {
        // Jika data corrupt, bersihkan
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  // =====================
  // LOGIN
  // =====================
  const login = async (email, password) => {
    const response = await authApi.login({ email, password })
    const { user: userData, token } = response.data

    // Simpan ke localStorage
    localStorage.setItem('auth_token', token)
    localStorage.setItem('user', JSON.stringify(userData))

    // Update state
    setUser(userData)

    return response.data
  }

  // =====================
  // REGISTER
  // =====================
  const register = async (name, email, password, password_confirmation) => {
    const response = await authApi.register({
      name,
      email,
      password,
      password_confirmation,
    })
    const { user: userData, token } = response.data

    // Simpan ke localStorage
    localStorage.setItem('auth_token', token)
    localStorage.setItem('user', JSON.stringify(userData))

    // Update state
    setUser(userData)

    return response.data
  }

  // =====================
  // LOGOUT
  // =====================
  const logout = async () => {
    try {
      await authApi.logout()
    } catch (err) {
      // Tetap logout di frontend meskipun backend error
    }

    // Hapus dari localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')

    // Reset state
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook — useAuth()
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider')
  }
  return context
}