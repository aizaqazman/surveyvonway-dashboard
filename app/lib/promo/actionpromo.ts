"use server";

import postgres from "postgres";
import { revalidatePath } from "next/cache";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

export async function deletePromo(id: number) {
  try {
    await sql`
      DELETE FROM promo_clients 
      WHERE id = ${id}
    `;

    revalidatePath("/promo");
    return { success: "Promo client deleted successfully" };
  } catch (error) {
    console.error("Delete Error:", error);
    return { error: "Server error!" };
  }
}

export async function editPromo(data: {
  id: number;
  email: string;
  client_id: string;
  eligible: boolean;
  status: string;
  promo_code: string;
}) {
  try {
    await sql`
      UPDATE promo_clients
      SET 
        email = ${data.email},
        client_id = ${data.client_id},
        eligible = ${data.eligible},
        status =  ${data.status},
        promo_code = ${data.promo_code}
      WHERE id = ${data.id}
    `;

    revalidatePath("/promo");
    return { success: "Promo client update successfully" };
  } catch (error) {
    console.error("Update Error:", error);
    return { error: "Server error!" };
  }
}

export async function getPromoById(id: number) {
  try {
    const result = await sql`
      SELECT * FROM promo_clients WHERE id = ${id}
    `;
    return result[0];
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}