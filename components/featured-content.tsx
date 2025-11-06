import { Calendar, ArrowRight } from "lucide-react"

const articles = [
  {
    title: "Arquitecturas de IA en producción: Lecciones aprendidas",
    excerpt:
      "Cómo diseñar sistemas de IA escalables y confiables. Desde la selección de modelos hasta el monitoreo en tiempo real.",
    date: "15 Ene 2025",
    category: "Inteligencia Artificial",
    readTime: "12 min",
    gradient: "from-[#00ff99]/20 to-transparent",
  },
  {
    title: "Zero Trust Security: Implementación real",
    excerpt:
      "Guía práctica para implementar arquitecturas Zero Trust. Casos de uso, herramientas y estrategias de migración.",
    date: "10 Ene 2025",
    category: "Ciberseguridad",
    readTime: "15 min",
    gradient: "from-[#ff007a]/20 to-transparent",
  },
  {
    title: "Optimización de Next.js: De 3s a 300ms",
    excerpt: "Técnicas avanzadas de optimización: code splitting, caching estratégico, y mejoras en Core Web Vitals.",
    date: "5 Ene 2025",
    category: "Desarrollo",
    readTime: "10 min",
    gradient: "from-[#0070f3]/20 to-transparent",
  },
  {
    title: "Prompt Engineering: Más allá de lo básico",
    excerpt: "Técnicas avanzadas para obtener mejores resultados de LLMs. Chain-of-thought, few-shot learning y más.",
    date: "28 Dic 2024",
    category: "Inteligencia Artificial",
    readTime: "14 min",
    gradient: "from-[#00ff99]/20 to-transparent",
  },
  {
    title: "Pentesting moderno: Herramientas y metodología",
    excerpt:
      "Las herramientas y técnicas que todo profesional de seguridad debe conocer en 2025. Desde reconocimiento hasta explotación.",
    date: "20 Dic 2024",
    category: "Ciberseguridad",
    readTime: "18 min",
    gradient: "from-[#ff007a]/20 to-transparent",
  },
  {
    title: "Microservicios con Kubernetes: Guía completa",
    excerpt:
      "Diseño, despliegue y gestión de microservicios en Kubernetes. Patrones, anti-patrones y mejores prácticas.",
    date: "15 Dic 2024",
    category: "Cloud & DevOps",
    readTime: "20 min",
    gradient: "from-[#0070f3]/20 to-transparent",
  },
]

export default function FeaturedContent() {
  return (
    <section className="py-24 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Contenido <span className="gradient-text">Destacado</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Artículos técnicos profundos, tutoriales prácticos y análisis sin filtros. Contenido que realmente aporta
            valor.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article
              key={index}
              className="group glass-panel rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:scale-105"
            >
              <div
                className={`h-48 bg-gradient-to-br ${article.gradient} flex items-center justify-center relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
                <span className="relative z-10 text-6xl font-mono font-bold text-foreground/10">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {article.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed">{article.excerpt}</p>

                <button className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  Leer más
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
