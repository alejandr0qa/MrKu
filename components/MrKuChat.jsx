// app/api/assistant/route.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({ reply: "Por favor envíame un mensaje." }, { status: 400 });
    }

    // Llamamos al modelo gpt-4o-mini
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: message,
    });

    // Extraemos el texto de la respuesta
    const reply = response.output[0]?.content[0]?.text || "No tengo respuesta.";

    return Response.json({ reply });
  } catch (error) {
    console.error("Error en /api/assistant:", error);
    return Response.json({ reply: "Ocurrió un error al procesar tu solicitud." }, { status: 500 });
  }
}
