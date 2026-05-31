import ActivityItem from './ActivityItem'

export default function ActivityList({ messages = [], isLoading }) {
  const recentActivities = messages.slice(0, 4)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
      {/* Section title */}
      <h2 className="text-[17px] font-bold text-[#111827] mb-5">Aktivitas terbaru</h2>

      {/* List */}
      <div className="flex flex-col gap-3">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col justify-center px-6 min-h-[90px] py-4 bg-gray-50 border border-gray-100 rounded-2xl animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-1/4"></div>
            </div>
          ))
        ) : recentActivities.length > 0 ? (
          recentActivities.map((item) => (
            <ActivityItem
              key={item.id}
              nama={item.name}
              universitas={item.university}
              tanggal={item.date}
            />
          ))
        ) : (
          <div className="text-center py-6 text-gray-500 text-sm">
            Belum ada aktivitas terbaru.
          </div>
        )}
      </div>
    </div>
  )
}
