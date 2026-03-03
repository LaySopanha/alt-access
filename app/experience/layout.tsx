import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accessibility Simulations",
  description:
    "Experience the web through different perspectives. Interactive simulations for Total Blindness, Low Vision, and Color Blindness — built to teach inclusive design globally, with a focus on Cambodia. Available in English and Khmer.",
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Accessibility Simulations | Alt Access",
    description:
      "Experience web accessibility barriers first-hand. Simulate total blindness, low vision, and color blindness. Built globally, focused on Cambodia — in English & Khmer.",
    url: "https://altaccess.site/experience",
    images: [
      {
        url: "/images/resource/what-is-accessability-picture.png",
        width: 1200,
        height: 630,
        alt: "Alt Access accessibility simulations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accessibility Simulations | Alt Access",
    description:
      "Experience web accessibility barriers first-hand. Simulate total blindness, low vision, and color blindness.",
    images: ["/images/resource/what-is-accessability-picture.png"],
  },
}

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
