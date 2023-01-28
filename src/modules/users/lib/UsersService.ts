import { client } from "../../utils/client";
import { User } from "../utils/types";

export class UserService {
  private readonly client = client;

  async getUsers(limit: number, skip: number): Promise<User[]> {
    const { data } = await this.client.get(
      `/users?limit=${limit}&skip=${skip}`
    );

    return data.users;
  }
}
