import { MessageSquare, Clock, CheckCircle2 } from 'lucide-react'

export default function MessageHistory() {
  // Data dummy untuk riwayat pesan
  const dummyMessages = [
    {
      id: 1,
      title: 'Pertanyaan Program Green Economy',
      message: 'Saya ingin bertanya mengenai program magang untuk mahasiswa di bidang Eco-Finance.',
      status: 'replied',
      date: '25 Mei 2026, 14:30',
    },
    {
      id: 2,
      title: 'Kerjasama API',
      message: 'Apakah API Green Banking bisa diintegrasikan dengan sistem kampus kami?',
      status: 'sent',
      date: '20 Mei 2026, 09:15',
    },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 animate-fadeIn" style={{animationDelay: '300ms'}}>
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-green-500" />
        Riwayat Pesan
      </h2>

      <div className="space-y-4">
        {dummyMessages.length > 0 ? (
          dummyMessages.map((msg) => (
            <div key={msg.id} className="p-5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-green-100 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <h3 className="font-bold text-gray-900 text-base">{msg.title}</h3>
                <div className="flex items-center gap-2 text-xs font-medium">
                  {msg.status === 'replied' ? (
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
                    {msg.date}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                "{msg.message}"
              </p>
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
