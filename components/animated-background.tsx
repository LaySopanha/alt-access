"use client"

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none mix-blend-soft-light opacity-80 blur-[0.25px]" aria-hidden="true">
      {/* Pattern layer */}
      <div className="absolute inset-0 opacity-100">
        <div className="flex animate-marquee w-[200%] select-none">
          {/* Duplicate block twice for seamless marquee */}
          {[0, 1].map((dup) => (
            <div key={dup} className="flex w-1/2 h-full items-center justify-around px-20">
              {/* Column set A */}
              <div className="flex flex-col gap-32">
                <div className="text-9xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1351aa] to-[#ff751f]">&lt;ALT+ ACCESS/&gt;</div>
                <div className="text-6xl font-mono font-bold text-[#1351aa]/50">&lt;ALT+ ACCESS/&gt;</div>
                <div className="text-8xl font-mono font-bold text-[#ff751f]/60">&lt;ALT+ ACCESS/&gt;</div>
              </div>
              {/* Column set B */}
              <div className="flex flex-col gap-32">
                <div className="text-7xl font-mono font-bold text-[#ff751f]/55">&lt;ALT+ ACCESS/&gt;</div>
                <div className="text-9xl font-mono font-bold text-[#1351aa]/65">&lt;ALT+ ACCESS/&gt;</div>
                <div className="text-6xl font-mono font-bold text-black/40 dark:text-white/40">&lt;ALT+ ACCESS/&gt;</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Gradient mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/40" />
    </div>
  )
}
