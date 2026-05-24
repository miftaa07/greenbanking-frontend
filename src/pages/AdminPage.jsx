import { useState } from 'react'
import { Menu, MessageSquare, BookOpen, MessageSquareReply, Users } from 'lucide-react'
import AdminSidebar from '../components/admin/AdminSidebar'
import StatCard from '../components/admin/StatCard'
import ActivityList from '../components/admin/ActivityList'
import PesanMasuk from '../components/admin/PesanMasuk'

const stats = [
  { id: 1, icon: MessageSquare,       value: '4',     label: 'Total Pesan Masuk' },
  { id: 2, icon: BookOpen,            value: '1',     label: 'Pesan Belum Dibaca' },
  { id: 3, icon: MessageSquareReply,  value: '3',     label: 'Pesan Sudah Dibalas' },
  { id: 4, icon: Users,              value: '1,247', label: 'Pengunjung Bulan Ini' },
]

export default function AdminPage() {
  const [activeMenu, setActiveMenu] = useState('pesan-masuk') // Set Pesan Masuk as default active menu
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Dummy messages state to handle interactive read status
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Dr. Ahmad Santoso",
      university: "Universitas Indonesia",
      email: "ahmad.santosos@univ.ac.id",
      message: "Saya tertarik untuk berkolaborasi dalam penelitian serupa. Apakah data penelitian ini bisa diakses untuk tujuan akademik?",
      date: "2024-03-25 10:30",
      unread: true
    },
    {
      id: 2,
      name: "Prof. Budi Rahardjo",
      university: "Institut Teknologi Bandung",
      email: "budi.rahardjo@itb.ac.id",
      message: "Bagaimana mekanisme integrasi API Green Banking untuk sistem pembayaran kampus kami yang ramah lingkungan?",
      date: "2024-03-24 15:45",
      unread: false
    },
    {
      id: 3,
      name: "Citra Lestari, M.Si",
      university: "Universitas Gadjah Mada",
      email: "citra.lestari@ugm.ac.id",
      message: "Apakah ada program magang atau kerjasama penelitian bagi mahasiswa pascasarjana di bidang Eco-Finance?",
      date: "2024-03-23 09:15",
      unread: false
    },
    {
      id: 4,
      name: "Ir. H. Dian Wijaya",
      university: "Universitas Diponegoro",
      email: "dian.wijaya@undip.ac.id",
      message: "Kami sedang merancang kurikulum baru tentang Green Economy. Apakah tim Green Banking bersedia menjadi pembicara tamu?",
      date: "2024-03-22 14:20",
      unread: false
    }
  ])

  // Mark message as read
  const handleToggleRead = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, unread: false } : msg))
    )
  }

  // Calculate dynamic unread count
  const unreadCount = messages.filter((msg) => msg.unread).length

  return (
    <div className="flex h-screen bg-[#f5f7f8] font-sans overflow-hidden">
      {/* ── Sidebar ── */}
      <AdminSidebar
        activeMenu={activeMenu}
        onMenuClick={(id) => { setActiveMenu(id); setSidebarOpen(false) }}
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
                {stats.map((stat) => (
                  <StatCard
                    key={stat.id}
                    icon={stat.icon}
                    value={stat.id === 2 ? unreadCount.toString() : stat.value}
                    label={stat.label}
                  />
                ))}
              </div>

              {/* Recent Activity */}
              <ActivityList />
            </div>
          )}

          {/* ── Pesan Masuk Menu Content ── */}
          {activeMenu === 'pesan-masuk' && (
            <PesanMasuk
              messages={messages}
              onToggleRead={handleToggleRead}
            />
          )}

          {/* ── Pesan Dibalas Menu Content ── */}
          {activeMenu === 'pesan-dibalas' && (
            <div className="animate-fadeIn">
              {/* Page Header */}
              <div className="mb-8">
                <h3 className="text-3xl font-extrabold text-[#111827] tracking-tight">
                  Pesan Dibalas
                </h3>
                <p className="text-[#6b7280] text-[15px] mt-2 font-normal">
                  Daftar pesan yang telah ditindaklanjuti
                </p>
              </div>
              
              <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-gray-100 rounded-2xl text-center shadow-sm">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
                  <MessageSquareReply className="w-6 h-6 text-gray-400" />
                </div>
                <h4 className="text-base font-bold text-gray-800">Tidak Ada Pesan Dibalas</h4>
                <p className="text-sm text-gray-400 mt-1 max-w-xs">
                  Belum ada pesan yang ditandai sebagai dibalas saat ini.
                </p>
              </div>
            </div>
          )}

          {/* ── Keluar Menu Content ── */}
          {activeMenu === 'keluar' && (
            <div className="animate-fadeIn">
              {/* Page Header */}
              <div className="mb-8">
                <h3 className="text-3xl font-extrabold text-[#111827] tracking-tight">
                  Keluar
                </h3>
                <p className="text-[#6b7280] text-[15px] mt-2 font-normal">
                  Sesi administrasi panel
                </p>
              </div>
              
              <div className="bg-white border border-gray-200/80 rounded-2xl p-8 max-w-lg shadow-sm">
                <h4 className="text-lg font-bold text-gray-900">Konfirmasi Keluar</h4>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  Apakah Anda yakin ingin keluar dari sistem admin panel Green Banking? Sesi aktif Anda akan segera diakhiri.
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <button 
                    onClick={() => window.location.href = '/'}
                    className="h-11 px-6 rounded-xl bg-[#22c55e] text-white font-semibold text-sm hover:bg-[#16a34a] hover:shadow-lg hover:shadow-green-100 transition-all duration-300"
                  >
                    Ya, Keluar Sesi
                  </button>
                  <button 
                    onClick={() => setActiveMenu('pesan-masuk')}
                    className="h-11 px-6 rounded-xl border border-gray-200 text-[#6b7280] hover:bg-gray-50 font-semibold text-sm transition-all duration-300"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
