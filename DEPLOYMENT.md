# Deployment Configuration for Vercel

## Frontend Build Configuration

The frontend is built using Next.js and will be automatically deployed to Vercel.

### Build Settings:
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`
- **Output Directory**: `.next`

### Environment Variables Required:
```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
NEXT_PUBLIC_API_URL=<your-vercel-backend-url>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

## Backend Deployment

For production, the backend API should be deployed to:

### Option 1: Vercel Serverless Functions
```bash
npm run build --workspace=backend
```

### Option 2: Other Platforms
- Heroku
- Railway
- Render
- AWS Lambda
- Google Cloud Functions
- Azure Functions

### Backend Port Configuration:
- Development: `http://localhost:3001`
- Production: Use environment variable `NEXT_PUBLIC_API_URL`

## Database Migration

Run migrations on Supabase after deployment:

1. Go to Supabase Dashboard
2. Open SQL Editor
3. Run the SQL from `supabase/migrations/001_init_schema.sql`

## Environment Variables Setup in Vercel:

1. Project Settings → Environment Variables
2. Add the following:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_API_URL`

## Production Checklist:

- [ ] Supabase project created
- [ ] Database migrations applied
- [ ] Vercel account created
- [ ] Environment variables configured
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] Domain configured (optional)
- [ ] SSL/TLS enabled

## Troubleshooting:

1. **API not responding**: Check `NEXT_PUBLIC_API_URL` environment variable
2. **Database errors**: Verify Supabase credentials
3. **CORS issues**: Check CORS configuration in backend
4. **Build failures**: Check build logs in Vercel dashboard
