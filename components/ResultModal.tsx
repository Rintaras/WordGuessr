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
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden relative z-[10000]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ヘッダー */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white relative">
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
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">距離</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">{distanceKm.toFixed(1)} km</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">正解</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{correct.name_ja}</div>
                  <div className="text-sm text-gray-500">{correct.muni_code}</div>
                </div>
              </div>
            </div>

            {/* 豆知識 */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-gray-800">豆知識</h4>
              </div>
              <div className="space-y-2">
                {facts.slice(0, 3).map((fact, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 bg-purple-50 rounded-xl border-l-4 border-purple-300"
                  >
                    <span className="text-sm text-gray-700">{fact.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* アクションボタン */}
            <div className="pt-4">
              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
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
