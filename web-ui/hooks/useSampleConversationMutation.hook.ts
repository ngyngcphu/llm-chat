import { useMutation } from '@tanstack/react-query';
import { sampleConversationService } from '@ui/services';

export function useSampleConversationMutation() {
    const createOrUpdateSectionBySample = useMutation({
        mutationKey: ['createOrUpdateSectionBySample'],
        mutationFn: (sampleChatRequestBody: SampleChatRequestBody) => sampleConversationService.getAnswer(sampleChatRequestBody)
    });

    return {
        createOrUpdateSectionBySample: createOrUpdateSectionBySample
    };
}
