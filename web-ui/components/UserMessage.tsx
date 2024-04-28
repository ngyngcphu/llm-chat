export const UserMessage: Component<{ children: string }> = ({ children }) => {
    return (
        <li className='flex flex-col flex-1 min-w-0 w-fit gap-1 selection:bg-teal-300 selection:text-teal-900'>
            <p className='font-sans text-xs font-medium text-teal-700'>You:</p>
            <p className='p-2 lg:p-6 border-2 border-teal-200 rounded-lg bg-teal-50 font-sans text-sm text-teal-900 min-w-0'>{children}</p>
        </li>
    );
};
