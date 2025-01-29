import axios, { AxiosInstance, AxiosHeaders, AxiosRequestConfig } from 'axios';
import { auth } from '@/auth';

class ApiClientBackend {
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

    async request({ endpoint, method, data, params, config }: { endpoint: string; method: string; data?: any; params?: Record<string, string>; config?: AxiosRequestConfig }) {
        const queryString = new URLSearchParams(params).toString();

        if (method.trim().toLowerCase() == 'post') {
            return this.axiosInstance.post(`${endpoint.trim()}?${queryString}`, data, config);
        }
        if (method.trim().toLowerCase() == 'put') {
            return this.axiosInstance.put(`${endpoint.trim()}?${queryString}`, data, config);
        }
        if (method.trim().toLowerCase() == 'patch') {
            return this.axiosInstance.patch(`${endpoint.trim()}?${queryString}`, data, config);
        }
        if (method.trim().toLowerCase() == 'delete') {
            return this.axiosInstance.delete(`${endpoint.trim()}?${queryString}`, config);
        }

        return this.axiosInstance.get(`${endpoint.trim()}?${queryString}`, config);
    }
}

export const apiClientBackend = new ApiClientBackend(process.env.NEXT_PUBLIC_API_BACKEND_URL || '');
