"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Brain, Terminal, CheckCircle2, MessageCircle } from "lucide-react"
import MrKuChat from "@/components/mr-ku-chat"

export default function IALabPage() {
  const [showChat, setShowChat] = useState(false)
  const [chatMessage, setChatMessage] = useState("")

  const handleAskMrKu = (message: string) => {
    setChatMessage(message)
    setShowChat(true)
  }

  const labs = [
    {
      title: "Introducción a LLMs con OpenAI API",
      difficulty: "Principiante",
      duration: "45 min",
      description: "Aprende a integrar modelos de lenguaje en tus aplicaciones usando la API de OpenAI.",
      steps: [
        "Configura tu API key de OpenAI",
        "Realiza tu primera llamada a GPT-4",
        "Implementa streaming de respuestas",
        "Maneja errores y rate limits",
      ],
      code: `import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "user", content: "Explica qué es un LLM" }
  ]
})

console.log(completion.choices[0].message.content)`,
      askMessage: "Mr Ku, ayúdame a realizar el laboratorio de OpenAI API paso a paso.",
    },
    {
      title: "Fine-tuning de Modelos con Hugging Face",
      difficulty: "Intermedio",
      duration: "90 min",
      description: "Aprende a ajustar modelos pre-entrenados para tareas específicas usando Hugging Face.",
      steps: [
        "Prepara tu dataset en formato adecuado",
        "Carga un modelo base desde Hugging Face",
        "Configura los parámetros de entrenamiento",
        "Ejecuta el fine-tuning y evalúa resultados",
      ],
      code: `from transformers import AutoModelForSequenceClassification, Trainer, TrainingArguments

model = AutoModelForSequenceClassification.from_pretrained(
    "bert-base-uncased",
    num_labels=2
)

training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    warmup_steps=500,
    weight_decay=0.01,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
)

trainer.train()`,
      askMessage: "Mr Ku, necesito ayuda con el fine-tuning de modelos en Hugging Face.",
    },
    {
      title: "RAG: Retrieval Augmented Generation",
      difficulty: "Avanzado",
      duration: "120 min",
      description: "Construye un sistema RAG completo con embeddings, vector database y generación contextual.",
      steps: [
        "Configura una base de datos vectorial (Pinecone/Weaviate)",
        "Genera embeddings de tus documentos",
        "Implementa búsqueda semántica",
        "Integra con LLM para generación aumentada",
      ],
      code: `import { OpenAIEmbeddings } from "@langchain/openai"
import { PineconeStore } from "@langchain/pinecone"
import { Pinecone } from "@pinecone-database/pinecone"

const pinecone = new Pinecone()
const index = pinecone.Index("docs")

const vectorStore = await PineconeStore.fromExistingIndex(
  new OpenAIEmbeddings(),
  { pineconeIndex: index }
)

const results = await vectorStore.similaritySearch(
  "¿Qué es RAG?",
  4
)

console.log(results)`,
      askMessage: "Mr Ku, explícame cómo implementar un sistema RAG desde cero.",
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <Link
              href="/labs"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Labs</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0070f3] to-[#00ff99] p-0.5">
                <div className="w-full h-full bg-background rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Laboratorios de IA</h1>
                <p className="text-muted-foreground">Experimenta con modelos de lenguaje y machine learning</p>
              </div>
            </div>
          </div>
        </header>

        {/* Labs List */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="space-y-8">
            {labs.map((lab, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:border-[#0070f3] transition-all"
              >
                {/* Lab Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold">{lab.title}</h2>
                      <span
                        className={`text-xs font-mono px-3 py-1 rounded-full ${
                          lab.difficulty === "Principiante"
                            ? "bg-[#00ff99]/20 text-[#00ff99]"
                            : lab.difficulty === "Intermedio"
                              ? "bg-[#0070f3]/20 text-[#0070f3]"
                              : "bg-[#ff007a]/20 text-[#ff007a]"
                        }`}
                      >
                        {lab.difficulty}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2">{lab.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Terminal className="w-4 h-4" />
                      <span>{lab.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="mb-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff99]" />
                    Pasos del laboratorio
                  </h3>
                  <ol className="space-y-2 ml-7">
                    {lab.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-muted-foreground">
                        <span className="text-[#0070f3] font-mono mr-2">{stepIndex + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Code Block */}
                <div className="mb-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-[#00ff99]" />
                    Código de ejemplo
                  </h3>
                  <pre className="bg-black/50 border border-[#00ff99]/20 rounded-xl p-4 overflow-x-auto">
                    <code className="text-[#00ff99] font-mono text-sm">{lab.code}</code>
                  </pre>
                </div>

                {/* Ask Mr Ku Button */}
                <button
                  onClick={() => handleAskMrKu(lab.askMessage)}
                  className="w-full bg-gradient-to-r from-[#0070f3] to-[#ff007a] hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Explícamelo Mr Ku
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conditional Chat */}
      {showChat && <MrKuChat initialMessage={chatMessage} autoOpen={true} />}
    </>
  )
}
