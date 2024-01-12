"use client";

import { useAppStore } from "@/store/store";
import { redirect } from "next/navigation";
import { ReactNode, useLayoutEffect } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useAppStore((state) => state.user);

  useLayoutEffect(() => {
    if (!user?.username) return redirect("/");
    console.log(user.username);
  }, [user]);
  return <>{children}</>;
}
