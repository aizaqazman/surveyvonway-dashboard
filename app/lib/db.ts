import postgres from "postgres";
import { PromoRow, ReviewRow } from "@/components/types";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

// Server-side fetching survey
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

// Server-side fetching promo code
export async function fetchPromoClients() {
  try {
    const promo = await sql<PromoRow[]>`
      SELECT * FROM promo_clients
      ORDER BY submitted_at DESC
    `;
    return promo;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch promo clients data.")
  }
}