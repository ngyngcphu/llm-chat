import createClient, { FetchResponse } from 'openapi-fetch';
import { paths } from '@api/spec';

export const apiClient = createClient<paths>({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: 'include'
});

export async function invoke<T = unknown>(call: Promise<FetchResponse<T, never, never>>) {
    const { data, error } = await call;
    if (data !== undefined) return data;
    throw (error as ResponseError).message;
}
