"use client";
import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { data, isPending, isError } = useGetMe();
  console.log(data);
  const user = data?.data;

  const router = useRouter();

  useEffect(() => {
    if (isPending) return; // Wait until the request is complete
    if (isError || !user) {
      router.push("/login");
    }
  }, [user, isError, router, isPending]);
  if (isPending) return <AuthLoading />;

  if (isError || !user) {
    return <AuthLoading label="Redirecting..." />;
  }
  return <>{children}</>;
}
