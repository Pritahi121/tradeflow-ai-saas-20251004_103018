-- Create table for storing Google OAuth tokens and integration status
CREATE TABLE IF NOT EXISTS public.google_integrations_2025_10_04_05_05 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    google_oauth_token TEXT, -- Encrypted OAuth tokens
    gmail_connected BOOLEAN DEFAULT FALSE,
    sheets_connected BOOLEAN DEFAULT FALSE,
    refresh_token_encrypted TEXT, -- Encrypted refresh token
    token_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.google_integrations_2025_10_04_05_05 ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own integrations" ON public.google_integrations_2025_10_04_05_05
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own integrations" ON public.google_integrations_2025_10_04_05_05
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own integrations" ON public.google_integrations_2025_10_04_05_05
    FOR UPDATE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_google_integrations_updated_at 
    BEFORE UPDATE ON public.google_integrations_2025_10_04_05_05 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();