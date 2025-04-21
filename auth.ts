import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres'; // Use @vercel/postgres

// Remova a linha abaixo, pois não é necessária
// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | undefined> {
    try {
        const result = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return result.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (!passwordsMatch) return user;

                    // Verify password (if stored as a hash)
                    const isValidPassword = await bcrypt.compare(password, user.password);
                    if (!isValidPassword) return null;

                    return user;
                }
                console.log('Invalid credentials:', parsedCredentials.error.format());
                return null;
            },
        }),
    ],
});

//Good to know:
//There are other alternative providers such as OAuth or email. See the NextAuth.js docs for a full list of options.
// https://authjs.dev/getting-started/providers/credentials-tutorial