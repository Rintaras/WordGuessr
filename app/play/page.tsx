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
    <div className="min-h-dvh bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black/50 to-gray-800/50" />

      <main className="relative z-10 mx-auto max-w-6xl p-6 space-y-6">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between py-4"
        >
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">WordGuessr</h1>
            <p className="text-gray-300">地図をクリックして市町村を当てよう！</p>
          </div>

          {/* ホームボタン */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl transition-all duration-200 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center space-x-2">
              <Home className="w-5 h-5" />
              <span>ホーム</span>
            </div>
          </motion.a>
        </motion.div>

        {/* ヒントカード */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <HintCard hint={hintText || '読み込み中…'} difficulty={difficulty} />
        </motion.div>

        {/* 地図 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative z-20"
        >
          <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
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
                className="absolute top-4 right-4 bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 p-4 max-w-sm z-30"
              >
                <div className="space-y-4">
                  {/* スコア */}
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-2">結果発表</h3>
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
                      <span className="font-bold text-xl">{result.score}</span>
                      <span className="text-sm ml-2">pt</span>
                    </div>
                  </div>

                  {/* 距離 */}
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-xl border border-gray-600">
                    <span className="text-gray-300">距離</span>
                    <span className="text-xl font-bold text-purple-400">{result.distance_km?.toFixed(1) || 0} km</span>
                  </div>

                  {/* 正解 */}
                  <div className="p-3 bg-emerald-900/20 rounded-xl border border-emerald-700/50">
                    <div className="text-center">
                      <div className="text-sm text-gray-400 mb-1">正解</div>
                      <div className="font-bold text-emerald-400">{result.correct?.name_ja || ''}</div>
                    </div>
                  </div>

                  {/* 豆知識 */}
                  {facts.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-white">豆知識</div>
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
          className="flex flex-col sm:flex-row gap-4 justify-center items-center z-30"
        >
          {/* 結果が表示されていない時のみ回答ボタンを表示 */}
          {!result && (
            <button
              disabled={!picked || loading}
              onClick={submit}
              className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
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
            className={`group px-6 py-4 font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-2xl ${result
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
              : 'bg-gray-800 border-2 border-gray-600 text-gray-200 hover:border-purple-400 hover:text-purple-300'
              }`}
          >
            <div className="flex items-center space-x-2">
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              <span>次の問題</span>
            </div>
          </button>
        </motion.div>
      </main>
    </div>
  )
}
