import Link from "next/link"
import { Brain, Shield, Cloud, ArrowRight, Terminal } from "lucide-react"

export default function LabsPage() {
  const labs = [
    {
      id: "ia",
      title: "Laboratorios de IA",
      description: "Experimenta con modelos de lenguaje, visión por computadora y aprendizaje automático",
      icon: Brain,
      color: "from-[#0070f3] to-[#00ff99]",
      topics: ["LLMs", "Computer Vision", "ML Pipelines", "Fine-tuning"],
    },
    {
      id: "ciberseguridad",
      title: "Laboratorios de Ciberseguridad",
      description: "Aprende técnicas de pentesting, análisis de vulnerabilidades y hardening de sistemas",
      icon: Shield,
      color: "from-[#ff007a] to-[#0070f3]",
      topics: ["Pentesting", "OSINT", "Análisis de Malware", "Red Team"],
    },
    {
      id: "cloud",
      title: "Laboratorios de Cloud & Dev",
      description: "Domina arquitecturas cloud, DevOps, contenedores y automatización",
      icon: Cloud,
      color: "from-[#00ff99] to-[#0070f3]",
      topics: ["Kubernetes", "CI/CD", "IaC", "Serverless"],
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
            <span className="text-[#00ff99] font-mono text-sm">~/labs</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Laboratorios{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070f3] to-[#00ff99]">
              Prácticos
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
            Aprende haciendo. Cada laboratorio incluye ejercicios prácticos, comandos reales y asistencia de Mr Ku en
            tiempo real.
          </p>
        </div>
      </section>

      {/* Labs Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {labs.map((lab) => {
              const Icon = lab.icon
              return (
                <Link
                  key={lab.id}
                  href={`/labs/${lab.id}`}
                  className="group relative bg-card border border-border rounded-2xl p-8 hover:border-[#0070f3] transition-all duration-300 hover:shadow-lg hover:shadow-[#0070f3]/20"
                >
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${lab.color} p-0.5 mb-6`}>
                    <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-foreground" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-[#0070f3] transition-colors">{lab.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{lab.description}</p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {lab.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs font-mono px-3 py-1 bg-secondary rounded-full text-muted-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-[#0070f3] font-medium">
                    <span>Explorar labs</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#0070f3]/10 to-[#ff007a]/10 border border-[#0070f3]/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">¿Necesitas ayuda personalizada?</h2>
            <p className="text-muted-foreground mb-6">
              Mr Ku está disponible en cada laboratorio para guiarte paso a paso
            </p>
            <div className="inline-flex items-center gap-2 text-[#00ff99] font-mono text-sm">
              <Terminal className="w-4 h-4" />
              <span>Asistencia en tiempo real incluida</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
