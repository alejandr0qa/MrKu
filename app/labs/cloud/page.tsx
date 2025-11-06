"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Cloud, Terminal, CheckCircle2, MessageCircle } from "lucide-react"
import MrKuChat from "@/components/mr-ku-chat"

export default function CloudLabPage() {
  const [showChat, setShowChat] = useState(false)
  const [chatMessage, setChatMessage] = useState("")

  const handleAskMrKu = (message: string) => {
    setChatMessage(message)
    setShowChat(true)
  }

  const labs = [
    {
      title: "Despliegue con Docker y Docker Compose",
      difficulty: "Principiante",
      duration: "45 min",
      description: "Aprende a contenerizar aplicaciones y orquestar servicios con Docker.",
      steps: [
        "Crea un Dockerfile para tu aplicación",
        "Construye y ejecuta contenedores",
        "Define servicios con Docker Compose",
        "Gestiona volúmenes y redes",
      ],
      code: `# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data`,
      askMessage: "Mr Ku, ayúdame a contenerizar mi aplicación con Docker.",
    },
    {
      title: "Kubernetes: Despliegue de Aplicaciones",
      difficulty: "Intermedio",
      duration: "90 min",
      description: "Domina Kubernetes para orquestar contenedores en producción.",
      steps: [
        "Configura un cluster de Kubernetes",
        "Crea Deployments y Services",
        "Implementa ConfigMaps y Secrets",
        "Configura Ingress para routing",
      ],
      code: `# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: app
        image: myapp:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url

---
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer`,
      askMessage: "Mr Ku, guíame en el despliegue de aplicaciones con Kubernetes.",
    },
    {
      title: "CI/CD con GitHub Actions",
      difficulty: "Intermedio",
      duration: "60 min",
      description: "Automatiza testing, building y deployment con GitHub Actions.",
      steps: [
        "Configura workflows de GitHub Actions",
        "Implementa tests automáticos",
        "Construye y publica imágenes Docker",
        "Despliega automáticamente a producción",
      ],
      code: `# .github/workflows/deploy.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          npm install
          npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: |
          docker build -t myapp:latest .
          docker tag myapp:latest registry.io/myapp:\${{ github.sha }}
      - name: Push to registry
        run: docker push registry.io/myapp:\${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          kubectl set image deployment/app app=registry.io/myapp:\${{ github.sha }}`,
      askMessage: "Mr Ku, ayúdame a configurar un pipeline CI/CD con GitHub Actions.",
    },
    {
      title: "Infrastructure as Code con Terraform",
      difficulty: "Avanzado",
      duration: "120 min",
      description: "Gestiona infraestructura cloud de forma declarativa con Terraform.",
      steps: [
        "Instala y configura Terraform",
        "Define recursos de infraestructura",
        "Gestiona estado remoto",
        "Implementa módulos reutilizables",
      ],
      code: `# main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "main-vpc"
  }
}

resource "aws_instance" "app" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  
  vpc_security_group_ids = [aws_security_group.app.id]
  
  tags = {
    Name = "app-server"
  }
}

resource "aws_security_group" "app" {
  name        = "app-sg"
  description = "Security group for app"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`,
      askMessage: "Mr Ku, enséñame a gestionar infraestructura con Terraform.",
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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00ff99] to-[#0070f3] p-0.5">
                <div className="w-full h-full bg-background rounded-xl flex items-center justify-center">
                  <Cloud className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Laboratorios de Cloud & Dev</h1>
                <p className="text-muted-foreground">DevOps, contenedores y automatización</p>
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
                className="bg-card border border-border rounded-2xl p-8 hover:border-[#00ff99] transition-all"
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
                        <span className="text-[#0070f3] font-mono mr-2">{stepIndex + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Code Block */}
                <div className="mb-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-[#00ff99]" />
                    Configuración y código
                  </h3>
                  <pre className="bg-black/50 border border-[#00ff99]/20 rounded-xl p-4 overflow-x-auto">
                    <code className="text-[#00ff99] font-mono text-sm whitespace-pre">{lab.code}</code>
                  </pre>
                </div>

                {/* Ask Mr Ku Button */}
                <button
                  onClick={() => handleAskMrKu(lab.askMessage)}
                  className="w-full bg-gradient-to-r from-[#00ff99] to-[#0070f3] hover:opacity-90 text-black font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
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
