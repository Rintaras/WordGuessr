import { Trait } from './types'
export function pickTraits(all:Trait[], countMin=2, countMax=3): Trait[] {
  const shuffled = [...all].sort(()=> Math.random()-0.5)
  const n = Math.min(Math.max(countMin, Math.floor(Math.random()*(countMax-countMin+1))+countMin), all.length)
  return shuffled.slice(0,n)
}
