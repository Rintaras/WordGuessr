"use client"
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Home, Trophy } from 'lucide-react'
import HintCard from '../../components/HintCard'
import MapClient from '../../components/MapClient'
import ScoreBadge from '../../components/ScoreBadge'

interface Round {
  id: string
  hint: string
  difficulty: 'easy' | 'normal' | 'hard'
  correctLocation: {
    lat: number
    lng: number
    name: string
  }
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
  const [loading, setLoading] = useState(false)
  const [gameHistory, setGameHistory] = useState<{
    round: number
    score: number
    distance: number
  }[]>([])
  const [gameCompleted, setGameCompleted] = useState(false)
  const [totalScore, setTotalScore] = useState(0)

  // デバッグ用: 初期状態をログ出力
  console.log('Play page initialized with:', {
    totalRounds,
    currentRound,
    guess,
    result,
    loading
  })

  useEffect(() => {
    loadRound()
  }, [])

  // デバッグ用: guessの状態変化を監視
  useEffect(() => {
    console.log('Guess state changed:', guess)
    console.log('Current button condition:', guess && !result)
  }, [guess, result])

  // デバッグ用: resultの状態変化を監視
  useEffect(() => {
    console.log('Result state changed:', result)
  }, [result])

  // デバッグ用: roundの状態変化を監視
  useEffect(() => {
    console.log('Round state changed:', round)
  }, [round])

  const loadRound = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/round')
      if (response.ok) {
        const roundData = await response.json()
        setRound(roundData)
        setGuess(null)
        setResult(null)
      }
    } catch (error) {
      console.error('Failed to load round:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGuess = async () => {
    if (!guess || !round) return

    console.log('Submitting guess:', guess) // デバッグログ

    try {
      const response = await fetch(`/api/round/${round.id}/guess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(guess)
      })

      if (response.ok) {
        const guessResult = await response.json()
        console.log('Guess result:', guessResult) // デバッグログ

        // 豆知識を取得
        const revealResponse = await fetch(`/api/round/${round.id}/reveal`)
        let facts: string[] = []
        if (revealResponse.ok) {
          const revealData = await revealResponse.json()
          facts = revealData.facts || []
        }

        // 結果を設定
        const resultWithFacts = {
          ...guessResult,
          facts
        }
        setResult(resultWithFacts)

        // ゲーム履歴に追加
        const newHistory = {
          round: currentRound,
          score: guessResult.score,
          distance: guessResult.distance
        }
        setGameHistory(prev => [...prev, newHistory])

        // 総合ポイントを更新
        setTotalScore(prev => prev + guessResult.score)
      }
    } catch (error) {
      console.error('Failed to submit guess:', error)
    }
  }

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
      <div className="min-h-dvh bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl">問題を読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-gray-900 text-white">
      {/* ヘッダー */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>ホーム</span>
            </button>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              ラウンド {currentRound} / {totalRounds}
            </div>
            <div className="text-sm text-gray-400">
              総合ポイント: {totalScore}
            </div>
          </div>
          <div className="w-24"></div> {/* バランス用 */}
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左側: 問題と結果 */}
          <div className="space-y-6">
            {/* 問題カード */}
            <HintCard hint={round.hint} difficulty={round.difficulty} />

            {/* デバッグ情報 */}
            <div className="bg-gray-700 rounded-lg p-4 text-xs">
              <div className="text-gray-300 mb-2">デバッグ情報:</div>
              <div>Guess: {guess ? `(${guess.lat.toFixed(4)}, ${guess.lng.toFixed(4)})` : 'なし'}</div>
              <div>Result: {result ? '表示中' : 'なし'}</div>
              <div>Current Round: {currentRound} / {totalRounds}</div>
              <div>Total Score: {totalScore}</div>
              <div className="mt-2 text-yellow-300">
                {guess && !result ? '✅ 回答ボタンが表示されるはず' : '❌ 回答ボタンの条件を確認'}
              </div>
              <div className="mt-2 text-blue-300">
                Guess State: {JSON.stringify(guess)}
              </div>
              <div className="mt-2 text-green-300">
                Result State: {JSON.stringify(result)}
              </div>
              <div className="mt-2 text-purple-300">
                Button Condition: {guess && !result ? 'true' : 'false'}
              </div>
            </div>

            {/* 結果表示 */}
            {result && (
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-600">
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

            {/* 回答ボタン */}
            {guess && !result && (
              <button
                onClick={handleGuess}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl text-xl font-bold hover:scale-105 transition-transform duration-200 shadow-2xl"
              >
                この場所で回答
              </button>
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
          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-600">
            <MapClient
              onGuess={handleMapGuess}
              correctLocation={result?.correctLocation || null}
              userGuess={guess}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
