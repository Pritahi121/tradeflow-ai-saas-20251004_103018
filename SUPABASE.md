# Supabase Setup Guide

This project includes optional Supabase integration for database functionality.

## 🚀 Quick Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

### 2. Configure Environment Variables
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

Update with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 3. Create Database Table
Run this SQL in your Supabase SQL editor:

```sql
CREATE TABLE examples (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT
);

-- Enable Row Level Security
ALTER TABLE examples ENABLE ROW LEVEL SECURITY;

-- Allow read access to all
CREATE POLICY "Enable read access for all users" ON examples
  FOR SELECT USING (true);

-- Allow insert for all users
CREATE POLICY "Enable insert for all users" ON examples
  FOR INSERT WITH CHECK (true);
```

### 4. Test the Integration
The API endpoint `/api/examples` provides:
- `GET /api/examples` - Fetch all examples
- `POST /api/examples` - Create new example

## 📁 Supabase Files

- `src/lib/supabase.ts` - Supabase client configuration
- `src/app/api/examples/route.ts` - Example API endpoints
- `.env.local.example` - Environment variables template

## 🔧 Usage Examples

### Client-side Usage
```typescript
import { supabase } from '@/lib/supabase'

// Fetch data
const { data, error } = await supabase
  .from('examples')
  .select('*')

// Insert data
const { data, error } = await supabase
  .from('examples')
  .insert([{ name: 'Example', description: 'Test' }])
```

### Server-side Usage
```typescript
import { supabase } from '@/lib/supabase'

// In API routes or Server Components
const { data, error } = await supabase
  .from('examples')
  .select('*')
```

## 🚀 Deployment

### Vercel Environment Variables
Add your Supabase environment variables in Vercel Dashboard:
1. Go to Project Settings
2. Environment Variables
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Auto-Deployment
When you push changes to GitHub, Vercel will automatically:
- Build your application
- Deploy with the updated environment variables
- Update the live site

## 🔒 Security Notes

- The anon key is safe to use in client-side code
- Service role key should only be used server-side
- Enable Row Level Security (RLS) on all tables
- Create appropriate policies for data access

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Database Design](https://supabase.com/docs/guides/database)