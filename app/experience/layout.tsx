import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Simulations | AltAccess",
    description:
        "Experience the web through different perspectives. Interactive simulations for Low Vision, Color Blindness, and Total Blindness.",
}

export default function ExperienceLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
