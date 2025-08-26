"use client"
import { useState } from 'react'
import { MapPin, Play, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SelectRoundsPage() {
    const [selectedRounds, setSelectedRounds] = useState<number | null>(null)

    const handleStartGame = () => {
        if (selectedRounds) {
            // 選択された回数でゲームを開始
            window.location.href = `/play?rounds=${selectedRounds}`
        }
    }

    return (
        <div className="min-h-dvh flex flex-col relative overflow-hidden">
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
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

                {/* 小さな浮遊要素 */}
                <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-40 right-32 w-3 h-3 bg-cyan-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-32 left-32 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
                <div className="absolute bottom-20 right-20 w-3 h-3 bg-cyan-400/30 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }} />
            </div>

            {/* メインコンテンツ */}
            <main className="relative z-10 mx-auto max-w-4xl p-8 flex flex-col items-center justify-center min-h-dvh">
                <div className="text-center space-y-8">
                    {/* ヘッダー */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-3">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-2xl">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                WordGuessr
                            </h1>
                        </div>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            ゲーム回数を選択してください
                        </p>
                    </div>

                    {/* ゲーム回数選択 */}
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            {/* 3回ゲーム */}
                            <button
                                onClick={() => setSelectedRounds(3)}
                                className={`p-8 rounded-2xl border-2 transition-all duration-300 ${selectedRounds === 3
                                        ? 'border-blue-500 bg-blue-500/20 shadow-2xl scale-105'
                                        : 'border-gray-600 bg-gray-800/50 hover:border-blue-400 hover:bg-gray-700/50'
                                    }`}
                            >
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center">
                                        <span className="text-3xl font-bold text-blue-400">3</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">3回ゲーム</h3>
                                    <p className="text-gray-400 text-sm">短時間で楽しめる</p>
                                </div>
                            </button>

                            {/* 5回ゲーム */}
                            <button
                                onClick={() => setSelectedRounds(5)}
                                className={`p-8 rounded-2xl border-2 transition-all duration-300 ${selectedRounds === 5
                                        ? 'border-cyan-500 bg-cyan-500/20 shadow-2xl scale-105'
                                        : 'border-gray-600 bg-gray-800/50 hover:border-cyan-400 hover:bg-gray-700/50'
                                    }`}
                            >
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 mx-auto bg-cyan-500/20 rounded-full flex items-center justify-center">
                                        <span className="text-3xl font-bold text-cyan-400">5</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">5回ゲーム</h3>
                                    <p className="text-gray-400 text-sm">じっくりと楽しめる</p>
                                </div>
                            </button>
                        </div>

                        {/* ゲーム開始ボタン */}
                        {selectedRounds && (
                            <div className="pt-6">
                                <button
                                    onClick={handleStartGame}
                                    className="group relative overflow-hidden block w-full max-w-md mx-auto"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl transition-all duration-300 group-hover:scale-105 shadow-2xl" />
                                    <div className="relative p-8 text-center text-white">
                                        <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                            <Play className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">ゲーム開始</h3>
                                        <p className="text-blue-100 text-sm">{selectedRounds}回のゲームを開始</p>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* ホームに戻るボタン */}
                    <div className="pt-8">
                        <Link
                            href="/"
                            className="inline-flex items-center space-x-2 text-gray-400 hover:text-gray-200 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>ホームに戻る</span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}

