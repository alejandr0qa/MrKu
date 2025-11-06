"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

interface ModuleEvaluationProps {
  courseId: string
  moduleId: string
  moduleName: string
  questions: Question[]
  onComplete: (score: number) => void
}

export default function ModuleEvaluation({
  courseId,
  moduleId,
  moduleName,
  questions,
  onComplete,
}: ModuleEvaluationProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleAnswer = () => {
    if (selectedAnswer === null) return

    const correct = selectedAnswer === questions[currentQuestion].correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    setAnswers([...answers, selectedAnswer])

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        // Calcular puntuación final
        const finalAnswers = [...answers, selectedAnswer]
        const correctCount = finalAnswers.filter((ans, idx) => ans === questions[idx].correctAnswer).length
        const score = Math.round((correctCount / questions.length) * 100)
        onComplete(score)
      }
    }, 1500)
  }

  const question = questions[currentQuestion]

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Evaluación: {moduleName}</h3>
          <span className="text-sm text-muted-foreground">
            Pregunta {currentQuestion + 1} de {questions.length}
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-[#0070f3] h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg mb-6">{question.question}</p>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && setSelectedAnswer(index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selectedAnswer === index
                  ? showResult
                    ? isCorrect
                      ? "border-[#00ff99] bg-[#00ff99]/10"
                      : "border-[#ff007a] bg-[#ff007a]/10"
                    : "border-[#0070f3] bg-[#0070f3]/10"
                  : "border-border hover:border-[#0070f3]/50"
              } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult &&
                  selectedAnswer === index &&
                  (isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-[#00ff99]" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#ff007a]" />
                  ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleAnswer}
        disabled={selectedAnswer === null || showResult}
        className="w-full bg-gradient-to-r from-[#0070f3] to-[#00ff99] hover:opacity-90 disabled:opacity-50 text-black font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
      >
        {showResult ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Procesando...
          </>
        ) : (
          "Confirmar respuesta"
        )}
      </button>
    </div>
  )
}
