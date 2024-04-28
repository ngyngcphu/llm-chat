import { useMutation } from '@tanstack/react-query';
import { sampleConversationService } from '@ui/services';

export function useSampleConversationMutation() {
    const createOrUpdateSection = useMutation({
        mutationKey: ['createOrUpdateSection'],
        mutationFn: (sampleChatRequestBody: SampleChatRequestBody) => sampleConversationService.getAnswer(sampleChatRequestBody)
    });

    return {
        createOrUpdateSection: createOrUpdateSection
    };
}
