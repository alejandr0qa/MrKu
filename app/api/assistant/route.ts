import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Mensaje requerido" }, { status: 400 })
    }

    // Aquí conectarás con tu API de OpenAI usando la clave de entorno
    const apiKey = process.env.Mr_ku_key

    if (!apiKey) {
      return NextResponse.json({ error: "API key no configurada" }, { status: 500 })
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "Eres Mr Ku, un asistente experto en tecnología, ciberseguridad e inteligencia artificial. Respondes de forma clara, técnica pero accesible, y siempre con un toque profesional.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      throw new Error("Error en la API de OpenAI")
    }

    const data = await response.json()
    const assistantMessage = data.choices[0]?.message?.content || "No pude generar una respuesta."

    return NextResponse.json({ message: assistantMessage })
  } catch (error) {
    console.error("Error en /api/assistant:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
