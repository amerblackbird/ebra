import {db, logins, users} from "../src/db/schema";
import {PasswordUtils} from "../src/utils/password";

async function seedDatabase() {
    console.log('Seeding database...');
    try {
        await db.delete(users).execute();
        const usersToInsert = [
            {
                username: 'admin',
                email: 'admin@admin.com',
                password: 'admin',
                name: 'Admin',
                role: 'admin'
            },
        ]
        for (const user of usersToInsert) {
            const {username, email, role, name, password} = user;
            const salt = PasswordUtils.getSalt();
            const hashedPassword = PasswordUtils.hashPassword(password, salt);
            // Create a new user

            await db.transaction(async (tx) => {
                // Insert the new user
                const [newUser] = await tx.insert(users)
                    .values({
                        username,
                        email,
                        name,
                        role,
                    }).returning();

                // Insert the login record
                await tx.insert(logins).values({
                    userId: newUser.id,
                    salt,
                    password: hashedPassword,
                    ipAddress: "127.0.0.1",
                    userAgent: "User-Agent-String"
                });

                return newUser;
            });
        }
        console.log('Database seeded successfully.');
    } catch (e) {
        console.error('Error seeding database:', e);
    }
    process.exit(0);

}

seedDatabase();