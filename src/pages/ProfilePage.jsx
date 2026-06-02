import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import ProfileInfo from '../components/profile/ProfileInfo'
import EditProfileForm from '../components/profile/EditProfileForm'
import MessageHistory from '../components/profile/MessageHistory'

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Jika tidak loading dan tidak ada user, redirect ke login
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  // Jangan render konten jika sedang loading atau belum ada user
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#f5f7f8] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f7f8] font-sans">
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 lg:px-10 max-w-6xl mx-auto">
        <div className="space-y-6">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Kolom Kiri: Info & Form */}
            <div className="lg:col-span-1 space-y-6">
              <ProfileInfo user={user} />
            </div>
            
            {/* Kolom Kanan: Edit Form & History */}
            <div className="lg:col-span-2 space-y-6">
              <EditProfileForm user={user} />
              <MessageHistory />
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
