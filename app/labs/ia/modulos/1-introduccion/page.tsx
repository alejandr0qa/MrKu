"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Terminal, CheckCircle2, MessageCircle, Award } from "lucide-react"
import MrKuChat from "@/components/mr-ku-chat"
import ModuleEvaluation from "@/components/module-evaluation"
import { getModuleProgress, updateModuleProgress } from "@/lib/course-progress"

export default function Module1Page() {
  const [showChat, setShowChat] = useState(false)
  const [showEvaluation, setShowEvaluation] = useState(false)
  const [moduleCompleted, setModuleCompleted] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  const courseId = "ia"
  const moduleId = "1-introduccion"

  useEffect(() => {
    const progress = getModuleProgress(courseId, moduleId)
    if (progress?.completed) {
      setModuleCompleted(true)
      setScore(progress.score || null)
    }
  }, [])

  const questions = [
    {
      question: "¿Qué es un LLM (Large Language Model)?",
      options: [
        "Un modelo de machine learning entrenado con grandes cantidades de texto",
        "Un lenguaje de programación para IA",
        "Una base de datos especializada",
        "Un framework de desarrollo web",
      ],
      correctAnswer: 0,
    },
    {
      question: "¿Cuál es la función principal del parámetro 'temperature' en la API de OpenAI?",
      options: [
        "Controlar la velocidad de respuesta",
        "Controlar la creatividad/aleatoriedad de las respuestas",
        "Definir el idioma de salida",
        "Limitar el número de tokens",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "¿Qué técnica se usa para recibir respuestas de forma progresiva en lugar de esperar la respuesta completa?",
      options: ["Batching", "Caching", "Streaming", "Polling"],
      correctAnswer: 2,
    },
  ]

  const handleEvaluationComplete = (finalScore: number) => {
    setScore(finalScore)
    setModuleCompleted(true)
    updateModuleProgress(courseId, moduleId, true, finalScore)
    setShowEvaluation(false)
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <Link
              href="/labs/ia"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al curso</span>
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Módulo 1: Introducción a LLMs</h1>
                <p className="text-muted-foreground">Aprende los fundamentos de los modelos de lenguaje</p>
              </div>
              {moduleCompleted && (
                <div className="flex items-center gap-2 text-[#00ff99]">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="font-bold">{score}%</span>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {!showEvaluation ? (
            <>
              {/* Introducción Teórica */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Terminal className="w-6 h-6 text-[#0070f3]" />
                  Introducción Teórica
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Los <strong>Large Language Models (LLMs)</strong> son modelos de inteligencia artificial entrenados
                    con enormes cantidades de texto para comprender y generar lenguaje natural. Modelos como GPT-4,
                    Claude y Llama han revolucionado la forma en que interactuamos con las máquinas.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    En este módulo aprenderás a integrar la API de OpenAI en tus aplicaciones, manejar prompts
                    efectivos, implementar streaming de respuestas y gestionar errores y límites de uso.
                  </p>
                </div>
              </section>

              {/* Sección Práctica */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-[#00ff99]" />
                  Práctica: Tu Primera Integración
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold mb-3">Paso 1: Configuración</h3>
                    <p className="text-muted-foreground mb-3">
                      Primero, instala el SDK de OpenAI y configura tu API key:
                    </p>
                    <pre className="bg-black/50 border border-[#00ff99]/20 rounded-xl p-4 overflow-x-auto">
                      <code className="text-[#00ff99] font-mono text-sm">{`npm install openai

# Agrega tu API key en .env.local
OPENAI_API_KEY=sk-...`}</code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-bold mb-3">Paso 2: Primera Llamada</h3>
                    <p className="text-muted-foreground mb-3">Crea un archivo y realiza tu primera llamada a GPT-4:</p>
                    <pre className="bg-black/50 border border-[#00ff99]/20 rounded-xl p-4 overflow-x-auto">
                      <code className="text-[#00ff99] font-mono text-sm">{`import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "Eres un asistente experto en programación"
      },
      {
        role: "user",
        content: "Explica qué es un LLM en términos simples"
      }
    ],
    temperature: 0.7,
    max_tokens: 500
  })

  console.log(completion.choices[0].message.content)
}

main()`}</code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-bold mb-3">Paso 3: Implementar Streaming</h3>
                    <p className="text-muted-foreground mb-3">Para recibir respuestas de forma progresiva:</p>
                    <pre className="bg-black/50 border border-[#00ff99]/20 rounded-xl p-4 overflow-x-auto">
                      <code className="text-[#00ff99] font-mono text-sm">{`const stream = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "Cuenta hasta 10" }],
  stream: true,
})

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || ""
  process.stdout.write(content)
}`}</code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-bold mb-3">Paso 4: Manejo de Errores</h3>
                    <p className="text-muted-foreground mb-3">Siempre maneja errores y rate limits:</p>
                    <pre className="bg-black/50 border border-[#00ff99]/20 rounded-xl p-4 overflow-x-auto">
                      <code className="text-[#00ff99] font-mono text-sm">{`try {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: "Hola" }]
  })
  console.log(completion.choices[0].message.content)
} catch (error) {
  if (error.status === 429) {
    console.error("Rate limit excedido, espera antes de reintentar")
  } else if (error.status === 401) {
    console.error("API key inválida")
  } else {
    console.error("Error:", error.message)
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </section>

              {/* Botones de Acción */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowChat(true)}
                  className="flex-1 bg-gradient-to-r from-[#0070f3] to-[#ff007a] hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Preguntarle a Mr Ku
                </button>
                <button
                  onClick={() => setShowEvaluation(true)}
                  className="flex-1 bg-gradient-to-r from-[#00ff99] to-[#0070f3] hover:opacity-90 text-black font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  {moduleCompleted ? "Repetir Evaluación" : "Evaluar Módulo"}
                </button>
              </div>
            </>
          ) : (
            <ModuleEvaluation
              courseId={courseId}
              moduleId={moduleId}
              moduleName="Introducción a LLMs"
              questions={questions}
              onComplete={handleEvaluationComplete}
            />
          )}
        </div>
      </div>

      {showChat && (
        <MrKuChat
          initialMessage="Mr Ku, ayúdame con el módulo de Introducción a LLMs. Tengo dudas sobre cómo implementar streaming."
          autoOpen={true}
        />
      )}
    </>
  )
}
