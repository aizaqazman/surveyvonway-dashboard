"use client";

import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPromo({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");

  useEffect(() => {
    // Update local state when URL changes (e.g. browser back/forward)
    setInputValue(searchParams.get("query") || "");
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); // reset to first page on search

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const clearSearch = () => {
    setInputValue("");
    handleSearch(""); // triggers param cleanup
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="search"
        role="searchbox"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 pr-8 text-sm outline-1 placeholder:text-gray-500"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      {inputValue && (
        <button
          onClick={clearSearch}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
