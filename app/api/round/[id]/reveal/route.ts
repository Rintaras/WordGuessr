import { NextRequest, NextResponse } from 'next/server'
import { verifyRound } from '../../../../../lib/token'
import { getMunicipalities, getTraitsByMuni } from '../../../../../lib/data'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }){
  let payload: any
  try { payload = await verifyRound(params.id) } catch { return NextResponse.json({ error:'invalid round' }, { status:400 }) }

  const muni = getMunicipalities().find(m=> m.muni_code===payload.muni_code)
  if(!muni) return NextResponse.json({ error:'muni not found' }, { status:404 })

  const traits = getTraitsByMuni(muni.muni_code).slice(0,3)
  return NextResponse.json({
    correct: { muni_code: muni.muni_code, name_ja: muni.name_ja, centroid: { lat: muni.centroid_lat, lng: muni.centroid_lng } },
    facts: traits || []
  })
}
