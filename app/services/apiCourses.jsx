import supabase from "./supabase";

export async function getCourses(id) {
  let { data, error } = await supabase.from("courses").select("*");

  return data;
}

export async function getCourseById(id) {
  let { data, error } = await supabase
    .from("courses")
    .select("*, syllabus_title, syllabus_content")
    .eq("id", id)
    .single();

  return data;
}

export async function getLimitedCourse() {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("id", { ascending: false })
    .limit(4);

  return data;
}
