"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppStore } from "@/store/store";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useQueryClient } from "react-query";

export default function DeleteDialog({
  userCookie,
}: {
  userCookie: RequestCookie | undefined;
}) {
  const [isModalOpen, setIsModalOpen] = useAppStore((state) => [
    state.isModalOpen,
    state.setIsModalOpen,
  ]);
  const queryClient = useQueryClient();

  const clearChat = async () => {
    try {
      const res = await fetch("/api/chat/clear-chat", {
        method: "GET",
        headers: {
          Authorization: `${userCookie?.value}`,
        },
      });
      const data = await res.json();
      console.log(data);
      queryClient.invalidateQueries("chats");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog
      open={isModalOpen}
      onOpenChange={(open) => setIsModalOpen(open)}
    >
      <AlertDialogContent className="max-w-sm md:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Clear conversation?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to clear the conversation?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full flex flex-row items-center space-x-4 pt-2">
          <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="w-full hover:bg-red-950 hover:text-white"
            onClick={clearChat}
          >
            Clear
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
