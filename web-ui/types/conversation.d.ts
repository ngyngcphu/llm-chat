type SampleChatRequestBody = {
    sectionId?: string;
    fineTuneModelId: string;
    questionId: string;
};

type FineTuneChatRequestBody = {
    sectionId?: string;
    fineTuneModelId: string;
    questionContent: string;
};
