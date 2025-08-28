"use client"
import { useEffect, useMemo, useState } from 'react'
import { getSupabase } from '../../../lib/supabase'

export default function OnlineCheckPage(){
  const supabase = useMemo(()=>getSupabase(),[])
  const [status, setStatus] = useState<string>('initializing')
  const [messages, setMessages] = useState<string[]>([])

  useEffect(()=>{
    const run = async () => {
      if(!supabase){ setStatus('env-missing'); return }
      setStatus('connecting')
      const channel = supabase.channel('diagnostics:test')
      channel.on('broadcast', { event:'ping' }, ({ payload }) => {
        setMessages(prev=>[...prev, `received: ${payload?.msg || ''}`])
        setStatus('ok')
      })
      await channel.subscribe()
      await channel.send({ type:'broadcast', event:'ping', payload:{ msg:'hello' } })
    }
    run()
    return () => {}
  },[supabase])

  return (
    <div className="min-h-dvh bg-gray-900 text-white p-6">
      <div className="max-w-xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">オンライン接続チェック</h1>
        <div className="text-gray-300">Status: {status}</div>
        <div className="bg-gray-800 rounded-xl p-4 text-sm">
          {messages.length ? messages.map((m,i)=>(<div key={i}>{m}</div>)) : 'メッセージなし'}
        </div>
        {status==='env-missing' && (
          <div className="text-red-400 text-sm">環境変数が不足しています。NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY を設定してください。</div>
        )}
      </div>
    </div>
  )
}
