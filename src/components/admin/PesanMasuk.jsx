import { useState, useMemo, useEffect } from 'react'
import { Mail, Search, ChevronLeft, ChevronRight, X, Send, User, AtSign, Building2, MessageSquare, Calendar } from 'lucide-react'

const ITEMS_PER_PAGE = 3

const FILTERS = [
  { id: 'semua', label: 'Semua' },
  { id: 'belum-dibaca', label: 'Belum Dibaca' },
  { id: 'sudah-dibaca', label: 'Sudah Dibaca' },
]

// ── Modal Component ──
function MessageModal({ msg, onClose, onToggleRead, onSendReply }) {
  const [replyText, setReplyText] = useState('')
  const [sent, setSent] = useState(false)

  // Mark as read when modal opens
  useEffect(() => {
    if (msg.unread) onToggleRead(msg.id)
    // Prevent body scroll
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSend = () => {
    if (!replyText.trim()) return
    onSendReply(msg.id, replyText)
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setReplyText('')
      onClose()
    }, 1500)
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 animate-fadeIn"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Modal card — fixed height structure so footer never gets cut */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col animate-scaleIn"
        style={{ maxHeight: 'min(92vh, 640px)' }}
      >

        {/* ── Header ── */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <p className="text-[10px] font-bold text-[#22c55e] uppercase tracking-widest mb-1">Detail Pesan</p>
            <h2 className="text-lg font-extrabold text-[#111827] tracking-tight leading-tight">{msg.name}</h2>
            <p className="text-[12px] text-[#9ca3af] mt-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {msg.date}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-red-50 hover:text-red-400 flex items-center justify-center text-gray-400 transition-all duration-200 flex-shrink-0 ml-3 mt-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 min-h-0">

          {/* Meta info — 2 column compact grid */}
          <div className="grid grid-cols-2 gap-3">
            <MetaRow icon={<User className="w-3.5 h-3.5" />} label="Dari" value={msg.name} />
            <MetaRow icon={<AtSign className="w-3.5 h-3.5" />} label="Email" value={msg.email} isEmail />
            <MetaRow icon={<Building2 className="w-3.5 h-3.5" />} label="Organisasi" value={msg.university} />
          </div>

          {/* Message box */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-[#22c55e]" />
              <span className="text-[12px] font-bold text-[#111827]">Pesan:</span>
            </div>
            <p className="text-[13px] text-[#4b5563] leading-relaxed">{msg.message}</p>
          </div>

          {/* Reply section */}
          <div className="bg-[#f0fdf4] border border-green-100 rounded-xl p-4">
            <p className="text-[12px] font-bold text-[#16a34a] mb-2">Balas pesan:</p>
            {sent ? (
              <div className="flex items-center justify-center gap-2 py-4 text-[#22c55e]">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </div>
                <p className="text-sm font-semibold">Balasan terkirim!</p>
              </div>
            ) : (
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Tulis balasan Anda di sini....."
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl border border-green-200 bg-white text-[13px] text-[#111827] placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400
                  resize-none transition-all duration-200"
              />
            )}
          </div>
        </div>

        {/* ── Footer — always pinned to bottom ── */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3 flex-shrink-0 bg-white rounded-b-2xl">
          <button
            onClick={handleSend}
            disabled={!replyText.trim() || sent}
            className="flex-1 h-11 rounded-xl bg-[#22c55e] text-white font-bold text-sm
              hover:bg-[#16a34a] hover:shadow-md hover:shadow-green-100
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Kirim Balasan
          </button>
          <button
            onClick={onClose}
            className="h-11 px-6 rounded-xl border border-gray-200 text-[#6b7280] font-semibold text-sm
              hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex-shrink-0"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>

  )
}

// ── Meta row helper ──
function MetaRow({ icon, label, value, isEmail }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-[#22c55e] flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider">{label}</p>
        {isEmail ? (
          <a href={`mailto:${value}`} className="text-[14px] font-medium text-[#22c55e] hover:underline">
            {value}
          </a>
        ) : (
          <p className="text-[14px] font-semibold text-[#111827]">{value}</p>
        )}
      </div>
    </div>
  )
}

// ── Highlight matching text ──
function HighlightText({ text, query }) {
  if (!query.trim()) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-100 text-yellow-800 rounded px-0.5 not-italic font-semibold">
        {part}
      </mark>
    ) : part
  )
}

// ── Main Component ──
export default function PesanMasuk({ messages, onToggleRead }) {
  const [activeFilter, setActiveFilter] = useState('semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMsg, setSelectedMsg] = useState(null)

  // 1. Filter by tab
  const tabFiltered = useMemo(() =>
    messages.filter((msg) => {
      if (activeFilter === 'belum-dibaca') return msg.unread
      if (activeFilter === 'sudah-dibaca') return !msg.unread
      return true
    }), [messages, activeFilter])

  // 2. Filter by search
  const searchFiltered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return tabFiltered
    return tabFiltered.filter((msg) =>
      msg.name.toLowerCase().includes(q) ||
      msg.email.toLowerCase().includes(q) ||
      msg.university.toLowerCase().includes(q) ||
      msg.message.toLowerCase().includes(q)
    )
  }, [tabFiltered, searchQuery])

  // 3. Pagination
  const totalPages = Math.max(1, Math.ceil(searchFiltered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const paginated = searchFiltered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  )

  const handleFilterChange = (id) => { setActiveFilter(id); setCurrentPage(1) }
  const handleSearch = (e) => { setSearchQuery(e.target.value); setCurrentPage(1) }
  const clearSearch = () => { setSearchQuery(''); setCurrentPage(1) }

  // Open modal and mark as read
  const handleCardClick = (msg) => setSelectedMsg(msg)

  const handleSendReply = (id, text) => {
    // In a real app, send to backend here
    console.log(`Reply to message ${id}:`, text)
  }

  return (
    <div className="animate-fadeIn">

      {/* Modal */}
      {selectedMsg && (
        <MessageModal
          msg={selectedMsg}
          onClose={() => setSelectedMsg(null)}
          onToggleRead={onToggleRead}
          onSendReply={handleSendReply}
        />
      )}

      {/* ── Page Header ── */}
      <div className="mb-8">
        <h3 className="text-3xl font-extrabold text-[#111827] tracking-tight">Pesan Masuk</h3>
        <p className="text-[#6b7280] text-[15px] mt-2 font-normal">
          Kelola pesan dari pengunjung website
        </p>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => handleFilterChange(f.id)}
              className={`h-11 px-5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeFilter === f.id
                  ? 'bg-[#22c55e] text-white shadow-lg shadow-green-100'
                  : 'bg-white border border-gray-200 text-[#6b7280] hover:bg-green-50 hover:text-[#22c55e] hover:border-green-200'
              }`}
            >
              {f.label}
              {f.id === 'semua' && (
                <span className={`ml-2 text-[11px] font-bold px-1.5 py-0.5 rounded-md ${
                  activeFilter === f.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {messages.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Cari nama, email, pesan..."
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400
              transition-all duration-200 shadow-sm"
          />
          {searchQuery && (
            <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search info */}
      {searchQuery && (
        <p className="text-sm text-[#6b7280] mb-4">
          Menampilkan <span className="font-semibold text-[#111827]">{searchFiltered.length}</span> hasil untuk{' '}
          <span className="font-semibold text-[#22c55e]">"{searchQuery}"</span>
        </p>
      )}

      {/* ── Message list ── */}
      {paginated.length > 0 ? (
        <div className="space-y-4">
          {paginated.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleCardClick(msg)}
              className={`group border rounded-2xl p-6 md:p-7 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md ${
                msg.unread
                  ? 'bg-[#ecfdf5] border-green-200/90 shadow-sm shadow-green-50/50'
                  : 'bg-white border-gray-200/80'
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2">
                    <h4 className="text-[17px] font-bold text-[#111827] tracking-tight group-hover:text-[#22c55e] transition-colors">
                      <HighlightText text={msg.name} query={searchQuery} />
                    </h4>
                    {msg.unread && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#22c55e] text-white tracking-wide uppercase">
                        Baru
                      </span>
                    )}
                  </div>
                  <p className="text-[#9ca3af] text-[13px] font-medium mt-1.5 flex flex-wrap items-center gap-x-2">
                    <span><HighlightText text={msg.university} query={searchQuery} /></span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[#6b7280] font-normal">
                      <HighlightText text={msg.email} query={searchQuery} />
                    </span>
                  </p>
                  <p className="text-[#4b5563] text-[14px] leading-relaxed mt-3 max-w-4xl font-normal line-clamp-2">
                    <HighlightText text={msg.message} query={searchQuery} />
                  </p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
                  <span className="text-[#9ca3af] text-[13px] font-medium">{msg.date}</span>
                  <span className="hidden md:inline-flex text-[11px] text-[#22c55e] bg-green-50 px-2 py-1 rounded-lg border border-green-100 font-medium items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Klik untuk buka
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-gray-100 rounded-2xl text-center">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
            {searchQuery ? <Search className="w-6 h-6 text-gray-400" /> : <Mail className="w-6 h-6 text-gray-400" />}
          </div>
          <h4 className="text-base font-bold text-gray-800">
            {searchQuery ? 'Tidak Ditemukan' : 'Tidak Ada Pesan'}
          </h4>
          <p className="text-sm text-gray-400 mt-1 max-w-xs">
            {searchQuery
              ? `Tidak ada pesan yang cocok dengan "${searchQuery}".`
              : activeFilter === 'belum-dibaca'
              ? 'Semua pesan masuk sudah Anda baca.'
              : activeFilter === 'sudah-dibaca'
              ? 'Belum ada pesan yang dibaca saat ini.'
              : 'Belum ada pesan masuk dari pengunjung website.'}
          </p>
          {searchQuery && (
            <button onClick={clearSearch} className="mt-4 text-sm text-[#22c55e] font-semibold hover:underline">
              Hapus pencarian
            </button>
          )}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-[#6b7280]">
            Halaman <span className="font-semibold text-[#111827]">{safePage}</span> dari{' '}
            <span className="font-semibold text-[#111827]">{totalPages}</span> · Total{' '}
            <span className="font-semibold text-[#111827]">{searchFiltered.length}</span> pesan
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-[#6b7280]
                hover:bg-green-50 hover:border-green-200 hover:text-[#22c55e]
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-9 w-9 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  page === safePage
                    ? 'bg-[#22c55e] text-white shadow-md shadow-green-100'
                    : 'border border-gray-200 text-[#6b7280] hover:bg-green-50 hover:border-green-200 hover:text-[#22c55e]'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-[#6b7280]
                hover:bg-green-50 hover:border-green-200 hover:text-[#22c55e]
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
