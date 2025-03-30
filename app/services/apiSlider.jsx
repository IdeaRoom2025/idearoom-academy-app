export async function apiSlider() {
  let { data, error } = await supabase.from("slider").select("*");
}
