import { User } from "@/model/users";

export interface UserRepository {
  createUser(
    name: string,
    lastName: string,
    username: string,
    password: string
  ): Promise<string>;
  updateUser(user: User): Promise<string>;
  deleteUser(user: User): Promise<string>;

  getUsers(): Promise<User[] | string>;
  getUserById(id: string): Promise<User | string>;
  getUserByUsername(username: string): Promise<User | string>;
  getUserByNameAndLastName(
    name: string,
    lastName: string
  ): Promise<User[] | User | string>;
}
