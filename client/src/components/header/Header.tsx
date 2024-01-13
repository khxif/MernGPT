import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { Skeleton } from "../ui/skeleton";
import Logo from "./Logo";

const DarkModeToggle = dynamic(() => import("./DarkModeToggle"), {
  ssr: false,
  loading: () => <Skeleton className="w-8 h-8 rounded-md bg-slate-400/40" />,
});

const UserButton = dynamic(() => import("./UserButton"), {
  ssr: false,
  loading: () => (
    <Skeleton className="w-10 h-10 rounded-full bg-slate-400/40" />
  ),
});

export default function Header() {
  const cookie = cookies();
  const userCookie = cookie.get("user");
  return (
    <header
      className="py-4 px-6 md:px-10 flex justify-between items-center w-full border border-b
       border-b-zinc-400/40 shadow-sm"
    >
      <Logo />

      <div className="flex items-center space-x-5">
        <DarkModeToggle />
        <UserButton userCookie={userCookie} />
      </div>
    </header>
  );
}
