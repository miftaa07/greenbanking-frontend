import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { adminApi } from '../services/api'
import { Menu, MessageSquare, BookOpen, MessageSquareReply, Users } from 'lucide-react'
import AdminSidebar from '../components/admin/AdminSidebar'
import StatCard from '../components/admin/StatCard'
import ActivityList from '../components/admin/ActivityList'
import PesanMasuk from '../components/admin/PesanMasuk'
import PesanDibalas from '../components/admin/PesanDibalas'

const stats = [
  { id: 1, icon: MessageSquare,       value: '4',     label: 'Total Pesan Masuk' },
  { id: 2, icon: BookOpen,            value: '1',     label: 'Pesan Belum Dibaca' },
  { id: 3, icon: MessageSquareReply,  value: '3',     label: 'Pesan Sudah Dibalas' },
  { id: 4, icon: Users,              value: '1,247', label: 'Pengunjung Bulan Ini' },
]

export default function AdminPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  
  const [activeMenu, setActiveMenu] = useState('dashboard') // Set Dashboard as default active menu
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed', error)
    } finally {
      navigate('/login')
    }
  }
  
  // Prevent body scroll when logout modal is open
  useEffect(() => {
    if (showLogoutModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showLogoutModal])
  
  // Data asil dari API
  const [messages, setMessages] = useState([])
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [errorMessages, setErrorMessages] = useState(null)

  const [statsData, setStatsData] = useState(null)
  const [loadingStats, setLoadingStats] = useState(false)

  // Fetch stats from backend
  const fetchStats = async () => {
    setLoadingStats(true)
    try {
      const response = await adminApi.getStats()
      if (response.data && response.data.success) {
        setStatsData(response.data.data)
      }
    } catch (err) {
      console.error('Failed to fetch stats', err)
    } finally {
      setLoadingStats(false)
    }
  }

  // Fetch messages from backend
  const fetchMessages = async () => {
    setLoadingMessages(true)
    setErrorMessages(null)
    try {
      const response = await adminApi.getMessages()
      if (response.data && response.data.success) {
        // Map data dari backend ke format UI
        const mapped = response.data.data.map(msg => ({
          id: msg.id,
          name: msg.nama,
          university: msg.subjek || 'Umum',
          email: msg.email,
          message: msg.isi_pesan,
          date: new Date(msg.created_at).toLocaleString('id-ID', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
          }),
          unread: !msg.is_read,
          replied: !!msg.balasan,
          replyMessage: msg.balasan ? msg.balasan.isi_balasan : null
        }))
        setMessages(mapped)
      }
    } catch (err) {
      console.error('Failed to fetch messages', err)
      setErrorMessages('Gagal memuat pesan. Silakan coba lagi nanti.')
    } finally {
      setLoadingMessages(false)
    }
  }

  // Load messages when component mounts or activeMenu changes to relevant tabs
  useEffect(() => {
    fetchMessages()
    fetchStats()
  }, [])

  // Mark message as read
  const handleToggleRead = async (id) => {
    try {
      await adminApi.markAsRead(id)
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, unread: false } : msg))
      )
      // Refresh stats
      fetchStats()
    } catch (err) {
      console.error('Failed to mark as read', err)
    }
  }

  // Handle send reply
  const handleSendReply = async (id, text) => {
    try {
      const response = await adminApi.replyMessage(id, text)
      if (response.data && response.data.success) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, replied: true, replyMessage: text } : msg))
        )
        // Refresh stats
        fetchStats()
      }
    } catch (err) {
      console.error('Failed to send reply', err)
    }
  }

  // Calculate dynamic unread count
  const unreadCount = messages.filter((msg) => msg.unread).length

  return (
    <div className="flex h-screen bg-[#f5f7f8] font-sans overflow-hidden">
      {/* ── Sidebar ── */}
      <AdminSidebar
        activeMenu={activeMenu}
        onMenuClick={(id) => { 
          if (id === 'keluar') {
            setShowLogoutModal(true)
            setSidebarOpen(false)
          } else {
            setActiveMenu(id)
            setSidebarOpen(false)
          }
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        unreadCount={unreadCount}
      />

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center gap-3 px-5 py-4 bg-white border-b border-gray-100 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-gray-50 transition-colors text-gray-600"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#22c55e] rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold">GB</span>
            </div>
            <span className="font-bold text-[#111827] text-sm">Green Banking</span>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-6 py-8 lg:px-10 lg:py-10">

          {/* ── Dashboard Menu Content ── */}
          {activeMenu === 'dashboard' && (
            <div className="animate-fadeIn">
              {/* Page Header */}
              <div className="mb-8">
                <h3 className="text-3xl font-extrabold text-[#111827] tracking-tight">
                  Dashboard
                </h3>
                <p className="text-[#6b7280] text-[15px] mt-2 font-normal">
                  Ringkasan aktivitas website
                </p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((stat) => {
                  let dynamicValue = stat.value;
                  if (statsData) {
                    if (stat.id === 1) dynamicValue = statsData.total_pesan.toString();
                    if (stat.id === 2) dynamicValue = statsData.pesan_belum_dibaca.toString();
                    if (stat.id === 3) dynamicValue = statsData.pesan_sudah_dibalas.toString();
                    if (stat.id === 4) dynamicValue = statsData.pengunjung_bulan_ini.toLocaleString('id-ID');
                  }
                  
                  return (
                    <StatCard
                      key={stat.id}
                      icon={stat.icon}
                      value={loadingStats || !statsData ? '...' : dynamicValue}
                      label={stat.label}
                    />
                  );
                })}
              </div>

              {/* Recent Activity */}
              <ActivityList messages={messages} isLoading={loadingMessages} />
            </div>
          )}

          {/* ── Pesan Masuk Menu Content ── */}
          {activeMenu === 'pesan-masuk' && (
            <PesanMasuk
              messages={messages}
              onToggleRead={handleToggleRead}
              onSendReply={handleSendReply}
              isLoading={loadingMessages}
              error={errorMessages}
            />
          )}

          {/* ── Pesan Dibalas Menu Content ── */}
          {activeMenu === 'pesan-dibalas' && (
            <PesanDibalas 
              messages={messages} 
              isLoading={loadingMessages}
              error={errorMessages}
            />
          )}

          {/* ── Keluar Modal ── */}
          {showLogoutModal && createPortal(
            <div className="fixed inset-0 w-[100vw] h-[100vh] z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/40 animate-fadeIn"
                 onClick={(e) => { if (e.target === e.currentTarget) setShowLogoutModal(false) }}
            >
              <div className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-scaleIn transform transition-all relative">
                <h4 className="text-xl font-extrabold text-[#111827]">Konfirmasi Keluar</h4>
                <p className="text-[14px] text-gray-500 mt-2 leading-relaxed">
                  Apakah Anda yakin ingin keluar dari sistem admin panel Green Banking? Sesi aktif Anda akan segera diakhiri.
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <button 
                    onClick={handleLogout}
                    className="flex-1 h-11 rounded-xl bg-[#22c55e] text-white font-bold text-sm hover:bg-[#16a34a] hover:shadow-lg hover:shadow-green-100 transition-all duration-300"
                  >
                    Ya, Keluar
                  </button>
                  <button 
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 h-11 rounded-xl border border-gray-200 text-[#6b7280] font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}

        </main>
      </div>
    </div>
  )
}
