"use client"
import { motion } from 'framer-motion'
import { Database, Globe, BookOpen, Heart } from 'lucide-react'

export default function About() {
  const features = [
    {
      icon: Database,
      title: 'オープンデータ',
      description: 'Geolonia、e-Stat、観光庁などの公的データを活用',
      color: 'from-blue-400 to-indigo-600'
    },
    {
      icon: Globe,
      title: 'AI生成ヒント',
      description: 'OpenAI GPT-4による自然で面白いヒント生成',
      color: 'from-green-400 to-emerald-600'
    },
    {
      icon: BookOpen,
      title: '地理学習',
      description: '日本の市町村の特徴と文化を楽しく学べる',
      color: 'from-purple-400 to-pink-600'
    },
    {
      icon: Heart,
      title: 'オープンソース',
      description: 'Next.js + TypeScript + Tailwind CSSで構築',
      color: 'from-red-400 to-pink-600'
    }
  ]

  const sources = [
    {
      name: 'Geolonia Japanese Admins',
      url: 'https://geolonia.github.io/japanese-admins/',
      description: '自治体境界データ'
    },
    {
      name: 'e-Stat',
      url: 'https://www.e-stat.go.jp/',
      description: '統計データ'
    },
    {
      name: '観光庁',
      url: 'https://www.mlit.go.jp/kankocho/',
      description: '観光情報'
    }
  ]

  return (
    <div className="min-h-dvh bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
      
      <main className="relative z-10 mx-auto max-w-6xl p-8 space-y-12">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About WordGuessr
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            日本の地理と文化を楽しく学べる、AI駆動の地理クイズゲーム
          </p>
        </motion.div>

        {/* 特徴 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-sm text-center leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* データソース */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">オープンデータ出典</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sources.map((source, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="text-center space-y-3"
              >
                <h3 className="font-semibold text-gray-800">{source.name}</h3>
                <p className="text-sm text-gray-600">{source.description}</p>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  詳細を見る
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ライセンス */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">ライセンス・クレジット</h3>
            <p className="text-gray-600">
              各データの配布条件に従います。WordGuessrは教育・学習目的で構築されています。
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
