"use client"

import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils"

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
    <section className="bg-[#1351aa] text-white py-24 overflow-hidden relative">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-[#1351aa]/60 to-[#1351aa]/20 pointer-events-none z-10" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Column: Title & Context */}
          <div className="lg:w-1/3 relative shrink-0 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-[#ff751f] font-bold tracking-wide text-sm uppercase mb-4">
                <span className="w-8 h-[2px] bg-[#ff751f]" />
                <span>{t.videoSeries.theCurriculum}</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                {t.videoSeries.title}
              </h2>
            </div>

            <p className="text-blue-100 text-lg leading-relaxed opacity-90">{t.videoSeries.description}</p>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all focus:ring-2 focus:ring-[#ff751f] outline-none"
              aria-label={isPaused ? "Play animation" : "Pause animation"}
            >
              {isPaused ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              )}
              <span className="text-sm font-medium">
                {isPaused ? t.videoSeries.resumeScroll : t.videoSeries.pauseScroll}
              </span>
            </button>
          </div>

          {/* Right Column: Infinite Scroll */}
          <div className="lg:w-2/3 w-full overflow-hidden relative group">
            {/* Gradient masks for smooth fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1351aa] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1351aa] to-transparent z-20 pointer-events-none" />

            <div
              className={cn(
                "flex gap-6 animate-scroll-left w-max",
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
                    className="flex-shrink-0 w-[320px] group/card relative"
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20">
                      {/* Thumbnail Container */}
                      <div className="relative aspect-video bg-slate-900 overflow-hidden">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={t.videoSeries.videos[originalIndex].title}
                          className="w-full h-full object-cover opacity-90 group-hover/card:opacity-60 group-hover/card:scale-105 transition-all duration-500"
                        />

                        {/* Play Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                          <div className="w-14 h-14 bg-[#ff751f] rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover/card:scale-100 transition-transform duration-300">
                            <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                          <svg
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {video.duration}
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-5 bg-white">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-bold text-[#1351aa] bg-[#1351aa]/10 px-2 py-1 rounded uppercase tracking-wider">
                            {t.videoSeries.videos[originalIndex].ep}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium uppercase">{video.tag}</span>
                        </div>

                        <h3 className="text-slate-900 font-bold text-lg leading-tight line-clamp-2 mb-3 group-hover/card:text-[#1351aa] transition-colors">
                          {t.videoSeries.videos[originalIndex].title}
                        </h3>

                        <div className="flex items-center text-sm font-medium text-slate-500 group-hover/card:text-[#ff751f] transition-colors">
                          {t.videoSeries.watchLesson}
                          <svg
                            className="w-4 h-4 ml-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
