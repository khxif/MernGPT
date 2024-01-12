import { cn } from "@/lib/utils";
import UserAvatar from "../header/UserAvatar";

export default function ChatRow({ chat }: {chat: Chat}) {
  return (
    <div
      className={cn(
        chat.role !== "user" && "bg-slate-200 dark:bg-slate-800",
        "p-4 flex items-center space-x-4 -z-50 rounded-md"
      )}
    >
      {chat.role === "user" ? <UserAvatar /> : null}
      <h1>{chat?.content}</h1>
    </div>
  );
}
