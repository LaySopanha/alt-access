"use client"

import { Play } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function VideoSeriesSection() {
  const { t } = useLanguage()

  const videos = [
    {
      id: 1,
      youtubeId: "tTg8QT4NjvA",
      thumbnail: "/video-thumbnail-1.png",
    },
    {
      id: 2,
      youtubeId: "tTg8QT4NjvA",
      thumbnail: "/video-thumbnail-2.png",
    },
    {
      id: 3,
      youtubeId: "tTg8QT4NjvA",
      thumbnail: "/video-thumbnail-1.png",
    },
    {
      id: 4,
      youtubeId: "tTg8QT4NjvA",
      thumbnail: "/video-thumbnail-2.png",
    },
  ]

  return (
    <section className="bg-lima-blue text-white py-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Column: Title and Arrow */}
          <div className="lg:w-1/3 relative shrink-0">
            <h2 className="text-5xl md:text-6xl font-serif leading-tight text-white relative z-10 whitespace-pre-line">
              {t.videoSeries.title}
            </h2>
            {/* Decorative Arrow SVG */}
            <div className="absolute top-full left-0 mt-4 w-full max-w-[200px] text-white hidden md:block">
              <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <path
                  d="M20 20 C 20 80, 150 80, 150 20 C 150 -40, 20 120, 180 100"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path d="M170 90 L 185 102 L 170 110" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Right Column: Horizontal Scroll */}
          <div className="lg:w-2/3 w-full">
            <div className="flex gap-6 overflow-x-auto pb-10 snap-x snap-mandatory hide-scrollbar -mr-6 pr-6">
              {videos.map((video, index) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-[300px] md:w-[400px] snap-center group bg-black/20 backdrop-blur-sm border-2 border-white/20 hover:-translate-y-2 transition-transform duration-300"
                >
                  {/* Card Header */}
                  <div className="bg-white/10 border-b-2 border-white/20 p-3">
                    <p className="text-xs font-medium text-white/80 uppercase tracking-wider">
                      {t.videoSeries.videos[index].ep} {t.videoSeries.videos[index].title}
                    </p>
                  </div>

                  {/* Card Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-zinc-900">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={t.videoSeries.videos[index].title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-[#FF0000] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
