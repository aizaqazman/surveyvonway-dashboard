"use server";

import postgres from "postgres";
import { ReviewRow } from "@/components/types";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

export async function saveToDb(rows: ReviewRow[]) {
  try {
    for (const row of rows) {
      await sql`
        INSERT INTO reviews ${sql(row)}
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          email = EXCLUDED.email,
          google_screenshot_url = EXCLUDED.google_screenshot_url,
          trustpilot_screenshot_url = EXCLUDED.trustpilot_screenshot_url,
          submitted_at = EXCLUDED.submitted_at,
          form_status = EXCLUDED.form_status;
      `;
    }

    return { success: true };
  } catch (error) {
    console.error("SaveToDb error:", error);
    return { success: false, error };
  }
}
