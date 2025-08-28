export type Difficulty = 'easy'|'normal'|'hard'
export type Municipality = {
  id: number
  pref_code: number
  muni_code: string
  name_ja: string
  name_en?: string
  centroid_lat: number
  centroid_lng: number
  population?: number
  area_km2?: number
}
export type TraitType = 'festival'|'specialty'|'landmark'|'history'|'food'
export type Trait = {
  id?: number
  muni_code: string
  trait_type: TraitType
  value: string
  source_url?: string
}
export type Round = {
  id: string
  muni_code: string
  difficulty: Difficulty
  hint_text: string
  created_at: string
}
export type Guess = {
  id: string
  round_id: string
  guess_lat: number
  guess_lng: number
  distance_km: number
  is_exact: boolean
  score: number
  created_at: string
  user_id?: string
}

// Multiplayer
export type MatchLength = 3 | 5
export type Room = {
  id: string // 6桁の数字（文字列として保持）
  host_user_id: string
  rounds: MatchLength
  created_at: string
  status: 'waiting' | 'started' | 'finished'
}

export type RoomParticipant = {
  room_id: string
  user_id: string
  username: string
  joined_at: string
  total_score: number
}

export type MultiplayerGuessEvent = {
  type: 'guess'
  room_id: string
  user_id: string
  round_index: number
  lat: number
  lng: number
  submitted_at: number // epoch ms
}

export function computeTimeMultiplier(msFromStart: number): number {
  if (msFromStart <= 5000) return 5
  if (msFromStart <= 10000) return 3
  if (msFromStart <= 15000) return 1.5
  if (msFromStart <= 30000) return 1.2
  return 1
}