"use client"

import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils"
import { Play } from "lucide-react"

export function VideoSeriesSection() {
  const { t } = useLanguage()
  const [isPaused, setIsPaused] = useState(false)

  const videos = [
    {
      id: 1,
      youtubeId: "tTg8QT4NjvA",
      thumbnail: "/video-thumbnail-1.png",
      duration: "5:20",
      tag: "Fundamentals",
    },
    {
      id: 2,
      youtubeId: "tTg8QT4NjvA",
      thumbnail: "/video-thumbnail-2.png",
      duration: "4:45",
      tag: "Screen Readers",
    },
    {
      id: 3,
      youtubeId: "tTg8QT4NjvA",
      thumbnail: "/video-thumbnail-1.png",
      duration: "6:10",
      tag: "Coding Standards",
    },
    {
      id: 4,
      youtubeId: "tTg8QT4NjvA",
      thumbnail: "/video-thumbnail-2.png",
      duration: "5:00",
      tag: "Case Studies",
    },
  ]

  // Triple the videos for seamless looping
  const loopedVideos = [...videos, ...videos, ...videos]

  return (
    <section className="bg-white text-black min-h-[100dvh] flex flex-col justify-center py-24">

      <div className="container mx-auto px-8 md:px-32 lg:px-48 mb-16 text-center">
        <div className="mb-12">
          <span className="font-mono text-sm uppercase tracking-widest text-stone-500 mb-2 block">Chapter 06</span>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-black mb-8">The Campaign.</h2>
        </div>

        <div className="flex flex-col items-center justify-center gap-8">
          <div className="max-w-lg mx-auto">
            <span className="bg-black text-white px-2 py-1 font-mono text-sm uppercase tracking-widest font-bold mb-4 inline-block">
              Watch & Share
            </span>
            <p className="text-xl font-medium leading-relaxed text-stone-600">
              Vogue-style documentaries and social media skits that challenge the status quo.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden relative group border-y-[12px] border-black bg-stone-100 py-12">
        {/* Film Strip Holes Decoration */}
        <div className="absolute top-2 left-0 right-0 h-2 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,black_20px,black_40px)] opacity-20 pointer-events-none" />
        <div className="absolute bottom-2 left-0 right-0 h-2 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,black_20px,black_40px)] opacity-20 pointer-events-none" />

        <div
          className={cn(
            "flex gap-8 animate-scroll-left w-max px-8",
            isPaused && "[animation-play-state:paused]",
            "group-hover:[animation-play-state:paused]",
          )}
        >
          {loopedVideos.map((video, index) => {
            const originalIndex = index % videos.length
            return (
              <a
                key={`${video.id}-${index}`}
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[400px] border-4 border-black bg-black p-2 hover:-translate-y-2 transition-transform duration-300 group/card"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-stone-800 overflow-hidden mb-4 grayscale group-hover/card:grayscale-0 transition-all duration-500">
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                      <Play className="w-6 h-6 ml-1 text-black" />
                    </div>
                  </div>
                  {/* Placeholder for missing images */}
                  <div className="absolute inset-0 flex items-center justify-center text-stone-600 font-mono text-xs uppercase">
                    Video Thumbnail
                  </div>
                </div>

                {/* Text */}
                <div className="flex justify-between items-start text-white">
                  <h3 className="text-xl font-bold uppercase leading-tight max-w-[70%]">
                    {t.videoSeries.videos[originalIndex] ? t.videoSeries.videos[originalIndex].title : "Video Title"}
                  </h3>
                  <span className="font-mono text-xs text-wong-yellow border border-wong-yellow px-1">
                    {video.duration}
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
