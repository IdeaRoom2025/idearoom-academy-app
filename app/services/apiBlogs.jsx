import supabase from "./supabase";

export async function getBlogs(id) {
  try {
    let query = supabase.from("blogs").select("*");

    if (id) {
      query = query.eq("id", id);
      const { data, error } = await query.single();

      if (error) throw error;
      return data;
    } else {
      // Order by created_at in descending order
      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
}

export async function getBlog(id) {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw new Error(`Blog with ID ${id} Could Not Be Loaded`);
  }
}
export async function getBlogsLimited(id) {
  try {
    let query = supabase.from("blogs").select("*");

    if (id) {
      query = query.eq("id", id);
      const { data, error } = await query.single();

      if (error) throw error;
      return data;
    } else {
      // Order by created_at in descending order and limit to 4 blogs
      const { data, error } = await query
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
}
