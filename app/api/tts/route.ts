import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { text, language } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    // Google TTS has a character limit (approx 200 chars). 
    // We must split long text into chunks.
    const chunks = splitTextIntoChunks(text, 180) // Safe limit
    const audioBuffers: Buffer[] = []

    // Fetch audio for each chunk
    for (const chunk of chunks) {
      const buffer = await fetchGoogleTTS(chunk, language)
      if (buffer) {
        audioBuffers.push(buffer)
      }
    }

    if (audioBuffers.length === 0) {
      throw new Error("No audio generated")
    }

    // Concatenate all audio buffers into one (MP3s can be joined directly)
    const combinedBuffer = Buffer.concat(audioBuffers)

    return new NextResponse(combinedBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": combinedBuffer.length.toString(),
      },
    })
  } catch (error: any) {
    console.error("[v0] TTS Error:", error)
    return NextResponse.json(
      { error: "Failed to generate speech", details: error.message },
      { status: 500 }
    )
  }
}

// Helper to fetch a single chunk
async function fetchGoogleTTS(text: string, language: string): Promise<Buffer | null> {
  const targetLang = language === "km" ? "km" : "en"
  // Use 'client=tw-ob' for the free public endpoint
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${targetLang}&client=tw-ob`

  try {
    const response = await fetch(url, {
      headers: {
        // Essential: Google blocks requests without a User-Agent
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Referer: "https://translate.google.com/",
      },
    })

    if (!response.ok) {
      const body = await response.text()
      console.error(`[v0] Google TTS failed for chunk "${text.slice(0, 20)}...": ${response.status}`, body)
      return null
    }

    const arrayBuffer = await response.arrayBuffer()
    return Buffer.from(arrayBuffer)
  } catch (err) {
    console.error("[v0] Fetch error:", err)
    return null
  }
}

// Helper to intelligently split text by punctuation
function splitTextIntoChunks(text: string, maxLength: number): string[] {
  const chunks: string[] = []
  
  // If short enough, return as is
  if (text.length <= maxLength) {
    return [text]
  }

  // Split by sentence endings first
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text]
  
  let currentChunk = ""

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length <= maxLength) {
      currentChunk += sentence
    } else {
      // Current chunk is full, push it
      if (currentChunk) chunks.push(currentChunk.trim())
      
      // If the sentence itself is too long, hard split it
      if (sentence.length > maxLength) {
        const words = sentence.split(" ")
        let tempChunk = ""
        for (const word of words) {
          if ((tempChunk + " " + word).length <= maxLength) {
            tempChunk += (tempChunk ? " " : "") + word
          } else {
            chunks.push(tempChunk)
            tempChunk = word
          }
        }
        currentChunk = tempChunk
      } else {
        currentChunk = sentence
      }
    }
  }
  
  if (currentChunk) chunks.push(currentChunk.trim())
  
  return chunks
}
