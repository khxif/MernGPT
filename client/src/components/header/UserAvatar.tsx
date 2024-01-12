"use client";

import { useAppStore } from "@/store/store";
import ReactAvatar from "react-avatar";

interface UserAvatarProps {
  size?: string;
}

export default function UserAvatar({ size }: UserAvatarProps) {
  const [user] = useAppStore((state) => [state.user]);
  return (
    <ReactAvatar
      name={user?.username}
      round={true}
      size="40"
      className="text-xs"
    />
  );
}
