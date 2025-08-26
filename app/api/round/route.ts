import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { type Difficulty, type Municipality, type Trait } from '../../../lib/types'
import { getMunicipalities, getTraitsByMuni } from '../../../lib/data'
import { pickTraits } from '../../../lib/traits'
import { generateHint } from '../../../lib/hint'
import { signRound } from '../../../lib/token'

const querySchema = z.object({ difficulty: z.enum(['easy','normal','hard']).default('normal') })

export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url)
  const parse = querySchema.safeParse({ difficulty: searchParams.get('difficulty') ?? 'normal' })
  if(!parse.success){ return NextResponse.json({ error:'invalid params' }, { status:400 }) }
  const difficulty = parse.data.difficulty as Difficulty

  const muniRows = getMunicipalities()
  if(!muniRows.length) return NextResponse.json({ error:'no municipalities' }, { status:500 })
  const muni = muniRows[Math.floor(Math.random()*muniRows.length)] as Municipality
  const traitRows = getTraitsByMuni(muni.muni_code) as Trait[]
  const traits = pickTraits(traitRows,2,3)
  const hintText = await generateHint({ name_ja: muni.name_ja, traits, difficulty })

  const token = await signRound({ muni_code: muni.muni_code, difficulty, iat: Math.floor(Date.now()/1000) })
  const expiresAt = new Date(Date.now()+15*60*1000).toISOString()
  return NextResponse.json({ roundId: token, hintText, difficulty, expiresAt })
}
