import municipalities from '../data/municipalities.json'
import traits from '../data/traits.json'
import { type Municipality, type Trait } from './types'

export function getMunicipalities(): Municipality[] {
  return municipalities as unknown as Municipality[]
}
export function getTraitsByMuni(muni_code: string): Trait[] {
  return (traits as any[]).filter(t=> t.muni_code===muni_code) as unknown as Trait[]
}
