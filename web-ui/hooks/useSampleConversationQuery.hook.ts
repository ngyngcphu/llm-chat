import { useQuery } from '@tanstack/react-query';
import { sampleConversationService } from '@ui/services';
import { retryQueryFn } from '@ui/utils';

export function useSampleConversationQuery() {
    const listQuestions = useQuery({
        queryKey: ['/api/sample/questions'],
        queryFn: () => sampleConversationService.getQuestions(),
        retry: retryQueryFn
    });

    return {
        listQuestions: listQuestions
    };
}
