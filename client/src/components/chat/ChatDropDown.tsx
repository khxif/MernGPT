"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore } from "@/store/store";
import { MoreVertical, Trash } from "lucide-react";

export default function ChatDropDown() {
  const setIsModalOpen = useAppStore((state) => state.setIsModalOpen);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem
          className="flex items-center space-x-2 font-semibold group"
          onClick={() => setIsModalOpen(true)}
        >
          <Trash className="w-4 h-4 group-hover:text-red-800" />
          <h4 className="group-hover:text-red-800">Clear Chat</h4>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
