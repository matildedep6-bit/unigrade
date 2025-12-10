import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const calculateCombinations = async (
  numExams: number,
  desiredMean: number,
  currentMean?: number,
  passedExams?: number
) => {
  try {
    const response = await api.post('/api/calculate', {
      num_exams: numExams,
      desired_mean: desiredMean,
      current_mean: currentMean,
      passed_exams: passedExams,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const saveCalculation = async (
  userId: string,
  numExams: number,
  desiredMean: number,
  combinations: any[]
) => {
  try {
    const response = await api.post('/api/save-calculation', {
      user_id: userId,
      num_exams: numExams,
      desired_mean: desiredMean,
      combinations,
    })
    return response.data
  } catch (error) {
    throw error
  }
}
