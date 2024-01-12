import { Sparkles } from "lucide-react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "./Logo";

const DarkModeToggle = dynamic(() => import("./DarkModeToggle"), {
  ssr: false,
});

const UserButton = dynamic(() => import("./UserButton"), {
  ssr: false,
});

interface HeaderProps {
  userCookie: RequestCookie | undefined;
}

export default function Header({ userCookie }: HeaderProps) {
  return (
    <header
      className="py-4 px-6 md:px-10 flex justify-between items-center w-full border border-b
       border-b-zinc-400/40 shadow-sm"
    >
      <Logo />

      <div className="flex items-center space-x-5">
        <DarkModeToggle />
        {userCookie?.name && (
          <Button variant="premium">
            <Link href="/chat" className="flex items-center space-x-2">
              <h2> Get started</h2> <Sparkles className="w-4 h-4" />
            </Link>
          </Button>
        )}
        <UserButton userCookie={userCookie} />
      </div>
    </header>
  );
}
