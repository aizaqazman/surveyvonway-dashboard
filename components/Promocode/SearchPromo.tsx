"use client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function SearchPromo({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync with URL changes (back/forward etc.)
  useEffect(() => {
    setInputValue(searchParams.get("query") || "");
  }, [searchParams]);

  const commitSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term.trim()) {
      params.set("query", term.trim());
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    commitSearch(inputValue);
    inputRef.current?.focus(); // keep focus
  };

  const clearSearch = () => {
    setInputValue("");
    commitSearch("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">Search</label>

      <input
        ref={inputRef}
        id="search"
        type="search"
        role="searchbox"
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={() => commitSearch(inputValue)}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 pr-8 text-sm outline-1 placeholder:text-gray-500"
      />

      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

      {inputValue && (
        <button
          type="button"
          onClick={clearSearch}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
