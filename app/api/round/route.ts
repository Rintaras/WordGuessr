import { NextRequest, NextResponse } from 'next/server'
import { getMunicipalities, getTraitsByMuni } from '../../../lib/data'
import { generateHint } from '../../../lib/hint'
import { signRound } from '../../../lib/token'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  let difficulty = searchParams.get('difficulty') as 'easy' | 'normal' | 'hard'

  // 難易度が指定されていない場合はランダムに選択
  if (!difficulty || !['easy', 'normal', 'hard'].includes(difficulty)) {
    const difficulties: ('easy' | 'normal' | 'hard')[] = ['easy', 'normal', 'hard']
    difficulty = difficulties[Math.floor(Math.random() * difficulties.length)]
  }

  try {
    const municipalities = getMunicipalities()
    if (municipalities.length === 0) {
      return NextResponse.json({ error: 'No municipalities available' }, { status: 500 })
    }

    // ランダムに市町村を選択
    const randomMunicipality = municipalities[Math.floor(Math.random() * municipalities.length)]

    // 市町村の特徴を取得
    const traits = getTraitsByMuni(randomMunicipality.muni_code)

    // ヒントを生成
    const hintText = await generateHint({
      name_ja: randomMunicipality.name_ja,
      traits: traits,
      difficulty: difficulty
    })

    // JWTトークンを生成
    const roundId = await signRound({
      muni_code: randomMunicipality.muni_code,
      difficulty: difficulty,
      iat: Date.now()
    })

    return NextResponse.json({
      roundId,
      hintText,
      difficulty,
      expiresAt: Date.now() + 15 * 60 * 1000 // 15分後
    })
  } catch (error) {
    console.error('Failed to create round:', error)
    return NextResponse.json({ error: 'Failed to create round' }, { status: 500 })
  }
}
