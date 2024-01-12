import Header from "@/components/header/Header";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const cookie = cookies();
  const userCookie = cookie.get("user");
  return (
    <>
      <Header userCookie={userCookie} />
      {children}
    </>
  );
}
