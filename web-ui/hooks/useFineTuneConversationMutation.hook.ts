import { useMutation } from '@tanstack/react-query';
import { fineTuneConversationService } from '@ui/services';

export function useFineTuneConversationMutation() {
    const createOrUpdateSectionByFineTune = useMutation({
        mutationKey: ['createOrUpdateSectionByFineTune'],
        mutationFn: (fineTuneChatRequestBody: FineTuneChatRequestBody) => fineTuneConversationService.getAnswer(fineTuneChatRequestBody)
    });

    return {
        createOrUpdateSectionByFineTune: createOrUpdateSectionByFineTune
    };
}
