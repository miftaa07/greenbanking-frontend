import { LayoutDashboard, Inbox, MessageSquareReply, LogOut, Leaf, X } from 'lucide-react'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { id: 'pesan-masuk', label: 'Pesan Masuk', icon: Inbox, badge: 1 },
  { id: 'pesan-dibalas', label: 'Pesan Dibalas', icon: MessageSquareReply, badge: null },
  { id: 'keluar', label: 'Keluar', icon: LogOut, badge: null },
]

export default function AdminSidebar({ activeMenu, onMenuClick, isOpen, onClose, unreadCount = 0 }) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[260px] bg-white border-r border-gray-100
          flex flex-col z-30 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-6 py-7">
          <div className="w-10 h-10 bg-[#22c55e] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-green-200">
            <Leaf className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-[#111827] text-[15px] tracking-tight">Green Banking</span>
            <span className="text-[#6b7280] text-[12px] font-normal">Admin Panel</span>
          </div>
          {/* Close button mobile */}
          <button
            onClick={onClose}
            className="ml-auto lg:hidden text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-gray-100 mb-4" />

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeMenu === item.id
            return (
              <button
                key={item.id}
                onClick={() => onMenuClick(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 h-[50px] rounded-xl
                  text-sm font-medium transition-all duration-200 group
                  ${isActive
                    ? 'bg-[#dcfce7] text-[#16a34a]'
                    : 'text-[#6b7280] hover:bg-[#f0fdf4] hover:text-[#22c55e]'
                  }
                `}
              >
                <Icon
                  className={`w-[18px] h-[18px] flex-shrink-0 transition-colors duration-200
                    ${isActive ? 'text-[#22c55e]' : 'text-[#9ca3af] group-hover:text-[#22c55e]'}
                  `}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="flex-1 text-left">{item.label}</span>
                {item.id === 'pesan-masuk' ? (
                  unreadCount > 0 && (
                    <span className="w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0 animate-scaleIn">
                      {unreadCount}
                    </span>
                  )
                ) : item.badge !== null && (
                  <span className="w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0">
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 mt-auto">
          <p className="text-[11px] text-gray-300 text-center">© 2025 Green Banking</p>
        </div>
      </aside>
    </>
  )
}
