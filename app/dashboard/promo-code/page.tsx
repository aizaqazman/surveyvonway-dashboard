import Pagination from '@/components/Promocode/Pagination';
import SearchPromo from '@/components/Promocode/SearchPromo';
import { fetchPromoClients } from '@/app/lib/db';
import React, { Suspense } from 'react'
import TablePromo from '@/components/Promocode/Table';

export default async function PromoPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const allClients = await fetchPromoClients();

   // Optional: adjust per-page limit
  const itemsPerPage = 10;

  const filtered = allClients.filter((client) =>
    client.email.toLowerCase().includes(query) ||
    client.client_id.toLowerCase().includes(query)
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Promo Users</h1>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 md:mt-2">
        <SearchPromo placeholder="Search emails or client IDs..." />
      </div>
      <Suspense key={query + currentPage}>
        <TablePromo redemptions={paginatedData} currentPage={currentPage} itemsPerPage={itemsPerPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
    
  )
}

