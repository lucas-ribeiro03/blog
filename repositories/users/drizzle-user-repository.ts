import { User } from "@/model/users";
import { UserRepository } from "./user-repository";
import { drizzleDb } from "@/db";
import { usersTable } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcryptjs";

export class DrizzleUserRepository implements UserRepository {
  async createUser(
    name: string,
    lastName: string,
    username: string,
    password: string,
  ) {
    if (!name || !lastName || !username || !password)
      return "Erro no envio do usuário";

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: uuidV4(),
      name,
      lastName,
      username,
      passwordHash: hashedPassword,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await drizzleDb.insert(usersTable).values(user);

    return "Usuário criado";
  }

  async updateUser(id: string): Promise<string> {
    if (!id) throw new Error("Dados inválidos");

    const user = await this.getUserById(id);
    if (!user || typeof user === "string")
      throw new Error("Usuário não existe");

    const userFixed = {
      ...user,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(),
    };

    console.log(userFixed);

    await drizzleDb
      .update(usersTable)
      .set(userFixed)
      .where(eq(usersTable.id, id));

    return "Usuário atualizado";
  }

  async deleteUser(user: User): Promise<string> {
    if (!user) return "Erro no envio do usuário";

    await drizzleDb.delete(usersTable).where(eq(usersTable.id, user.id));

    return "Usuário criado";
  }

  async getUserById(id: string): Promise<User | string> {
    if (!id) throw new Error("ERRO");

    const user = await drizzleDb.query.users.findFirst({
      where: eq(usersTable.id, id),
    });

    if (!user) return "Nenhum usuário encontrado";

    const userFixed = {
      ...user,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    };

    return userFixed;
  }

  async getUserByUsername(username: string): Promise<User | string> {
    if (!username) throw new Error("ERRO");

    const user = await drizzleDb.query.users.findFirst({
      where: eq(usersTable.username, username),
    });

    if (!user) return "Nenhum usuário encontrado";

    const userFixed = {
      ...user,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    };

    return userFixed;
  }

  async getUsers(): Promise<User[] | string> {
    const users = await drizzleDb.query.users.findMany();

    if (!users) return "Nenhum usuário encontrado";

    const usersFixed = users.map((user) => {
      return {
        ...user,
        createdAt: Number(user.createdAt),
        updatedAt: Number(user.updatedAt),
      };
    });

    return usersFixed;
  }

  async getUserByNameAndLastName(
    name: string,
    lastName: string,
  ): Promise<User[] | User | string> {
    if (!name || !lastName) throw new Error("ERRO");

    const user = await drizzleDb.query.users.findFirst({
      where: eq(eq(usersTable.name, name), eq(usersTable.lastName, lastName)),
    });

    if (!user) return "Nenhum usuário encontrado";

    const userFixed = {
      ...user,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    };

    return userFixed;
  }
}
