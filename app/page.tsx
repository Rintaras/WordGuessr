import { MapPin, Play } from 'lucide-react'
import EarthBackground from '../components/EarthBackground'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden">
      {/* Three.js地球背景 */}
      <EarthBackground />

      {/* 動的な背景要素 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-black/30 to-gray-800/20" />

      {/* パーティクル効果 */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* 浮遊する幾何学的要素 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 大きな円形グラデーション */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        {/* 小さな浮遊要素 */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-40 right-32 w-3 h-3 bg-pink-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-32 w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }} />

        {/* 線形の装飾要素 */}
        <div className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <div className="absolute top-3/4 right-0 w-32 h-px bg-gradient-to-l from-transparent via-pink-500/50 to-transparent" />
        <div className="absolute left-1/4 top-0 w-px h-32 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />
        <div className="absolute right-1/4 bottom-0 w-px h-32 bg-gradient-to-t from-transparent via-blue-500/50 to-transparent" />

        {/* 追加の装飾要素 */}
        <div className="absolute top-1/3 left-10 w-20 h-20 border border-purple-500/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-1/3 right-10 w-16 h-16 border border-pink-500/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
      </div>

      {/* メインコンテンツ */}
      <main className="relative z-10 mx-auto max-w-4xl p-8 flex flex-col items-center justify-center min-h-dvh">
        <div className="text-center space-y-8">
          {/* ヘッダー */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl animate-pulse">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                WordGuessr
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              AIが出す短文問題から日本の市町村を当てよう。
              <br />
              <span className="text-sm text-gray-400">地理感覚と推理力を試す新しいクイズ体験</span>
            </p>
          </div>

          {/* プレイ開始ボタン */}
          <div className="max-w-md mx-auto">
            <Link href="/select-rounds" className="group relative overflow-hidden block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl transition-all duration-300 group-hover:scale-105 shadow-2xl" />
              <div className="relative p-8 text-center text-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">ゲーム開始</h3>
              </div>
            </Link>
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
