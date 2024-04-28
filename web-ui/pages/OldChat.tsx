import { ReactNode } from 'react';
import { useMarkdownProcessor } from '@ui/hooks';

export const OldChat: Component = () => {
    const content = useMarkdownProcessor('');
    return (
        <li className='flex flex-col flex-1 min-w-0 gap-1 ml-6 selection:bg-emerald-300 selection:text-emerald-900'>
            <p className='font-sans text-xs font-medium text-emerald-700'>AI:</p>
            <div className='p-2 lg:p-6 border-2 border-emerald-200 rounded-lg bg-emerald-50 text-emerald-900 min-w-0 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0'>
                {content as ReactNode}
            </div>
        </li>
    );
};
