export async function apiReview() {
  let { data, error } = await supabase.from("review").select("*");

  return data;
}
