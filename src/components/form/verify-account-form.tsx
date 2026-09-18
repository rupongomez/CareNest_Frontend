"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function VerifyAccountForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  return (
    <div>
      your email: <span className="font-medium font-bold">{email}</span>
    </div>
  );
}
