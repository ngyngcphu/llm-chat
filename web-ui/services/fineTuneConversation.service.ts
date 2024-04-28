import { apiClient } from './common';

export const fineTuneConversationService = {
    getAnswer: async (fineTuneChatRequestBody: FineTuneChatRequestBody) => {
        const { data, error } = await apiClient.POST('/api/fine-tune/answer', {
            body: {
                sectionId: fineTuneChatRequestBody.sectionId,
                fineTuneModelId: fineTuneChatRequestBody.fineTuneModelId,
                questionContent: fineTuneChatRequestBody.questionContent
            }
        });
        if (data !== undefined) return data;
        throw (error as ResponseError).message;
    }
};
