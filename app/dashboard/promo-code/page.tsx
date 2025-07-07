import Pagination from "@/components/Promocode/Pagination";
// import SearchPromo from '@/components/Promocode/SearchPromo';
import { fetchPromoClients } from "@/app/lib/db";
import React, { Suspense } from "react";
import TablePromo from "@/components/Promocode/Table";

export default async function PromoPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    month?: string;
    year?: string;
    eligible?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const month = searchParams?.month || "";
  const year = searchParams?.year || "";
  const eligible = searchParams?.eligible || "";

  const allClients = await fetchPromoClients();

  // Optional: adjust per-page limit
  const itemsPerPage = 10;

  const filtered = allClients.filter((client) => {
    const date = new Date(client.claim_month);

    const matchesQuery =
      client.email.toLowerCase().includes(query) ||
      client.client_id.toLowerCase().includes(query);

    const matchesMonth = month ? date.getMonth() + 1 === Number(month) : true;
    const matchesYear = year ? date.getFullYear() === Number(year) : true;
    const matchesEligible =
      eligible === "yes"
        ? client.eligible === true
        : eligible === "no"
        ? client.eligible === false
        : true;

    return matchesQuery && matchesMonth && matchesYear && matchesEligible;
  });
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Promo Menu</h1>
      </div>
      {/* <div className="mt-2 w-1/4 flex items-center justify-between gap-2 md:mt-2">
        <SearchPromo placeholder="Search emails or client IDs..." />
      </div> */}
      <Suspense key={`${query}-${currentPage}-${month}-${year}-${eligible}`}>
        <TablePromo
          redemptions={paginatedData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
