import axios from 'axios'

// =====================================================
// Axios Instance — GreenBanking API
// =====================================================
// Menggunakan Vite proxy (/api → http://localhost:8000)
// Sehingga baseURL cukup kosong, request akan ke /api/*
// =====================================================

const api = axios.create({
  baseURL: '', // Kosong karena Vite proxy handle /api/*
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// =====================================================
// Request Interceptor — Auto-attach Bearer Token
// =====================================================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// =====================================================
// Response Interceptor — Handle 401 Unauthorized
// =====================================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')

      // Hanya redirect jika bukan di halaman login/register
      const path = window.location.pathname
      if (path !== '/login' && path !== '/register') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// =====================================================
// Auth API
// =====================================================
export const authApi = {
  register: (data) => api.post('/api/register', data),
  login: (data) => api.post('/api/login', data),
  logout: () => api.post('/api/logout'),
  getUser: () => api.get('/api/user'),
}

// =====================================================
// Contact API
// =====================================================
export const contactApi = {
  send: (data) => api.post('/api/contact', data),
}

// =====================================================
// Profile API
// =====================================================
export const profileApi = {
  update: (data) => api.put('/api/profile/update', data),
  getMessages: () => api.get('/api/profile/messages'),
}

export default api