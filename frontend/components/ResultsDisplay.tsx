'use client'

import { useState } from 'react'
import styles from './ResultsDisplay.module.css'

interface ResultsDisplayProps {
  combinations: any[]
  formData: any
}

export default function ResultsDisplay({
  combinations,
  formData,
}: ResultsDisplayProps) {
  const [sortBy, setSortBy] = useState<'avg' | 'count' | 'max' | 'min'>('avg')
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all')

  const getDifficultyLevel = (combination: any): 'easy' | 'medium' | 'hard' => {
    const avgGrade = combination.grades.reduce((a: number, b: number) => a + b, 0) / combination.grades.length
    if (avgGrade >= 28) return 'easy'
    if (avgGrade >= 24) return 'medium'
    return 'hard'
  }

  let sorted = [...combinations]

  // Sort
  if (sortBy === 'avg') {
    sorted.sort((a, b) => {
      const avgA = a.grades.reduce((x: number, y: number) => x + y, 0) / a.grades.length
      const avgB = b.grades.reduce((x: number, y: number) => x + y, 0) / b.grades.length
      return avgB - avgA
    })
  } else if (sortBy === 'count') {
    sorted.sort((a, b) => a.grades.length - b.grades.length)
  } else if (sortBy === 'max') {
    sorted.sort((a, b) => Math.max(...b.grades) - Math.max(...a.grades))
  } else if (sortBy === 'min') {
    sorted.sort((a, b) => Math.max(...b.grades) - Math.max(...a.grades))
  }

  // Filter
  if (filterDifficulty !== 'all') {
    sorted = sorted.filter((c) => getDifficultyLevel(c) === filterDifficulty)
  }

  if (sorted.length === 0) {
    return (
      <div className={styles.noResults}>
        <p>
          Nessuna combinazione trovata con i filtri selezionati.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.resultsContainer}>
      <h2>Combinazioni Possibili ({sorted.length})</h2>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="sortBy">Ordina per:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="avg">Media più alta</option>
            <option value="count">Numero di esami</option>
            <option value="max">Voto massimo</option>
            <option value="min">Voto minimo</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="difficulty">Difficoltà:</label>
          <select
            id="difficulty"
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value as any)}
          >
            <option value="all">Tutte</option>
            <option value="easy">Facile (media ≥ 28)</option>
            <option value="medium">Medio (24-27)</option>
            <option value="hard">Difficile (&lt; 24)</option>
          </select>
        </div>
      </div>

      <div className={styles.combinationsList}>
        {sorted.map((combination, index) => {
          const difficulty = getDifficultyLevel(combination)
          const avg =
            combination.grades.reduce((a: number, b: number) => a + b, 0) /
            combination.grades.length
          const max = Math.max(...combination.grades)
          const min = Math.min(...combination.grades)

          return (
            <div key={index} className={styles.combinationCard}>
              <div className={styles.cardHeader}>
                <span className={styles.index}>#{index + 1}</span>
                <span className={`${styles.difficulty} ${styles[difficulty]}`}>
                  {difficulty === 'easy' ? '🟢' : difficulty === 'medium' ? '🟡' : '🔴'} {difficulty.toUpperCase()}
                </span>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.gradesList}>
                  {combination.grades.map((grade: number, i: number) => (
                    <span key={i} className={styles.grade}>
                      {grade}
                    </span>
                  ))}
                </div>

                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span className={styles.label}>Media:</span>
                    <span className={styles.value}>{avg.toFixed(2)}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.label}>Max:</span>
                    <span className={styles.value}>{max}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.label}>Min:</span>
                    <span className={styles.value}>{min}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
