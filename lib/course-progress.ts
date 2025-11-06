// Utilidades para gestionar el progreso de cursos en localStorage

export interface ModuleProgress {
  moduleId: string
  completed: boolean
  score?: number
  completedAt?: string
}

export interface CourseProgress {
  courseId: string
  modules: ModuleProgress[]
  userName?: string
  completedAt?: string
}

export function getCourseProgress(courseId: string): CourseProgress | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(`course_${courseId}`)
  return stored ? JSON.parse(stored) : null
}

export function saveCourseProgress(progress: CourseProgress): void {
  if (typeof window === "undefined") return
  localStorage.setItem(`course_${progress.courseId}`, JSON.stringify(progress))
}

export function updateModuleProgress(courseId: string, moduleId: string, completed: boolean, score?: number): void {
  let progress = getCourseProgress(courseId)

  if (!progress) {
    progress = {
      courseId,
      modules: [],
    }
  }

  const moduleIndex = progress.modules.findIndex((m) => m.moduleId === moduleId)

  if (moduleIndex >= 0) {
    progress.modules[moduleIndex] = {
      moduleId,
      completed,
      score,
      completedAt: completed ? new Date().toISOString() : undefined,
    }
  } else {
    progress.modules.push({
      moduleId,
      completed,
      score,
      completedAt: completed ? new Date().toISOString() : undefined,
    })
  }

  // Verificar si todos los módulos están completados
  const allCompleted = progress.modules.every((m) => m.completed)
  if (allCompleted && !progress.completedAt) {
    progress.completedAt = new Date().toISOString()
  }

  saveCourseProgress(progress)
}

export function getModuleProgress(courseId: string, moduleId: string): ModuleProgress | null {
  const progress = getCourseProgress(courseId)
  if (!progress) return null
  return progress.modules.find((m) => m.moduleId === moduleId) || null
}

export function getCourseCompletionPercentage(courseId: string, totalModules: number): number {
  const progress = getCourseProgress(courseId)
  if (!progress) return 0
  const completedCount = progress.modules.filter((m) => m.completed).length
  return Math.round((completedCount / totalModules) * 100)
}

export function isCourseCompleted(courseId: string, totalModules: number): boolean {
  return getCourseCompletionPercentage(courseId, totalModules) === 100
}

export function generateCertificateCode(courseId: string, userName: string): string {
  const timestamp = Date.now()
  const hash = btoa(`${courseId}-${userName}-${timestamp}`).slice(0, 12).toUpperCase()
  return `MRKU-${hash}`
}
