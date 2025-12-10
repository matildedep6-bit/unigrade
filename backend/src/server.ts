import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { calculateCombinations } from './services/gradeCalculator'
import { supabaseClient } from './lib/supabase'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Calculate combinations endpoint
app.post('/api/calculate', async (req: Request, res: Response) => {
  try {
    const { num_exams, desired_mean, current_mean, passed_exams } = req.body

    // Validation
    if (!num_exams || !desired_mean) {
      return res.status(400).json({
        message: 'Numero esami e media desiderata sono obbligatori',
      })
    }

    if (num_exams < 1 || num_exams > 100) {
      return res.status(400).json({
        message: 'Numero esami deve essere tra 1 e 100',
      })
    }

    if (desired_mean < 18 || desired_mean > 30) {
      return res.status(400).json({
        message: 'Media desiderata deve essere tra 18 e 30',
      })
    }

    const combinations = calculateCombinations(
      num_exams,
      desired_mean,
      current_mean,
      passed_exams
    )

    res.json({
      success: true,
      combinations,
      totalCombinations: combinations.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Calculation error:', error)
    res.status(500).json({
      message: 'Errore nel calcolo delle combinazioni',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

// Save calculation endpoint
app.post('/api/save-calculation', async (req: Request, res: Response) => {
  try {
    const { user_id, num_exams, desired_mean, combinations } = req.body

    if (!user_id) {
      return res.status(400).json({
        message: 'User ID è obbligatorio',
      })
    }

    // Save to Supabase
    const { data, error } = await supabaseClient
      .from('calculations')
      .insert([
        {
          user_id,
          num_exams,
          desired_mean,
          combinations,
          created_at: new Date().toISOString(),
        },
      ])

    if (error) {
      return res.status(400).json({
        message: 'Errore nel salvataggio',
        error: error.message,
      })
    }

    res.json({
      success: true,
      data,
      message: 'Calcolo salvato con successo',
    })
  } catch (error) {
    console.error('Save error:', error)
    res.status(500).json({
      message: 'Errore nel salvataggio',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

// Get user calculations
app.get('/api/calculations/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const { data, error } = await supabaseClient
      .from('calculations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(400).json({
        message: 'Errore nel recupero dei calcoli',
        error: error.message,
      })
    }

    res.json({
      success: true,
      data,
      count: data?.length || 0,
    })
  } catch (error) {
    console.error('Fetch error:', error)
    res.status(500).json({
      message: 'Errore nel recupero dei calcoli',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📝 API available at http://localhost:${PORT}/api`)
})
