import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_RESTO_URL}/api/V1/turbo/resto/user/login`, {
                    method: 'POST',
                    body: JSON.stringify({ username: credentials.username, password: credentials.password }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log("data----------------------------------------------", data)
                    return {
                        id: data?.user?.id,
                        name: data?.user?.username,
                        image: data?.user?.avatarUrl,
                        email: data?.user?.email,
                        token: data?.token,
                        restaurant: data?.user?.restaurant?.nomEtablissement ?? null,
                        restauranID: data?.user?.restaurant?.id ?? null,
                        role: data?.user?.role?.libelle ?? null,
                    } as User;
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60, // 1 heure (en secondes)
        // updateAge: 30 * 60, // Mise à jour de la session toutes les 30 minutes
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'credentials-user') {
                try {
                    return true;
                } catch (error) {
                    return false;
                }
            }

            return true;
        },
        async jwt({ token, user, account, trigger, session }) {
            if (account && user) {
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
                    restauranID: user.restauranID as string,
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
            session.user.restauranID = token.restauranID as string;

            return session;
        },
    },
    pages: {
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV === 'development',
});
