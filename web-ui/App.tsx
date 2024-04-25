import { PlusIcon, PowerIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { AppLayout } from '@ui/layouts';

export default function App() {
    return (
        <AppLayout
            menu={[
                {
                    type: 'newChat-btn',
                    icon: <PlusIcon className='h-5 w-5' />,
                    name: 'New chat',
                    path: '/',
                    element: <></>
                },
                {
                    type: 'oldChat-btn',
                    icon: <ChatBubbleLeftIcon className='h-5 w-5' />,
                    name: 'Recent chat',
                    path: '/chat/:id',
                    element: <></>
                },
                'divider',
                {
                    type: 'logout-btn',
                    icon: <PowerIcon className='h-5 w-5' />,
                    name: 'Đăng xuất',
                    onClick: () => {}
                }
            ]}
        />
    );
}