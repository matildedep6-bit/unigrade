/**
 * Grade calculation utilities
 */

export const calculateMean = (grades: number[]): number => {
  if (grades.length === 0) return 0
  return Math.round(
    (grades.reduce((sum, grade) => sum + grade, 0) / grades.length) * 100
  ) / 100
}

export const getDifficultyColor = (
  mean: number
): 'easy' | 'medium' | 'hard' => {
  if (mean >= 28) return 'easy'
  if (mean >= 24) return 'medium'
  return 'hard'
}

export const getDifficultyEmoji = (
  difficulty: 'easy' | 'medium' | 'hard'
): string => {
  switch (difficulty) {
    case 'easy':
      return '🟢'
    case 'medium':
      return '🟡'
    case 'hard':
      return '🔴'
  }
}

export const isValidGrade = (grade: number): boolean => {
  return grade >= 18 && grade <= 30 && Number.isInteger(grade)
}

export const isValidMean = (mean: number): boolean => {
  return mean >= 18 && mean <= 30
}

export const isValidExamCount = (count: number): boolean => {
  return count >= 1 && count <= 100 && Number.isInteger(count)
}
