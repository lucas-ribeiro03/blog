import { userRepository } from "@/repositories/users";
import bcrypt from "bcryptjs";

export const verifyPassword = async (password: string, username: string) => {
  const user = await userRepository.getUserByUsername(username);
  if (typeof user === "string") return user;
  const comparePassword = await bcrypt.compare(password, user.passwordHash);
  if (!comparePassword) return false;
  return { success: true, message: "", id: user.id, role: user.role };
};
