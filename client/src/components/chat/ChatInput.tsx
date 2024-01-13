"use client";

import { Send } from "lucide-react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { FormEvent } from "react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ChatInputProps {
  userCookie: RequestCookie | undefined;
  message: string;
  setMessage: any;
}

export default function ChatInput({
  userCookie,
  message,
  setMessage,
}: ChatInputProps) {
  const queryClient = useQueryClient();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    try {
      toast.loading("Let GPT cook!",{
        id:"id"
      });
      setMessage("");
      const res = await fetch("/api/chat/chat-completion", {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: {
          Authorization: `${userCookie?.value}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      queryClient.invalidateQueries("chats");
      toast.success("GPT has responded!",{
        id: 'id'
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between p-2 w-full border bg-white
       border-slate-300 dark:border-gray-600 rounded-full sticky bottom-2 z-50 dark:bg-black"
    >
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
        className="ring-0 focus-visible:ring-0 border-0 outline-none"
      />
      <Button variant="link" type="submit">
        <Send className="mr-2" />
      </Button>
    </form>
  );
}
