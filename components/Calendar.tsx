// components/calendar.tsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarProps {
    startDate: Date | null;
    endDate: Date| null;
    onDateChange: (dates: [Date | null, Date | null]) => void;
}

export default function Calendar({ startDate, endDate, onDateChange }: CalendarProps) {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Select Date Range</label>
            <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={onDateChange}
                isClearable
                placeholderText="Select start and end date"
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                popperClassName="z-50" 
                popperPlacement="bottom-start" 
            />
        </div>
    );
}
