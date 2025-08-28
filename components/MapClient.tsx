"use client"
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'

const Inner = dynamic(() => import('./MapInner'), { ssr: false })

export type MapClientProps = {
  onPick: (lat: number, lng: number) => void
  picked?: { lat: number; lng: number } | null
  correct?: { lat: number; lng: number } | null
}

export default function MapClient(props: MapClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative z-10"
    >
<<<<<<< HEAD
<<<<<<< HEAD
      <div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
        <Inner {...props} />
      </div>
=======
      <Inner {...props} />
>>>>>>> parent of 3b9d104 (差分)
=======
      <Inner {...props} />
>>>>>>> parent of 3b9d104 (差分)

      {/* 地図の説明 */}
      <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-2xl p-3 shadow-2xl border border-gray-700 z-20">
        <div className="flex items-center space-x-2 text-sm text-gray-200">
          <MapPin className="w-4 h-4 text-purple-400" />
          <span>
            {props.picked && props.correct
              ? '正解位置と選択位置を比較できます'
              : '地図をクリックして回答位置を選択'
            }
          </span>
        </div>
      </div>

      {/* ピンが選択された時のインジケーター */}
      {props.picked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-4 right-4 bg-purple-500 text-white px-4 py-2 rounded-2xl shadow-2xl flex items-center space-x-2 z-20"
        >
          <Navigation className="w-4 h-4" />
          <span className="text-sm font-medium">位置選択済み</span>
        </motion.div>
      )}
    </motion.div>
  )
}
