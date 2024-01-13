"use client";

import { fetchUserMessages } from "@/lib/fetchers";
import { useAppStore } from "@/store/store";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useQuery } from "react-query";

export default function useChats({
  userCookie,
}: {
  userCookie: RequestCookie | undefined;
}) {
  const user = useAppStore((state) => state.user);
  const { data, isError, isLoading } = useQuery(["chats", userCookie], () =>
    fetchUserMessages(userCookie)
  );
  return {
    chats: data,
    isError,
    isLoading,
  };
}
