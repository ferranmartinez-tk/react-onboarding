import { BACKEND_URL } from "../config";
import { User } from "../types/Users";
import { UserSchema, UsersSchema } from "./types/users";

const USERS_URL = BACKEND_URL + '/users';

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch(USERS_URL);
        const data: UsersSchema = await response.json();
        const users: User[] = data.users.map((user: UserSchema) => ({
            id: user.id,
            name: user.name,
            email: user.email
        }));
        return users;
    } catch (exception) {
        throw Error(`Error calling GET METHOD on: ${USERS_URL} ` + exception);
    }
}