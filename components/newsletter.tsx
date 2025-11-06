"use client"

import type React from "react"

import { useState } from "react"
import { Mail, ArrowRight } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    // Simulación de envío
    setTimeout(() => {
      setStatus("success")
      setEmail("")
      setTimeout(() => setStatus("idle"), 3000)
    }, 1000)
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-[#0070f3]/10 via-transparent to-[#ff007a]/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-primary/10 border border-primary/20">
          <Mail className="w-8 h-8 text-primary" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Mantente <span className="text-[#0070f3]">Actualizado</span>
        </h2>

        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Recibe contenido técnico de calidad directamente en tu inbox. Sin spam, sin marketing vacío. Solo conocimiento
          que importa.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            disabled={status === "loading" || status === "success"}
            className="flex-1 px-6 py-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary transition-colors font-mono"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="px-8 py-4 bg-[#0070f3] hover:bg-[#0070f3]/90 text-white rounded-lg font-medium transition-all glow-effect hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === "loading" && "Enviando..."}
            {status === "success" && "¡Suscrito!"}
            {status === "idle" && (
              <>
                Suscribirse
                <ArrowRight className="w-4 h-4" />
              </>
            )}
            {status === "error" && "Reintentar"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-sm text-[#0070f3]">¡Gracias! Revisa tu email para confirmar la suscripción.</p>
        )}
      </div>
    </section>
  )
}
