import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { LanguageProvider } from "@/hooks/use-language"
import { LanguageBodyClass } from "@/components/language-body-class"
import { Analytics } from "@vercel/analytics/next"

const siteUrl = "https://altaccess.site"

export const metadata: Metadata = {
  // ─── Core ────────────────────────────────────────────────
  title: {
    default: "Alt Access | Web Accessibility Simulations & Learning",
    template: "%s | Alt Access",
  },
  description:
    "Alt Access helps developers experience, learn, and solve real web accessibility barriers. Simulate blindness, low vision, and color blindness. Discover inclusive design and WCAG standards. Built globally with a focus on Cambodia — available in English and Khmer.",

  generator: "Next.js",
  applicationName: "Alt Access",
  keywords: [
    "Alt Access",
    "AltAccess",
    "web accessibility",
    "accessibility simulations",
    "blindness simulation",
    "low vision",
    "color blindness",
    "WCAG",
    "inclusive design",
    "Cambodia accessibility",
    "Cambodian developers",
    "Khmer accessibility",
    "digital accessibility Cambodia",
    "Cambodia tech education",
    "screen reader",
    "a11y",
    "ភាសាខ្មែរ",
    "ការប្រើប្រាស់បច្ចេកវិទ្យា",
  ],
  authors: [{ name: "Alt Access Team" }],
  creator: "Alt Access",
  publisher: "Alt Access",

  // ─── Canonical & Alternates ──────────────────────────────
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },

  // ─── Open Graph ──────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Alt Access",
    title: "Alt Access | Web Accessibility Simulations & Learning",
    description:
      "Experience real web accessibility barriers first-hand. Simulate blindness, low vision, and color blindness. Learn inclusive design and WCAG standards. Built globally with a focus on Cambodia — available in English & Khmer.",
    images: [
      {
        url: "/images/resource/what-is-accessability-picture.png",
        width: 1200,
        height: 630,
        alt: "Alt Access — Web Accessibility Simulations & Learning",
      },
    ],
  },

  // ─── Twitter / X ─────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Alt Access | Web Accessibility Simulations & Learning",
    description:
      "Experience real web accessibility barriers first-hand. Learn inclusive design and WCAG. Built globally, focused on Cambodia — in English & Khmer.",
    images: ["/images/resource/what-is-accessability-picture.png"],
  },

  // ─── Robots ──────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ─── Icons ───────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/images/alt-access-black-logo.png", type: "image/png" },
      { url: "/images/alt-access-white-logo.png", type: "image/png" },
    ],
    apple: "/images/alt-access-black-logo.png",
  },

  // ─── Verification (add your IDs when ready) ──────────────
  // verification: {
  //   google: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
  // },
}

// ─── JSON-LD Structured Data (global) ─────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Alt Access",
      description:
        "Alt Access helps developers worldwide experience, learn, and solve real web accessibility barriers through interactive simulations. Built globally with a focus on Cambodia — available in English and Khmer.",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Alt Access",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/alt-access-black-logo.png`,
      },
      description:
        "A global media and learning campaign with a focus on Cambodia, educating tech students about digital accessibility in Khmer and English. Supported by Prosob and funded by the European Union.",
      areaServed: [
        { "@type": "Country", name: "Cambodia" },
        "Worldwide"
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <LanguageBodyClass>{children}</LanguageBodyClass>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}

