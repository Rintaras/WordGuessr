import { NextRequest, NextResponse } from 'next/server'

let recentScores: { t:number; s:number }[] = []

export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url)
  const period = searchParams.get('period') || 'all'
  const now = Date.now()
  recentScores = recentScores.filter(x=> now - x.t < 7*24*60*60*1000)
  const total = recentScores.reduce((a,b)=> a+b.s, 0)
  return NextResponse.json({ period, totalScore: total, samples: recentScores.length })
}

export async function POST(req: NextRequest){
  const json = await req.json().catch(()=>null)
  const s = typeof json?.score==='number' ? json.score : 0
  recentScores.push({ t: Date.now(), s })
  return NextResponse.json({ ok: true })
}
