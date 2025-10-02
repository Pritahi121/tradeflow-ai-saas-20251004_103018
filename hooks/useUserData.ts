'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

interface UserQuota {
  id: string
  user_id: string
  monthly_quota: number
  remaining_credits: number
  monthly_credits: number
}

interface PurchaseOrder {
  id: string
  user_id: string
  po_number: string
  vendor_name?: string
  total_amount: number
  items?: any
  status?: string
  created_at: string
}

interface UserStats {
  totalCredits: number
  usedCredits: number
  remainingCredits: number
  totalPOs: number
  successRate: number
  activeIntegrations: number
}

export const useUserData = () => {
  const { user } = useAuth()
  const [userStats, setUserStats] = useState<UserStats>({
    totalCredits: 0,
    usedCredits: 0,
    remainingCredits: 0,
    totalPOs: 0,
    successRate: 0,
    activeIntegrations: 0
  })
  const [recentPOs, setRecentPOs] = useState<PurchaseOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  const fetchUserData = async () => {
    if (!user) return

    try {
      setLoading(true)

      // Fetch user quota
      const { data: quotaData, error: quotaError } = await supabase
        .from('user_quotas')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (quotaError && quotaError.code !== 'PGRST116') {
        console.error('Error fetching quota:', quotaError)
      }

      // Fetch purchase orders
      const { data: poData, error: poError } = await supabase
        .from('purchase_orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (poError) {
        console.error('Error fetching POs:', poError)
      }

      // Fetch integrations count
      const { data: integrationsData, error: integrationsError } = await supabase
        .from('user_integrations')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)

      if (integrationsError) {
        console.error('Error fetching integrations:', integrationsError)
      }

      // Calculate stats
      const totalPOs = poData?.length || 0
      const completedPOs = poData?.filter(po => po.status === 'completed').length || 0
      const successRate = totalPOs > 0 ? Math.round((completedPOs / totalPOs) * 100) : 0

      setUserStats({
        totalCredits: quotaData?.monthly_quota || 10,
        usedCredits: (quotaData?.monthly_quota || 10) - (quotaData?.remaining_credits || 10),
        remainingCredits: quotaData?.remaining_credits || 10,
        totalPOs,
        successRate,
        activeIntegrations: integrationsData?.length || 0
      })

      setRecentPOs(poData || [])

    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    userStats,
    recentPOs,
    loading,
    refetch: fetchUserData
  }
}
