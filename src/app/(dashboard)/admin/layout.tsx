import RoleGuard from "@/components/auth/role-guard";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <RoleGuard roles={["ADMIN"]}>admin layout{children}</RoleGuard>;
}
