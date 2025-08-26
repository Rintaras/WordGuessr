"use client"
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Award, Info } from 'lucide-react'
import ScoreBadge from './ScoreBadge'

export default function ResultModal({
  open,
  onClose,
  distanceKm,
  score,
  correct,
  picked,
  facts
}: {
  open: boolean
  onClose: () => void
  distanceKm: number
  score: number
  correct: { muni_code: string; name_ja: string; centroid: { lat: number; lng: number } }
  picked: { lat: number; lng: number }
  facts: { trait_type: string; value: string }[]
}) {
  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-gray-900 max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden relative z-[10000] border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ヘッダー */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">結果発表</h3>
              <ScoreBadge score={score} />
            </div>
          </div>

          {/* コンテンツ */}
          <div className="p-6 space-y-6">
            {/* 距離と正解 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-2xl border border-gray-600">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">距離</span>
                </div>
                <span className="text-2xl font-bold text-purple-400">{distanceKm.toFixed(1)} km</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-emerald-900/20 rounded-2xl border border-emerald-700/50">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">正解</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-400">{correct.name_ja}</div>
                  <div className="text-sm text-gray-400">{correct.muni_code}</div>
                </div>
              </div>
            </div>

            {/* 豆知識 */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-pink-400" />
                <h4 className="font-semibold text-white">豆知識</h4>
              </div>
              <div className="space-y-2">
                {facts.slice(0, 3).map((fact, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 bg-gray-800 rounded-xl border-l-4 border-pink-500 border-opacity-50"
                  >
                    <span className="text-sm text-gray-200">{fact.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* アクションボタン */}
            <div className="pt-4">
              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-2xl"
              >
                閉じる
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
