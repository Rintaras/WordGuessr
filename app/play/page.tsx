"use client"
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, RefreshCw, Home } from 'lucide-react'
import HintCard from '../../components/HintCard'
import MapClient from '../../components/MapClient'

export default function Play() {
  const [roundId, setRoundId] = useState<string>('')
  const [hintText, setHintText] = useState<string>('')
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard'>('normal')
  const [picked, setPicked] = useState<{ lat: number; lng: number } | null>(null)
  const [result, setResult] = useState<any>(null)
  const [facts, setFacts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [correctLocation, setCorrectLocation] = useState<{ lat: number; lng: number } | null>(null)

  const loadRound = async () => {
    setLoading(true)
    try {
      // ランダムな難易度を選択
      const difficulties: ('easy' | 'normal' | 'hard')[] = ['easy', 'normal', 'hard']
      const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)]
      setDifficulty(randomDifficulty)

      const r = await fetch(`/api/round?difficulty=${randomDifficulty}`).then(r => r.json())
      setRoundId(r.roundId)
      setHintText(r.hintText)
      setPicked(null)
      setResult(null)
      setFacts([])
      setCorrectLocation(null)
    } catch (error) {
      console.error('Failed to load round:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadRound() }, [])

  const submit = async () => {
    if (!picked || !roundId) return
    setLoading(true)
    try {
      const res = await fetch(`/api/round/${roundId}/guess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat: picked.lat, lng: picked.lng })
      }).then(r => r.json())
      setResult(res)

      // 正解地点の情報を保存
      if (res.correct?.centroid) {
        setCorrectLocation({
          lat: res.correct.centroid.lat,
          lng: res.correct.centroid.lng
        })
      }

      const rev = await fetch(`/api/round/${roundId}/reveal`).then(r => r.json())
      setFacts(rev.facts || [])
    } catch (error) {
      console.error('Failed to submit guess:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black/50 to-gray-800/50" />

      <main className="relative z-10 h-full flex flex-col p-4 space-y-4">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between py-2 flex-shrink-0"
        >
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-white mb-1">WordGuessr</h1>
            <p className="text-sm text-gray-300">地図をクリックして市町村を当てよう！</p>
          </div>

          {/* ホームボタン */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl text-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>ホーム</span>
            </div>
          </motion.a>
        </motion.div>

        {/* ヒントカード */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-shrink-0"
        >
          <HintCard hint={hintText || '読み込み中…'} difficulty={difficulty} />
        </motion.div>

        {/* 地図 - 残りのスペースをすべて使用 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative z-20 flex-1 min-h-0"
        >
          <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 h-full">
            <MapClient
              onPick={(lat, lng) => setPicked({ lat, lng })}
              picked={picked || undefined as any}
              correct={correctLocation || undefined as any}
            />

            {/* 結果発表オーバーレイ */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 right-4 bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 p-3 max-w-xs z-30"
              >
                <div className="space-y-3">
                  {/* スコア */}
                  <div className="text-center">
                    <h3 className="text-base font-bold text-white mb-2">結果発表</h3>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
                      <span className="font-bold text-lg">{result.score}</span>
                      <span className="text-sm ml-1">pt</span>
                    </div>
                  </div>

                  {/* 距離 */}
                  <div className="flex items-center justify-between p-2 bg-gray-800 rounded-xl border border-gray-600">
                    <span className="text-gray-300 text-sm">距離</span>
                    <span className="text-lg font-bold text-purple-400">{result.distance_km?.toFixed(1) || 0} km</span>
                  </div>

                  {/* 正解 */}
                  <div className="p-2 bg-emerald-900/20 rounded-xl border border-emerald-700/50">
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-1">正解</div>
                      <div className="font-bold text-emerald-400 text-sm">{result.correct?.name_ja || ''}</div>
                    </div>
                  </div>

                  {/* 豆知識 */}
                  {facts.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-white">豆知識</div>
                      {facts.slice(0, 2).map((fact, i) => (
                        <div key={i} className="p-2 bg-gray-800 rounded-lg border-l-4 border-pink-500 border-opacity-50">
                          <span className="text-xs text-gray-200">{fact.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* アクションボタン */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center z-30 flex-shrink-0 pb-2"
        >
          {/* 結果が表示されていない時のみ回答ボタンを表示 */}
          {!result && (
            <button
              disabled={!picked || loading}
              onClick={submit}
              className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-xl text-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{loading ? '処理中...' : 'この場所で回答'}</span>
              </div>
            </button>
          )}

          <button
            onClick={result ? () => {
              setResult(null)
              setCorrectLocation(null)
              loadRound()
            } : loadRound}
            disabled={loading}
            className={`group px-5 py-3 font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-xl text-sm ${result
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
              : 'bg-gray-800 border-2 border-gray-600 text-gray-200 hover:border-purple-400 hover:text-purple-300'
              }`}
          >
            <div className="flex items-center space-x-2">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>次の問題</span>
            </div>
          </button>
        </motion.div>
      </main>
    </div>
  )
}
