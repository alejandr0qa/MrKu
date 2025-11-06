export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-12 px-4 glass-panel-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            <span className="font-mono text-[#00ff99]">©</span> {currentYear}{" "}
            <span className="gradient-text font-bold">Mr Ku</span>. Construido para aprender y proteger.
          </p>

          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-[#00ff99] transition-colors">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-[#0070f3] transition-colors">
              GitHub
            </a>
            <a href="#" className="text-muted-foreground hover:text-[#ff007a] transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
