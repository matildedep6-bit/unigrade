/**
 * Calculate all possible grade combinations to achieve desired mean
 * @param numExams - Number of exams to take
 * @param desiredMean - Desired average grade (18-30)
 * @param currentMean - Current average grade (optional)
 * @param passedExams - Number of already passed exams (optional)
 * @returns Array of grade combinations
 */
export function calculateCombinations(
  numExams: number,
  desiredMean: number,
  currentMean?: number,
  passedExams?: number
): Array<{ grades: number[]; mean: number }> {
  const combinations: Array<{ grades: number[]; mean: number }> = []
  const minGrade = 18
  const maxGrade = 30

  // If user has already passed some exams, adjust calculation
  let examsToConsider = numExams
  let requiredTotalPoints = desiredMean * numExams

  if (currentMean && passedExams) {
    // Calculate total points from already passed exams
    const earnedPoints = currentMean * passedExams
    examsToConsider = numExams - passedExams

    if (examsToConsider <= 0) {
      return [
        {
          grades: [],
          mean: currentMean,
        },
      ]
    }

    // Calculate points needed from remaining exams
    requiredTotalPoints = desiredMean * numExams - earnedPoints
  }

  // Recursive function to generate all combinations
  const generate = (
    remaining: number,
    pointsNeeded: number,
    currentGrades: number[]
  ) => {
    if (remaining === 0) {
      if (pointsNeeded === 0) {
        const mean =
          (currentGrades.reduce((a, b) => a + b, 0) +
            (currentMean ? currentMean * passedExams! : 0)) /
          numExams
        combinations.push({
          grades: currentGrades,
          mean: Math.round(mean * 100) / 100,
        })
      }
      return
    }

    for (let grade = minGrade; grade <= maxGrade; grade++) {
      if (
        pointsNeeded - grade >= minGrade * (remaining - 1) &&
        pointsNeeded - grade <= maxGrade * (remaining - 1)
      ) {
        generate(remaining - 1, pointsNeeded - grade, [
          ...currentGrades,
          grade,
        ])
      }
    }
  }

  generate(examsToConsider, requiredTotalPoints, [])

  // Remove duplicates and sort
  const uniqueCombinations = Array.from(
    new Map(
      combinations.map((c) => [
        JSON.stringify(c.grades.sort((a, b) => a - b)),
        c,
      ])
    ).values()
  )

  return uniqueCombinations
    .sort((a, b) => {
      const avgA = a.grades.reduce((x, y) => x + y, 0) / a.grades.length
      const avgB = b.grades.reduce((x, y) => x + y, 0) / b.grades.length
      return avgB - avgA
    })
    .slice(0, 1000) // Limit results to prevent performance issues
}
