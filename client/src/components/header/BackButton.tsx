"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <>
      <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />
    </>
  );
}
