# Guida all'Architettura di UniGrade

## Panoramica

UniGrade è un'applicazione full-stack che utilizza:
- **Frontend**: Next.js 14 con React 18
- **Backend**: Express.js con TypeScript
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel (Frontend) + Provider serverless (Backend)

## Architettura del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT BROWSER                        │
├─────────────────────────────────────────────────────────┤
│                   FRONTEND (Next.js)                     │
│  ├─ Pages (app router)                                 │
│  ├─ Components (React)                                 │
│  ├─ API Client (axios)                                 │
│  └─ State Management (React Hooks)                     │
├─────────────────────────────────────────────────────────┤
│                       NETWORK                            │
├─────────────────────────────────────────────────────────┤
│                  BACKEND API (Express)                   │
│  ├─ Routes (/api/*)                                    │
│  ├─ Services (Business Logic)                          │
│  ├─ Supabase Client                                    │
│  └─ CORS Middleware                                    │
├─────────────────────────────────────────────────────────┤
│                       NETWORK                            │
├─────────────────────────────────────────────────────────┤
│              DATABASE (Supabase/PostgreSQL)             │
│  ├─ Tables (users, calculations)                       │
│  ├─ Row Level Security (RLS)                           │
│  └─ Real-time Subscriptions                            │
└─────────────────────────────────────────────────────────┘
```

## Flusso dei Dati

### Calcolo Combinazioni

```
User Input (Form)
    ↓
Frontend Validation
    ↓
API Request → POST /api/calculate
    ↓
Backend Validation
    ↓
Grade Calculator Service
    ↓
Generate Combinations
    ↓
Sort & Filter Results
    ↓
JSON Response
    ↓
Display Results in UI
```

### Salvataggio Calcoli

```
Calculate Results
    ↓
User clicks "Save"
    ↓
API Request → POST /api/save-calculation
    ↓
Backend inserts into Supabase
    ↓
Success Response
    ↓
Show Confirmation
```

## Componenti Principali

### Frontend (`/frontend`)

#### Pages
- `app/page.tsx` - Pagina principale
- `app/layout.tsx` - Layout globale

#### Components
- `GradeForm.tsx` - Form input voti
- `ResultsDisplay.tsx` - Visualizzazione risultati

#### Libraries
- `lib/api.ts` - API client
- `lib/supabase.ts` - Supabase client
- `lib/types.ts` - TypeScript types
- `lib/utils.ts` - Utilità
- `lib/gradeCalculatorService.ts` - Logica calcolo

#### Styles
- `styles/globals.css` - CSS globale
- `components/*.module.css` - CSS moduli

### Backend (`/backend`)

#### Server
- `src/server.ts` - Express app principale

#### Services
- `src/services/gradeCalculator.ts` - Logica calcolo

#### Libraries
- `src/lib/supabase.ts` - Client Supabase

#### Endpoints API
```
GET  /health                           - Health check
POST /api/calculate                    - Calcola combinazioni
POST /api/save-calculation             - Salva calcolo
GET  /api/calculations/:userId         - Recupera calcoli utente
```

### Database (`/supabase`)

#### Tables

**calculations**
```sql
id (UUID)
user_id (TEXT)
num_exams (INTEGER)
desired_mean (DECIMAL)
combinations (JSONB)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

## Algoritmo di Calcolo

L'algoritmo genera tutte le possibili combinazioni di voti che raggiungono la media desiderata.

```typescript
function calculateCombinations(
  numExams,
  desiredMean,
  currentMean?,
  passedExams?
) {
  1. Calcola i punti totali necessari
  2. Se l'utente ha esami già passati:
     - Sottrai i punti già ottenuti
     - Calcola i punti rimasti necessari
  
  3. Genera ricorsivamente tutte le combinazioni:
     - Per ogni voto da 30 a 18
     - Se il voto è compatibile con la media
     - Aggiungi alla lista e continua ricorsivamente
  
  4. Filtra duplicati
  5. Ordina per media più alta
  6. Limita a 1000 risultati
  
  return combinazioni
}
```

## Performance

### Ottimizzazioni
- **Frontend**: CSS Modules per isolamento stili
- **Backend**: Limite risultati a 1000 combinazioni
- **Database**: Indici su user_id e created_at
- **Caching**: Row Level Security

### Complessità Computazionale
- Caso pessimo: O(30^n) dove n = numero esami
- Ogni esame aggiunge 13 possibili voti (18-30)
- Ottimizzato con pruning dell'albero di ricorsione

## Sicurezza

### Frontend
- Validazione input lato client
- Environment variables per credenziali
- HTTPS in produzione

### Backend
- Validazione input lato server
- CORS configurato
- Error handling robusto
- Helmet.js per headers sicuri (opzionale)

### Database
- Row Level Security (RLS) policies
- Service role key per backend
- Anon key con permessi limitati

## Deployment

### Frontend (Vercel)
```
GitHub → Vercel → Build & Deploy
         Auto-deploys on push
```

### Backend Options
1. **Vercel Serverless Functions**
2. **Heroku** (gratuito con limitazioni)
3. **Railway.app**
4. **Render.com**
5. **AWS Lambda + API Gateway**

### Database (Supabase)
- Gestito da Supabase
- Backup automatici
- Upgrade semplice

## Variabili d'Ambiente

### Frontend
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_API_URL
```

### Backend
```
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
NODE_ENV
PORT (opzionale, default 3001)
```

## Estensioni Future

### Phase 1
- [ ] Autenticazione utenti
- [ ] Persistenza calcolazioni
- [ ] Storico di ricerche

### Phase 2
- [ ] Dashboard utente
- [ ] Export PDF/CSV
- [ ] Condivisione risultati
- [ ] Dark mode

### Phase 3
- [ ] Mobile app (React Native)
- [ ] Notifiche via email
- [ ] Statistiche di facoltà
- [ ] AI suggestions

## Stack Tecnologico

### Frontend
- Next.js 14
- React 18
- TypeScript
- CSS Modules
- Axios
- Supabase JS Client

### Backend
- Express.js 4
- TypeScript
- Node.js 18+
- Cors
- Dotenv

### Database
- PostgreSQL (tramite Supabase)
- Row Level Security
- Real-time features

### DevTools
- npm workspaces
- TypeScript
- Git

## Riferimenti

- [Next.js Routing](https://nextjs.org/docs/app/building-your-application/routing)
- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
