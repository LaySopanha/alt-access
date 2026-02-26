"use client"

import { Eye, EyeOff, AlertTriangle, Activity, Moon, Sun, Layers, Search } from "lucide-react"

export function VisualImpairmentSection() {
  const impairmentTypes = [
    {
      category: "Blindness",
      items: [
        { name: "Total Blindness", desc: "No light perception. Relies entirely on screen readers/Braille." },
        { name: "Partial Blindness", desc: "Some light perception but limited useful vision." }
      ]
    },
    {
      category: "Low Vision",
      items: [
        { name: "Blurred Vision", desc: "Lack of sharpness, details are fuzzy (e.g., cataracts)." },
        { name: "Reduced Visual Acuity", desc: "Cannot see small details even with correction." }
      ]
    },
    {
      category: "Color Deficiency",
      items: [
        { name: "Red-Green (Deuteranopia)", desc: "Difficulty distinguishing red and green shades." },
        { name: "Blue-Yellow (Tritanopia)", desc: "Difficulty distinguishing blue and yellow." },
        { name: "Monochromacy", desc: "Complete color blindness (seeing in grayscale)." }
      ]
    },
    {
      category: "Field Loss",
      items: [
        { name: "Tunnel Vision", desc: "Loss of peripheral vision (e.g., Glaucoma)." },
        { name: "Central Vision Loss", desc: "Loss of center focus (e.g., Macular Degeneration)." },
        { name: "Visual Field Loss", desc: "Blind spots or patchy vision." }
      ]
    },
    {
      category: "Sensitivity",
      items: [
        { name: "Photophobia", desc: "Extreme sensitivity to light and glare." },
        { name: "Nyctalopia", desc: "Night blindness or poor vision in low light." },
        { name: "Contrast Sensitivity", desc: "Difficulty distinguishing objects from background." }
      ]
    }
  ]

  return (
    <section id="chapter-1" className="bg-[#FDFCF8] text-black pt-24 pb-16">

      {/* Chapter Header */}
      <div className="px-8 md:px-24 mb-16">
        <div className="max-w-7xl mx-auto border-b-2 border-stone-200 pb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-4 block">Chapter 01</span>
          <h2 className="text-5xl md:text-7xl font-bold text-black leading-[0.9] tracking-tight uppercase mb-6">
            The<br />Spectrum
          </h2>
          <p className="text-xl md:text-2xl max-w-3xl leading-relaxed text-stone-600">
            Visual impairment is not binary. It is a wide range of human experiences that affects how people <span className="bg-wong-yellow/40 px-1">perceive & interact</span> with your work.
          </p>
        </div>
      </div>

      <div className="px-8 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left Column: The Definition (Sticky) */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-0.5 w-10 bg-wong-vermilion"></div>
                <span className="font-mono text-xs uppercase tracking-widest text-stone-500">Definition</span>
              </div>

              <p className="text-xl md:text-2xl leading-snug mb-8 text-stone-800">
                "Visual impairment refers to a wide range of conditions that reduce a person's ability to see clearly, even with glasses or medical treatment."
              </p>

              <div className="bg-white p-6 border border-stone-200 text-base text-stone-600 leading-relaxed">
                <strong className="text-black">Why it matters:</strong> Barriers are not just for the completely blind. They include unreadable text, unclear navigation, and interfaces that rely solely on visual cues.
              </div>
            </div>
          </div>

          {/* Right Column: Taxonomy Grid */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-0.5 w-10 bg-wong-blue"></div>
              <span className="font-mono text-xs uppercase tracking-widest text-stone-500">Taxonomy</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {impairmentTypes.map((group, i) => (
                <div key={i} className="bg-white p-6 border border-stone-200 hover:border-stone-400 transition-all duration-300">
                  <h3 className="text-lg font-bold uppercase tracking-tight flex items-center gap-3 mb-5">
                    {group.category === "Blindness" && <EyeOff className="w-5 h-5 text-wong-vermilion" />}
                    {group.category === "Low Vision" && <Activity className="w-5 h-5 text-wong-yellow" />}
                    {group.category === "Color Deficiency" && <Layers className="w-5 h-5 text-wong-blue" />}
                    {group.category === "Field Loss" && <Search className="w-5 h-5 text-stone-600" />}
                    {group.category === "Sensitivity" && <Sun className="w-5 h-5 text-stone-600" />}
                    {group.category}
                  </h3>

                  <div className="space-y-4">
                    {group.items.map((item, j) => (
                      <div key={j} className="group cursor-default">
                        <h4 className="font-semibold text-base mb-1 flex items-center gap-2 group-hover:text-wong-vermilion transition-colors">
                          <span className="w-1.5 h-1.5 bg-stone-400 rounded-full group-hover:bg-wong-vermilion transition-colors"></span>
                          {item.name}
                        </h4>
                        <p className="text-stone-500 text-sm leading-relaxed pl-4 border-l border-stone-200 group-hover:border-wong-vermilion transition-colors">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
