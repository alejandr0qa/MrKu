"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Network, CheckCircle2, Lock, Award, ArrowRight } from "lucide-react"
import { getCourseProgress, getCourseCompletionPercentage, isCourseCompleted } from "@/lib/course-progress"

export default function NMAPCursePage() {
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)

  const courseId = "nmap"
  const totalModules = 3

  const modules = [
    {
      id: "1-fundamentos",
      title: "Módulo 1: Fundamentos de NMAP",
      description: "Aprende los conceptos básicos de escaneo de redes y la sintaxis de NMAP",
      duration: "2 horas",
      topics: ["Instalación", "Sintaxis básica", "Tipos de escaneo", "Flags TCP"],
    },
    {
      id: "2-tecnicas-avanzadas",
      title: "Módulo 2: Técnicas Avanzadas",
      description: "Domina técnicas de evasión, detección de servicios y scripting con NSE",
      duration: "2 horas",
      topics: ["NSE Scripts", "Evasión de IDS", "OS Detection", "Version Detection"],
    },
    {
      id: "3-analisis-vulnerabilidades",
      title: "Módulo 3: Análisis de Vulnerabilidades",
      description: "Identifica y analiza vulnerabilidades usando NMAP en entornos reales",
      duration: "1 hora",
      topics: ["Vuln Scripts", "Reporting", "Análisis de resultados", "Mejores prácticas"],
    },
  ]

  useEffect(() => {
    const currentProgress = getCourseCompletionPercentage(courseId, totalModules)
    const isCompleted = isCourseCompleted(courseId, totalModules)
    setProgress(currentProgress)
    setCompleted(isCompleted)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link
            href="/labs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Cursos</span>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0070f3] to-[#ff007a] p-0.5">
                <div className="w-full h-full bg-background rounded-xl flex items-center justify-center">
                  <Network className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Curso de NMAP</h1>
                <p className="text-muted-foreground">Domina el escaneo de redes y análisis de vulnerabilidades</p>
              </div>
            </div>
            {completed && (
              <Link
                href={`/labs/${courseId}/certificado`}
                className="flex items-center gap-2 bg-gradient-to-r from-[#0070f3] to-[#ff007a] text-white font-bold py-2 px-4 rounded-xl hover:opacity-90 transition-all"
              >
                <Award className="w-5 h-5" />
                Ver Certificado
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progreso del curso</span>
            <span className="text-sm text-muted-foreground">{progress}% completado</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#0070f3] to-[#ff007a] h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {modules.map((module, index) => {
            const moduleProgress = getCourseProgress(courseId)
            const isModuleCompleted = moduleProgress?.modules.find((m) => m.moduleId === module.id)?.completed || false
            const isPreviousCompleted =
              index === 0 ||
              moduleProgress?.modules.find((m) => m.moduleId === modules[index - 1].id)?.completed ||
              false
            const isLocked = !isPreviousCompleted && index > 0

            return (
              <div
                key={module.id}
                className={`bg-card border rounded-2xl p-8 transition-all ${
                  isLocked
                    ? "border-border opacity-60"
                    : isModuleCompleted
                      ? "border-[#00ff99]"
                      : "border-border hover:border-[#0070f3]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-2xl font-bold">{module.title}</h2>
                      {isModuleCompleted && <CheckCircle2 className="w-6 h-6 text-[#00ff99]" />}
                      {isLocked && <Lock className="w-5 h-5 text-muted-foreground" />}
                    </div>
                    <p className="text-muted-foreground mb-4">{module.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>⏱️ {module.duration}</span>
                      <span>•</span>
                      <span>📚 {module.topics.length} temas</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {module.topics.map((topic) => (
                        <span key={topic} className="text-xs font-mono px-3 py-1 bg-secondary rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    {isLocked ? (
                      <button
                        disabled
                        className="bg-secondary text-muted-foreground font-bold py-3 px-6 rounded-xl cursor-not-allowed"
                      >
                        Bloqueado
                      </button>
                    ) : (
                      <Link
                        href={`/labs/${courseId}/modulos/${module.id}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0070f3] to-[#ff007a] hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-all"
                      >
                        {isModuleCompleted ? "Revisar" : "Comenzar"}
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Certificate CTA */}
        {completed && (
          <div className="mt-12 bg-gradient-to-r from-[#0070f3]/10 to-[#ff007a]/10 border border-[#0070f3]/20 rounded-2xl p-8 text-center">
            <Award className="w-16 h-16 mx-auto mb-4 text-[#00ff99]" />
            <h3 className="text-2xl font-bold mb-2">¡Felicitaciones!</h3>
            <p className="text-muted-foreground mb-6">
              Has completado todos los módulos. Obtén tu certificado oficial.
            </p>
            <Link
              href={`/labs/${courseId}/certificado`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0070f3] to-[#ff007a] text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-all"
            >
              <Award className="w-5 h-5" />
              Obtener Certificado
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
