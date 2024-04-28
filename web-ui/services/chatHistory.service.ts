import { apiClient } from './common';

export const chatHistoryService = {
    getHistory: async (sectionId: string) => {
        const { data, error } = await apiClient.GET('/api/history/{sectionId}', { params: { path: { sectionId } } });
        if (data !== undefined) return data;
        throw (error as ResponseError).message;
    }
};
