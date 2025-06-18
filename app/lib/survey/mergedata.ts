import { ReviewRow } from "@/components/types";

export function mergeData(
  existing: ReviewRow[],
  uploaded: ReviewRow[]
): ReviewRow[] {
  const map = new Map(existing.map((row) => [row.client_id, row]));
  uploaded.forEach((row) => {
    map.set(row.client_id, row);
  });
  return Array.from(map.values());
}
