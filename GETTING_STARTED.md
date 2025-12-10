# UniGrade - Getting Started Guide

## Configurazione Iniziale

### 1. Setup Supabase

1. Accedi a [Supabase](https://app.supabase.com)
2. Crea un nuovo progetto
3. Attendi il completamento della creazione (potrebbe impiegare alcuni minuti)
4. Vai a **Impostazioni → API** e copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

5. Vai all'**SQL Editor** e esegui il file `supabase/migrations/001_init_schema.sql`

### 2. Configurare le Variabili d'Ambiente

1. Copia `.env.example` in `.env`:
   ```bash
   cp .env.example .env
   ```

2. Aggiorna i valori nel file `.env`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NODE_ENV=development
   ```

### 3. Installare Dipendenze

```bash
# Dalla directory root
npm install
npm install --workspace=frontend
npm install --workspace=backend
```

### 4. Avviare l'Applicazione

**Opzione 1: Script automatico**
```bash
npm run dev
```

**Opzione 2: Terminali separati**
```bash
# Terminal 1 - Backend
npm run dev --workspace=backend

# Terminal 2 - Frontend
npm run dev --workspace=frontend
```

### 5. Accedere all'App

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Health Check: http://localhost:3001/health

## Struttura Progetto

```
unigrade/
├── frontend/           # Next.js App
│   ├── app/           # Pages
│   ├── components/    # React Components
│   ├── lib/          # Utilities
│   └── styles/       # CSS
├── backend/           # Express API
│   └── src/
│       ├── services/  # Business logic
│       └── lib/      # Database clients
└── supabase/         # Database setup
    └── migrations/   # SQL schemas
```

## Utilizzo dell'App

### Inserire Dati

1. **Numero di esami**: Quanti esami devi fare
2. **Media desiderata**: La media che vuoi raggiungere (18-30)
3. **Media attuale** (opzionale): La tua media attuale
4. **Esami superati** (opzionale): Quanti esami hai già passato

### Interpretare i Risultati

- **Verde (🟢 Facile)**: Media ≥ 28 - Facile da raggiungere
- **Giallo (🟡 Medio)**: Media 24-27 - Medio
- **Rosso (🔴 Difficile)**: Media < 24 - Difficile

### Ordinare e Filtrare

- **Ordina per**: Media più alta, numero di esami, voto max/min
- **Filtra per difficoltà**: Mostra solo combinazioni facili, medie o difficili

## Comandi Disponibili

```bash
# Development
npm run dev                    # Avvia frontend e backend
npm run dev --workspace=frontend
npm run dev --workspace=backend

# Build per production
npm run build
npm run build --workspace=frontend
npm run build --workspace=backend

# Production start
npm start
npm start --workspace=backend
```

## Deployment su Vercel

### Prerequisiti
- Repository GitHub
- Account Vercel
- Progetto Supabase creato

### Step 1: Push su GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Connettere a Vercel

1. Vai su https://vercel.com/new
2. Seleziona il repository GitHub
3. Nome progetto: `unigrade`
4. Framework: **Next.js**

### Step 3: Configurare Variabili d'Ambiente

Aggiungi in **Settings → Environment Variables**:

```
NEXT_PUBLIC_SUPABASE_URL=<value>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<value>
SUPABASE_SERVICE_ROLE_KEY=<value>
NEXT_PUBLIC_API_URL=<your-backend-url>
```

### Step 4: Deploy

```bash
# Vercel farà il deploy automaticamente quando fai push
# O manualmente:
vercel deploy --prod
```

## Risoluzione Problemi

### Errore: "Cannot find module 'next'"
```bash
npm install --workspace=frontend
```

### Errore: "SUPABASE_URL not found"
- Controlla che il file `.env` esista e sia configurato correttamente
- Verifica le credenziali Supabase

### Il backend non risponde
- Controlla che la porta 3001 sia libera
- Verifica che il backend sia in esecuzione: `http://localhost:3001/health`

### Errori CORS
- Verifica `NEXT_PUBLIC_API_URL` nel file `.env`
- Controlla che il backend CORS sia configurato correttamente

## Supporto e Contributi

Per segnalare problemi o suggerimenti, apri un'issue su GitHub.

## Risorse

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Express Docs](https://expressjs.com/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
