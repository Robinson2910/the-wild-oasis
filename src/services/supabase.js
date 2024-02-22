import { createClient } from "@supabase/supabase-js";
export const supabaseUrl =
  "https://kqidpyhldqypibzamslb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxaWRweWhsZHF5cGliemFtc2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0MTM0MjQsImV4cCI6MjAyMDk4OTQyNH0.V5k-2H2s48xA0VzM4mvB0m424L5TenKNL034O6jdcfw";
const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

export default supabase;
