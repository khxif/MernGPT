import ChatDropDown from "../chat/ChatDropDown";
import BackButton from "./BackButton";
import DarkModeToggle from "./DarkModeToggle";
import UserAvatar from "./UserAvatar";

export default function ChatHeader() {
  return (
    <header
      className="py-4 px-4 md:6 flex justify-between items-center w-full border border-b
  border-b-zinc-400/40 shadow-sm"
    >
      <div className="flex items-center space-x-4">
        <BackButton />
        <UserAvatar />
      </div>

      <div className="flex items-center space-x-4">
        <DarkModeToggle />
        <ChatDropDown />
      </div>
    </header>
  );
}
