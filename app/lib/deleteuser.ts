"use server";

import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function deleteUserDatabase({ name, email, clientId, id }: any) {
  console.log(JSON.stringify({ clientId }));
  if (id === undefined || id === null) {
    throw new Error("Id must be defined to delete a user.");
  } 

  try {
    await sql`DELETE FROM reviews WHERE id = ${id}`;
    console.log(`Deleted client with ID: ${id}`);

    const res = await fetch(
      "https://survey-vonway-express-712e61af48e6.herokuapp.com/email/deleteuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, clientId, id }),
      }
    );

    const response = await res.json();
    if (!res.ok) {
      console.log("error");
    }
    return {
      success: true,
      ...response,
      status: res.status,
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
