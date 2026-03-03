import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "BookShop - Your Personal Digital Library",
  description:
    "Manage your books, track your reading progress, and secure your data. A modern solution for book enthusiasts.",
  icons: {
    icon: "/images/BookShop - logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${_inter.variable} ${_jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
