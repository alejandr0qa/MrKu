import Link from "next/link"
import { Brain, Shield, Cloud, ArrowRight, Terminal, Award, CheckCircle2, Network, MonitorDot } from "lucide-react"

export default function LabsPage() {
  const courses = [
    {
      id: "ia",
      title: "Curso de Inteligencia Artificial",
      description: "Domina LLMs, fine-tuning y sistemas RAG con certificación oficial",
      icon: Brain,
      color: "from-[#0070f3] to-[#00ff99]",
      modules: 3,
      duration: "6 horas",
      level: "Principiante a Avanzado",
    },
    {
      id: "ciberseguridad",
      title: "Curso de Ciberseguridad Ética",
      description: "Aprende pentesting, análisis de vulnerabilidades y hardening con certificación",
      icon: Shield,
      color: "from-[#ff007a] to-[#0070f3]",
      modules: 4,
      duration: "8 horas",
      level: "Principiante a Avanzado",
    },
    {
      id: "cloud",
      title: "Curso de Cloud & DevOps",
      description: "Domina Docker, Kubernetes, CI/CD e IaC con certificación profesional",
      icon: Cloud,
      color: "from-[#00ff99] to-[#0070f3]",
      modules: 4,
      duration: "8 horas",
      level: "Intermedio a Avanzado",
    },
    {
      id: "nmap",
      title: "Curso de NMAP",
      description: "Domina el escaneo de redes, detección de servicios y análisis de vulnerabilidades",
      icon: Network,
      color: "from-[#0070f3] to-[#ff007a]",
      modules: 3,
      duration: "5 horas",
      level: "Principiante a Intermedio",
    },
    {
      id: "linux",
      title: "Curso de Linux",
      description: "Aprende administración de sistemas, scripting y seguridad en Linux",
      icon: MonitorDot,
      color: "from-[#00ff99] to-[#ff007a]",
      modules: 4,
      duration: "10 horas",
      level: "Principiante a Avanzado",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0070f3]/10 to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-8 h-8 text-[#00ff99]" />
            <span className="text-[#00ff99] font-mono text-sm">~/cursos</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Cursos con{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070f3] to-[#00ff99]">
              Certificación
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
            Aprende haciendo. Completa módulos prácticos, supera evaluaciones y obtén tu certificado oficial de Mr Ku
            Academy.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              const Icon = course.icon
              return (
                <Link
                  key={course.id}
                  href={`/labs/${course.id}`}
                  className="group relative bg-card border border-border rounded-2xl p-8 hover:border-[#0070f3] transition-all duration-300 hover:shadow-lg hover:shadow-[#0070f3]/20"
                >
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${course.color} p-0.5 mb-6`}>
                    <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-foreground" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-[#0070f3] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{course.description}</p>

                  {/* Course Info */}
                  <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="font-mono">📚</span>
                      <span>{course.modules} módulos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">⏱️</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">📊</span>
                      <span>{course.level}</span>
                    </div>
                  </div>

                  {/* Certificate Badge */}
                  <div className="flex items-center gap-2 mb-6 text-[#00ff99] text-sm font-medium">
                    <Award className="w-4 h-4" />
                    <span>Certificado incluido</span>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-[#0070f3] font-medium">
                    <span>Comenzar curso</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#0070f3]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Terminal className="w-6 h-6 text-[#0070f3]" />
              </div>
              <h3 className="font-bold mb-2">Práctica Real</h3>
              <p className="text-sm text-muted-foreground">Ejercicios prácticos con código y comandos reales</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#00ff99]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-[#00ff99]" />
              </div>
              <h3 className="font-bold mb-2">Evaluaciones</h3>
              <p className="text-sm text-muted-foreground">Valida tus conocimientos con evaluaciones por módulo</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#ff007a]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-[#ff007a]" />
              </div>
              <h3 className="font-bold mb-2">Certificación</h3>
              <p className="text-sm text-muted-foreground">Obtén tu certificado oficial verificable</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
