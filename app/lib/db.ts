import postgres from "postgres";
import { ReviewRow } from "@/components/types";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

// Server-side fetching
export async function fetchReview() {
  try {
    const data = await sql<ReviewRow[]>`
      SELECT * FROM reviews
      ORDER BY submitted_at DESC
    `; 
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch review data.");
  }
}
