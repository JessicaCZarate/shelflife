import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ctehuxluxuqwpamjrhex.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0ZWh1eGx1eHVxd3BhbWpyaGV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNDY5MzUsImV4cCI6MjA0NDYyMjkzNX0.7PvIM-hGswKUY8ROvNySXVLXoZnzifuV8uLfC_Ir088",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
