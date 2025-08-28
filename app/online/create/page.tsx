"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase } from '../../../lib/supabase'
import type { MatchLength } from '../../../lib/types'

function generateRoomId(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export default function OnlineCreatePage() {
  const router = useRouter()
  const [rounds, setRounds] = useState<MatchLength>(3)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async () => {
    setCreating(true)
    setError(null)
    try {
      const roomId = generateRoomId()
      const supabase = getSupabase()
      if (!supabase) {
        setError('Supabaseの環境変数が未設定です (.env.local を確認)')
        return
      }
      // 簡易実装: Realtime チャンネル用の初期イベントを publish（DBは後で）
      const channel = supabase.channel(`room:${roomId}`)
      await channel.subscribe()
      await channel.send({ type: 'broadcast', event: 'room_created', payload: { roomId, rounds } })
      router.push(`/online/room/${roomId}?rounds=${rounds}`)
    } catch (e: any) {
      setError(e?.message || 'ルーム作成に失敗しました')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="min-h-dvh bg-gray-900 text-white p-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold">ルームを作成</h1>
        <div className="space-y-3">
          <label className="block text-gray-300">勝負回数</label>
          <div className="grid grid-cols-2 gap-3">
            <button className={`p-4 rounded-xl ${rounds===3? 'bg-purple-600':'bg-gray-700'}`} onClick={() => setRounds(3)}>3回勝負</button>
            <button className={`p-4 rounded-xl ${rounds===5? 'bg-purple-600':'bg-gray-700'}`} onClick={() => setRounds(5)}>5回勝負</button>
          </div>
        </div>
        <button disabled={creating} onClick={handleCreate} className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-60 rounded-xl p-4 font-semibold">
          {creating ? '作成中...' : 'ルームを作成'}
        </button>
        {error && <div className="text-red-400 text-sm">{error}</div>}
      </div>
    </div>
  )
}


