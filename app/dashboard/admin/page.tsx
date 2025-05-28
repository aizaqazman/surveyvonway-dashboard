import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminPage() {
  // Protect the page from users who are not admins
  const isAdmin = await checkRole("admin");
  if (!isAdmin) {
    redirect("/dashboard");
  }
  return (
    <div className="">
      <h1>Only admin can see this page</h1>
    </div>
  );
}
