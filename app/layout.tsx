import type { Metadata } from 'next'
import '../styles/globals.css'
export const metadata: Metadata = { 
  title: 'WordGuessr', 
  description: '日本の市町村を当てるテキスト版GeoGuessr',
  icons: { icon: '/favicon.ico' }
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-dvh bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900 antialiased">
        <div className="fixed inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 pointer-events-none" />
        {children}
      </body>
    </html>
  )
}
