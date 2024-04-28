import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Textarea from 'react-textarea-autosize';
import { useQueryClient } from '@tanstack/react-query';
import { IconButton } from '@material-tailwind/react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useChatHistoryQuery } from '@ui/hooks';
import { Message } from '@ui/components';

export const OldChat: Component = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const {
        chatHistory: { data: chatHistory, refetch }
    } = useChatHistoryQuery();

    useEffect(() => {
        (async () => {
            if (queryClient.getQueryData(['currentSectionId']) === id) return;
            queryClient.setQueryData(['currentSectionId'], id);
            await refetch();
        })();
    }, [id, queryClient, refetch]);
    return (
        <div className='flex flex-col-reverse h-screen'>
            <div className='mx-auto w-full pb-8 flex flex-col stretch gap-8 flex-1'>
                {chatHistory && chatHistory.data.length ? (
                    <ul className='grid auto-rows-min gap-4 max-w-2xl flex-1 ml-4 w-full'>
                        {chatHistory.data.map((m, index) => (
                            <Message key={index} message={m} />
                        ))}
                    </ul>
                ) : null}

                {/* <form onSubmit={handleSubmit} className='max-w-2xl w-full mx-auto'>
                    {error ? (
                        <div className='p-3 rounded-lg bg-rose-100 border-2 border-rose-200 mb-3'>
                            <p className='font-sans text-sm text-red text-rose-800'>{error.message}</p>
                        </div>
                    ) : null}
                    <div className='relative'>
                        <input
                            className='w-full border-2 border-slate-200 rounded-lg p-2 font-sans text-base outline-none ring-offset-0 focus:border-slate-400 focus-visible:ring-2 focus-visible:ring-offset-2 ring-emerald-600 transition-[box-shadow,border-color] pr-10 disabled:opacity-60 disabled:cursor-not-allowed'
                            value={input}
                            onChange={handleInputChange}
                            aria-label='ask a question'
                            placeholder='Ask a question...'
                            disabled={!token}
                        />
                        <button
                            type='submit'
                            aria-label='send'
                            className='absolute top-0 right-0 bottom-0 text-emerald-600 outline-none p-3 disabled:text-slate-600 disabled:opacity-60 disabled:cursor-not-allowed hover:text-emerald-800 focus:text-emerald-800 transition-colors'
                            disabled={!input}
                        >
                            <PaperPlaneRight size='1em' />
                        </button>
                    </div>
                </form> */}

                <form className='fixed bottom-0 mb-8 w-full max-w-screen-md rounded-xl border border-gray-500 bg-white px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4'>
                    <Textarea
                        tabIndex={0}
                        required
                        rows={1}
                        maxRows={10}
                        autoFocus
                        placeholder='Send a message'
                        spellCheck={false}
                        className='w-full pr-10 focus:outline-none'
                    />
                    <IconButton
                        type='submit'
                        size='sm'
                        color='pink'
                        className='!absolute bottom-3 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all'
                    >
                        <PaperAirplaneIcon className='w-5 h-5' />
                    </IconButton>
                </form>
            </div>
        </div>
    );
};
