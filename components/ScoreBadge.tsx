import { motion } from 'framer-motion'
import { Star, Trophy, Medal } from 'lucide-react'

export default function ScoreBadge({ score }: { score: number }) {
  const getScoreConfig = (score: number) => {
    if (score > 4000) {
      return { color: 'from-yellow-400 to-orange-500', icon: Trophy, text: 'Legendary' }
    } else if (score > 2000) {
      return { color: 'from-blue-400 to-indigo-600', icon: Medal, text: 'Excellent' }
    } else if (score > 1000) {
      return { color: 'from-green-400 to-emerald-600', icon: Star, text: 'Good' }
    } else {
      return { color: 'from-gray-400 to-gray-600', icon: Star, text: 'Nice Try' }
    }
  }

  const config = getScoreConfig(score)
  const Icon = config.icon

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${config.color} text-white shadow-lg`}
    >
      <Icon className="w-4 h-4" />
      <span className="font-bold">{score}</span>
      <span className="text-xs opacity-90">pt</span>
    </motion.div>
  )
}
