/**
 * Grade Calculator Service
 * Handles all grade combination calculations
 */

import { GradeCombination } from '../types'

class GradeCalculatorService {
  private readonly MIN_GRADE = 18
  private readonly MAX_GRADE = 30
  private readonly MAX_RESULTS = 1000

  /**
   * Calculate all possible grade combinations to achieve desired mean
   * @param numExams - Number of exams to take
   * @param desiredMean - Desired average grade
   * @param currentMean - Current average grade (optional)
   * @param passedExams - Number of already passed exams (optional)
   */
  public calculateCombinations(
    numExams: number,
    desiredMean: number,
    currentMean?: number,
    passedExams?: number
  ): GradeCombination[] {
    const combinations: GradeCombination[] = []
    let examsToConsider = numExams
    let requiredTotalPoints = desiredMean * numExams

    // Adjust if user has already passed some exams
    if (currentMean && passedExams && passedExams > 0) {
      const earnedPoints = currentMean * passedExams
      examsToConsider = numExams - passedExams

      if (examsToConsider <= 0) {
        return [{ grades: [], mean: currentMean }]
      }

      requiredTotalPoints = desiredMean * numExams - earnedPoints
    }

    // Generate all combinations recursively
    this.generateCombinations(
      examsToConsider,
      requiredTotalPoints,
      [],
      combinations
    )

    return combinations
      .slice(0, this.MAX_RESULTS)
      .sort((a, b) => {
        const avgA =
          a.grades.reduce((x, y) => x + y, 0) / (a.grades.length || 1)
        const avgB =
          b.grades.reduce((x, y) => x + y, 0) / (b.grades.length || 1)
        return avgB - avgA
      })
  }

  private generateCombinations(
    remaining: number,
    pointsNeeded: number,
    currentGrades: number[],
    results: GradeCombination[]
  ): void {
    if (remaining === 0) {
      if (pointsNeeded === 0) {
        const mean =
          currentGrades.reduce((a, b) => a + b, 0) / currentGrades.length
        results.push({
          grades: currentGrades.sort((a, b) => b - a),
          mean: Math.round(mean * 100) / 100,
        })
      }
      return
    }

    for (let grade = this.MAX_GRADE; grade >= this.MIN_GRADE; grade--) {
      const minRemaining = this.MIN_GRADE * (remaining - 1)
      const maxRemaining = this.MAX_GRADE * (remaining - 1)
      const remainingPoints = pointsNeeded - grade

      if (remainingPoints >= minRemaining && remainingPoints <= maxRemaining) {
        this.generateCombinations(
          remaining - 1,
          remainingPoints,
          [...currentGrades, grade],
          results
        )
      }
    }
  }
}

export const gradeCalculator = new GradeCalculatorService()
