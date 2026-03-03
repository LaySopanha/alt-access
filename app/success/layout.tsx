import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Simulation Complete",
  description:
    "Congratulations! You completed an Alt Access accessibility simulation. Learn what you experienced and how to build more inclusive digital products.",
  robots: { index: false, follow: true },
}

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
