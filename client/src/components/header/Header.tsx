import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import Logo from "./Logo";

const DarkModeToggle = dynamic(() => import("./DarkModeToggle"), {
  ssr: false,
});

const UserButton = dynamic(() => import("./UserButton"), {
  ssr: false,
});

export default function Header() {
  const cookie = cookies()
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
