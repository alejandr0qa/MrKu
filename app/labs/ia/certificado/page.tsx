"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Award, CheckCircle2 } from "lucide-react"
import { getCourseProgress, generateCertificateCode, saveCourseProgress } from "@/lib/course-progress"

export default function CertificatePage() {
  const [userName, setUserName] = useState("")
  const [certificateCode, setCertificateCode] = useState("")
  const [showCertificate, setShowCertificate] = useState(false)
  const [savedName, setSavedName] = useState("")
  const certificateRef = useRef<HTMLDivElement>(null)

  const courseId = "ia"
  const courseName = "Inteligencia Artificial"

  useEffect(() => {
    const progress = getCourseProgress(courseId)
    if (progress?.userName) {
      setSavedName(progress.userName)
      setUserName(progress.userName)
      setCertificateCode(generateCertificateCode(courseId, progress.userName))
      setShowCertificate(true)
    }
  }, [])

  const handleGenerateCertificate = () => {
    if (!userName.trim()) return

    const code = generateCertificateCode(courseId, userName)
    setCertificateCode(code)
    setShowCertificate(true)
    setSavedName(userName)

    // Guardar nombre en el progreso
    const progress = getCourseProgress(courseId)
    if (progress) {
      progress.userName = userName
      saveCourseProgress(progress)
    }
  }

  const handleDownload = () => {
    if (!certificateRef.current) return

    // En una implementación real, usarías html2canvas o jsPDF
    // Por ahora, solo mostramos un mensaje
    alert("En una implementación completa, aquí se descargaría el certificado como PDF usando react-pdf o html2canvas")
  }

  const completionDate = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link
            href="/labs/ia"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al curso</span>
          </Link>
          <div className="flex items-center gap-4">
            <Award className="w-12 h-12 text-[#00ff99]" />
            <div>
              <h1 className="text-3xl font-bold">Certificado de Finalización</h1>
              <p className="text-muted-foreground">Curso de {courseName}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {!showCertificate ? (
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Genera tu Certificado</h2>
            <p className="text-muted-foreground mb-6">
              Has completado todos los módulos del curso. Ingresa tu nombre completo para generar tu certificado oficial
              de Mr Ku Academy.
            </p>
            <div className="space-y-4">
              <div>
                <label htmlFor="userName" className="block text-sm font-medium mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Juan Pérez García"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-[#0070f3] transition-colors"
                />
              </div>
              <button
                onClick={handleGenerateCertificate}
                disabled={!userName.trim()}
                className="w-full bg-gradient-to-r from-[#0070f3] to-[#00ff99] hover:opacity-90 disabled:opacity-50 text-black font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Award className="w-5 h-5" />
                Generar Certificado
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Certificate Preview */}
            <div
              ref={certificateRef}
              className="bg-gradient-to-br from-card to-card/50 border-2 border-[#0070f3] rounded-2xl p-12 mb-8 relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0070f3]/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00ff99]/5 rounded-full blur-3xl" />

              <div className="relative z-10 text-center">
                <Award className="w-20 h-20 mx-auto mb-6 text-[#00ff99]" />
                <h2 className="text-4xl font-bold mb-4">Certificado de Finalización</h2>
                <p className="text-muted-foreground mb-8">Este certificado se otorga a</p>
                <h3 className="text-3xl font-bold mb-8 text-[#0070f3]">{savedName}</h3>
                <p className="text-muted-foreground mb-4">Por completar exitosamente el curso de</p>
                <h4 className="text-2xl font-bold mb-8">{courseName}</h4>
                <div className="flex items-center justify-center gap-8 mb-8 text-sm text-muted-foreground">
                  <div>
                    <p className="font-bold text-foreground mb-1">Fecha de finalización</p>
                    <p>{completionDate}</p>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div>
                    <p className="font-bold text-foreground mb-1">Código de verificación</p>
                    <p className="font-mono text-[#00ff99]">{certificateCode}</p>
                  </div>
                </div>
                <div className="pt-8 border-t border-border">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff99]" />
                    <p className="font-bold">Mr Ku Academy</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Firma Digital Verificable</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleDownload}
                className="flex-1 bg-gradient-to-r from-[#0070f3] to-[#00ff99] hover:opacity-90 text-black font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Descargar PDF
              </button>
              <button
                onClick={() => {
                  setShowCertificate(false)
                  setUserName("")
                }}
                className="flex-1 bg-card border border-border hover:border-[#0070f3] text-foreground font-bold py-3 px-6 rounded-xl transition-all"
              >
                Generar Nuevo
              </button>
            </div>

            {/* Info */}
            <div className="mt-8 bg-[#0070f3]/10 border border-[#0070f3]/20 rounded-xl p-6">
              <h3 className="font-bold mb-2">Verificación del Certificado</h3>
              <p className="text-sm text-muted-foreground">
                Este certificado incluye un código de verificación único. En una implementación completa, este código
                podría ser verificado en una base de datos pública para confirmar su autenticidad.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
