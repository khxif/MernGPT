type User =
  | {
      _id: string;
      username: string;
      email: string;
    }
  | null
  | undefined;

interface AppStoreProps {
  user: User;
  setUser: (user: User) => void;

  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

interface Chat {
  role: "user" | "assistant";
  content: string;
}
