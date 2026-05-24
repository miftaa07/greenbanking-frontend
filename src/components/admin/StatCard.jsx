export default function StatCard({ icon: Icon, value, label }) {
  return (
    <div
      className="
        bg-white rounded-2xl p-6 shadow-sm border border-gray-100
        flex flex-col gap-4
        hover:-translate-y-1 hover:shadow-md
        transition-all duration-200 cursor-default
        min-h-[150px]
      "
    >
      {/* Icon box */}
      <div className="w-9 h-9 bg-[#dcfce7] rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-[18px] h-[18px] text-[#22c55e]" strokeWidth={2} />
      </div>

      {/* Value & Label */}
      <div className="flex flex-col gap-1">
        <span className="text-[32px] font-bold text-[#111827] leading-tight tracking-tight">
          {value}
        </span>
        <span className="text-[13px] text-[#6b7280] font-normal">{label}</span>
      </div>
    </div>
  )
}
