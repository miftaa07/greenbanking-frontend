import { useState, useEffect } from 'react'
import { MessageSquare, Clock, CheckCircle2 } from 'lucide-react'
import { profileApi } from '../../services/api'

export default function MessageHistory() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await profileApi.getMessages()
        setMessages(response.data.data || [])
      } catch (error) {
        console.error("Failed to fetch messages:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 animate-fadeIn" style={{animationDelay: '300ms'}}>
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-green-500" />
        Riwayat Pesan
      </h2>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10">
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="p-5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-green-100 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <h3 className="font-bold text-gray-900 text-base">{msg.subjek}</h3>
                <div className="flex items-center gap-2 text-xs font-medium">
                  {msg.balasan ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Sudah Dibalas
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                      <Clock className="w-3.5 h-3.5" />
                      Menunggu Balasan
                    </span>
                  )}
                  <span className="text-gray-400 bg-white px-2 py-1 rounded-md border border-gray-100">
                    {new Date(msg.created_at).toLocaleString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                "{msg.isi_pesan}"
              </p>
              
              {/* Jika sudah ada balasan, tampilkan balasannya */}
              {msg.balasan && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm text-green-800 font-medium mb-1">Balasan Admin:</p>
                  <p className="text-sm text-gray-700">{msg.balasan.isi_balasan}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Belum ada riwayat pesan.</p>
          </div>
        )}
      </div>
    </div>
  )
}
