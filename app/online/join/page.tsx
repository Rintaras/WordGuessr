"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OnlineJoinPage() {
  const router = useRouter()
  const [roomId, setRoomId] = useState('')

  const handleJoin = async () => {
    if (roomId.match(/^\d{6}$/)) {
      router.push(`/online/room/${roomId}`)
    }
  }

  return (
    <div className="min-h-dvh bg-gray-900 text-white p-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold">ルームに参加</h1>
        <div className="space-y-3">
          <label className="block text-gray-300">ルームID（6桁）</label>
          <input value={roomId} onChange={e=>setRoomId(e.target.value)} placeholder="123456" maxLength={6} className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 outline-none" />
        </div>
        <button onClick={handleJoin} className="w-full bg-blue-600 hover:bg-blue-500 rounded-xl p-4 font-semibold disabled:opacity-60" disabled={!roomId.match(/^\d{6}$/)}>
          参加する
        </button>
      </div>
    </div>
  )
}


