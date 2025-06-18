"use server";

import ExcelJS from "exceljs";
import { ReviewRow } from "@/components/types";

type ExtendedReviewRow = ReviewRow & {
  selected?: boolean;
  downloaded?: boolean;
}; 

export async function exportExcel(
  data: ExtendedReviewRow[],
  selectedOnly: boolean,
  startDate: Date | null,
  endDate: Date | null
) {
  let filteredData = selectedOnly ? data.filter((d) => d.selected) : data;

  // Filter by selected date
  if (startDate && endDate) {
    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59, 999);

    // const selectedDateStr = selectedDate.toISOString().split("T")[0];
    filteredData = filteredData.filter((row) => {
      const submittedDate = new Date(row.submitted_at).getTime();
      return (
        submittedDate >= startDate.getTime() &&
        submittedDate <= endOfDay.getTime()
      );
    });
  }

  // Filter out already downloaded entries
  const newData = filteredData.filter((row) => !row.downloaded);

  if (newData.length === 0) return null;

  // Create workbook and worksheet using ExcelJS
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("sheet1");

  // Add headers based on object keys
  const headers = Object.keys(newData[0]).filter(
    (key) => key !== "downloaded" && key !== "selected"
  );
  worksheet.columns = headers.map((key) => ({
    header: key,
    key: key,
    width: 20,
  }));

  // Add data rows
  newData.forEach((row) => {
    const cleanedRow: Record<string, any> = {};
    headers.forEach((key) => {
      cleanedRow[key] = (row as Record<string, any>)[key];
    });
    worksheet.addRow(cleanedRow);
  });

  // Mark rows as downloaded
  newData.forEach((row) => {
    row.downloaded = true;
  });

  // Generate base64 string
  const buffer = await workbook.xlsx.writeBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  return base64;
}
