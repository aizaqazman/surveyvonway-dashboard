"use server";

import { redirect } from "next/navigation";
import { getSession } from "./session";

export const logOut = async () => {
  const session = await getSession();
  session.destroy();
  console.log(session);
  redirect("/login");
};
