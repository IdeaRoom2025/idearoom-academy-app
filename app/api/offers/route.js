import { NextResponse } from "next/server";
import supabase from "../../services/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase.from("offered_course").select("*");

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch offers" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    ); 
  }
}
