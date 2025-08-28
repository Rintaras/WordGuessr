import OpenAI from 'openai'
import { type Trait, type Difficulty } from './types'
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
<<<<<<< HEAD
<<<<<<< HEAD
function sanitizeHint(text: string): string {
  let t = text.replace(/\s+/g, '').trim()
  t = t.replace(/[\u3000]/g, '')
  // 28文字を超える場合は、文字境界を考慮して切り取り
=======
=======
>>>>>>> parent of 3b9d104 (差分)
function sanitizeHint(text:string): string {
  let t = text.replace(/\s+/g,'').trim()
  t = t.replace(/[\u3000]/g,'')
  if (t.length > 28) t = t.slice(0,28)
<<<<<<< HEAD
>>>>>>> parent of 3b9d104 (差分)
=======
>>>>>>> parent of 3b9d104 (差分)
  return t
}
export async function generateHint(params:{ name_ja:string; traits:Trait[]; difficulty:Difficulty }): Promise<string> {
  const { name_ja, traits, difficulty } = params
<<<<<<< HEAD
<<<<<<< HEAD
  const traitText = traits.map(t => `${t.trait_type}:${t.value}`).join('、')

  // より多様で創造的なヒント生成のためのシステムプロンプト
  const sys = 'あなたはクイズの出題者です。日本の市町村名や都道府県名、固有のランドマーク名は禁止。短文で問題を1つだけ出力。句点なし。特徴を組み合わせて創造的な表現を心がけてください。'

=======
  const traitText = traits.map(t=> `${t.trait_type}:${t.value}`).join('、')
  const sys = 'あなたはクイズの出題者です。日本の市町村名や都道府県名、固有のランドマーク名は禁止。18〜28文字で短文ヒントを1つだけ出力。句点なし。'
>>>>>>> parent of 3b9d104 (差分)
=======
  const traitText = traits.map(t=> `${t.trait_type}:${t.value}`).join('、')
  const sys = 'あなたはクイズの出題者です。日本の市町村名や都道府県名、固有のランドマーク名は禁止。18〜28文字で短文ヒントを1つだけ出力。句点なし。'
>>>>>>> parent of 3b9d104 (差分)
  const difficultyGuide = {
    easy:'全国的に有名な祭りや世界遺産、日本一などを軸に。',
    normal:'特産・観光・気候を組み合わせてヒント化。',
    hard:'人口・面積・方角・気候など統計寄りで曖昧化。'
  }[difficulty]
<<<<<<< HEAD
<<<<<<< HEAD

  // 特徴タイプに応じた創造的な表現ガイド
  const traitGuide = traits.some(t => t.trait_type === 'festival') ? '祭りの雰囲気や季節感を表現。' : ''
  const traitGuide2 = traits.some(t => t.trait_type === 'food') ? '食文化や味覚の特徴を描写。' : ''
  const traitGuide3 = traits.some(t => t.trait_type === 'landmark') ? '景観や建物の印象を表現。' : ''
  const traitGuide4 = traits.some(t => t.trait_type === 'climate') ? '気候や地理的特徴を描写。' : ''
  const traitGuide5 = traits.some(t => t.trait_type === 'culture') ? '文化的背景や歴史を表現。' : ''

  const user = `対象:${name_ja} / 素材:${traitText} / 地名禁止・1文のみ・創造的な表現を心がけてください。`

  for (let i = 0; i < 3; i++) {
=======
  const user = `対象:${name_ja} / 素材:${traitText} / 25字以内厳守・地名禁止・記号最小化・ひらがな/漢字中心・1文のみ`
  for (let i=0;i<3;i++){
>>>>>>> parent of 3b9d104 (差分)
=======
  const user = `対象:${name_ja} / 素材:${traitText} / 25字以内厳守・地名禁止・記号最小化・ひらがな/漢字中心・1文のみ`
  for (let i=0;i<3;i++){
>>>>>>> parent of 3b9d104 (差分)
    try {
      const res = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: sys + ' ' + difficultyGuide },
          { role: 'user', content: user }
        ],
        max_tokens: 60,
        temperature: difficulty==='easy'?0.7: difficulty==='normal'?0.8:0.9
      })
      const raw = res.choices?.[0]?.message?.content?.trim() || ''
      const s = sanitizeHint(raw)
      if (s && s.length>=18 && s.length<=28 && !/(都|道|府|県|市|区|町|村)/.test(s)) return s
    } catch { /* retry */ }
  }
  const fallback = `${traits[0]?.value || '特産'}と${traits[1]?.value || '祭り'}が知られる地`
  return sanitizeHint(fallback) || '名物と祭りが知られる地'
}
