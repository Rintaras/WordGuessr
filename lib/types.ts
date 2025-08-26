export type Difficulty = 'easy' | 'normal' | 'hard'
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
export type TraitType = 'festival' | 'specialty' | 'landmark' | 'history' | 'food' | 'climate' | 'culture'
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
