import axios from 'axios'

// Base URL backend Laravel
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Buat instance axios (biar config sama semua request)
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json', // kirim data JSON
    'Accept': 'application/json',       // minta response JSON
  },
  withCredentials: true, // penting kalau pakai cookie (Sanctum)
})

// Interceptor request: otomatis tambahin token ke header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}` // kirim token
  }

  return config
})

// Interceptor response: handle error dari server
api.interceptors.response.use(
  (response) => response, // kalau sukses langsung lanjut
  (error) => {

    // Kalau token tidak valid / belum login
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token') // hapus token
      localStorage.removeItem('user')       // hapus user
      window.location.href = '/login'       // redirect ke login
    }

    return Promise.reject(error) // tetap lempar error
  }
)

// =====================
// Auth API
// =====================
export const authApi = {
  login: (data) => api.post('/api/login', data),     // login user
  register: (data) => api.post('/api/register', data), // register user
  logout: () => api.post('/api/logout'),             // logout user
  getUser: () => api.get('/api/user'),               // ambil data user
}

// =====================
// Contact API
// =====================
export const contactApi = {
  send: (data) => api.post('/api/contact', data), // kirim pesan contact
}

export default api