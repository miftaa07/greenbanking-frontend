import { UserCircle, Mail, Calendar, ShieldCheck } from 'lucide-react'

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
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 animate-fadeIn" style={{animationDelay: '100ms'}}>
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <UserCircle className="w-6 h-6 text-green-500" />
        Informasi User
      </h2>
      <div className="space-y-6">
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
  )
}
