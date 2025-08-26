import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'WordGuessr',
  description: '日本の市町村を当てるテキスト版GeoGuessr',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="min-h-dvh bg-black text-white antialiased">
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        {children}
      </body>
    </html>
  )
}
