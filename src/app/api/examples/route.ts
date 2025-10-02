import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    if (!supabase) {
      return Response.json(
        { error: 'Supabase not configured' },
        { status: 503 }
      )
    }

    const { data, error } = await supabase
      .from('examples')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) throw error

    return Response.json({ data })
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    if (!supabase) {
      return Response.json(
        { error: 'Supabase not configured' },
        { status: 503 }
      )
    }

    const { name, description } = await request.json()

    const { data, error } = await supabase
      .from('examples')
      .insert([{ name, description }])
      .select()

    if (error) throw error

    return Response.json({ data })
  } catch (error) {
    return Response.json(
      { error: 'Failed to create record' },
      { status: 500 }
    )
  }
}