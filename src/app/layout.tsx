import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppinsSans = Poppins({
  variable: '--font-poppins-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Swallow chat app',
  description: 'A chat app built with Next.js and TypeScript',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${poppinsSans.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}

export default RootLayout
