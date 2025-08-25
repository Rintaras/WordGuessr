export function haversine(lat1:number, lon1:number, lat2:number, lon2:number): number {
  const R = 6371
  const toRad=(d:number)=> (d*Math.PI)/180
  const dLat = toRad(lat2-lat1)
  const dLon = toRad(lon2-lon1)
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}
export function scoreFromDistanceKm(dKm:number, isExact:boolean=false): number {
  const base = Math.max(0, Math.round(5000 * Math.exp(-dKm / 80)))
  const minNear = dKm <= 10 ? Math.max(base, 200) : base
  return minNear + (isExact ? 1500 : 0)
}
