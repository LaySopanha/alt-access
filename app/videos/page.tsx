import Link from "next/link";
import Image from "next/image";
import { videos } from "@/lib/videoData";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Play, Clock, Film, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Hub | AltAccess",
  description: "Watch our collection of accessibility education videos. Learn about visual impairments, WCAG guidelines, the curb cut effect, and why accessible coding matters.",
};

export default function VideoGalleryPage() {
  return (
    <>
      <Navbar showLogo />
      <main className="bg-[#FDFCF8] min-h-screen pt-20">

        {/* Header + Stats */}
        <div className="px-8 md:px-24 py-16 border-b border-stone-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-4 block">Video Library</span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                Learn Through Video
              </h1>
              <p className="text-lg text-stone-500 max-w-lg">
                Our video series covers the fundamentals of web accessibility — from understanding visual impairments to mastering WCAG guidelines.
              </p>
            </div>
            <div className="flex gap-8 lg:justify-end">
              <div className="text-center">
                <div className="text-3xl font-bold text-wong-vermilion">{videos.length}</div>
                <div className="text-xs font-mono uppercase tracking-widest text-stone-400 mt-1">Videos</div>
              </div>
              <div className="w-px bg-stone-200" />
              <div className="text-center">
                <div className="text-3xl font-bold text-wong-vermilion">5</div>
                <div className="text-xs font-mono uppercase tracking-widest text-stone-400 mt-1">Topics</div>
              </div>
              <div className="w-px bg-stone-200" />
              <div className="text-center">
                <div className="text-3xl font-bold text-wong-vermilion">EN/KH</div>
                <div className="text-xs font-mono uppercase tracking-widest text-stone-400 mt-1">Languages</div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Video (First video) */}
        <div className="px-8 md:px-24 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-0.5 w-10 bg-wong-vermilion"></div>
              <span className="font-mono text-xs uppercase tracking-widest text-stone-500">Featured</span>
            </div>
            <Link
              href={`/videos/${videos[0].slug}`}
              className="block group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 bg-white border border-stone-200 overflow-hidden hover:border-stone-400 transition-all">
                <div className="lg:col-span-3 aspect-video bg-stone-900 relative overflow-hidden">
                  <Image
                    src={videos[0].thumbnail}
                    alt={videos[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-black ml-1" />
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-center">
                  <span className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-3 block">Video 01</span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-wong-vermilion transition-colors">
                    {videos[0].title}
                  </h2>
                  <p className="text-sm text-stone-400 mb-4">{videos[0].titleKh}</p>
                  <p className="text-stone-500 text-base leading-relaxed mb-6">
                    {videos[0].description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-wong-vermilion group-hover:gap-3 transition-all">
                    Watch Now <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* All Videos Grid */}
        <div className="px-8 md:px-24 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-0.5 w-10 bg-black"></div>
              <span className="font-mono text-xs uppercase tracking-widest text-stone-500">All Videos</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {videos.slice(1).map((video, i) => (
                <Link
                  key={video.slug}
                  href={`/videos/${video.slug}`}
                  className="block group"
                >
                  <div className="bg-white border border-stone-200 overflow-hidden hover:border-stone-400 hover:-translate-y-1 transition-all duration-300 grid grid-cols-5 gap-0">
                    <div className="col-span-2 aspect-video bg-stone-200 relative overflow-hidden">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                          <Play className="w-4 h-4 text-black ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5">
                        {String(i + 2).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="col-span-3 p-5 flex flex-col justify-center">
                      <h3 className="text-lg font-bold mb-1 group-hover:text-wong-vermilion transition-colors leading-snug">
                        {video.title}
                      </h3>
                      <p className="text-xs text-stone-400 mb-2">{video.titleKh}</p>
                      <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-stone-200 bg-white px-8 md:px-24 py-16">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-stone-500 mb-3">Want to learn more?</p>
            <Link
              href="/learning-center"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-wong-vermilion hover:text-black transition-colors"
            >
              Visit the Learning Center <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
