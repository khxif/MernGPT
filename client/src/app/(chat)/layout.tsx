import ProtectedRoute from "@/components/ProtectedRoute";
import ChatHeader from "@/components/header/ChatHeader";
import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ProtectedRoute>
        <ChatHeader />
        {children}
      </ProtectedRoute>
    </>
  );
}
