import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.Mr_ku_key,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || message.trim() === "") {
      return new Response(
        JSON.stringify({ error: "El mensaje no puede estar vacío." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ⚙️ Llamada correcta al endpoint de Responses
    const completion = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    // 🧠 Obtenemos el texto de respuesta
    const reply =
      completion.output?.[0]?.content?.[0]?.text ||
      "No he podido generar una respuesta.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error en /api/assistant:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
