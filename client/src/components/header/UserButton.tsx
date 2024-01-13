"use client";

import { deleteCookie } from "@/lib/action";
import { getUser } from "@/lib/fetchers";
import { useAppStore } from "@/store/store";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { shallow } from "zustand/shallow";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UserAvatar from "./UserAvatar";

interface UserButtonProps {
  userCookie: RequestCookie | undefined;
}

export default function UserButton({ userCookie }: UserButtonProps) {
  const router = useRouter();
  const [user, setUser] = useAppStore(
    (state) => [state.user, state.setUser],
    shallow
  );

  useEffect(() => {
    async function fetchUser() {
      const data = await getUser(userCookie);
      setUser(data);
    }
    userCookie && fetchUser();
  }, [userCookie]);

  const handleLogOut = async () => {
    try {
      // const data = await logoutUser();
      // setUser(undefined);
      // cookie().delete('user')
      // toast.info(data?.message);
      deleteCookie();
      setUser(undefined);
      toast.success("Logged out");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user?.username ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar size={"40"} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-w-xs">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{user?.username}</DropdownMenuItem>
            <DropdownMenuItem>{user?.email}</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button size="lg">
          <Link href="/login">Login</Link>
        </Button>
      )}
    </>
  );
}
