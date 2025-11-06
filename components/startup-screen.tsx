"use client"

import { useEffect, useState } from "react"

const STARTUP_LINES = [
  { text: "> Inicializando núcleo de conocimiento...", delay: 100 },
  { text: "> Cargando módulos de IA...", delay: 800 },
  { text: "> Estableciendo conexión segura con el laboratorio de Mr Ku...", delay: 1200 },
  { text: "✅ Sistema operativo MRKU v1.0 listo.", delay: 1800 },
]

export default function StartupScreen() {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // Verificar si ya se mostró la pantalla de inicio
    const hasSeenStartup = sessionStorage.getItem("mrku-startup-seen")
    if (hasSeenStartup) {
      setIsComplete(true)
      return
    }

    if (currentLine >= STARTUP_LINES.length) {
      // Todas las líneas completadas, iniciar fade out
      setTimeout(() => {
        setIsFadingOut(true)
        setTimeout(() => {
          setIsComplete(true)
          sessionStorage.setItem("mrku-startup-seen", "true")
        }, 1000) // Duración del fade out
      }, 500) // Pausa antes del fade out
      return
    }

    const line = STARTUP_LINES[currentLine]
    let charIndex = 0

    // Esperar el delay inicial de la línea
    const initialDelay = setTimeout(() => {
      // Animación de escritura carácter por carácter
      const typingInterval = setInterval(() => {
        if (charIndex < line.text.length) {
          setDisplayedText((prev) => prev + line.text[charIndex])
          charIndex++
        } else {
          clearInterval(typingInterval)
          // Pasar a la siguiente línea
          setTimeout(() => {
            setDisplayedText((prev) => prev + "\n")
            setCurrentLine((prev) => prev + 1)
          }, 300)
        }
      }, 30) // Velocidad de escritura

      return () => clearInterval(typingInterval)
    }, line.delay)

    return () => clearTimeout(initialDelay)
  }, [currentLine])

  if (isComplete) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-3xl px-8">
        <div className="relative">
          {/* Efecto de escaneo */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff99]/5 to-transparent animate-pulse" />

          {/* Terminal */}
          <div className="relative rounded-lg border border-[#00ff99]/30 bg-black/90 p-8 shadow-2xl shadow-[#00ff99]/20">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#00ff99] animate-pulse" />
              <span className="font-mono text-sm text-[#00ff99]/70">MRKU Terminal v1.0</span>
            </div>

            <pre className="font-mono text-base leading-relaxed text-[#00ff99] whitespace-pre-wrap">
              {displayedText}
              <span className="inline-block w-2 h-5 bg-[#00ff99] animate-pulse ml-1" />
            </pre>
          </div>

          {/* Efecto de brillo */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff99]/0 via-[#00ff99]/20 to-[#00ff99]/0 blur-xl opacity-50" />
        </div>

        {/* Texto adicional */}
        <div className="mt-6 text-center">
          <p className="font-mono text-xs text-[#00ff99]/50">Bienvenido al ecosistema Mr Ku</p>
        </div>
      </div>
    </div>
  )
}
