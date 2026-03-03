"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, ArrowRight } from "lucide-react"
import { videos } from "@/lib/videoData"

export function VideoSeriesSection() {
  return (
    <section id="chapter-6" className="bg-[#FDFCF8] text-black py-24">
      <div className="px-8 md:px-24 mb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-3 block">Chapter 05</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Campaign.</h2>
            <p className="text-lg text-stone-500 mt-3 max-w-lg">
              Short documentaries and social media videos that challenge the status quo on accessibility.
            </p>
          </div>
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-wong-vermilion hover:text-black transition-colors shrink-0"
          >
            View All Videos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Video Cards */}
      <div className="px-8 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {videos.map((video, i) => (
            <Link
              key={video.slug}
              href={`/videos/${video.slug}`}
              className="block group"
            >
              <div className="bg-white border border-stone-200 overflow-hidden hover:border-stone-400 hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-video bg-stone-200 relative overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 text-black ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold leading-snug group-hover:text-wong-vermilion transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2">{video.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
