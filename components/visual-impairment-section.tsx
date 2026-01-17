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
    <section id="chapter-1" className="bg-[#FDFCF8] text-black py-32 px-6 md:px-24">
      <div className="max-w-4xl mx-auto">

        {/* Chapter Header */}
        <div className="mb-20 border-b-2 border-black pb-8">
          <span className="font-mono text-sm uppercase tracking-widest text-stone-500 mb-2 block">Chapter 01</span>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-black">The Spectrum.</h2>
          <p className="font-sans text-xl text-stone-600 mt-6 max-w-2xl leading-relaxed">
            Visual impairment is not binary. It is a wide range of human experiences that affects how people <span className="highlight-yellow px-1">perceive, navigate, and interact</span> with your work.
          </p>
        </div>

        {/* Textbook Content: The Definition */}
        <div className="mb-24 flex gap-8 items-start">
          <div className="hidden md:block w-32 pt-2 border-t-4 border-wong-vermilion">
            <span className="font-mono text-xs font-bold uppercase">Definition</span>
          </div>
          <div className="flex-1">
            <p className="text-2xl md:text-3xl font-serif leading-relaxed mb-8">
              "Visual impairment refers to a wide range of conditions that reduce a person’s ability to see clearly, even with glasses or medical treatment."
            </p>
            <div className="bg-stone-100 p-8 border-l-4 border-black font-sans text-stone-600 leading-relaxed">
              <strong>Why it matters:</strong> It is not limited to complete blindness. Barriers include unreadable text, unclear navigation, missing labels, and interfaces that rely solely on visual cues.
            </div>
          </div>
        </div>

        {/* Textbook Content: The Types */}
        <div>
          <div className="hidden md:block w-32 pt-2 border-t-4 border-wong-blue mb-12">
            <span className="font-mono text-xs font-bold uppercase">Taxonomy</span>
          </div>

          <div className="space-y-16">
            {impairmentTypes.map((group, i) => (
              <div key={i} className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-4">
                  <h3 className="text-2xl font-bold uppercase tracking-tight flex items-center gap-3">
                    {group.category === "Blindness" && <EyeOff className="w-6 h-6" />}
                    {group.category === "Low Vision" && <Activity className="w-6 h-6" />}
                    {group.category === "Color Deficiency" && <Layers className="w-6 h-6" />}
                    {group.category === "Field Loss" && <Search className="w-6 h-6" />}
                    {group.category === "Sensitivity" && <Sun className="w-6 h-6" />}
                    {group.category}
                  </h3>
                </div>
                <div className="md:col-span-8 space-y-6">
                  {group.items.map((item, j) => (
                    <div key={j} className="group hover:bg-stone-50 p-4 -mx-4 rounded-lg transition-colors">
                      <h4 className="font-bold text-lg mb-1 group-hover:text-wong-vermilion transition-colors">{item.name}</h4>
                      <p className="text-stone-600 font-serif italic">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
