import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Textarea from 'react-textarea-autosize';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Button, IconButton, Spinner, Typography } from '@material-tailwind/react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import logo from '@ui/assets/dwarves-logo.png';
import {
    useChatHistoryQuery,
    useFineTuneConversationMutation,
    useFineTuneModelQuery,
    useSampleConversationMutation,
    useSampleConversationQuery
} from '@ui/hooks';
import { Message, ModelOption } from '@ui/components';

export const OldChat: Component = () => {
    const queryClient = useQueryClient();
    const currentQuestion = queryClient.getQueryData<{ role: RoleType; content: string }>(['currentQuestion']);

    const { id } = useParams();
    const formRef = useRef<HTMLFormElement>(null);
    const {
        chatHistory: { data: chatHistory, refetch: refetchChatHistory }
    } = useChatHistoryQuery();

    const {
        listQuestions: { data: listQuestions, refetch: refetchListQuestions }
    } = useSampleConversationQuery();
    const { listFineTuneModels } = useFineTuneModelQuery();
    const { createOrUpdateSectionByFineTune } = useFineTuneConversationMutation();
    const { createOrUpdateSectionBySample } = useSampleConversationMutation();
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
            await refetchChatHistory();
        })();
    }, [id, queryClient, refetchChatHistory]);

    const handleSubmitQuestion = async (data: FineTuneChatRequestBody) => {
        if (!listFineTuneModels) return;
        await createOrUpdateSectionByFineTune.mutateAsync({
            ...data,
            fineTuneModelId: listFineTuneModels.data[0].id,
            sectionId: id
        });
        await refetchChatHistory();
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
                            {currentQuestion ? (
                                <>
                                    <Message message={currentQuestion} />
                                    <div className='flex gap-1 justify-items-center items-center'>
                                        <div className='flex items-center justify-items-center gap-1'>
                                            <Avatar src={logo} alt='avatar' size='sm' />
                                            <p className='font-sans text-sm font-semibold text-pink-700'>DwarvesBot</p>
                                        </div>
                                        <Spinner color='pink' className='h-6 w-6' />
                                    </div>
                                </>
                            ) : null}
                        </ul>
                    ) : null}
                    {!currentQuestion ? (
                        <div className='rounded-md w-full px-16'>
                            <div className='flex flex-col items-center mb-4'>
                                <img src={logo} alt='brand' className='h-10 w-10' />
                                <Typography variant='h4'>You can ask the following questions</Typography>
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                {listQuestions ? (
                                    listQuestions.data.map((data, i) => (
                                        <Button
                                            key={i}
                                            variant='outlined'
                                            className='normal-case text-left text-sm'
                                            onClick={async () => {
                                                queryClient.setQueryData(['currentSampleQuestion'], {
                                                    role: 'USER',
                                                    content: data.content
                                                });
                                                await createOrUpdateSectionBySample.mutateAsync({
                                                    sectionId: id,
                                                    fineTuneModelId: listFineTuneModels?.data[0]?.id ?? '',
                                                    questionId: data.id
                                                });
                                                await refetchChatHistory();
                                                await refetchListQuestions();
                                            }}
                                        >
                                            {data.content}
                                        </Button>
                                    ))
                                ) : (
                                    <div className='grid col-span-2 justify-items-center items-center'>
                                        <Spinner color='pink' className='h-12 w-12' />
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : null}
                    <div className='flex w-full flex-col items-center space-y-3 bg-gradient-to-b from-transparent via-gray-100 to-gray-100'>
                        <form
                            ref={formRef}
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
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        formRef.current?.dispatchEvent(new Event('submit', { bubbles: true }));
                                    }
                                }}
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
