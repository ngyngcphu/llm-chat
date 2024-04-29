import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sampleConversationService } from '@ui/services';

export function useSampleConversationMutation() {
    const queryClient = useQueryClient();

    const createOrUpdateSectionBySample = useMutation({
        mutationKey: ['createOrUpdateSectionBySample'],
        mutationFn: (sampleChatRequestBody: SampleChatRequestBody) => sampleConversationService.getAnswer(sampleChatRequestBody),
        onMutate: () => {
            const currentSampleQuestion = queryClient.getQueryData<{ role: RoleType; content: string }>(['currentSampleQuestion']);
            queryClient.setQueryData(['currentQuestion'], currentSampleQuestion);
        },
        onSuccess: () => {
            queryClient.setQueryData(['currentQuestion'], null);
        }
    });

    return {
        createOrUpdateSectionBySample: createOrUpdateSectionBySample
    };
}
