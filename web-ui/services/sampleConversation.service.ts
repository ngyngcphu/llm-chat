import { apiClient } from './common';

export const sampleConversationService = {
    getQuestions: async () => {
        const { data, error } = await apiClient.GET('/api/sample/questions');
        if (data !== undefined) return data;
        throw (error as ResponseError).message;
    },
    getAnswer: async (sampleChatRequestBody: SampleChatRequestBody) => {
        const { data, error } = await apiClient.POST('/api/sample/answer', {
            body: {
                sectionId: sampleChatRequestBody.sectionId,
                fineTuneModelId: sampleChatRequestBody.fineTuneModelId,
                questionId: sampleChatRequestBody.questionId
            }
        });
        if (data !== undefined) return data;
        throw (error as ResponseError).message;
    }
};
