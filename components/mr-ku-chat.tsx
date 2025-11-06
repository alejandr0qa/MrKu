"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Send, Bot, User, X, MessageCircle } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface MrKuChatProps {
  initialMessage?: string
  autoOpen?: boolean
}

export default function MrKuChat({ initialMessage, autoOpen = false }: MrKuChatProps = {}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(autoOpen)

  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      setInput(initialMessage)
      // Auto-enviar el mensaje inicial después de un pequeño delay
      setTimeout(() => {
        handleSubmitWithMessage(initialMessage)
      }, 500)
    }
  }, [initialMessage])

  const handleSubmitWithMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return

    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: messageText }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      })

      if (!response.ok) throw new Error("Error en la respuesta")

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleSubmitWithMessage(input.trim())
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat expandido */}
        {isOpen && (
          <div className="mb-4 w-[380px] h-[600px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            {/* Header del chat */}
            <div className="bg-gradient-to-r from-[#0070f3] to-[#ff007a] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Mr Ku Assistant</h3>
                  <p className="text-xs text-white/80">Siempre disponible</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mensajes del chat */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center px-4">
                  <div>
                    <Bot className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      ¡Hola! Soy Mr Ku. Pregúntame sobre tecnología, ciberseguridad o IA.
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}

                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-secondary text-secondary-foreground rounded-bl-sm"
                      }`}
                    >
                      <p className="leading-relaxed">{message.content}</p>
                    </div>

                    {message.role === "user" && (
                      <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-accent" />
                      </div>
                    )}
                  </div>
                ))
              )}

              {isLoading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input del chat */}
            <form onSubmit={handleSubmit} className="border-t border-border p-3 bg-card">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 bg-secondary border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground rounded-xl font-medium transition-all flex items-center justify-center"
                  aria-label="Enviar mensaje"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Botón de burbuja */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-[#0070f3] to-[#ff007a] text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group"
          aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        >
          {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7 group-hover:animate-bounce" />}
        </button>
      </div>
    </>
  )
}
