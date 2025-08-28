<<<<<<< HEAD
<<<<<<< HEAD
import { MapPin, Play, Users } from 'lucide-react'
import EarthBackground from '../components/EarthBackground'
import Link from 'next/link'
=======
import { MapPin, Play } from 'lucide-react'
>>>>>>> parent of 3b9d104 (差分)
=======
import { MapPin, Play } from 'lucide-react'
>>>>>>> parent of 3b9d104 (差分)

export default function Page() {
  return (
    <div className="min-h-dvh flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black/50 to-gray-800/50" />

      <main className="relative z-10 mx-auto max-w-4xl p-8 flex flex-col items-center justify-center min-h-dvh">
        <div className="text-center space-y-8">
          {/* ヘッダー */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                WordGuessr
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              AIが出す短文ヒントから日本の市町村を当てよう。
              <br />
              <span className="text-sm text-gray-400">地理感覚と推理力を試す新しいクイズ体験</span>
            </p>
          </div>

          {/* プレイ開始ボタン */}
<<<<<<< HEAD
<<<<<<< HEAD
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link href="/select-rounds" className="group relative overflow-hidden block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl transition-all duration-300 group-hover:scale-105 shadow-2xl" />
=======
          <div className="max-w-md mx-auto">
            <a href="/play" className="group relative overflow-hidden block">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl transition-all duration-300 group-hover:scale-105 shadow-2xl" />
>>>>>>> parent of 3b9d104 (差分)
=======
          <div className="max-w-md mx-auto">
            <a href="/play" className="group relative overflow-hidden block">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl transition-all duration-300 group-hover:scale-105 shadow-2xl" />
>>>>>>> parent of 3b9d104 (差分)
              <div className="relative p-8 text-center text-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-8 h-8" />
                </div>
<<<<<<< HEAD
<<<<<<< HEAD
                <h3 className="text-2xl font-bold mb-2">ソロプレイ</h3>
              </div>
            </Link>
            <Link href="/online" className="group relative overflow-hidden block">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl transition-all duration-300 group-hover:scale-105 shadow-2xl" />
              <div className="relative p-8 text-center text-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">オンライン対戦</h3>
=======
                <h3 className="text-2xl font-bold mb-2">ゲーム開始</h3>
                <p className="text-purple-100 text-sm">様々な難易度で挑戦しよう！</p>
>>>>>>> parent of 3b9d104 (差分)
              </div>
=======
                <h3 className="text-2xl font-bold mb-2">ゲーム開始</h3>
                <p className="text-purple-100 text-sm">様々な難易度で挑戦しよう！</p>
              </div>
>>>>>>> parent of 3b9d104 (差分)
            </a>
          </div>

          {/* フッター */}
          <div className="pt-8 space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <a href="/about" className="text-gray-400 hover:text-gray-200 transition-colors flex items-center space-x-2">
                <span>About</span>
                <span>•</span>
                <span>出典・クレジット</span>
              </a>
            </div>
            <div className="text-xs text-gray-500">
              Powered by AI • Built with Next.js • Open Data
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
