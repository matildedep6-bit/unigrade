'use client'

import { useState } from 'react'
import styles from './GradeForm.module.css'

interface GradeFormProps {
  onCalculate: (data: {
    numExams: number
    desiredMean: number
    currentMean?: number
    passedExams?: number
  }) => void
  loading: boolean
}

export default function GradeForm({ onCalculate, loading }: GradeFormProps) {
  const [numExams, setNumExams] = useState<number>(1)
  const [desiredMean, setDesiredMean] = useState<number>(25)
  const [currentMean, setCurrentMean] = useState<number | ''>('')
  const [passedExams, setPassedExams] = useState<number | ''>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (numExams < 1 || numExams > 100) {
      alert('Il numero di esami deve essere tra 1 e 100')
      return
    }

    if (desiredMean < 18 || desiredMean > 30) {
      alert('La media desiderata deve essere tra 18 e 30')
      return
    }

    onCalculate({
      numExams,
      desiredMean,
      currentMean: currentMean === '' ? undefined : Number(currentMean),
      passedExams: passedExams === '' ? undefined : Number(passedExams),
    })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="numExams">Numero di esami da fare:</label>
        <input
          id="numExams"
          type="number"
          min="1"
          max="100"
          value={numExams}
          onChange={(e) => setNumExams(Number(e.target.value))}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="desiredMean">Media desiderata (18-30):</label>
        <input
          id="desiredMean"
          type="number"
          min="18"
          max="30"
          step="0.1"
          value={desiredMean}
          onChange={(e) => setDesiredMean(Number(e.target.value))}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="currentMean">Media attuale (opzionale):</label>
        <input
          id="currentMean"
          type="number"
          min="0"
          max="30"
          step="0.1"
          value={currentMean}
          onChange={(e) =>
            setCurrentMean(e.target.value === '' ? '' : Number(e.target.value))
          }
          placeholder="Es. 23.5"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="passedExams">Esami già superati (opzionale):</label>
        <input
          id="passedExams"
          type="number"
          min="0"
          max="100"
          value={passedExams}
          onChange={(e) =>
            setPassedExams(e.target.value === '' ? '' : Number(e.target.value))
          }
          placeholder="Es. 10"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Calcolo in corso...' : 'Calcola Combinazioni'}
      </button>
    </form>
  )
}
