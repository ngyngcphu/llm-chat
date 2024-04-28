import { useQuery } from '@tanstack/react-query';
import { fineTuneModelService } from '@ui/services';
import { retryQueryFn } from '@ui/utils';

export function useFineTuneModelQuery() {
    const listFineTuneModels = useQuery({
        queryKey: ['/api/models'],
        queryFn: () => fineTuneModelService.getAll(),
        retry: retryQueryFn
    });

    return {
        listFineTuneModels: listFineTuneModels.data
    };
}
