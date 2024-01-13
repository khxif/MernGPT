import ChatBody from "@/components/chat/ChatBody";
import { cookies } from "next/headers";

export default async function ChatPage() {
  const cookie = cookies();
  const userCookie = cookie.get("user");

  return (
    <main className="h-full max-w-6xl mx-auto">
      <ChatBody userCookie={userCookie} />
    </main>
  );
}
