-- Create tables for Supabase

-- Users table (optional, if you want to track users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Calculations table
CREATE TABLE IF NOT EXISTS calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  num_exams INTEGER NOT NULL,
  desired_mean DECIMAL(5, 2) NOT NULL,
  combinations JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_calculations_user_id ON calculations(user_id);
CREATE INDEX IF NOT EXISTS idx_calculations_created_at ON calculations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own calculations" ON calculations
  FOR SELECT USING (user_id = current_user_id());

CREATE POLICY "Users can insert their own calculations" ON calculations
  FOR INSERT WITH CHECK (user_id = current_user_id());

CREATE POLICY "Users can update their own calculations" ON calculations
  FOR UPDATE USING (user_id = current_user_id());

CREATE POLICY "Users can delete their own calculations" ON calculations
  FOR DELETE USING (user_id = current_user_id());
