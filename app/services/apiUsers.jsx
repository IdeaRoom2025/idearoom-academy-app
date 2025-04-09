import supabase from "./supabase";

// Check if a user with the given social ID already exists
export async function checkSocialIdExists(socialId) {
  const { data, error } = await supabase
    .from("users_form")
    .select("socialId")
    .eq("socialId", socialId)
    .limit(1);

  if (error) {
    console.error("Error checking social ID:", error);
    throw new Error("დროებითი შეფერხება, გთხოვთ სცადოთ მოგვიანებით");
  }

  return data && data.length > 0;
}

// Create a new user in the "users_form" table (a regular table, not the auth table)
export async function createUser(userData) {
  // Validate that socialId is exactly 11 digits
  if (!/^\d{11}$/.test(userData.socialId)) {
    throw new Error("პირადი ნომერი უნდა შეიცავდეს ზუსტად 11 ციფრს");
  }

  // Check if user with this social ID already exists
  const exists = await checkSocialIdExists(userData.socialId);
  if (exists) {
    throw new Error(
      "მოცემული პირადი ნომრით მომხმარებელი უკვე დარეგისტრირებულია"
    );
  }

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
