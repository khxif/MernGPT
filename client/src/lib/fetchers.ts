import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const getUser = async (userCookie: RequestCookie | undefined) => {
  const response = await fetch("/api/user/details", {
    method: "GET",
    headers: {
      Authorization: `${userCookie?.value}`,
    },
  });
  const data = await response.json();
  // console.log(data);
  if (data.username)
    return {
      email: data.email,
      _id: data._id,
      username: data.username,
    };
  return null;
};

const logoutUser = async () => {
  const res = await fetch("/api/user/logout", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  // console.log(data);

  return data;
};

const fetchUserMessages = async (userCookie: RequestCookie | undefined) => {
  if (!userCookie) return null;
  const res = await fetch("/api/chat/get-messages", {
    method: "GET",
    headers: {
      Authorization: `${userCookie?.value}`,
    },
  });
  const data = await res.json();
  // console.log(data);

  return data.chats;
};
export { fetchUserMessages, getUser, logoutUser };

