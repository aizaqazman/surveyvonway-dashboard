'use client';

import React, { useRef, useState } from "react";
import ExcelJS from 'exceljs';
import { ReviewRow } from "./types";

interface Props {
    onParsed: (rows: ReviewRow[]) => void;
}

export default function ExcelUpload({ onParsed }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewData, setPreviewData] = useState<ReviewRow[]>([]);
    const [fileName, setFileName] = useState<string>('');
    const [showModal, setShowModal] = useState(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name); // Set file name for display

        const buffer = await file.arrayBuffer();
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        const worksheet = workbook.worksheets[0];
        const rows: ReviewRow[] = [];

        const headers: string[] = [];

        worksheet.getRow(1).eachCell((cell, colNumber) => {
        headers.push(String(cell.value));
        });

        worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;
        const rowData: any = {};
        row.eachCell((cell, colNumber) => {
            const value = cell.value instanceof Date
            ? cell.value.toISOString()
            : cell.value;
            rowData[headers[colNumber - 1]] = value;
        });
        rows.push(rowData);
        });

        setPreviewData(rows);
        onParsed(rows);
    };

    return (
        <div className="p-4 border rounded bg-white shadow-sm">
        {/* Upload Button */}
        <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Upload Excel
        </button>
        <input
            type="file"
            ref={fileInputRef}
            accept=".xlsx"
            className="hidden"
            onChange={handleFileUpload}
        />

        {/* Uploaded file name (click to preview) */}
        {fileName && (
            <p className="mt-3 text-sm text-blue-600 underline cursor-pointer" onClick={() => setShowModal(true)}>
            📄 {fileName}
            </p>
        )}

        {/* Modal for table preview */}
        {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white max-h-[80vh] max-w-6xl w-full p-4 rounded shadow-lg overflow-auto">
                <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Excel Preview</h2>
                <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-red-500 text-xl font-bold"
                >
                    ×
                </button>
                </div>
                <table className="min-w-full text-sm border border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                    {Object.keys(previewData[0]).map((key) => (
                        <th key={key} className="border px-2 py-1">{key}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {previewData.map((row, i) => (
                    <tr key={i}>
                        {Object.values(row).map((val, j) => (
                        <td key={j} className="border px-2 py-1 whitespace-nowrap">
                            {val instanceof Date
                            ? val.toLocaleString()
                            : typeof val === 'object' && val !== null
                                ? JSON.stringify(val)
                                : String(val)}
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        )}
        </div>
    );
}
