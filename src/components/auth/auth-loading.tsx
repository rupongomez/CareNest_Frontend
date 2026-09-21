import { LoaderIcon } from "lucide-react";
import React from "react";

export default function AuthLoading({
  label = "Verifying account",
}: {
  label?: string;
}) {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex gap-2">
        <LoaderIcon className="size-6 animate-spin" />
        {label}
      </div>
    </div>
  );
}
