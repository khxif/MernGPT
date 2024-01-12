"use client";

import { fetchUserMessages } from "@/lib/fetchers";
import { useAppStore } from "@/store/store";
import { useQuery } from "react-query";

export default function useChats({ userCookie }: any) {
  const user = useAppStore((state) => state.user);
  const { data, isError, isLoading } = useQuery(["chats", userCookie], () =>
    fetchUserMessages(userCookie)
  );
  console.log(data);
  return {
    chats: data,
    isError,
    isLoading,
  };
}
