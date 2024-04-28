import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Textarea from 'react-textarea-autosize';
import { useQueryClient } from '@tanstack/react-query';
import { IconButton } from '@material-tailwind/react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useChatHistoryQuery, useFineTuneConversationMutation, useFineTuneModelQuery } from '@ui/hooks';
import { Message, ModelOption } from '@ui/components';

export const OldChat: Component = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const {
        chatHistory: { data: chatHistory, refetch }
    } = useChatHistoryQuery();

    const { listFineTuneModels } = useFineTuneModelQuery();
    const { createOrUpdateSectionByFineTune } = useFineTuneConversationMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty }
    } = useForm<FineTuneChatRequestBody>({
        defaultValues: {
            questionContent: ''
        }
    });

    useEffect(() => {
        (async () => {
            if (queryClient.getQueryData(['currentSectionId']) === id) return;
            queryClient.setQueryData(['currentSectionId'], id);
            await refetch();
        })();
    }, [id, queryClient, refetch]);

    const handleSubmitQuestion = async (data: FineTuneChatRequestBody) => {
        if (!listFineTuneModels) return;
        await createOrUpdateSectionByFineTune.mutateAsync({
            ...data,
            fineTuneModelId: listFineTuneModels.data[0].id,
            sectionId: id
        });
        await refetch();
        reset();
    };

    return (
        <>
            <ModelOption model={listFineTuneModels} />
            <div className='flex flex-col-reverse h-[30rem] overflow-auto'>
                <div className='mx-auto w-full pb-8 flex flex-col stretch gap-8 flex-1'>
                    {chatHistory && chatHistory.data.length ? (
                        <ul className='grid auto-rows-min gap-4 max-w-2xl flex-1 ml-4 w-full'>
                            {chatHistory.data.map((m, index) => (
                                <Message key={index} message={m} />
                            ))}
                        </ul>
                    ) : null}

                    <div className='flex w-full flex-col items-center space-y-3 bg-gradient-to-b from-transparent via-gray-100 to-gray-100'>
                        <form
                            className='fixed bottom-0 mb-8 w-full max-w-screen-md rounded-xl border border-gray-500 bg-white px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4'
                            onSubmit={handleSubmit(handleSubmitQuestion)}
                        >
                            <Textarea
                                {...register('questionContent')}
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
                                disabled={!isDirty}
                                className='!absolute bottom-3 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all'
                            >
                                <PaperAirplaneIcon className='w-5 h-5' />
                            </IconButton>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
