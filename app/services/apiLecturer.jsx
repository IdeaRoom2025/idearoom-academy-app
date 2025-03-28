"use client";

import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with debugging
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Log environment variables (redacted for security)
console.log("Supabase URL configured:", supabaseUrl ? "Yes ✓" : "No ✗");
console.log("Supabase Key configured:", supabaseKey ? "Yes ✓" : "No ✗");

// Create Supabase client
let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log("Supabase client created successfully");
} catch (error) {
  console.error("Failed to create Supabase client:", error);
}

// Function to fetch all lecturers with enhanced error handling
export async function getAllLecturers() {
  console.log("getAllLecturers called");

  // Check if Supabase client is initialized
  if (!supabase) {
    console.error("Supabase client not initialized");
    return [];
  }

  try {
    console.log("Attempting to fetch lecturers from Supabase...");

    // First check if the table exists by trying to count rows
    const { count, error: countError } = await supabase
      .from("lecturers")
      .select("*", { count: "exact", head: true });

    if (countError) {
      console.error("Error checking lecturer table:", countError);
      // Check if the error is about the table not existing
      if (countError.message.includes("does not exist")) {
        console.error("The 'lecturer' table does not exist in your database");
      }
      return [];
    }

    console.log(`Table exists. Count query returned: ${count} rows`);

    // Now fetch the actual data
    const { data, error } = await supabase
      .from("lecturers")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching lecturers data:", error);
      return [];
    }

    console.log(`Successfully fetched ${data?.length || 0} lecturers:`, data);
    return data || [];
  } catch (error) {
    console.error("Unexpected error in getAllLecturers:", error);
    return [];
  }
}

// Test function to verify table schema
export async function checkLecturerTableSchema() {
  try {
    const { data, error } = await supabase.rpc("get_table_info", {
      table_name: "lecturers",
    });

    if (error) {
      console.error("Error checking table schema:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in checkLecturerTableSchema:", error);
    return null;
  }
}
