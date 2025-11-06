import { Target, Lightbulb, BookOpen, Zap } from "lucide-react"

const principles = [
  {
    icon: Target,
    title: "Enfoque Práctico",
    description: "Soluciones reales para problemas reales, sin teoría innecesaria",
    color: "text-[#0070f3]",
  },
  {
    icon: Lightbulb,
    title: "Aprendizaje Continuo",
    description: "Investigación constante de las últimas tendencias y vulnerabilidades",
    color: "text-[#ff007a]",
  },
  {
    icon: BookOpen,
    title: "Conocimiento Compartido",
    description: "Documentación clara y accesible para toda la comunidad",
    color: "text-[#00d4ff]",
  },
  {
    icon: Zap,
    title: "Acción Inmediata",
    description: "Implementación rápida y efectiva de soluciones de seguridad",
    color: "text-[#0070f3]",
  },
]

export default function Stats() {
  return (
    <section className="py-24 px-4 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestro <span className="text-[#0070f3]">Enfoque</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Principios que guían cada proyecto y cada línea de código
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((principle, index) => {
            const Icon = principle.icon
            return (
              <div
                key={index}
                className="text-center group p-6 rounded-xl border border-border hover:border-primary/50 transition-all hover:bg-secondary/50"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-secondary border border-border group-hover:scale-110 transition-transform">
                  <Icon className={`w-8 h-8 ${principle.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{principle.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
