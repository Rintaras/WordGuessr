"use client"
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getSupabase } from '../../../../lib/supabase'
import { computeTimeMultiplier, type MatchLength } from '../../../../lib/types'

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const search = useSearchParams()
  const [roomId, setRoomId] = useState<string>('')
  const rounds = (parseInt(search.get('rounds') || '0') || undefined) as MatchLength | undefined
  const [participants, setParticipants] = useState<string[]>([])
  const [host, setHost] = useState<boolean>(false)
  const [started, setStarted] = useState<boolean>(false)
  const [startAtMs, setStartAtMs] = useState<number | null>(null)
  const [nowMs, setNowMs] = useState<number>(Date.now())

  const supabase = useMemo(() => getSupabase(), [])
  const channel = useMemo(() => (supabase ? supabase.channel(`room:${roomId}`) : null), [roomId, supabase])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // paramsからroomIdを取得
  useEffect(() => {
    params.then(({ id }) => {
      setRoomId(id)
    })
  }, [params])

  useEffect(() => {
    const sub = async () => {
      if (!channel) return
      await channel.subscribe(async status => {
        if (status === 'SUBSCRIBED') {
          // 参加通知
          await channel.send({ type: 'broadcast', event: 'joined', payload: { id: Math.random().toString(36).slice(2,8) } })
        }
      })

      channel.on('broadcast', { event: 'joined' }, ({ payload }) => {
        setParticipants(prev => Array.from(new Set([...prev, payload.id])))
      })

      channel.on('broadcast', { event: 'room_created' }, ({ payload }) => {
        if (!rounds && payload?.rounds) {
          // join 側で rounds をURLにもらっていない時の補完
          router.replace(`/online/room/${roomId}?rounds=${payload.rounds}`)
        }
      })

      channel.on('broadcast', { event: 'start_game' }, ({ payload }) => {
        setStarted(true)
        setStartAtMs(payload.startAt)
      })
    }
    sub()
    return () => { channel?.unsubscribe() }
  }, [channel, roomId, rounds, router])

  useEffect(() => {
    if (startAtMs) {
      timerRef.current && clearInterval(timerRef.current)
      timerRef.current = setInterval(() => setNowMs(Date.now()), 100)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startAtMs])

  const handleStart = async () => {
    if (!rounds || !channel) return
    setHost(true)
    const startAt = Date.now() + 3000 // 3秒後に全員一斉スタート
    await channel.send({ type: 'broadcast', event: 'start_game', payload: { startAt } })
  }

  const elapsedMs = startAtMs ? Math.max(0, nowMs - startAtMs) : 0
  const multiplier = computeTimeMultiplier(elapsedMs)

  // roomIdが読み込まれるまでローディング表示
  if (!roomId) {
    return (
      <div className="min-h-dvh bg-gray-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">ルーム {roomId}</h1>
        {!supabase && (
          <div className="text-red-400 text-sm">Supabaseの環境変数が未設定です (.env.local を確認してください)</div>
        )}
        <div className="text-gray-400">参加者: {participants.length}人</div>

        {!started ? (
          <div className="space-y-4">
            <div>勝負回数: {rounds ?? '-'} 回</div>
            <button onClick={handleStart} className="bg-green-600 hover:bg-green-500 rounded-xl p-4 font-semibold">ゲームを開始</button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>スタートまでの同期: 開始済み</div>
            <div>経過: {(elapsedMs/1000).toFixed(1)}s / 係数: x{multiplier}</div>
            <div className="text-sm text-gray-400">この後、既存の問題生成と採点ロジックに接続します。</div>
          </div>
        )}
      </div>
    </div>
  )
}


