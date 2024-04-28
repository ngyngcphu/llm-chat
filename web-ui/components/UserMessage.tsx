import { Avatar } from '@material-tailwind/react';

export const UserMessage: Component<{ children: string }> = ({ children }) => {
    return (
        <li className='flex flex-col flex-1 min-w-0 w-fit gap-1 selection:bg-teal-300 selection:text-teal-900'>
            <div className='flex items-center justify-items-center gap-1'>
                <Avatar src='https://docs.material-tailwind.com/img/face-2.jpg' alt='avatar' size='sm' />
                <p className='font-sans text-sm font-semibold text-teal-700'>You</p>
            </div>
            <p className='ml-10 p-2 lg:p-6 border-2 border-teal-200 rounded-lg bg-teal-50 font-sans text-sm text-teal-900 min-w-0'>
                {children}
            </p>
        </li>
    );
};
