import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Textarea from 'react-textarea-autosize';
import { useQueryClient } from '@tanstack/react-query';
import { Button, IconButton, Spinner, Typography } from '@material-tailwind/react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import logo from '@ui/assets/dwarves-logo.png';
import { ModelOption } from '@ui/components';
import {
    useFineTuneModelQuery,
    useSampleConversationMutation,
    useSampleConversationQuery,
    useFineTuneConversationMutation
} from '@ui/hooks';

export const NewChat: Component = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { listFineTuneModels } = useFineTuneModelQuery();
    const { listQuestions } = useSampleConversationQuery();
    const { createOrUpdateSectionBySample } = useSampleConversationMutation();
    const { createOrUpdateSectionByFineTune } = useFineTuneConversationMutation();

    const {
        register,
        handleSubmit,
        formState: { isDirty }
    } = useForm<FineTuneChatRequestBody>({
        defaultValues: {
            questionContent: ''
        }
    });

    const handleSubmitQuestion = async (data: FineTuneChatRequestBody) => {
        if (!listFineTuneModels) return;
        const response = await createOrUpdateSectionByFineTune.mutateAsync({
            ...data,
            fineTuneModelId: listFineTuneModels.data[0].id
        });
        queryClient.setQueryData(['currentSectionId'], response.sectionId);
        navigate(`/chat/${response.sectionId}`);
    };

    return (
        <>
            <ModelOption model={listFineTuneModels} />
            <div className='flex flex-col items-center justify-between'>
                <div className='sm:mx-0 mx-5 mt-20 max-w-screen-md rounded-md sm:w-full'>
                    <div className='flex flex-col items-center space-y-4 p-7 sm:p-10'>
                        <img src={logo} alt='brand' className='h-10 w-10' />
                        <Typography variant='h4'>How can I help you today?</Typography>
                    </div>
                    <div className='grid grid-cols-2 gap-2 p-7 sm:p-10'>
                        {listQuestions ? (
                            listQuestions.data.map((data, i) => (
                                <Button
                                    key={i}
                                    variant='outlined'
                                    className='normal-case text-left text-sm'
                                    onClick={async () => {
                                        const response = await createOrUpdateSectionBySample.mutateAsync({
                                            fineTuneModelId: listFineTuneModels?.data[0]?.id ?? '',
                                            questionId: data.id
                                        });
                                        queryClient.setQueryData(['currentSectionId'], response.sectionId);
                                        navigate(`/chat/${response.sectionId}`);
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
                <div className='fixed bottom-0 flex w-full flex-col items-center space-y-3 bg-gradient-to-b from-transparent via-gray-100 to-gray-100 p-5 pb-3 sm:px-0'>
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
        </>
    );
};
