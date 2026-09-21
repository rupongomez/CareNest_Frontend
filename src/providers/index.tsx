import { ReactNode } from "react";
import QueryProvider from "./query.provider";
import GoogleAuthProvider from "./google-auth.provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleAuthProvider>
      <TooltipProvider>
        <QueryProvider>{children}</QueryProvider>
      </TooltipProvider>
    </GoogleAuthProvider>
  );
}
