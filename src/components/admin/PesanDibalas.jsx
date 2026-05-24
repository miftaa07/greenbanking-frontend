import { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MessageSquareReply,
  Calendar,
  X
} from 'lucide-react'

const ITEMS_PER_PAGE = 3

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

export default function PesanDibalas({ messages }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMsg, setSelectedMsg] = useState(null)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedMsg) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedMsg])

  // Filter replied messages only
  const repliedMessages = useMemo(() => {
    return messages.filter((msg) => msg.replied)
  }, [messages])

  // Search
  const filteredMessages = useMemo(() => {
    const q = searchQuery.toLowerCase()

    return repliedMessages.filter((msg) =>
      msg.name.toLowerCase().includes(q) ||
      msg.email.toLowerCase().includes(q) ||
      msg.message.toLowerCase().includes(q)
    )
  }, [repliedMessages, searchQuery])

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredMessages.length / ITEMS_PER_PAGE)
  )
  const safePage = Math.min(currentPage, totalPages)
  const paginated = filteredMessages.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  )

  const handleSearch = (e) => { setSearchQuery(e.target.value); setCurrentPage(1) }
  const clearSearch = () => { setSearchQuery(''); setCurrentPage(1) }

  return (
    <div className="animate-fadeIn">

      {/* Header */}
      <div className="mb-8">
        <h3 className="text-3xl font-extrabold text-[#111827]">
          Pesan Dibalas
        </h3>

        <p className="text-[#6b7280] text-[15px] mt-2">
          Daftar pesan yang sudah dibalas admin
        </p>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex-1"></div> {/* Spacer to keep search on the right or adapt as needed */}
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
          Menampilkan <span className="font-semibold text-[#111827]">{filteredMessages.length}</span> hasil untuk{' '}
          <span className="font-semibold text-[#22c55e]">"{searchQuery}"</span>
        </p>
      )}

      {/* List */}
      <div className="space-y-4">
        {paginated.map((msg) => (
          <div
            key={msg.id}
            onClick={() => setSelectedMsg(msg)}
            className="
              bg-white border border-gray-200
              rounded-2xl p-6 cursor-pointer
              hover:-translate-y-1 hover:shadow-md
              transition-all duration-300
            "
          >
            <div className="flex justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[#111827]">
                    <HighlightText text={msg.name} query={searchQuery} />
                  </h4>

                  <span className="
                    text-[10px] font-bold uppercase
                    bg-green-100 text-green-600
                    px-2 py-1 rounded-full
                  ">
                    Sudah Dibalas
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  <HighlightText text={msg.university} query={searchQuery} /> • <HighlightText text={msg.email} query={searchQuery} />
                </p>

                <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                  <HighlightText text={msg.message} query={searchQuery} />
                </p>
              </div>

              <span className="text-sm text-gray-400 flex-shrink-0">
                {msg.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMessages.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-gray-100 rounded-2xl text-center">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
            {searchQuery ? <Search className="w-6 h-6 text-gray-400" /> : <MessageSquareReply className="w-6 h-6 text-gray-400" />}
          </div>
          <h4 className="text-base font-bold text-gray-800">
            {searchQuery ? 'Tidak Ditemukan' : 'Belum Ada Pesan Dibalas'}
          </h4>
          <p className="text-sm text-gray-400 mt-1 max-w-xs">
            {searchQuery
              ? `Tidak ada pesan yang cocok dengan "${searchQuery}".`
              : 'Pesan yang sudah dibalas akan muncul di sini'}
          </p>
          {searchQuery && (
            <button onClick={clearSearch} className="mt-4 text-sm text-[#22c55e] font-semibold hover:underline">
              Hapus pencarian
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-[#6b7280]">
            Halaman <span className="font-semibold text-[#111827]">{safePage}</span> dari{' '}
            <span className="font-semibold text-[#111827]">{totalPages}</span> · Total{' '}
            <span className="font-semibold text-[#111827]">{filteredMessages.length}</span> pesan
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

      {/* Modal */}
      {selectedMsg && createPortal(
        <div className="
          fixed inset-0 w-[100vw] h-[100vh] z-[9999]
          bg-black/40 animate-fadeIn
          flex items-center justify-center p-4 sm:p-6
        "
        onClick={(e) => { if (e.target === e.currentTarget) setSelectedMsg(null) }}
        >
          <div className="
            bg-white rounded-2xl shadow-2xl
            w-full max-w-lg p-6
            relative animate-scaleIn transform transition-all
          "
          style={{ maxHeight: 'min(90vh, 600px)', overflowY: 'auto' }}
          >
            <button
              onClick={() => setSelectedMsg(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 mt-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                {selectedMsg.date}
              </span>
            </div>

            <h2 className="text-xl font-bold text-[#111827]">
              {selectedMsg.name}
            </h2>

            <div className="
              mt-5 bg-gray-50 rounded-xl p-4
              border border-gray-100
            ">
              <p className="text-sm font-semibold mb-2">
                Pesan:
              </p>

              <p className="text-sm text-gray-600">
                {selectedMsg.message}
              </p>
            </div>

            <div className="
              mt-4 bg-green-50 rounded-xl p-4
              border border-green-100
            ">
              <p className="text-sm font-semibold text-green-700 mb-2">
                Balasan Admin:
              </p>

              <p className="text-sm text-gray-700">
                {selectedMsg.replyMessage}
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}