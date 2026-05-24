import ActivityItem from './ActivityItem'

const activities = [
  { id: 1, nama: 'Dr. Ahmad Santoso', universitas: 'Universitas Indonesia', tanggal: '24 Maret 2025' },
  { id: 2, nama: 'Siti Nurhaliza', universitas: 'Universitas Diponegoro', tanggal: '24 Maret 2025' },
  { id: 3, nama: 'Giska Eileen', universitas: 'Universitas Asia', tanggal: '24 Maret 2025' },
  { id: 4, nama: 'Nailah Salwa', universitas: 'Universitas Brawijaya', tanggal: '24 Maret 2025' },
]

export default function ActivityList() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
      {/* Section title */}
      <h2 className="text-[17px] font-bold text-[#111827] mb-5">Aktivitas terbaru</h2>

      {/* List */}
      <div className="flex flex-col gap-3">
        {activities.map((item) => (
          <ActivityItem
            key={item.id}
            nama={item.nama}
            universitas={item.universitas}
            tanggal={item.tanggal}
          />
        ))}
      </div>
    </div>
  )
}
