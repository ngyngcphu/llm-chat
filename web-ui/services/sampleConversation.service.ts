import { apiClient } from './common';

export const sampleConversationService = {
    getQuestions: async () => {
        const { data, error } = await apiClient.GET('/api/sample/questions');
        if (data !== undefined) return data;
        throw (error as ResponseError).message;
    },
    getAnswer: async (questionId: string) => {
        const { data, error } = await apiClient.POST('/api/sample/answer', { body: { questionId } });
        if (data !== undefined) return data;
        throw (error as ResponseError).message;
    }
};
