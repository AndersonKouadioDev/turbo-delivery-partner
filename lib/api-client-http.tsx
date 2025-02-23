import axios, { AxiosInstance, AxiosHeaders, AxiosRequestConfig, AxiosError } from 'axios';
import { auth } from '@/auth';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ServiceType = 'erp' | 'restaurant' | 'livreur' | 'client' | 'backend';

class ApiClientHttp {
    private axiosInstance: AxiosInstance;
    public baseUrl: string = '';
    public fullUrl: string = '';
    public endpoint: string = '';
    public service: ServiceType;

    constructor(service: ServiceType) {
        this.service = service;
        
        // Définir la baseUrl initiale
        this.setBaseUrl();

        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 10000,
        });

        // Interceptor pour gérer les réponses
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                if (error.response?.status === 401) {
                    const url = new URL('/api/auth/logout', process.env.NEXT_PUBLIC_URL || '');
                    await fetch(url.toString(), { method: 'POST' });
                }
                return Promise.reject(error);
            },
        );

        // Interceptor pour les requêtes
        this.axiosInstance.interceptors.request.use(async (config) => {
            // Important: Vérifier le service actuel, pas le service initial
            const headers = new AxiosHeaders();

            if (this.service !== 'backend') {
                const session = await this.getSession();
                const token = session?.user?.token;
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`);
                }
            }

            config.headers = headers;
            config.baseURL = this.baseUrl;
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

    private setBaseUrl(): void {
        const baseUrl = {
            erp: process.env.NEXT_PUBLIC_API_ERP_URL,
            restaurant: process.env.NEXT_PUBLIC_API_RESTO_URL,
            livreur: process.env.NEXT_PUBLIC_API_DELIVERY_URL,
            client: process.env.NEXT_PUBLIC_API_CLIENT_URL,
            backend: process.env.NEXT_PUBLIC_API_BACKEND_URL,
        }[this.service] || '';

        if (!baseUrl) {
            throw new Error(`URL non définie pour le service ${this.service}`);
        }
        this.baseUrl = baseUrl;
    }

    private setEndpoint(value: string, params?: Record<string, string>): void {
        if (!value.startsWith('/')) {
            value = '/' + value;
        }
        const queryString = new URLSearchParams(params).toString();
        this.endpoint = `${value.trim()}${queryString ? `?${queryString}` : ''}`;
    }

    private setFullUrl(value: string, service: ServiceType, params?: Record<string, string>): void {
        // Mettre à jour le service
        this.service = service;
        
        // Mettre à jour la baseUrl avec le nouveau service
        this.setBaseUrl();
        
        // Créer l'endpoint
        this.setEndpoint(value, params);
        
        // Créer l'url complète
        this.fullUrl = `${this.baseUrl}${this.endpoint}`;
    }

    async request<T = any>({
        endpoint,
        method,
        data,
        params,
        service = 'backend',
        config,
    }: {
        endpoint: string;
        method: HttpMethod | string;
        data?: any;
        params?: Record<string, string>;
        service?: ServiceType;
        config?: AxiosRequestConfig;
    }): Promise<T> {
        // Création de l'url complète
        this.setFullUrl(endpoint, service, params);
        try {
            switch (method.trim().toLowerCase()) {
                case 'post':
                    return (await this.axiosInstance.post(this.endpoint, data, config)).data;
                case 'put':
                    return (await this.axiosInstance.put(this.endpoint, data, config)).data;
                case 'patch':
                    return (await this.axiosInstance.patch(this.endpoint, data, config)).data;
                case 'delete':
                    return (await this.axiosInstance.delete(this.endpoint, config)).data;
                default:
                    return (await this.axiosInstance.get(this.endpoint, config)).data;
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Erreur API:', error.response?.data);
            }
            throw error;
        }
    }
}

export const apiClientHttp = new ApiClientHttp('backend');