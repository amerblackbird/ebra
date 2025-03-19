import {z} from "zod";

// username and password are required fields
// Allows wide range of password and username lengths compared to create account schema, to support admin password.
export const authSchema = z.object({
    username: z.string().min(4, "Username must be at least 6 characters long").max(144, "Username is too long"),
    password: z.string()
        .min(2, "Password must be at least 6 characters long")
        .max(144, "Password is too long")
});

export type AuthDto = z.infer<typeof authSchema>;
