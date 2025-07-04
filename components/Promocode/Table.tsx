"use client";

import React, { useState } from "react";
import { deletePromo } from "@/app/lib/promo/actionpromo";
import Link from "next/link";
import SearchPromo from "./SearchPromo";

// Define the shape of a redemption record
interface Redemption {
  id: number;
  email: string;
  client_id: string;
  eligible: boolean;
  total_amount: string;
  status: string;
  promo_code: string;
  submitted_at: Date;
  claim_month: Date;
}

interface TablePromoProps {
  redemptions: Redemption[];
  currentPage: number;
  itemsPerPage: number;
}

export default function TablePromo({
  redemptions,
  currentPage,
  itemsPerPage,
}: TablePromoProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedEligible, setSelectedEligible] = useState<string>("");

  // Extract distinct years
  const years: number[] = Array.from(
    new Set(redemptions.map((r) => new Date(r.claim_month).getFullYear()))
  ).sort();

  // Filter by selected month and year
  const filteredRedemptions = redemptions.filter((item) => {
    const date = new Date(item.claim_month);
    const matchesMonth = selectedMonth
      ? date.getMonth() + 1 === Number(selectedMonth)
      : true;
    const matchesYear = selectedYear
      ? date.getFullYear() === Number(selectedYear)
      : true;
    const matchesEligibility =
      selectedEligible === "yes"
        ? item.eligible === true
        : selectedEligible === "no"
        ? item.eligible === false
        : true;
    return matchesMonth && matchesYear && matchesEligibility;
  });

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this promo client?"
    );
    if (!confirmDelete) return;

    const result = await deletePromo(id);
    if (result.success) {
      alert(result.success);
    } else {
      alert(result.error || "Something went wrong.");
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4 mb-6 mt-4">
        <div className="mt-2 w-1/4 flex items-center justify-between gap-2 md:mt-2">
          <SearchPromo placeholder="Search emails or client IDs..." />
        </div>
        {/* filter by month */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        {/* filter by year */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        {/* filter by eligible */}
        <select
          value={selectedEligible}
          onChange={(e) => setSelectedEligible(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Eligibility</option>
          <option value="yes">Eligible</option>
          <option value="no">Not Eligible</option>
        </select>
      </div>
      {/* Table */}
      <h1 className="mb-8 text-xl md:text-xl mt-8">Promo Code Redemptions</h1>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-grey-50 p-2">
              <table className="min-w-full rounded-md text-gray-900">
                <thead className="bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th className="px-4 py-5 font-medium sm:pl-6">No</th>
                    <th className="px-4 py-5 font-medium">Email</th>
                    <th className="px-3 py-5 font-medium">Client ID</th>
                    <th className="px-3 py-5 font-medium">Eligible</th>
                    <th className="px-3 py-5 font-medium">Total Amount</th>
                    <th className="px-3 py-5 font-medium">Status</th>
                    <th className="px-3 py-5 font-medium">Promo Code</th>
                    <th className="px-4 py-5 font-medium">Submitted At</th>
                    <th className="px-4 py-5 font-medium">Month Claim</th>
                    <th className="px-4 py-5 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {filteredRedemptions.length > 0 ? (
                    filteredRedemptions.map((item, index) => (
                      <tr key={item.id} className="group">
                        <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 sm:pl-6">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="whitespace-nowrap bg-white py-4 pl-5">
                          {item.email}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5">
                          {item.client_id}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5">
                          {item.eligible ? "Yes" : "No"}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5">
                          {item.total_amount}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5">
                          {item.status}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5">
                          {item.promo_code}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5">
                          {new Date(item.submitted_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5">
                          {new Date(item.claim_month).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                            }
                          )}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 space-x-2">
                          <Link
                            href={`/dashboard/promo-code/edit/${item.id}`}
                            className="inline-flex items-center rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 text-xs"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="inline-flex items-center rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 text-xs"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={10}
                        className="text-center py-5 bg-white text-gray-500"
                      >
                        No data found for selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
