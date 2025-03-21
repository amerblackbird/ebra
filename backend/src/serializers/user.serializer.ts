import {type UserModel} from "../db/schema";

export type UserResponse = {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    createdAt: Date | null;
    updatedAt: Date | null;
};

function serializeUser(user: UserModel): UserResponse {
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
};

export {serializeUser};