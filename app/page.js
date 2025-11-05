"use client";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = { role: "assistant", text: data.reply || "Sin respuesta." };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMsg = { role: "assistant", text: "⚠️ Error al conectar con el servidor." };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-2">Mr Ku 🧠</h1>
      <p className="text-gray-600 mb-6">
        Tecnología, ciberseguridad e inteligencia artificial — sin humo, sin complicaciones.
      </p>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-4">
        <div className="h-96 overflow-y-auto border-b mb-4 p-3 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-xl max-w-[80%] ${
                msg.role === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-200 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="mr-auto bg-gray-200 text-gray-600 rounded-xl px-3 py-2 animate-pulse">
              Escribiendo...
            </div>
          )}
        </div>

        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe algo..."
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Enviar
          </button>
        </form>
      </div>
    </main>
  );
}
