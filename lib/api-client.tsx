import axios, { AxiosInstance, AxiosHeaders, AxiosRequestConfig } from 'axios';
import { auth } from '@/auth';

class ApiClient {
    private axiosInstance: AxiosInstance;

    constructor(baseUrl: string) {
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Interceptor pour gérer les réponses
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401) {
                    const url = new URL('/api/auth/logout', process.env.NEXT_PUBLIC_URL || '');
                    await fetch(url.toString(), { method: 'POST' });
                }
                return error;
            },
        );

        // Interceptor pour ajouter les en-têtes
        this.axiosInstance.interceptors.request.use(async (config) => {
            const headers = await this.getHeaders();
            config.headers = headers;
            return config;
        });
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

    private async getHeaders(): Promise<AxiosHeaders> {
        const session = await this.getSession();
        const headers = new AxiosHeaders();

        headers.set('Authorization', session?.user?.token ? `Bearer ${session.user.token}` : '');

        return headers;
    }

    async get(endpoint: string, config?: AxiosRequestConfig) {
        return this.axiosInstance.get(endpoint, config);
    }

    async post(endpoint: string, data: any, config?: AxiosRequestConfig) {
        return this.axiosInstance.post(endpoint, data, config);
    }

    async put(endpoint: string, data: any, config?: AxiosRequestConfig) {
        return this.axiosInstance.put(endpoint, data, config);
    }

    async patch(endpoint: string, data: any, config?: AxiosRequestConfig) {
        return this.axiosInstance.patch(endpoint, data, config);
    }

    async delete(endpoint: string, config?: AxiosRequestConfig) {
        return this.axiosInstance.delete(endpoint, config);
    }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_RESTO_URL || '');
