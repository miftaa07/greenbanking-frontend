export default function ActivityItem({ nama, universitas, tanggal }) {
  return (
    <div
      className="
        flex items-center justify-between
        bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl
        px-6 min-h-[90px] py-4
        hover:-translate-y-0.5 hover:shadow-sm
        transition-all duration-200 cursor-pointer
      "
    >
      {/* Left: name & university */}
      <div className="flex flex-col gap-1">
        <span className="text-[15px] font-semibold text-[#111827] leading-tight">{nama}</span>
        <span className="text-[13px] text-[#6b7280] font-normal">{universitas}</span>
      </div>

      {/* Right: date */}
      <span className="text-[13px] text-[#6b7280] font-normal flex-shrink-0 ml-4">
        {tanggal}
      </span>
    </div>
  )
}
