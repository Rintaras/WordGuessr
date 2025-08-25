import { MapPin, Brain, Trophy, Sparkles } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-dvh flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />

      <main className="relative z-10 mx-auto max-w-4xl p-8 flex flex-col items-center justify-center min-h-dvh">
        <div className="text-center space-y-8">
          {/* ヘッダー */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                WordGuessr
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              AIが出す短文ヒントから日本の市町村を当てよう。
              <br />
              <span className="text-sm text-gray-500">地理感覚と推理力を試す新しいクイズ体験</span>
            </p>
          </div>

          {/* 難易度選択 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl">
            <a href="/play?d=easy" className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl transition-all duration-300 group-hover:scale-105" />
              <div className="relative p-8 text-center text-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Easy</h3>
                <p className="text-green-100 text-sm">初心者向け<br />有名な観光地</p>
              </div>
            </a>

            <a href="/play?d=normal" className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl transition-all duration-300 group-hover:scale-105" />
              <div className="relative p-8 text-center text-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Normal</h3>
                <p className="text-blue-100 text-sm">標準レベル<br />特産品と文化</p>
              </div>
            </a>

            <a href="/play?d=hard" className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-600 rounded-2xl transition-all duration-300 group-hover:scale-105" />
              <div className="relative p-8 text-center text-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Hard</h3>
                <p className="text-red-100 text-sm">上級者向け<br />統計と地理</p>
              </div>
            </a>
          </div>

          {/* フッター */}
          <div className="pt-8 space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <a href="/about" className="text-gray-500 hover:text-gray-700 transition-colors flex items-center space-x-2">
                <span>About</span>
                <span>•</span>
                <span>出典・クレジット</span>
              </a>
            </div>
            <div className="text-xs text-gray-400">
              Powered by AI • Built with Next.js • Open Data
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
