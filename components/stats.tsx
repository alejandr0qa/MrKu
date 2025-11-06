import { TrendingUp, Shield, Code, Users } from "lucide-react"

const stats = [
  {
    icon: Code,
    value: "500+",
    label: "Proyectos analizados",
    color: "text-[#0070f3]",
  },
  {
    icon: Shield,
    value: "1000+",
    label: "Vulnerabilidades identificadas",
    color: "text-[#ff007a]",
  },
  {
    icon: TrendingUp,
    value: "50+",
    label: "Artículos técnicos",
    color: "text-[#00d4ff]",
  },
  {
    icon: Users,
    value: "10k+",
    label: "Profesionales alcanzados",
    color: "text-[#0070f3]",
  },
]

export default function Stats() {
  return (
    <section className="py-24 px-4 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Impacto <span className="text-[#0070f3]">Medible</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Números que reflejan el compromiso con la calidad y la comunidad técnica
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-secondary border border-border group-hover:border-primary/50 transition-all">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 font-mono">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
