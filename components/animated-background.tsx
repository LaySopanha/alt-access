"use client"

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated pattern container */}
      <div className="absolute inset-0 opacity-15">
        <div className="animate-scroll-left flex h-full">
          {/* Repeating pattern - duplicated for seamless loop */}
          {[0, 1, 2].map((set) => (
            <div key={set} className="flex-shrink-0 flex items-center justify-around w-screen h-full px-20">
              <div className="flex flex-col gap-32">
                <div className="text-9xl font-mono font-bold text-foreground/70">&lt;ALT+ ACCESS/&gt;</div>
                <div className="text-6xl font-mono font-bold text-foreground/50">&lt;ALT+ ACCESS/&gt;</div>
                <div className="text-8xl font-mono font-bold text-foreground/60">&lt;ALT+ ACCESS/&gt;</div>
              </div>

              {/* Accessibility Icons Pattern */}
              <div className="flex flex-col gap-24">
                <div className="text-7xl opacity-50">👁️</div>
                <div className="text-6xl opacity-40">♿</div>
                <div className="text-8xl opacity-45">🎨</div>
              </div>

              <div className="flex flex-col gap-32">
                <div className="text-7xl font-mono font-bold text-foreground/55">&lt;ALT+ ACCESS/&gt;</div>
                <div className="text-9xl font-mono font-bold text-foreground/65">&lt;ALT+ ACCESS/&gt;</div>
                <div className="text-6xl font-mono font-bold text-foreground/45">&lt;ALT+ ACCESS/&gt;</div>
              </div>

              {/* More accessibility symbols */}
              <div className="flex flex-col gap-28">
                <div className="text-8xl opacity-40">🔊</div>
                <div className="text-7xl opacity-50">👁️</div>
                <div className="text-6xl opacity-45">♿</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40" />
    </div>
  )
}
