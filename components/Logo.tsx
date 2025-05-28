import React from "react";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/BBM_logo.png"
        alt="BBM Logo"
        width={96}
        height={96}
        className="w-16 h-16 md:w-24 md:h-24 object-contain"
      />
    </div>
  );
}
