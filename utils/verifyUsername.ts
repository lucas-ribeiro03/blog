import { userRepository } from "@/repositories/users";

export const verifyUsername = async (username: string) => {
  const user = await userRepository.getUserByUsername(username);
  if (!(typeof user === "string")) return false;
  return true;
};
