import { createClient } from '@/lib/supabase/client'

/**
 * Test database connection
 */
export async function testConnection() {
  try {
    const supabase = createClient()
    
    // Test basic connection with a simple auth check
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Connection test failed:', error)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Supabase connection successful!')
    return { success: true, message: 'Connection successful', session: data.session }
  } catch (error) {
    console.error('Connection test error:', error)
    return { success: false, error: (error as Error).message }
  }
}

/**
 * Get current user session
 */
export async function getCurrentUser() {
  try {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('Get user error:', error)
      return { user: null, error: error.message }
    }
    
    return { user, error: null }
  } catch (error) {
    console.error('Get user error:', error)
    return { user: null, error: (error as Error).message }
  }
}

/**
 * Test database table access
 */
export async function testDatabaseTables() {
  try {
    const supabase = createClient()
    
    // Try to access the users table (should exist based on your schema)
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .limit(1)
    
    if (error) {
      console.error('Database table test failed:', error)
      return { success: false, error: error.message, details: error }
    }
    
    console.log('✅ Database table access successful!')
    return { success: true, message: 'Database tables accessible', data }
  } catch (error) {
    console.error('Database table test error:', error)
    return { success: false, error: (error as Error).message }
  }
}

/**
 * Test RPC function (simple health check)
 */
export async function testRPCConnection() {
  try {
    const supabase = createClient()
    
    // Test with a simple SQL query via RPC
    const { data, error } = await supabase.rpc('version')
    
    if (error) {
      console.log('RPC test info:', error.message)
      return { success: false, error: error.message, note: 'RPC function might not exist, this is normal' }
    }
    
    return { success: true, message: 'RPC connection successful', data }
  } catch (error) {
    return { success: false, error: (error as Error).message, note: 'RPC test failed, this might be normal' }
  }
}
