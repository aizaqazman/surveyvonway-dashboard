'use client';

import React from 'react';

interface Props {
    searchQuery: string;
    onSearchChange: (value: string) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: Props) {
    return (
        <div className="flex flex-col">
            <label htmlFor="search" className="text-sm font-medium text-gray-700 mb-1">
                Search
            </label>
            <input
                type="text"
                id="search"
                placeholder="Search name, email, or client ID"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
        </div>
    );
}
