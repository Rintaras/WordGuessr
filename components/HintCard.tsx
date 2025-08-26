import { motion } from 'framer-motion'
import { Sparkles, Brain, Trophy } from 'lucide-react'

type HintCardProps = {
  hint: string
  difficulty: 'easy' | 'normal' | 'hard'
}

const difficultyColors = {
  easy: { bg: 'bg-emerald-500', text: 'text-emerald-400', icon: Sparkles },
  normal: { bg: 'bg-purple-500', text: 'text-purple-400', icon: Brain },
  hard: { bg: 'bg-red-500', text: 'text-red-400', icon: Trophy },
}

export default function HintCard({ hint, difficulty }: HintCardProps) {
  const { bg, text, icon: Icon } = difficultyColors[difficulty]
  const difficultyText = {
    easy: 'やさしい',
    normal: 'ふつう',
    hard: 'むずかしい',
  }[difficulty]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 200 }}
      className="bg-gray-900 rounded-2xl shadow-2xl p-6 border border-gray-700 max-w-md mx-auto backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">ヒント</h2>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${bg} text-white shadow-lg`}>
          <Icon className="w-3 h-3 mr-1" />
          {difficultyText}
        </span>
      </div>
      <p className="text-gray-200 text-lg leading-relaxed">
        {hint}
      </p>
    </motion.div>
  )
}
