import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fineTuneConversationService } from '@ui/services';

export function useFineTuneConversationMutation() {
    const queryClient = useQueryClient();

    const createOrUpdateSectionByFineTune = useMutation({
        mutationKey: ['createOrUpdateSectionByFineTune'],
        mutationFn: (fineTuneChatRequestBody: FineTuneChatRequestBody) => fineTuneConversationService.getAnswer(fineTuneChatRequestBody),
        onMutate: (data) => {
            queryClient.setQueryData(['currentQuestion'], { role: 'USER', content: data.questionContent });
        },
        onSuccess: () => {
            queryClient.setQueryData(['currentQuestion'], null);
        }
    });

    return {
        createOrUpdateSectionByFineTune: createOrUpdateSectionByFineTune
    };
}
