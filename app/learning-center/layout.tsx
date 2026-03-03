import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Learning Center",
  description:
    "Learn web accessibility fundamentals — WCAG guidelines, semantic HTML, ARIA, color contrast, keyboard navigation, and more. Free interactive lessons for developers worldwide, with a focus on Cambodia. Available in English and Khmer.",
  alternates: { canonical: "/learning-center" },
  openGraph: {
    title: "Learning Center | Alt Access",
    description:
      "Learn web accessibility fundamentals — WCAG, semantic HTML, ARIA, color contrast, and more. Free lessons for developers globally, focused on Cambodia — in English & Khmer.",
    url: "https://altaccess.site/learning-center",
    images: [
      {
        url: "/images/resource/what-is-accessability-picture.png",
        width: 1200,
        height: 630,
        alt: "Alt Access Learning Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Center | Alt Access",
    description:
      "Learn web accessibility fundamentals — WCAG guidelines, semantic HTML, ARIA, color contrast, and more.",
    images: ["/images/resource/what-is-accessability-picture.png"],
  },
}

export default function LearningCenterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
