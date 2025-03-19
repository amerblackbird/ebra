import {z} from "zod";

export const createUserSchemaDto = z.object({
    name: z.string().min(1, "Name is required").max(144, "Name is too long"),
    username: z.string().min(6, "Username must be at least 6 characters long").max(144, "Username is too long"),
    email: z.string().email("Invalid email address"),
    password: z.string()
        .min(6, "Password must be at least 6 characters long")
        .max(144, "Password is too long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/, "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character")
});

export type CreateUserDto = z.infer<typeof createUserSchemaDto>;
