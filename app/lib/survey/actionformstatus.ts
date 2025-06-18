"use server";

import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

const actionFormStatus = async (id: number, newStatus: string) => {
  try {
    const result = await sql`
			UPDATE reviews
			SET form_status = ${newStatus}
			WHERE id = ${id}
			RETURNING *
		`;

    console.log(`Updated rows: ${result.count}`);
    return result[0];
  } catch (error) {
    console.error("Error updating:", error);
    throw error;
  }
};

export default actionFormStatus;
