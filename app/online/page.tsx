"use client"
import Link from 'next/link'

export default function OnlinePage() {
  return (
    <div className="min-h-dvh bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">オンライン対戦</h1>
        <p className="text-gray-400">ルームを作成するか、ルームIDで参加してください。</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/online/create" className="block bg-purple-600 hover:bg-purple-500 transition-colors rounded-xl p-6 text-center font-semibold">
            ルームを作成
          </Link>
          <Link href="/online/join" className="block bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl p-6 text-center font-semibold">
            ルームに参加
          </Link>
        </div>
      </div>
    </div>
  )
}


