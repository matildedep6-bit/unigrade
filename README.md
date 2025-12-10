# UniGrade

Calcola tutte le possibili combinazioni di voti universitari per raggiungere la media desiderata!

## 📋 Descrizione

UniGrade è un'applicazione full-stack che permette agli studenti universitari di:
- Inserire il numero di esami da affrontare in un semestre
- Specificare la media desiderata (18-30)
- Visualizzare tutte le possibili combinazioni di voti per raggiungere quell'obiettivo
- Filtrare e ordinare le combinazioni per difficoltà

## 🏗️ Architettura

```
unigrade/
├── frontend/                 # Next.js React App (port 3000)
│   ├── app/                  # Next.js App Router
│   ├── components/           # React Components
│   ├── lib/                  # Utilities & API client
│   ├── styles/               # CSS modules
│   └── package.json
├── backend/                  # Express API (port 3001)
│   ├── src/
│   │   ├── server.ts         # Express app
│   │   ├── lib/supabase.ts   # Supabase client
│   │   └── services/         # Business logic
│   └── package.json
├── supabase/                 # Supabase config
│   ├── migrations/           # SQL migrations
│   └── config.json
├── vercel.json              # Vercel deployment config
├── .env.example             # Environment variables template
└── package.json             # Root workspace config
```

## 🚀 Installazione Locale

### Prerequisiti
- Node.js 18+ 
- npm o yarn
- Account Supabase (gratuito su https://supabase.com)

### Setup Supabase

1. Crea un progetto su Supabase: https://app.supabase.com
2. Copia le credenziali nel file `.env`
3. Esegui le migrazioni SQL nella console Supabase

### Setup Progetto

1. **Clone e installa dipendenze**
   ```bash
   cd unigrade
   cp .env.example .env
   npm install
   npm install --workspace=frontend
   npm install --workspace=backend
   ```

2. **Configura variabili d'ambiente (.env)**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NODE_ENV=development
   ```

3. **Avvia i server di sviluppo**
   ```bash
   # Terminal 1: Backend
   npm run dev --workspace=backend
   
   # Terminal 2: Frontend
   npm run dev --workspace=frontend
   ```

4. **Accedi all'app**
   ```
   Frontend: http://localhost:3000
   Backend API: http://localhost:3001
   ```

## 📊 Utilizzo

1. **Inserisci i dati**
   - Numero di esami da fare
   - Media desiderata (18-30)
   - (Opzionale) Media attuale e esami già superati

2. **Visualizza risultati**
   - Tutte le combinazioni di voti possibili
   - Ordina per media, difficoltà, voto minimo/massimo
   - Filtra per livello di difficoltà (facile/medio/difficile)

3. **Interpreta i risultati**
   - Verde 🟢: Facile (media ≥ 28)
   - Giallo 🟡: Medio (24-27)
   - Rosso 🔴: Difficile (< 24)

## 🔌 API Endpoints

### POST /api/calculate
Calcola tutte le combinazioni di voti

**Request:**
```json
{
  "num_exams": 5,
  "desired_mean": 25,
  "current_mean": 23.5,
  "passed_exams": 3
}
```

**Response:**
```json
{
  "success": true,
  "combinations": [
    {
      "grades": [28, 27, 26],
      "mean": 27
    }
  ],
  "totalCombinations": 150
}
```

### POST /api/save-calculation
Salva un calcolo nel database

**Request:**
```json
{
  "user_id": "user123",
  "num_exams": 5,
  "desired_mean": 25,
  "combinations": [...]
}
```

### GET /api/calculations/:userId
Recupera i calcoli salvati di un utente

## 🚀 Deployment su Vercel

### Step 1: Prepara il repository

```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Configura Vercel

1. Vai su https://vercel.com/new
2. Connetti il repository GitHub
3. Seleziona "UniGrade" come nome del progetto
4. Configura le variabili d'ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_API_URL`

### Step 3: Deploy

```bash
vercel deploy --prod
```

## 📦 Tecnologie Utilizzate

### Frontend
- **Next.js 14**: Framework React
- **React 18**: UI library
- **TypeScript**: Type safety
- **CSS Modules**: Styling
- **@supabase/supabase-js**: Database client
- **axios**: HTTP client

### Backend
- **Express.js**: Web framework
- **Node.js**: Runtime
- **TypeScript**: Type safety
- **@supabase/supabase-js**: Database client
- **CORS**: Cross-Origin Resource Sharing

### Database
- **Supabase/PostgreSQL**: Cloud database
- **Row Level Security**: Data protection

### Deployment
- **Vercel**: Hosting
- **GitHub**: Version control

## 🔐 Sicurezza

- Environment variables per credenziali sensibili
- Row Level Security (RLS) su Supabase
- CORS configurato
- Input validation su frontend e backend
- SQL migrations per schema database

## 🛠️ Sviluppo Futuro

- [ ] Autenticazione utenti
- [ ] Dashboard con cronologia
- [ ] Export risultati (PDF/CSV)
- [ ] Notifiche e reminder
- [ ] Statistiche per facoltà
- [ ] Mobile app

## 📝 Licenza

MIT

## 🤝 Supporto

Per problemi e domande: [Issues GitHub]

## 📚 Risorse Utili

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Vercel Documentation](https://vercel.com/docs)

---

**Made with ❤️ by UniGrade Team**