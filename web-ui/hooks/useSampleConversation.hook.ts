import { useQuery, useQueryClient } from '@tanstack/react-query';
import { sampleConversationService } from '@ui/services';
import { retryQueryFn } from '@ui/utils';

export function useSampleConversationQuery() {
    const queryClient = useQueryClient();
    const currentSampleQuestion = queryClient.getQueryData<{ id: string; question: string }>(['currentSampleQuestion']);

    const listQuestions = useQuery({
        queryKey: ['/api/sample/questions'],
        queryFn: () => sampleConversationService.getQuestions(),
        retry: retryQueryFn
    });

    const answer = useQuery({
        queryKey: ['/api/sample/answer', currentSampleQuestion?.id, currentSampleQuestion],
        queryFn: () => (currentSampleQuestion ? sampleConversationService.getAnswer(currentSampleQuestion?.id) : null),
        retry: retryQueryFn
    });

    return {
        listQuestions: listQuestions,
        answer: answer
    };
}
