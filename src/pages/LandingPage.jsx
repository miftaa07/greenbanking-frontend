import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ContactForm from '../components/ContactForm'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'

// Data untuk charts
const barData = [
  { name: 'Framing Positif', adopsi: 85 },
  { name: 'Framing Negatif', adopsi: 48 },
  { name: 'Kontrol Netral', adopsi: 42 },
]

const lineData = [
  { age: '18-25', positif: 78, negatif: 45, netral: 55 },
  { age: '26-35', positif: 82, negatif: 50, netral: 58 },
  { age: '36-45', positif: 79, negatif: 52, netral: 60 },
  { age: '46-55', positif: 75, negatif: 55, netral: 62 },
  { age: '55+',   positif: 70, negatif: 58, netral: 63 },
]

// Statistik cards
const stats = [
  { value: '85%',   label: 'Dampak Farming Positif', icon: '📊' },
  { value: '42%',   label: 'Peningkatan Adopsi',     icon: '📈' },
  { value: '1.200+', label: 'Peserta Survei',         icon: '👥' },
  { value: '5',     label: 'Negara Diteliti',         icon: '🌍' },
]

// Framing concepts
const framingItems = [
  {
    title: 'Framing Positif',
    desc: 'Menekankan keuntungan dan manfaat dari adopsi produk hijau untuk mendorong perilaku positif',
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'Framing Negatif',
    desc: 'Menyoroti kerugian atau risiko jika tidak mengambil tindakan terhadap produk ramah lingkungan',
    color: 'bg-red-50 text-red-500',
  },
  {
    title: 'Pertanyaan Penelitian',
    desc: 'Menganalisis respons demografi dan strategi optimal bagi bank dalam penerapan framing pesan',
    color: 'bg-blue-50 text-blue-500',
  },
]

// Footer links
const footerLinks = {
  Navigasi: ['Beranda', 'Pengantar', 'Hasil Penelitian', 'Kontak'],
  Penelitian: ['Metodologi', 'Survei Akademik', 'Data & Analisis', 'Publikasi'],
  Dukungan: ['FAQ', 'Panduan', 'Kebijakan', 'Kontak Tim'],
}

export default function LandingPage() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* ========== HERO SECTION ========== */}
      <section id="beranda" className="pt-28 pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Penelitian Akademik
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Efek{' '}
                <span className="text-green-500 font-serif italic">Farming</span>{' '}
                dalam{' '}
                <br />
                <span className="text-green-600">Perbankan Hijau</span>
              </h1>
              <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
                Studi komprehensif mengenai pengaruh framing effect terhadap adopsi produk perbankan hijau.
                Penelitian ini menghadirkan wawasan mendalam tentang ekonomi perilaku dan keuangan berkelanjutan.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo('hasil')}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 shadow-sm text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Jelajah penelitian
                </button>
                <button
                  onClick={() => scrollTo('kontak')}
                  className="flex items-center gap-2 border border-gray-300 hover:border-green-400 text-gray-600 hover:text-green-600 font-semibold px-6 py-3 rounded-full transition-all duration-200 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Hubungi Kami
                </button>
              </div>
            </div>

            {/* Right - Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-72 h-72 lg:w-96 lg:h-80 bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl flex items-center justify-center relative overflow-hidden">
                  {/* House illustration */}
                  <svg viewBox="0 0 280 240" className="w-64 h-56" fill="none">
                    {/* House body */}
                    <rect x="70" y="110" width="140" height="100" rx="4" fill="#16a34a" opacity="0.15" />
                    <rect x="80" y="120" width="120" height="90" rx="3" fill="#22c55e" opacity="0.25" />
                    {/* Roof */}
                    <polygon points="60,115 140,50 220,115" fill="#16a34a" opacity="0.5" />
                    {/* Door */}
                    <rect x="120" y="160" width="40" height="50" rx="4" fill="#15803d" opacity="0.6" />
                    {/* Windows */}
                    <rect x="90" y="135" width="30" height="25" rx="3" fill="white" opacity="0.7" />
                    <rect x="160" y="135" width="30" height="25" rx="3" fill="white" opacity="0.7" />
                    {/* Arrow up */}
                    <circle cx="200" cy="60" r="22" fill="#22c55e" opacity="0.9" />
                    <path d="M200 72 L200 48 M192 56 L200 48 L208 56" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Chart bars */}
                    <rect x="50" y="170" width="18" height="35" rx="3" fill="#22c55e" opacity="0.4" />
                    <rect x="73" y="155" width="18" height="50" rx="3" fill="#22c55e" opacity="0.6" />
                    <rect x="96" y="145" width="18" height="60" rx="3" fill="#16a34a" opacity="0.7" />
                    {/* dots */}
                    <circle cx="230" cy="100" r="6" fill="#22c55e" opacity="0.6" />
                    <circle cx="245" cy="80" r="4" fill="#16a34a" opacity="0.4" />
                    <circle cx="260" cy="90" r="5" fill="#22c55e" opacity="0.5" />
                  </svg>

                  {/* Floating badge */}
                  <div className="absolute top-4 right-4 bg-white rounded-xl px-3 py-2 shadow-md flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <div>
                      <p className="text-xs font-bold text-gray-900">85%</p>
                      <p className="text-xs text-gray-400" style={{fontSize:'9px'}}>Tingkat Konversi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="card p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                    {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}
                    {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />}
                    {i === 3 && <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />}
                  </svg>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FRAMING SECTION ========== */}
      <section id="pengantar" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              Konsep Dasar
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Memahami Efek Framing</h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm">
              Pelajari konsep efek framing dalam ekonomi perilaku dan relevansinya dalam konteks perbankan hijau
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Apa Itu Efek Framing?</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Efek framing adalah bias kognitif di mana orang membuat keputusan berdasarkan cara informasi
                disajikan, bukan hanya pada informasi itu sendiri. Dalam konteks perbankan hijau, framing pesan
                dapat secara signifikan mempengaruhi keputusan konsumen untuk mengadopsi produk ramah lingkungan.
              </p>
              <div className="space-y-4">
                {framingItems.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />}
                        {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />}
                        {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Chart */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800 text-sm">Dampak Framing terhadap Adopsi</h4>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Signifikansi Statistik</span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
                    cursor={{ fill: 'rgba(34,197,94,0.05)' }}
                  />
                  <Bar dataKey="adopsi" fill="#22c55e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                p &lt; 0.01 menunjukkan hasil penelitian yang signifikan secara statistik
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HASIL PENELITIAN SECTION ========== */}
      <section id="hasil" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              Temuan Empiris
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Hasil penelitian</h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm">
              Visualisasi data dan analisis komprehensif dari studi efek framing dalam perbankan hijau
            </p>
          </div>

          {/* Charts grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Bar chart */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800 text-sm">Dampak Framing Pesan Terhadap Adopsi</h4>
                <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full">Bar Chart</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData} barSize={36}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px' }} />
                  <Bar dataKey="adopsi" fill="#22c55e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Line chart */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800 text-sm">Respons Berbasis Usia Terhadap Strategi Framing</h4>
                <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full">Line Chart</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="age" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="positif" stroke="#22c55e" strokeWidth={2.5} dot={{ fill: '#22c55e', r: 4 }} />
                  <Line type="monotone" dataKey="negatif" stroke="#f87171" strokeWidth={2.5} dot={{ fill: '#f87171', r: 4 }} />
                  <Line type="monotone" dataKey="netral"  stroke="#94a3b8" strokeWidth={2.5} dot={{ fill: '#94a3b8', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Statistic boxes */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { val: '+42%',   label: 'Peningkatan Adopsi dengan Framing Positif', color: 'text-green-600' },
              { val: '1.247',  label: 'Partisipan dari 5 Negara',                  color: 'text-gray-900' },
              { val: '87%',    label: 'Tingkat Konversi Tertinggi',                 color: 'text-green-600' },
              { val: 'p < 0.01', label: 'Signifikansi Statistik',                  color: 'text-gray-900' },
            ].map((s, i) => (
              <div key={i} className="card p-5 text-center">
                <p className={`text-2xl font-bold ${s.color} mb-1`}>{s.val}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== KONTAK SECTION ========== */}
      <section id="kontak" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Hubungi Kami
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Kirim Pesan</h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm">
              Punya pertanyaan atau ingin berkonsultasi? kami siap mendengar dari Anda
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Tim Penelitian */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tim Penelitian</h3>
              <p className="text-gray-500 text-sm mb-6">
                Website ini merupakan bagian dari tugas akhir semester Teknologi Keuangan yang dibina oleh Bapak Dr. Arif Widyatama, SE., M.S.A di Universitas Brawijaya
              </p>
              <div className="space-y-4">
                {[
                  { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', label: 'Institusi',      val: 'Universitas Brawijaya - Fakultas Vokasi' },
                  { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', label: 'Program Studi', val: 'Keuangan dan Perbankan' },
                  { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Tahun',         val: 'December 2025' },
                  { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email',        val: 'research@greenbanking.ac.id' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                      <p className="text-sm text-gray-700 font-medium">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="card p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-gray-900 text-gray-400 pt-14 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  </svg>
                </div>
                <span className="font-bold text-white text-base"><span className="text-green-400">Green</span>Banking</span>
              </div>
              <p className="text-xs leading-relaxed text-gray-500 mb-4">
                Penelitian akademik mengenai efek framing dalam adopsi produk perbankan hijau.
              </p>
              <div className="flex gap-3">
                {['M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z', 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z'].map((d, i) => (
                  <a key={i} href="#" className="w-7 h-7 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
                <ul className="space-y-2">
                  {links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-xs text-gray-500 hover:text-green-400 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-600">© 2025 GreenBanking Research Project Hijau. All rights reserved.</p>
            <p className="text-xs text-gray-600">Universitas Brawijaya - Fakultas Vokasi</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
