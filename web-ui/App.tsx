import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { PlusIcon, PowerIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { AppSkeleton } from '@ui/components';
import { AppLayout, AuthLayout } from '@ui/layouts';
import { useUserQuery } from '@ui/hooks';
import { AuthPage, NewChat, OldChat } from '@ui/pages';
import { authService } from '@ui/services';

export default function App() {
    const navigate = useNavigate();
    const {
        info: { isFetching, isError, isSuccess, refetch }
    } = useUserQuery();
    const { pathname } = useLocation();

    const logout = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => authService.logout()
    });

    useEffect(() => {
        refetch({ throwOnError: true }).catch((err) => {
            if (err.statusCode !== 401) toast.error(err.message);
        });
    }, [refetch]);

    useEffect(() => {
        if (pathname === '/' && isSuccess) {
            navigate('/chat');
        }
    }, [pathname, isSuccess, navigate]);

    if (isFetching) return <AppSkeleton />;

    if (isError)
        return (
            <AuthLayout>
                <AuthPage />
            </AuthLayout>
        );

    return (
        <AppLayout
            menu={[
                {
                    type: 'newChat-btn',
                    icon: <PlusIcon className='h-5 w-5' />,
                    name: 'New chat',
                    path: '/chat',
                    element: <NewChat />
                },
                {
                    type: 'oldChat-btn',
                    icon: <ChatBubbleLeftIcon className='h-5 w-5' />,
                    name: 'Recent chat',
                    path: '/chat/:id',
                    element: <OldChat />
                },
                {
                    type: 'logout-btn',
                    icon: <PowerIcon className='h-5 w-5' />,
                    name: 'Đăng xuất',
                    onClick: async () => {
                        await logout.mutateAsync();
                        await refetch();
                    }
                }
            ]}
        />
    );
}
