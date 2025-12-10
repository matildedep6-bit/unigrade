# API Response Types

export interface CalculationResult {
  success: boolean
  combinations: GradeCombination[]
  totalCombinations: number
  timestamp: string
}

export interface GradeCombination {
  grades: number[]
  mean: number
}

export interface SaveCalculationRequest {
  user_id: string
  num_exams: number
  desired_mean: number
  combinations: GradeCombination[]
}

export interface SaveCalculationResponse {
  success: boolean
  data: any
  message: string
}

export interface CalculationQuery {
  num_exams: number
  desired_mean: number
  current_mean?: number
  passed_exams?: number
}
