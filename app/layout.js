// @ts-nocheck
import { SessionProvider } from "next-auth/react";
import { Inter } from 'next/font/google'
import './ui/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Geetanjali Diagnostics',
  icons:{
    icon:"/astronaut.png"
  }
}

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}> {children}</SessionProvider>
        </body>
    </html>
  )
}
