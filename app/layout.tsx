import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/hooks/use-language"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  // 1. The Title shown in the browser tab
  title: "Alt Access | Bridging the Digital Divide",
  
  // 2. The description for SEO and social sharing
  description: "Cultivating a national tech ecosystem in Cambodia where accessibility is standard practice.",
  
  generator: "Next.js",
  
  // 3. The Logo/Icon setup
  icons: {
    icon: [
      // Default tab icon (light mode)
      { url: "/images/alt-access-black-logo.png", type: "image/png" },
      // Alt for dark backgrounds
      { url: "/images/alt-access-white-logo.png", type: "image/png" },
    ],
    // Icon for iPhone/iPad home screen
    apple: "/images/alt-access-black-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_playfair.variable}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
