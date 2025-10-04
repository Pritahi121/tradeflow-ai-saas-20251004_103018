'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Mail, FileSpreadsheet, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import { useToast } from '../hooks/use-toast'
interface GoogleIntegration {
  id: string
  user_id: string
  gmail_connected: boolean
  sheets_connected: boolean
  created_at: string
  updated_at: string
}

export default function GoogleConnectButton() {
  const [user, setUser] = useState<any>(null)
  const [integration, setIntegration] = useState<GoogleIntegration | null>(null)
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState<'gmail' | 'sheets' | null>(null)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { toast } = useToast()

  useEffect(() => {
    // Get current user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        // Fetch integration status
        const { data, error } = await supabase
          .from('google_integrations_2025_10_04_05_05')
          .select('*')
          .eq('user_id', user.id)
          .single()
        
        if (data) {
          setIntegration(data)
        }
      }
      setLoading(false)
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          // Fetch integration status for new user
          const { data } = await supabase
            .from('google_integrations_2025_10_04_05_05')
            .select('*')
            .eq('user_id', session.user.id)
            .single()
          
          if (data) {
            setIntegration(data)
          }
        } else {
          setUser(null)
          setIntegration(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleGoogleConnect = (service: 'gmail' | 'sheets') => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to connect your Google account",
        variant: "destructive",
      })
      return
    }

    setConnecting(service)

    // Google OAuth configuration
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'your-google-client-id'
    const redirectUri = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/tradeflow-gateway-2025-10-04-05-05/integrations-google-callback`
    
    const scopes = service === 'gmail' 
      ? ['https://www.googleapis.com/auth/gmail.readonly']
      : ['https://www.googleapis.com/auth/spreadsheets']

    // Include user ID in state parameter for identification
    const state = JSON.stringify({
      user_id: user.id,
      service: service,
      return_url: window.location.origin + '/integrations'
    })

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `response_type=code` +
      `&client_id=${googleClientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scopes.join(' '))}` +
      `&access_type=offline` +
      `&prompt=consent` +
      `&state=${encodeURIComponent(state)}`

    // Redirect to Google OAuth
    window.location.href = authUrl
  }

  const handleDisconnect = async (service: 'gmail' | 'sheets') => {
    if (!user || !integration) return

    const updateData = service === 'gmail' 
      ? { gmail_connected: false }
      : { sheets_connected: false }

    const { error } = await supabase
      .from('google_integrations_2025_10_04_05_05')
      .update(updateData)
      .eq('user_id', user.id)

    if (error) {
      toast({
        title: "Error",
        description: `Failed to disconnect ${service}`,
        variant: "destructive",
      })
    } else {
      setIntegration(prev => prev ? { ...prev, ...updateData } : null)
      toast({
        title: "Success",
        description: `${service === 'gmail' ? 'Gmail' : 'Google Sheets'} disconnected successfully`,
      })
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading Google Integrations...
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  if (!user) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Google Integrations</CardTitle>
          <CardDescription>
            Please sign in to connect your Google services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Authentication required</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Google Integrations</CardTitle>
        <CardDescription>
          Connect your Google services to enable data processing and automation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gmail Integration */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Mail className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold">Gmail</h3>
              <p className="text-sm text-muted-foreground">
                Access your emails for PO extraction
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {integration?.gmail_connected ? (
              <>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDisconnect('gmail')}
                >
                  Disconnect
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => handleGoogleConnect('gmail')}
                disabled={connecting === 'gmail'}
                className="bg-red-600 hover:bg-red-700"
              >
                {connecting === 'gmail' ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Connect Gmail'
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Google Sheets Integration */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileSpreadsheet className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Google Sheets</h3>
              <p className="text-sm text-muted-foreground">
                Export processed data to your spreadsheets
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {integration?.sheets_connected ? (
              <>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDisconnect('sheets')}
                >
                  Disconnect
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => handleGoogleConnect('sheets')}
                disabled={connecting === 'sheets'}
                className="bg-green-600 hover:bg-green-700"
              >
                {connecting === 'sheets' ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Connect Sheets'
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Status Information */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Integration Status</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Gmail:</span>
              <span className={`ml-2 ${integration?.gmail_connected ? 'text-green-600' : 'text-muted-foreground'}`}>
                {integration?.gmail_connected ? 'Connected' : 'Not Connected'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Sheets:</span>
              <span className={`ml-2 ${integration?.sheets_connected ? 'text-green-600' : 'text-muted-foreground'}`}>
                {integration?.sheets_connected ? 'Connected' : 'Not Connected'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}