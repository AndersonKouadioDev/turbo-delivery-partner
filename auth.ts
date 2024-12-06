import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import usersEndpoints from '@/src/endpoints/users.endpoint';

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
    providers: [
        Credentials({
            id: 'credentials-user',
            name: 'Register',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_RESTO_URL}${usersEndpoints.login}`, {
                    method: 'POST',
                    body: JSON.stringify({ username: credentials.username, password: credentials.password }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (res.ok) {
                    const data = await res.json();

                    return {
                        id: data?.user?.id,
                        name: data?.user?.username,
                        image: data?.user?.avatarUrl,
                        email: data?.user?.email,
                        token: data?.token,
                        restaurant: data.user.restaurant,
                        role: data.user.role,
                    } as User;
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'credentials-user') {
                try {
                    console.log('signIn', user);
                    return true;
                } catch (error) {
                    return false;
                }
            }

            return true;
        },
        async jwt({ token, user, account, trigger, session }) {
            if (account && user) {
                console.log({ token, user, account });
                // Première connexion
                return {
                    ...token,
                    id: user.id as string,
                    name: user.name as string,
                    image: user.image as string,
                    email: user.email as string,
                    token: user.token as string,
                    role: user.role as string,
                    restaurant: user.restaurant as string,
                };
            }

            if (trigger === 'update' && session) {
                return { ...token, ...session.user };
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.token = token.token as string;
            session.user.name = token.name as string;
            session.user.email = token.email as string;
            session.user.image = token.image as string;
            session.user.role = token.role as string;
            session.user.restaurant = token.restaurant as string;
            return session;
        },
    },
    pages: {
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV === 'development',
});
