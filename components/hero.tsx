export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0070f3]/10 via-transparent to-[#ff007a]/10" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-secondary/50 backdrop-blur-sm rounded-full border border-primary/20">
          <span className="text-sm font-mono text-muted-foreground">{">"} Bienvenido al futuro_</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="text-foreground">Mr Ku</span>
        </h1>

        <p className="text-xl md:text-3xl lg:text-4xl font-light mb-8 text-balance">
          <span className="text-[#0070f3]">Tecnología</span>
          {", "}
          <span className="text-[#ff007a]">Ciberseguridad</span>
          {" e "}
          <span className="gradient-text font-semibold">Inteligencia Artificial</span>
        </p>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 text-pretty">
          Contenido técnico de calidad. Sin relleno, sin marketing vacío. Solo conocimiento real y aplicable para
          profesionales que buscan estar a la vanguardia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#especialidades"
            className="px-8 py-4 bg-[#0070f3] hover:bg-[#0070f3]/90 text-white rounded-lg font-medium transition-all glow-effect hover:scale-105"
          >
            Explorar especialidades
          </a>
          <a
            href="#chat"
            className="px-8 py-4 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-medium transition-all border border-border hover:border-[#ff007a]"
          >
            Hablar con Mr Ku
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-[#0070f3] rounded-full" />
        </div>
      </div>
    </section>
  )
}
