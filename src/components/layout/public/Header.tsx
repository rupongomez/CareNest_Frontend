"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { UserRole } from "@/types";
import { QueryCache, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about-us" },
  ];

  const dashboardRoute: Record<UserRole, string> = {
    SUPER_ADMIN: "/admin",
    ADMIN: "/admin",
    DOCTOR: "/doctor",
    PATIENT: "/patient",
  };

  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  const role: UserRole = !!data?.data && data?.data.role;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logout Success",
          description: "You have been logged out successfully",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: () => {
        toast.add({
          title: "Logout Failed",
          description: "An error occurred while trying to log you out",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="w-full h-16 border border-b ">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <Link href="/">
          <h2 className="text-2xl font-bold tracking-tight">
            Care<span className="text-green-500">Nest</span>
          </h2>
        </Link>
        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.name} href={route.url}>
              {route.name}
            </Link>
          ))}
          {role && <Link href={dashboardRoute[role]}>Dashboard</Link>}
        </nav>
        <div>
          {!isLoading && !data && (
            <Button
              variant="outline"
              render={<Link href="/login">Login</Link>}
              nativeButton={false}
            >
              Login
            </Button>
          )}
          {!isLoading && data && (
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
