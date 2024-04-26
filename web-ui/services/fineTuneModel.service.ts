import { apiClient } from './common';

export const fineTuneModelService = {
    getAll: async () => {
        const { data, error } = await apiClient.GET('/api/models');
        if (data !== undefined) return data;
        throw (error as ResponseError).message;
    }
};
