import { User } from 'lucide-react'

export default function ProfileHeader({ user }) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 animate-fadeIn">
      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-green-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg flex-shrink-0">
        <User className="w-12 h-12 sm:w-16 sm:h-16 text-green-500" />
      </div>
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          {user?.name || 'My Profile'}
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Kelola informasi personal dan riwayat pesan Anda di platform Green Banking.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 text-sm font-semibold rounded-full border border-green-100">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          Active Member
        </div>
      </div>
    </div>
  )
}
