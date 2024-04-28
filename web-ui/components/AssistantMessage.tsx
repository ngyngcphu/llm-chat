import { ReactNode } from 'react';
import { useMarkdownProcessor } from '@ui/hooks';

export const AssistantMessage: Component<{ children: string }> = ({ children }) => {
    const content = useMarkdownProcessor(children);

    return (
        <li className='flex flex-col flex-1 min-w-0 w-fit gap-1 selection:bg-pink-300 selection:text-pink-900'>
            <p className='font-sans text-xs font-medium text-pink-700'>AI:</p>
            <div className='p-2 lg:p-6 border-2 border-pink-200 rounded-lg bg-pink-50 text-pink-900 min-w-0 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0'>
                {content as ReactNode}
            </div>
        </li>
    );
};
