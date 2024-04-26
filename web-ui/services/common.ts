import createClient from 'openapi-fetch';
import { paths } from '@api/spec';

export const apiClient = createClient<paths>({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: 'include'
});
