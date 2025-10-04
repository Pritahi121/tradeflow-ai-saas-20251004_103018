# Google API Integration Setup Guide

## Required Environment Variables

Add these to your `.env.local` file and Vercel environment variables:

### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### Google OAuth Configuration
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### App Configuration
```
APP_URL=https://your-vercel-app-url.vercel.app
```

### Encryption Key (32 characters)
```
ENCRYPTION_KEY=your-32-character-encryption-key-here
```

## Google Cloud Console Setup

### 1. Enable APIs
- Go to Google Cloud Console → APIs & Services → Library
- Enable **Gmail API**
- Enable **Google Sheets API**

### 2. OAuth Consent Screen
- Go to OAuth consent screen
- Add these scopes:
  - `https://www.googleapis.com/auth/gmail.readonly`
  - `https://www.googleapis.com/auth/spreadsheets`

### 3. Credentials
- Go to Credentials → OAuth 2.0 Client IDs
- Add authorized redirect URI:
  ```
  https://your-supabase-project.supabase.co/functions/v1/tradeflow-gateway-2025-10-04-05-05/integrations-google-callback
  ```

## Database Setup

The database schema has been created with the migration file:
`supabase/migrations/google_integration_schema_2025_10_04_05_05.sql`

## Edge Function

The Edge Function is located at:
`supabase/functions/tradeflow-gateway-2025-10-04-05-05/index.ts`

## Frontend Components

- **GoogleConnectButton**: `/src/components/GoogleConnectButton.tsx`
- **Integrations Page**: `/src/app/integrations/page.tsx`

## Usage Flow

1. User clicks "Connect Gmail" or "Connect Google Sheets"
2. Redirects to Google OAuth
3. User authorizes access
4. Google redirects to Edge Function callback
5. Edge Function exchanges code for tokens
6. Tokens are encrypted and stored in database
7. User is redirected back to integrations page with success message

## Security Features

- All OAuth tokens are encrypted using AES-GCM
- Refresh tokens are stored separately and encrypted
- Row Level Security (RLS) policies protect user data
- Service role key used only in Edge Functions