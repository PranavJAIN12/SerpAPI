
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://drusaatdnkxoswesxfsx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRydXNhYXRkbmt4b3N3ZXN4ZnN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxMDExNTMsImV4cCI6MjA0NDY3NzE1M30.njk8MRvIR3Azbsm6Z7w3IFhhB9pI0tET6-_PVpa8eSo'
export const supabase = createClient(supabaseUrl, supabaseKey)