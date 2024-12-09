import { auth } from '@/auth';

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async getSession() {
        let session;

        if (typeof window === 'undefined') {
            session = await auth();
        } else {
            const { getSession } = await import('next-auth/react');

            session = await getSession();
        }
        return session;
    }

    private async getHeaders(type: 'json' | 'formData' = 'json') {
        const session = await this.getSession();

        if (type === 'formData') {
            return {
                Authorization: session?.user?.token ? `Bearer ${session.user.token}` : '',
            };
        }

        return {
            Authorization: session?.user?.token ? `Bearer ${session.user.token}` : '',
            'Content-Type': 'application/json',
        };
    }

    private async handleResponse(response: Response) {
        if (!response.ok) {
            // tentative de rafraîchir le token
            const session = await this.getSession();
            if (session && response.status === 401) {
            }
        }

        return response;
    }

    async fetch(endpoint: string, options: RequestInit = {}, type: 'json' | 'formData' = 'json') {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = await this.getHeaders(type);

        const response = await fetch(url, {
            ...options,
            headers: { ...headers, ...options.headers } as HeadersInit,
        });

        return this.handleResponse(response);
    }

    async get(endpoint: string) {
        return this.fetch(endpoint);
    }

    async post(endpoint: string, data: any, options: { type?: 'json' | 'formData'; requestInit?: RequestInit } = { type: 'json' }) {
        return this.fetch(
            endpoint,
            {
                method: 'POST',
                body: options.type === 'json' ? JSON.stringify(data) : data,
                ...options.requestInit,
            },
            options.type,
        );
    }

    async put(endpoint: string, data: any, options: { type?: 'json' | 'formData'; requestInit?: RequestInit } = { type: 'json' }) {
        return this.fetch(
            endpoint,
            {
                method: 'PUT',
                body: options.type === 'json' ? JSON.stringify(data) : data,
                ...options.requestInit,
            },
            options.type,
        );
    }

    async patch(
        endpoint: string,
        data: any,
        options: {
            requestInit?: RequestInit;
            type?: 'json' | 'formData';
        } = {
            type: 'json',
        },
    ) {
        return this.fetch(
            endpoint,
            {
                method: 'PATCH',
                body: options.type === 'json' ? JSON.stringify(data) : data,
                ...options.requestInit,
            },
            options.type,
        );
    }

    async delete(endpoint: string) {
        return this.fetch(endpoint, { method: 'DELETE' });
    }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_RESTO_URL || '');
