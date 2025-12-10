# UniGrade - Project Structure Summary

## 📁 Directory Structure

```
unigrade/
│
├── 📄 README.md                    # Documentazione principale
├── 📄 GETTING_STARTED.md           # Guida di avvio
├── 📄 ARCHITECTURE.md              # Documentazione architettura
├── 📄 API_DOCUMENTATION.md         # Documentazione API
├── 📄 DEPLOYMENT.md                # Guida deployment
├── 📄 CONTRIBUTING.md              # Guida contribuzioni
├── 📄 LICENSE                      # MIT License
├── 📄 package.json                 # Root workspace config
├── 📄 .env.example                 # Variabili d'ambiente template
├── 📄 .gitignore                   # Git ignore
├── 📄 vercel.json                  # Configurazione Vercel
│
├── 📂 frontend/                    # Next.js Application
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   ├── 📄 next.config.js
│   ├── 📄 next-env.d.ts
│   ├── 📄 .gitignore
│   ├── 📄 middleware.ts
│   │
│   ├── 📂 app/                     # Next.js App Router
│   │   ├── 📄 page.tsx             # Pagina principale
│   │   ├── 📄 layout.tsx           # Layout globale
│   │   └── 📂 api/                 # API Routes (se necessarie)
│   │
│   ├── 📂 components/              # React Components
│   │   ├── 📄 GradeForm.tsx
│   │   ├── 📄 GradeForm.module.css
│   │   ├── 📄 ResultsDisplay.tsx
│   │   └── 📄 ResultsDisplay.module.css
│   │
│   ├── 📂 lib/                     # Utilities & Services
│   │   ├── 📄 api.ts               # API Client
│   │   ├── 📄 supabase.ts          # Supabase Client
│   │   ├── 📄 types.ts             # TypeScript Types
│   │   ├── 📄 utils.ts             # Utility Functions
│   │   └── 📄 gradeCalculatorService.ts
│   │
│   └── 📂 styles/                  # Global Styles
│       └── 📄 globals.css
│
├── 📂 backend/                     # Express.js API Server
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   ├── 📄 .env.example
│   ├── 📄 .gitkeep
│   │
│   ├── 📂 src/
│   │   ├── 📄 server.ts            # Express App & Routes
│   │   │
│   │   ├── 📂 lib/
│   │   │   └── 📄 supabase.ts      # Supabase Client
│   │   │
│   │   ├── 📂 services/
│   │   │   └── 📄 gradeCalculator.ts
│   │   │
│   │   └── 📂 api/                 # API Endpoints (struttura future)
│   │
│   └── 📂 dist/                    # Compiled JavaScript (build)
│
├── 📂 supabase/                    # Database Configuration
│   ├── 📄 config.json
│   ├── 📄 seed.sql
│   │
│   └── 📂 migrations/
│       └── 📄 001_init_schema.sql  # Initial Database Schema
│
└── 📄 setup.sh                     # Setup script

```

## 📊 File Counts

- **TypeScript Files**: 15
- **React Components**: 2
- **CSS Files**: 3
- **Configuration Files**: 12
- **Documentation Files**: 7
- **Total Files**: ~40

## 🎯 Key Files by Purpose

### Configuration
- `package.json` - Root dependencies
- `frontend/package.json` - Frontend dependencies
- `backend/package.json` - Backend dependencies
- `vercel.json` - Vercel deployment config
- `.env.example` - Environment template

### Frontend Application
- `frontend/app/page.tsx` - Main UI page
- `frontend/components/GradeForm.tsx` - Input form
- `frontend/components/ResultsDisplay.tsx` - Results view
- `frontend/lib/api.ts` - API communication

### Backend API
- `backend/src/server.ts` - Express server & routes
- `backend/src/services/gradeCalculator.ts` - Core logic

### Database
- `supabase/migrations/001_init_schema.sql` - Database schema

### Documentation
- `README.md` - Main documentation
- `GETTING_STARTED.md` - Quick start guide
- `ARCHITECTURE.md` - System architecture
- `API_DOCUMENTATION.md` - API reference
- `DEPLOYMENT.md` - Deployment guide

## 🔄 Workflow Files

```
User Input (Frontend)
    ↓
App/page.tsx (React Component)
    ↓
lib/api.ts (API Client)
    ↓
HTTP POST to Backend
    ↓
server.ts (Express Route Handler)
    ↓
gradeCalculator.ts (Business Logic)
    ↓
JSON Response
    ↓
ResultsDisplay.tsx (Show Results)
```

## 📦 Dependencies

### Frontend
- next@^14.0.0
- react@^18.2.0
- @supabase/supabase-js@^2.38.0
- axios@^1.6.0
- recharts@^2.10.0 (for future charts)

### Backend
- express@^4.18.2
- cors@^2.8.5
- @supabase/supabase-js@^2.38.0
- dotenv@^16.3.1

### Development
- typescript@^5.3.0
- @types/node@^20.0.0
- ts-node@^10.9.1

## 🚀 Getting Started

1. **Install dependencies**: `npm install`
2. **Copy .env**: `cp .env.example .env`
3. **Add credentials**: Edit `.env` with Supabase credentials
4. **Run development**: `npm run dev`

## 📚 Documentation Map

- **For Users**: `README.md`
- **For Developers**: `GETTING_STARTED.md`
- **Architecture Details**: `ARCHITECTURE.md`
- **API Usage**: `API_DOCUMENTATION.md`
- **Deployment**: `DEPLOYMENT.md`
- **Contributing**: `CONTRIBUTING.md`

## 🔐 Security Files

- `.env.example` - Template (commit this)
- `.env` - Local secrets (don't commit)
- `.gitignore` - Prevent committing secrets
- Supabase RLS policies in migrations

## 📈 Project Stats

- **Lines of Code**: ~3,000+
- **Components**: 2
- **Pages**: 1
- **API Endpoints**: 4
- **Database Tables**: 1 (+ users for future)

---

Last updated: December 10, 2024
