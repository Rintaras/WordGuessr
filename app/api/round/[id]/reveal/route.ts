import { NextRequest, NextResponse } from 'next/server'
import { verifyRound } from '../../../../../lib/token'
import { getMunicipalities, getTraitsByMuni } from '../../../../../lib/data'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let payload: any
  try { payload = await verifyRound(id) } catch { return NextResponse.json({ error: 'invalid round' }, { status: 400 }) }

  const muni = getMunicipalities().find(m => m.muni_code === payload.muni_code)
  if (!muni) return NextResponse.json({ error: 'muni not found' }, { status: 404 })

  const traits = getTraitsByMuni(muni.muni_code).slice(0, 3)
  return NextResponse.json({
    correctLocation: {
      lat: muni.centroid_lat,
      lng: muni.centroid_lng,
      name: muni.name_ja
    },
    facts: traits.map(trait => trait.value) || []
  })
}
