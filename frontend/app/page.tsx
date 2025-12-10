'use client'

import { useState } from 'react'
import { calculateCombinations } from '@/lib/api'
import GradeForm from '@/components/GradeForm'
import ResultsDisplay from '@/components/ResultsDisplay'

export default function Home() {
  const [combinations, setCombinations] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<any>(null)

  const handleCalculate = async (data: {
    numExams: number
    desiredMean: number
    currentMean?: number
    passedExams?: number
  }) => {
    setLoading(true)
    setError(null)
    setFormData(data)

    try {
      const result = await calculateCombinations(
        data.numExams,
        data.desiredMean,
        data.currentMean,
        data.passedExams
      )
      setCombinations(result.combinations || [])
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          'Errore nel calcolo delle combinazioni'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>UniGrade</h1>
        <p
          style={{
            textAlign: 'center',
            color: '#666',
            marginBottom: '2rem',
          }}
        >
          Calcola tutte le combinazioni di voti per raggiungere la media
          desiderata
        </p>

        <GradeForm onCalculate={handleCalculate} loading={loading} />

        {error && (
          <div
            style={{
              color: '#d32f2f',
              padding: '1rem',
              backgroundColor: '#ffebee',
              borderRadius: '4px',
              marginTop: '2rem',
            }}
          >
            {error}
          </div>
        )}

        {combinations.length > 0 && (
          <ResultsDisplay combinations={combinations} formData={formData} />
        )}
      </div>
    </main>
  )
}
