import { sign } from "jsonwebtoken";

const createToken = (user: any) => {
  const payload = {
    username: user.username,
    email: user.email,
  };
  const token = sign(payload, process.env.JWT_SECRET!);

  return token;
};

export { createToken };

