import { UserCircle, Mail, Calendar, ShieldCheck, User } from 'lucide-react'

export default function ProfileInfo({ user }) {
  const joinDate = user?.created_at 
    ? new Date(user.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
    : '2024 (Simulasi)'

  const details = [
    { icon: UserCircle, label: 'Nama Lengkap', value: user?.name || '-' },
    { icon: Mail, label: 'Email', value: user?.email || '-' },
    { icon: ShieldCheck, label: 'Role Akun', value: user?.role === 'admin' ? 'Administrator' : 'User Biasa' },
    { icon: Calendar, label: 'Tanggal Bergabung', value: joinDate },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 animate-fadeIn relative overflow-hidden" style={{animationDelay: '100ms'}}>
      {/* HEADER SECTION */}
      <div className="relative p-8 flex flex-col items-center text-center gap-4 border-b border-gray-100 bg-white">
        
        <div className="relative mt-2">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-md">
            <div className="w-full h-full bg-green-50 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>

        <div className="mt-1 relative z-10">
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
            {user?.name || 'My Profile'}
          </h1>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            Active Member
          </div>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <UserCircle className="w-5 h-5 text-green-500" />
          Informasi User
        </h2>
        <div className="space-y-4">
          {details.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100/50 hover:border-green-200 hover:bg-green-50/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-gray-500">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-sm font-medium text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
