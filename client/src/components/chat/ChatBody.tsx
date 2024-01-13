"use client";

import useChats from "@/hooks/useChats";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import ChatInput from "./ChatInput";
import ChatRow from "./ChatRow";

interface ChatBodyProps {
  userCookie: RequestCookie | undefined;
}

export default function ChatBody({ userCookie }: ChatBodyProps) {
  const [message, setMessage] = useState<string>("");
  const { chats, isError, isLoading } = useChats({ userCookie });
  console.log(chats);
  return (
    <>
      <div className="flex-1 h-full overflow-y-scroll py-4 md:py-6 pb-10 md:pb-44 scrollbar-hide">
        {chats?.map((chat: any, i: number) => (
          <ChatRow key={i} chat={chat} />
        ))}
        {!chats ||
          (chats?.length === 0 && (
            <p className="text-center font-medium">No messages!</p>
          ))}
        {isLoading && (
          <div className="w-full flex items-center justify-center h-full">
            <ClipLoader color="#36d7b7" />
          </div>
        )}
        {isError && (
          <p className="text-center font-semibold">Internal server error!</p>
        )}
      </div>
      <ChatInput
        userCookie={userCookie}
        message={message}
        setMessage={setMessage}
      />
    </>
  );
}
