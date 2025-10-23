import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { DynamicLangAttribute } from '@/components/DynamicLangAttribute'
import './globals.css'

export const metadata: Metadata = {
  title: 'NOMO - BNB Prediction Marketplace',
  description: 'The next-generation BNB prediction marketplace. Trade on the future.',
  generator: 'NOMO',
  // Force new deployment
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
        <LanguageProvider>
          <DynamicLangAttribute />
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
