import {type UserModel} from "../db/schema";

type UserResponse = {
    id: string;
    name: string;
    email: string;
    createdAt: Date | null;
    updatedAt: Date | null;
};

function serializeUser(user: UserModel): UserResponse {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
};

export {serializeUser};