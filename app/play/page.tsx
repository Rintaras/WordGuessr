"use client"
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Play as PlayIcon, RefreshCw } from 'lucide-react'
import HintCard from '../../components/HintCard'
import MapClient from '../../components/MapClient'
import ResultModal from '../../components/ResultModal'

export default function Play() {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const difficulty = (params.get('d') || 'normal') as 'easy' | 'normal' | 'hard'
  const [roundId, setRoundId] = useState<string>('')
  const [hintText, setHintText] = useState<string>('')
  const [picked, setPicked] = useState<{ lat: number; lng: number } | null>(null)
  const [result, setResult] = useState<any>(null)
  const [facts, setFacts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [correctLocation, setCorrectLocation] = useState<{ lat: number; lng: number } | null>(null)

  const loadRound = async () => {
    setLoading(true)
    try {
      const r = await fetch(`/api/round?difficulty=${difficulty}`).then(r => r.json())
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

  useEffect(() => { loadRound() }, [difficulty])

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
    <div className="min-h-dvh bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />

      <main className="relative z-10 mx-auto max-w-6xl p-6 space-y-6">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">WordGuessr</h1>
          <p className="text-gray-600">地図をクリックして市町村を当てよう！</p>
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
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <MapClient
              onPick={(lat, lng) => setPicked({ lat, lng })}
              picked={picked || undefined as any}
              correct={correctLocation || undefined as any}
            />
          </div>
        </motion.div>

        {/* アクションボタン */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center z-30"
        >
          <button
            disabled={!picked || loading}
            onClick={submit}
            className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>{loading ? '処理中...' : 'この場所で回答'}</span>
            </div>
          </button>

          <button
            onClick={loadRound}
            disabled={loading}
            className="group px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl hover:border-purple-300 hover:text-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              <span>次の問題</span>
            </div>
          </button>
        </motion.div>

        {/* 結果モーダル */}
        <ResultModal
          open={!!result}
          onClose={() => {
            setResult(null)
            // 正解地点の表示は維持する（次の問題まで比較可能）
          }}
          distanceKm={result?.distance_km || 0}
          score={result?.score || 0}
          correct={result?.correct || { muni_code: '', name_ja: '', centroid: { lat: 0, lng: 0 } }}
          picked={picked || { lat: 0, lng: 0 }}
          facts={facts}
        />
      </main>
    </div>
  )
}
