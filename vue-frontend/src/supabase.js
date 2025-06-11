import { createClient } from '@supabase/supabase-js'

// Direct Supabase configuration with predefined project ID
// We're using the project ID directly from the URL without extraction

// Initialize Supabase client with the project URL and anon key
// These values are from the Supabase dashboard -> Project Settings -> API
const supabaseUrl = 'https://kronysziizrzkjdhbfee.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyb255c3ppaXpyemtqZGhiZmVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NTQyNDQsImV4cCI6MjA2NTAzMDI0NH0.oSO0z1oWgcqIS6-ph698Jg7x-UOjo2Ay88cccaO96bI'

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
