import { useQuery, useQueryClient } from '@tanstack/react-query';
import { chatHistoryService } from '@ui/services';
import { retryQueryFn } from '@ui/utils';

export function useChatHistoryQuery() {
    const queryClient = useQueryClient();
    const currentSectionId = queryClient.getQueryData<string>(['currentSectionId']);

    const chatHistory = useQuery({
        queryKey: ['/api/history/{sectionId}', currentSectionId],
        queryFn: () => (currentSectionId ? chatHistoryService.getHistory(currentSectionId) : null),
        retry: retryQueryFn
    });

    return {
        chatHistory: chatHistory
    };
}
