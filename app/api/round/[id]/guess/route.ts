import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyRound } from '../../../../../lib/token'
import { getMunicipalities } from '../../../../../lib/data'
import { haversine, scoreFromDistanceKm } from '../../../../../lib/scoring'

const bodySchema = z.object({ lat: z.number(), lng: z.number() })

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const json = await req.json().catch(() => null)
  const parsed = bodySchema.safeParse(json)
  if (!parsed.success) return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  const { lat, lng } = parsed.data

  let payload: any
  try { payload = await verifyRound(id) } catch { return NextResponse.json({ error: 'invalid round' }, { status: 400 }) }
  const muni = getMunicipalities().find(m => m.muni_code === payload.muni_code)
  if (!muni) return NextResponse.json({ error: 'muni not found' }, { status: 404 })

  const dKm = haversine(lat, lng, muni.centroid_lat, muni.centroid_lng)
  const isExact = Math.abs(lat - muni.centroid_lat) < 1e-5 && Math.abs(lng - muni.centroid_lng) < 1e-5
  const score = scoreFromDistanceKm(dKm, isExact)

  return NextResponse.json({
    distance: dKm,
    score,
    correctLocation: {
      lat: muni.centroid_lat,
      lng: muni.centroid_lng,
      name: muni.name_ja
    }
  })
}
