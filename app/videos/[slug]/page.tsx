import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { videos } from "@/lib/videoData";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowLeft, Play, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = videos.find((v) => v.slug === slug);
  if (!video) return {};
  return {
    title: video.seoTitle,
    description: video.seoDescription,
  };
}

export function generateStaticParams() {
  return videos.map((v) => ({ slug: v.slug }));
}

export default async function VideoDetailPage({ params }: Props) {
  const { slug } = await params;
  const video = videos.find((v) => v.slug === slug);
  if (!video) return notFound();

  const currentIndex = videos.findIndex((v) => v.slug === slug);
  const otherVideos = videos.filter((v) => v.slug !== slug);

  return (
    <>
      <Navbar showLogo />
      <main className="bg-[#FDFCF8] min-h-screen pt-14">

        {/* Video Player - Full Width */}
        <div className="bg-black">
          <div className="max-w-6xl mx-auto">
            <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
              <iframe
                src={`https://player.vimeo.com/video/${video.vimeoId}?title=0&byline=0&portrait=0&badge=0&autopause=0`}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                title={video.title}
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-8 md:px-24 py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left: Video Details (2/3 width) */}
            <div className="lg:col-span-2">

              {/* Back link */}
              <Link
                href="/videos"
                className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-black transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Video Library
              </Link>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                {video.title}
              </h1>
              {video.titleKh && (
                <p className="text-lg text-stone-400 mb-6">{video.titleKh}</p>
              )}

              {/* Description divider */}
              <div className="border-t border-stone-200 pt-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/images/alt-access-black-logo.png"
                    alt="AltAccess"
                    width={100}
                    height={30}
                    className="h-5 w-auto"
                  />
                  <span className="text-xs text-stone-400 font-mono uppercase">Alt Access Campaign</span>
                </div>
                <p className="text-base text-stone-600 leading-relaxed">
                  {video.content.intro}
                </p>
              </div>

              {/* Content Sections */}
              {video.content.sections.map((section, i) => (
                <div key={i} className="mb-10">
                  <h2 className="text-xl font-bold mb-1 tracking-tight">{section.heading}</h2>
                  {section.headingKh && (
                    <p className="text-sm text-stone-400 mb-4">{section.headingKh}</p>
                  )}
                  <p className="text-base text-stone-600 leading-relaxed mb-4">
                    {section.body}
                  </p>
                  {section.bullets && (
                    <ul className="space-y-3">
                      {section.bullets.map((bullet, j) => {
                        const [label, ...rest] = bullet.split(": ");
                        const desc = rest.join(": ");
                        return (
                          <li key={j} className="flex gap-3 text-base">
                            <div className="w-1.5 h-1.5 bg-wong-vermilion rounded-full mt-2.5 shrink-0" />
                            <span className="text-stone-600 leading-relaxed">
                              <strong className="text-black">{label}:</strong> {desc}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ))}

              {/* CTA */}
              <div className="bg-stone-900 text-white p-6 mt-8">
                <p className="text-sm leading-relaxed">
                  Let&apos;s build a digital world for everyone. Learn more at{" "}
                  <Link href="/" className="text-wong-yellow font-bold hover:underline">altaccess.site</Link>
                </p>
              </div>
            </div>

            {/* Right: Sidebar - Other Videos (1/3 width) */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-0.5 w-8 bg-black"></div>
                  <span className="font-mono text-xs uppercase tracking-widest text-stone-500">Up Next</span>
                </div>

                <div className="flex flex-col gap-4">
                  {otherVideos.map((v) => (
                    <Link
                      key={v.slug}
                      href={`/videos/${v.slug}`}
                      className="flex gap-3 group"
                    >
                      <div className="w-40 shrink-0 aspect-video bg-stone-200 relative overflow-hidden">
                        <Image
                          src={v.thumbnail}
                          alt={v.title}
                          fill
                          sizes="160px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <Play className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold leading-snug group-hover:text-wong-vermilion transition-colors line-clamp-2">
                          {v.title}
                        </h3>
                        <p className="text-xs text-stone-400 mt-1 line-clamp-2">{v.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Navigation */}
                {currentIndex < videos.length - 1 && (
                  <Link
                    href={`/videos/${videos[currentIndex + 1].slug}`}
                    className="mt-8 flex items-center justify-between bg-white border border-stone-200 p-4 hover:border-stone-400 transition-all group"
                  >
                    <div>
                      <span className="text-xs text-stone-400 font-mono uppercase">Next Video</span>
                      <p className="text-sm font-bold group-hover:text-wong-vermilion transition-colors">
                        {videos[currentIndex + 1].title}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-black transition-colors" />
                  </Link>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
