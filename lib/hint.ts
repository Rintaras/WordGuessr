import OpenAI from 'openai'
import { type Trait, type Difficulty } from './types'
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
function sanitizeHint(text: string): string {
  let t = text.replace(/\s+/g, '').trim()
  t = t.replace(/[\u3000]/g, '')
  // 28文字を超える場合は、文字境界を考慮して切り取り
  if (t.length > 28) {
    // 文字数を正確にカウントして切り取り
    const chars = Array.from(t)
    if (chars.length > 28) {
      t = chars.slice(0, 28).join('')
    }
  }
  return t
}
export async function generateHint(params: { name_ja: string; traits: Trait[]; difficulty: Difficulty }): Promise<string> {
  const { name_ja, traits, difficulty } = params
  const traitText = traits.map(t => `${t.trait_type}:${t.value}`).join('、')

  // より多様で創造的なヒント生成のためのシステムプロンプト
  const sys = 'あなたはクイズの出題者です。日本の市町村名や都道府県名、固有のランドマーク名は禁止。18〜28文字で短文ヒントを1つだけ出力。句点なし。特徴を組み合わせて創造的な表現を心がけてください。'

  const difficultyGuide = {
    easy: '全国的に有名な祭りや世界遺産、日本一などを軸に。特徴を直接的に表現。',
    normal: '特産・観光・気候・文化を組み合わせてヒント化。比喩や連想を活用。',
    hard: '人口・面積・方角・気候・歴史など統計寄りで曖昧化。抽象的な表現を多用。'
  }[difficulty]

  // 特徴タイプに応じた創造的な表現ガイド
  const traitGuide = traits.some(t => t.trait_type === 'festival') ? '祭りの雰囲気や季節感を表現。' : ''
  const traitGuide2 = traits.some(t => t.trait_type === 'food') ? '食文化や味覚の特徴を描写。' : ''
  const traitGuide3 = traits.some(t => t.trait_type === 'landmark') ? '景観や建物の印象を表現。' : ''
  const traitGuide4 = traits.some(t => t.trait_type === 'climate') ? '気候や地理的特徴を描写。' : ''
  const traitGuide5 = traits.some(t => t.trait_type === 'culture') ? '文化的背景や歴史を表現。' : ''

  const user = `対象:${name_ja} / 素材:${traitText} / 25字以内厳守・地名禁止・記号最小化・ひらがな/漢字中心・1文のみ・創造的な表現を心がけて`

  for (let i = 0; i < 3; i++) {
    try {
      const res = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: sys + ' ' + difficultyGuide + ' ' + traitGuide + traitGuide2 + traitGuide3 + traitGuide4 + traitGuide5 },
          { role: 'user', content: user }
        ],
        max_tokens: 60,
        temperature: difficulty === 'easy' ? 0.7 : difficulty === 'normal' ? 0.8 : 0.9
      })
      const raw = res.choices?.[0]?.message?.content?.trim() || ''
      const s = sanitizeHint(raw)
      if (s && s.length >= 18 && s.length <= 28 && !/(都|道|府|県|市|区|町|村)/.test(s)) return s
    } catch { /* retry */ }
  }

  // より多様なフォールバックパターン
  const fallbackPatterns = [
    `${traits[0]?.value || '特産'}と${traits[1]?.value || '祭り'}が知られる地`,
    `${traits[0]?.value || '名物'}が${traits[1]?.value || '有名'}な場所`,
    `${traits[0]?.value || '観光'}と${traits[1]?.value || '文化'}の街`,
    `${traits[0]?.value || '歴史'}と${traits[1]?.value || '伝統'}の地`
  ]

  const randomFallback = fallbackPatterns[Math.floor(Math.random() * fallbackPatterns.length)]
  return sanitizeHint(randomFallback) || '名物と祭りが知られる地'
}
