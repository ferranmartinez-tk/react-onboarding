export type UserSchema = {
    id: string;
    name: string;
    email: string;
};

export type UsersSchema = {
    users: UserSchema[];
};