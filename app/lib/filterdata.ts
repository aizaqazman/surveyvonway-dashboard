import { ReviewRow } from "@/components/types";

export function filterData(
  data: ReviewRow[],
  query: string,
  statusFilter: "all" | "not checked" | "approved" | "rejected"
): ReviewRow[] {
  const lowerQuery = query.toLowerCase();

  return data.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(lowerQuery) ||
      item.email.toLowerCase().includes(lowerQuery) ||
      item.client_id.toLowerCase().includes(lowerQuery);

    const matchesStatus =
      statusFilter === "all" || item.form_status === statusFilter;

    return matchesSearch && matchesStatus;
  });
}
