import { useQuery } from '@tanstack/react-query';
import { userService } from '@ui/services';

export function useUserQuery() {
    const info = useQuery({
        queryKey: ['/api/user'],
        queryFn: () => userService.getInfo(),
        retry(failureCount, error: ResponseError) {
            if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) return false;
            return failureCount < 0;
        },
        enabled: false
    });

    return {
        info: info
    };
}
