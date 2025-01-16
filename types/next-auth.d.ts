import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            image: string;
            email: string;
            token: string;
            role: string;
            restaurant: string;
            restauranID: string;
        };
    }

    interface User {
        id: string;
        name: string;
        image: string;
        email: string;
        token: string;
        role: string;
        restaurant: string;
        restauranID: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        name: string;
        image: string;
        email: string;
        token: string;
        role: string;
        restaurant: string;
        restauranID: string;
    }
}
