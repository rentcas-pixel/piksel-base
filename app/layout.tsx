import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Piksel Base - Užsakymų Valdymo Sistema',
  description: 'Moderni web aplikacija ekranų ir viadukų užsakymų valdymui',
  keywords: 'užsakymai, valdymas, ekranai, viadukai, piksel',
  authors: [{ name: 'Piksel Base Team' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="lt">
      <head>
        {/* Manifest temporarily disabled due to 401 error */}
      </head>
      <body className="min-h-screen bg-neutral-50">
        {children}
      </body>
    </html>
  )
}
