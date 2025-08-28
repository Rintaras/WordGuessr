"use client"
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, RefreshCw, Home } from 'lucide-react'
import HintCard from '../../components/HintCard'
import MapClient from '../../components/MapClient'

<<<<<<< HEAD
<<<<<<< HEAD
interface Round {
  id: string
  hint: string
  difficulty: 'easy' | 'normal' | 'hard'
}

interface Guess {
  lat: number
  lng: number
}

interface Result {
  distance: number
  score: number
  correctLocation: {
    lat: number
    lng: number
    name: string
  }
  facts: string[]
}

export default function PlayPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const totalRounds = parseInt(searchParams.get('rounds') || '3')

  const [currentRound, setCurrentRound] = useState(1)
  const [round, setRound] = useState<Round | null>(null)
  const [guess, setGuess] = useState<Guess | null>(null)
  const [result, setResult] = useState<Result | null>(null)
=======
=======
>>>>>>> parent of 3b9d104 (差分)
export default function Play() {
  const [roundId, setRoundId] = useState<string>('')
  const [hintText, setHintText] = useState<string>('')
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard'>('normal')
  const [picked, setPicked] = useState<{ lat: number; lng: number } | null>(null)
  const [result, setResult] = useState<any>(null)
  const [facts, setFacts] = useState<any[]>([])
<<<<<<< HEAD
>>>>>>> parent of 3b9d104 (差分)
=======
>>>>>>> parent of 3b9d104 (差分)
  const [loading, setLoading] = useState(false)
  const [correctLocation, setCorrectLocation] = useState<{ lat: number; lng: number } | null>(null)

  const loadRound = async () => {
    setLoading(true)
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const response = await fetch('/api/round')
      if (response.ok) {
        const roundData = await response.json()
        // API からのレスポンス { roundId, hintText, difficulty, expiresAt } をクライアント用に正規化
        setRound({
          id: roundData.roundId,
          hint: roundData.hintText,
          difficulty: roundData.difficulty,
        })
        setGuess(null)
        setResult(null)
      }
=======
=======
>>>>>>> parent of 3b9d104 (差分)
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
<<<<<<< HEAD
>>>>>>> parent of 3b9d104 (差分)
=======
>>>>>>> parent of 3b9d104 (差分)
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

<<<<<<< HEAD
<<<<<<< HEAD
  const handleNextRound = () => {
    if (currentRound < totalRounds) {
      setCurrentRound(prev => prev + 1)
      loadRound()
    } else {
      // ゲーム終了
      setGameCompleted(true)
    }
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  const handleMapGuess = (newGuess: { lat: number; lng: number }) => {
    console.log('Map guess received:', newGuess) // デバッグログ
    setGuess(newGuess)
  }

  if (gameCompleted) {
    return (
      <div className="min-h-dvh bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Trophy className="w-16 h-16 text-yellow-400 mr-4" />
              <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                ゲーム終了！
              </h1>
            </div>
            <p className="text-xl text-gray-300">
              {totalRounds}回のゲームが完了しました
            </p>
          </div>

          {/* 総合結果 */}
          <div className="bg-gray-800 rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">
              総合結果
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400">{totalRounds}</div>
                <div className="text-gray-400">ゲーム回数</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400">{totalScore}</div>
                <div className="text-gray-400">総合ポイント</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400">
                  {Math.round(totalScore / totalRounds)}
                </div>
                <div className="text-gray-400">平均ポイント</div>
              </div>
            </div>

            {/* 各ラウンドの詳細 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center mb-4">各ラウンドの結果</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gameHistory.map((history, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-semibold text-blue-400">ラウンド {history.round}</div>
                    <div className="text-2xl font-bold text-green-400">{history.score}pt</div>
                    <div className="text-sm text-gray-400">
                      {Math.round(history.distance)}km
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ホームに戻るボタン */}
          <div className="text-center">
            <button
              onClick={handleBackToHome}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:scale-105 transition-transform duration-200 shadow-2xl"
            >
              ホームに戻る
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (loading || !round) {
    return (
      <div className="h-dvh overflow-hidden bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl">問題を読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-dvh overflow-hidden bg-gray-900 text-white flex flex-col">
      {/* ヘッダー */}
      <header className="bg-gray-800 border-b border-gray-700 p-4 flex-none">
        <div className="w-full px-2 md:px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
=======
  return (
=======
  return (
>>>>>>> parent of 3b9d104 (差分)
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
<<<<<<< HEAD
>>>>>>> parent of 3b9d104 (差分)
=======
>>>>>>> parent of 3b9d104 (差分)
              <Home className="w-5 h-5" />
              <span>ホーム</span>
            </div>
          </motion.a>
        </motion.div>

<<<<<<< HEAD
<<<<<<< HEAD
      <div className="w-full px-4 md:px-6 flex-1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* 左側: 問題と結果 */}
          <div className="space-y-4 h-full flex flex-col overflow-hidden relative">
            {/* 問題カード */}
            <div className="flex-none">
              <HintCard hint={round.hint} difficulty={round.difficulty} />
            </div>

            {/* デバッグ情報削除 */}

            {/* 結果表示 */}
            {result && (
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-600 flex-1 overflow-auto">
                <h3 className="text-2xl font-bold mb-4 text-center text-green-400">
                  結果発表！
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">距離:</span>
                    <span className="text-xl font-semibold">
                      {Math.round(result.distance)} km
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">正解:</span>
                    <span className="text-xl font-semibold text-green-400">
                      {result.correctLocation.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">獲得ポイント:</span>
                    <ScoreBadge score={result.score} />
                  </div>
                </div>

                {/* 豆知識 */}
                {result.facts.length > 0 && (
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-blue-400">豆知識</h4>
                    <p className="text-gray-300 text-sm">{result.facts[0]}</p>
                  </div>
                )}

                {/* 次のラウンドボタン */}
                <div className="mt-6 text-center">
                  <button
                    onClick={handleNextRound}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200"
                  >
                    {currentRound < totalRounds ? '次の問題' : '結果を見る'}
                  </button>
                </div>
              </div>
            )}

            {/* 回答ボタン（左カラム下部に固定） */}
            {guess && !result && (
              <div className="absolute bottom-0 left-0 right-0 p-0">
                <button
                  onClick={handleGuess}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl text-xl font-bold hover:scale-105 transition-transform duration-200 shadow-2xl"
                >
                  この場所で回答
                </button>
              </div>
            )}

            {/* 回答ボタンが表示されない場合のデバッグ情報 */}
            {!guess && !result && (
              <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4 text-center">
                <p className="text-yellow-300 text-sm">
                  地図をクリックして回答位置を選択してください
                </p>
              </div>
            )}
          </div>

          {/* 右側: 地図 */}
          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-600 h-full overflow-hidden">
=======
=======
>>>>>>> parent of 3b9d104 (差分)
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
<<<<<<< HEAD
>>>>>>> parent of 3b9d104 (差分)
=======
>>>>>>> parent of 3b9d104 (差分)
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
<<<<<<< HEAD
<<<<<<< HEAD
        </div>
      </div>

      {/* フローティングボタンは削除し、1画面内に収める */}

=======
=======
>>>>>>> parent of 3b9d104 (差分)
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
<<<<<<< HEAD
>>>>>>> parent of 3b9d104 (差分)
=======
>>>>>>> parent of 3b9d104 (差分)
    </div>
  )
}
