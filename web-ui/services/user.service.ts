import { apiClient } from './common';

export const userService = {
    getInfo: async () => {
        const { data, error } = await apiClient.GET('/api/user');
        if (data !== undefined) return data;
        throw (error as ResponseError).message;
    }
};
