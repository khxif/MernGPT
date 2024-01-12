"use client";

import useChats from "@/hooks/useChats";
import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatRow from "./ChatRow";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

interface ChatBodyProps {
  userCookie: RequestCookie | undefined;
}

export default function ChatBody({ userCookie }: ChatBodyProps) {
  const [message, setMessage] = useState<string>("");
  const { chats, isError, isLoading } = useChats({ userCookie });
  console.log(chats);
  return (
    <>
      <div className="flex-1 h-full overflow-y-scroll py-6 pb-44 scrollbar-hide">
        {chats?.map((chat: any, i: number) => (
          <ChatRow key={i} chat={chat} />
        ))}
        {!chats ||
          (chats?.length === 0 && (
            <p className="text-center font-medium">No messages!</p>
          ))}
        {isLoading && <div>Loading...</div>}
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
