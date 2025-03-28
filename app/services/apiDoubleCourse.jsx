import supabase from "./supabase";

export async function apiDoubleCourse() {
  try {
    const { data, error } = await supabase.from("offered_course").select("*");

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
}
