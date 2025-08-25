import fs from 'node:fs'
import path from 'node:path'
import centroid from '@turf/centroid'
import { supabaseAdmin } from '../lib/db'

async function main(){
  const inPath = process.argv[2]
  if(!inPath){ console.error('Usage: ts-node scripts/import-centroids.ts <admins.geojson>'); process.exit(1) }
  const geo = JSON.parse(fs.readFileSync(path.resolve(inPath),'utf8'))
  const feats = (geo.features||[]) as any[]
  const rows = feats.map(f=>{
    const c = centroid(f)
    const code = f.properties?.code || f.properties?.municipality_code || ''
    const name = f.properties?.name_ja || f.properties?.name || ''
    return { muni_code: String(code).padStart(5,'0'), name_ja: name, centroid_lat: c.geometry.coordinates[1], centroid_lng: c.geometry.coordinates[0] }
  })
  if(!supabaseAdmin){ throw new Error('SUPABASE_SERVICE_ROLE_KEY is required') }
  const { error } = await supabaseAdmin.from('municipalities').upsert(rows, { onConflict:'muni_code' })
  if(error) throw error
  console.log('Imported', rows.length)
}
main().catch(e=>{ console.error(e); process.exit(1) })
