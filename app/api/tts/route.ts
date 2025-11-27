export async function POST(request: Request) {
  try {
    const { text, language } = await request.json()

    if (!text) {
      return new Response("Text is required", { status: 400 })
    }

    const apiKey = "dd9814e2-8e0f-43de-b9f7-214b2709b33c"
    const voiceId = language === "km" ? "km-KH-PisethNeural" : "en-US-GuyNeural"

    const formData = new FormData()
    formData.append("voice_id", voiceId)
    formData.append("transcribe_text[]", text)
    formData.append("engine", "neural")

    console.log("[v0] Calling AiVOOV API with voice:", voiceId)

    const response = await fetch("https://aivoov.com/api/v1/transcribe", {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[v0] AiVOOV API returned ${response.status}:`, errorText)
      return new Response(JSON.stringify({ error: "TTS service unavailable", useClientSynthesis: true }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      })
    }

    const result = await response.json()
    console.log("[v0] AiVOOV API response:", result)

    if (result.audio_url) {
      // Success - fetch the audio
      const audioResponse = await fetch(result.audio_url)

      if (!audioResponse.ok) {
        console.error("[v0] Failed to fetch audio from URL")
        return new Response(JSON.stringify({ error: "Failed to fetch audio", useClientSynthesis: true }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        })
      }

      const audioBuffer = await audioResponse.arrayBuffer()

      return new Response(audioBuffer, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=3600",
        },
      })
    } else if (result.message && result.message.includes("successfully")) {
      // API says success but no audio_url - might be in a different field
      console.log("[v0] Success message but no audio_url, full response:", result)
      // Check for alternative audio URL fields
      const audioUrl = result.url || result.file_url || result.audio
      if (audioUrl) {
        const audioResponse = await fetch(audioUrl)
        const audioBuffer = await audioResponse.arrayBuffer()
        return new Response(audioBuffer, {
          headers: {
            "Content-Type": "audio/mpeg",
            "Cache-Control": "public, max-age=3600",
          },
        })
      }
      return new Response(JSON.stringify({ error: "Audio URL not found in response", useClientSynthesis: true }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    } else {
      // Error case
      console.error("[v0] AiVOOV API error:", result.message || result.error)
      return new Response(JSON.stringify({ error: result.message || result.error, useClientSynthesis: true }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }
  } catch (error) {
    console.error("[v0] TTS Error:", error)
    return new Response(JSON.stringify({ error: "TTS Error", useClientSynthesis: true }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
