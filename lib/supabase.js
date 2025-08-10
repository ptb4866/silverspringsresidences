import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rajdjzxymkesioyruegv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhamRqenh5bWtlc2lveXJ1ZWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2MTMwNzQsImV4cCI6MjA3MDE4OTA3NH0.sDWrFXcrHpLN1ij7pequfVrQRRd92qb0K99LRW89RaE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
