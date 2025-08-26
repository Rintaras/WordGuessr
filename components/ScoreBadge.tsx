import { motion } from 'framer-motion'
import { Award, TrendingUp, TrendingDown } from 'lucide-react'

type ScoreBadgeProps = {
  score: number
}

export default function ScoreBadge({ score }: ScoreBadgeProps) {
  let bgColor = 'bg-gray-600'
  let Icon = Award

  if (score > 4000) {
    bgColor = 'bg-emerald-500'
    Icon = TrendingUp
  } else if (score > 2000) {
    bgColor = 'bg-purple-500'
  } else if (score > 0) {
    bgColor = 'bg-yellow-500'
  } else {
    bgColor = 'bg-red-500'
    Icon = TrendingDown
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.2 }}
      className={`inline-flex items-center px-4 py-2 rounded-full ${bgColor} text-white shadow-2xl space-x-2 backdrop-blur-sm`}
    >
      <Icon className="w-4 h-4" />
      <span className="font-bold">{score}</span>
      <span className="text-xs opacity-90">pt</span>
    </motion.div>
  )
}
