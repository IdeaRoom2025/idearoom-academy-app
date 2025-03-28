import supabase from "./supabase";

// Create a new user in the "users_form" table (a regular table, not the auth table)
export async function createUser(userData) {
  console.log("Creating user with data:", userData);
  const { data, error } = await supabase.from("users_form").insert(
    [
      {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        birth_date: userData.birth_date,
        socialId: userData.socialId,
        choosedCourse: userData.choosedCourse,
        choosedMedia: userData.choosedMedia,
        created_at: new Date().toISOString(),
      },
    ],
    { returning: "minimal" }
  );

  if (error && Object.keys(error).length > 0) {
    console.error("Detailed error:", error);
    throw new Error(error.message || "Unknown error occurred");
  }

  return data;
}
