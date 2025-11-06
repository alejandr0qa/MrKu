import { Brain, Shield, Cloud } from "lucide-react"

const specialties = [
  {
    icon: Brain,
    title: "Inteligencia Artificial",
    description: "Desarrollo de soluciones con IA generativa, machine learning y automatización inteligente.",
    color: "#00ff99",
    items: ["Modelos de lenguaje (LLMs)", "Automatización con IA", "Análisis predictivo", "Chatbots y asistentes"],
  },
  {
    icon: Shield,
    title: "Ciberseguridad",
    description: "Protección de sistemas, análisis de vulnerabilidades y mejores prácticas de seguridad.",
    color: "#ff007a",
    items: ["Auditorías de seguridad", "Pentesting ético", "Gestión de vulnerabilidades", "Seguridad en la nube"],
  },
  {
    icon: Cloud,
    title: "Cloud & Dev",
    description: "Arquitecturas modernas, desarrollo full-stack y despliegue en la nube.",
    color: "#0070f3",
    items: ["Next.js & React", "Arquitectura serverless", "CI/CD pipelines", "Infraestructura como código"],
  },
]

export default function Specialties() {
  return (
    <section id="especialidades" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Áreas de <span className="gradient-text">Especialización</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combinando tecnología de vanguardia con experiencia práctica
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {specialties.map((specialty, index) => {
            const Icon = specialty.icon
            return (
              <div
                key={index}
                className="group relative glass-panel rounded-xl p-8 hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                  style={{ backgroundColor: `${specialty.color}20` }}
                />

                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${specialty.color}20` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: specialty.color }} />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-foreground">{specialty.title}</h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">{specialty.description}</p>

                  <ul className="space-y-2">
                    {specialty.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: specialty.color }} />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
