'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ZoomableImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export default function ZoomableImage({ src, alt, width, height }: ZoomableImageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // Allow ESC key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleCloseModal();
        };

        if (isModalOpen) {
        document.addEventListener('keydown', handleKeyDown);
        } else {
        document.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
        document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);

    return (
        <>
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            onClick={handleOpenModal}
            className="cursor-zoom-in rounded"
        />

        {isModalOpen && (
            <div
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
            onClick={handleCloseModal}
            >
            <div
                className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <Image
                src={src}
                alt={alt}
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-lg"
                />
                <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white text-2xl font-bold"
                >
                ✕
                </button>
            </div>
            </div>
        )}
        </>
    );
}
