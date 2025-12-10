import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'UniGrade - Calcola le tue combinazioni di voti',
  description: 'App per calcolare tutte le combinazioni di voti universitari per raggiungere la media desiderata',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}
