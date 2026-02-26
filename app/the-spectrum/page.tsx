import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { VisualImpairmentSection } from "@/components/visual-impairment-section"
import { Footer } from "@/components/footer"

export default function TheSpectrumPage() {
    return (
        <main className="relative isolate min-h-screen flex flex-col pt-32 bg-[#FDFCF8]">
            <Navbar theme="light" showLogo={true} forceSolidBg={true} />

            <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-24 mb-8 relative z-20">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 hover:bg-black/5 hover:border-black/20 transition-all text-sm font-semibold tracking-wide text-black bg-white shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>

            <div className="relative z-10 flex-1">
                <VisualImpairmentSection />
            </div>

            <Footer />
        </main>
    )
}
