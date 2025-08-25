import { motion } from 'framer-motion'
import { Lightbulb, Clock, Target } from 'lucide-react'

export default function HintCard({ hint, difficulty }: { hint: string; difficulty: 'easy' | 'normal' | 'hard' }) {
  const difficultyConfig = {
    easy: { color: 'from-green-400 to-emerald-600', bg: 'bg-green-50', border: 'border-green-200', icon: Lightbulb },
    normal: { color: 'from-blue-400 to-indigo-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: Target },
    hard: { color: 'from-red-400 to-pink-600', bg: 'bg-red-50', border: 'border-red-200', icon: Clock }
  }
  
  const config = difficultyConfig[difficulty]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl ${config.bg} ${config.border} border-2 shadow-lg`}
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-10 ${config.color}" />
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full bg-gradient-to-r ${config.color}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className={`text-sm font-semibold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
              {difficulty.toUpperCase()}
            </span>
          </div>
          <div className="text-xs text-gray-500 bg-white/50 px-3 py-1 rounded-full">
            ヒント
          </div>
        </div>
        <p className="text-xl font-medium text-gray-800 leading-relaxed">
          {hint}
        </p>
      </div>
    </motion.div>
  )
}
