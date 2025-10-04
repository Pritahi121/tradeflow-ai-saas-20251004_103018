import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, X-Client-Info, apikey, Content-Type, X-Application-Name',
}

// Encryption utilities
async function encryptAESGCM(plaintext: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(Deno.env.get('ENCRYPTION_KEY') || 'default-32-char-key-for-encryption'),
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  )
  
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encoded = new TextEncoder().encode(plaintext)
  
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  )
  
  const combined = new Uint8Array(iv.length + encrypted.byteLength)
  combined.set(iv)
  combined.set(new Uint8Array(encrypted), iv.length)
  
  return btoa(String.fromCharCode(...combined))
}

async function decryptAESGCM(encryptedData: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(Deno.env.get('ENCRYPTION_KEY') || 'default-32-char-key-for-encryption'),
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  )
  
  const combined = new Uint8Array(atob(encryptedData).split('').map(c => c.charCodeAt(0)))
  const iv = combined.slice(0, 12)
  const encrypted = combined.slice(12)
  
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encrypted
  )
  
  return new TextDecoder().decode(decrypted)
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const pathname = url.pathname

    // Initialize Supabase client with service role key
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Handle Google OAuth callback
    if (pathname.includes('/integrations-google-callback')) {
      return await handleGoogleCallback(req, supabase)
    }

    // Handle token refresh
    if (pathname.includes('/refresh-google-token')) {
      return await handleTokenRefresh(req, supabase)
    }

    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { 
        status: 404, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

async function handleGoogleCallback(req: Request, supabase: any) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const error = url.searchParams.get('error')

  if (error) {
    console.error('OAuth error:', error)
    return Response.redirect(`${Deno.env.get('APP_URL') || 'http://localhost:3000'}/integrations?error=oauth_error`, 302)
  }

  if (!code || !state) {
    console.error('Missing code or state parameter')
    return Response.redirect(`${Deno.env.get('APP_URL') || 'http://localhost:3000'}/integrations?error=missing_params`, 302)
  }

  try {
    // Parse state parameter
    const stateData = JSON.parse(decodeURIComponent(state))
    const { user_id, service, return_url } = stateData

    if (!user_id || !service) {
      throw new Error('Invalid state parameter')
    }

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: Deno.env.get('GOOGLE_CLIENT_ID') ?? '',
        client_secret: Deno.env.get('GOOGLE_CLIENT_SECRET') ?? '',
        redirect_uri: `${Deno.env.get('SUPABASE_URL')}/functions/v1/tradeflow-gateway-2025-10-04-05-05/integrations-google-callback`,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error('Token exchange failed:', errorData)
      throw new Error('Failed to exchange code for tokens')
    }

    const tokens = await tokenResponse.json()
    
    // Encrypt tokens
    const encryptedAccessToken = await encryptAESGCM(tokens.access_token)
    const encryptedRefreshToken = tokens.refresh_token ? await encryptAESGCM(tokens.refresh_token) : null

    // Calculate expiry time
    const expiresAt = new Date(Date.now() + (tokens.expires_in * 1000))

    // Update or insert integration record
    const updateData = {
      google_oauth_token: encryptedAccessToken,
      refresh_token_encrypted: encryptedRefreshToken,
      token_expires_at: expiresAt.toISOString(),
      [service === 'gmail' ? 'gmail_connected' : 'sheets_connected']: true,
      updated_at: new Date().toISOString()
    }

    // First try to update existing record
    const { data: existingData, error: fetchError } = await supabase
      .from('google_integrations_2025_10_04_05_05')
      .select('id')
      .eq('user_id', user_id)
      .single()

    if (existingData) {
      // Update existing record
      const { error: updateError } = await supabase
        .from('google_integrations_2025_10_04_05_05')
        .update(updateData)
        .eq('user_id', user_id)

      if (updateError) {
        console.error('Database update error:', updateError)
        throw new Error('Failed to update integration record')
      }
    } else {
      // Insert new record
      const { error: insertError } = await supabase
        .from('google_integrations_2025_10_04_05_05')
        .insert({
          user_id,
          ...updateData
        })

      if (insertError) {
        console.error('Database insert error:', insertError)
        throw new Error('Failed to create integration record')
      }
    }

    // Redirect back to app with success
    const redirectUrl = return_url || `${Deno.env.get('APP_URL') || 'http://localhost:3000'}/integrations`
    return Response.redirect(`${redirectUrl}?success=true`, 302)

  } catch (error) {
    console.error('Callback handling error:', error)
    return Response.redirect(`${Deno.env.get('APP_URL') || 'http://localhost:3000'}/integrations?error=callback_failed`, 302)
  }
}

async function handleTokenRefresh(req: Request, supabase: any) {
  try {
    const { user_id } = await req.json()

    if (!user_id) {
      throw new Error('User ID is required')
    }

    // Get current integration
    const { data: integration, error: fetchError } = await supabase
      .from('google_integrations_2025_10_04_05_05')
      .select('refresh_token_encrypted')
      .eq('user_id', user_id)
      .single()

    if (fetchError || !integration?.refresh_token_encrypted) {
      throw new Error('No refresh token found')
    }

    // Decrypt refresh token
    const refreshToken = await decryptAESGCM(integration.refresh_token_encrypted)

    // Refresh access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id: Deno.env.get('GOOGLE_CLIENT_ID') ?? '',
        client_secret: Deno.env.get('GOOGLE_CLIENT_SECRET') ?? '',
        grant_type: 'refresh_token',
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to refresh token')
    }

    const tokens = await tokenResponse.json()
    
    // Encrypt new access token
    const encryptedAccessToken = await encryptAESGCM(tokens.access_token)
    const expiresAt = new Date(Date.now() + (tokens.expires_in * 1000))

    // Update database
    const { error: updateError } = await supabase
      .from('google_integrations_2025_10_04_05_05')
      .update({
        google_oauth_token: encryptedAccessToken,
        token_expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user_id)

    if (updateError) {
      throw new Error('Failed to update tokens')
    }

    return new Response(
      JSON.stringify({ success: true, expires_at: expiresAt.toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Token refresh error:', error)
    return new Response(
      JSON.stringify({ error: 'Token refresh failed', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
}