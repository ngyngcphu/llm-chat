import { useChat } from 'ai/react';
import Textarea from 'react-textarea-autosize';
import {
    Button,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
    Popover,
    PopoverContent,
    PopoverHandler,
    Spinner,
    Typography
} from '@material-tailwind/react';
import { ChevronDownIcon, InformationCircleIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import logo from '@ui/assets/dwarves-logo.png';
import { useFineTuneModelQuery, useSampleConversationQuery } from '@ui/hooks';

export const NewChat: Component = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    const {
        listFineTuneModels: { data: listFineTuneModels }
    } = useFineTuneModelQuery();
    const {
        listQuestions: { data: listQuestions }
    } = useSampleConversationQuery();

    return (
        <>
            <Popover placement='bottom-start'>
                <PopoverHandler>
                    <Button variant='text' className='normal-case text-lg flex items-center gap-1'>
                        <span>
                            {listFineTuneModels ? (
                                <span>
                                    Model <span className='text-base font-medium text-gray-500'>{listFineTuneModels.data[0].name}</span>
                                </span>
                            ) : (
                                'Loading...'
                            )}
                        </span>
                        <ChevronDownIcon className='h-4 w-4' />
                    </Button>
                </PopoverHandler>
                <PopoverContent className='w-72'>
                    <div className='mb-4 flex items-center justify-between border-b border-blue-gray-50'>
                        <Typography variant='paragraph'> Model</Typography>
                        <InformationCircleIcon strokeWidth={1.5} className='h-5 w-5' />
                    </div>
                    <List className='p-0'>
                        <a href='#' className='text-initial font-medium text-blue-gray-500'>
                            <ListItem>
                                <ListItemPrefix>
                                    <svg width='14' height='16' viewBox='0 0 14 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            fillRule='evenodd'
                                            clipRule='evenodd'
                                            d='M1 2C1 1.46957 1.21071 0.960859 1.58579 0.585786C1.96086 0.210714 2.46957 0 3 0H11C11.5304 0 12.0391 0.210714 12.4142 0.585786C12.7893 0.960859 13 1.46957 13 2V14C13.2652 14 13.5196 14.1054 13.7071 14.2929C13.8946 14.4804 14 14.7348 14 15C14 15.2652 13.8946 15.5196 13.7071 15.7071C13.5196 15.8946 13.2652 16 13 16H10C9.73478 16 9.48043 15.8946 9.29289 15.7071C9.10536 15.5196 9 15.2652 9 15V13C9 12.7348 8.89464 12.4804 8.70711 12.2929C8.51957 12.1054 8.26522 12 8 12H6C5.73478 12 5.48043 12.1054 5.29289 12.2929C5.10536 12.4804 5 12.7348 5 13V15C5 15.2652 4.89464 15.5196 4.70711 15.7071C4.51957 15.8946 4.26522 16 4 16H1C0.734784 16 0.48043 15.8946 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15C0 14.7348 0.105357 14.4804 0.292893 14.2929C0.48043 14.1054 0.734784 14 1 14V2ZM4 3H6V5H4V3ZM6 7H4V9H6V7ZM8 3H10V5H8V3ZM10 7H8V9H10V7Z'
                                            fill='#90A4AE'
                                        />
                                    </svg>
                                </ListItemPrefix>
                                ABC Construction
                            </ListItem>
                        </a>
                        <a href='#' className='text-initial font-medium text-blue-gray-500'>
                            <ListItem>
                                <ListItemPrefix>
                                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H3.153C3.38971 0.000108969 3.6187 0.0841807 3.79924 0.23726C3.97979 0.390339 4.10018 0.602499 4.139 0.836L4.879 5.271C4.91436 5.48222 4.88097 5.69921 4.78376 5.89003C4.68655 6.08085 4.53065 6.23543 4.339 6.331L2.791 7.104C3.34611 8.47965 4.17283 9.72928 5.22178 10.7782C6.27072 11.8272 7.52035 12.6539 8.896 13.209L9.67 11.661C9.76552 11.4695 9.91994 11.3138 10.1106 11.2166C10.3012 11.1194 10.5179 11.0859 10.729 11.121L15.164 11.861C15.3975 11.8998 15.6097 12.0202 15.7627 12.2008C15.9158 12.3813 15.9999 12.6103 16 12.847V15C16 15.2652 15.8946 15.5196 15.7071 15.7071C15.5196 15.8946 15.2652 16 15 16H13C5.82 16 0 10.18 0 3V1Z'
                                            fill='#90A4AE'
                                        />
                                    </svg>
                                </ListItemPrefix>
                                00 123 456 789
                            </ListItem>
                        </a>
                        <a href='#' className='text-initial font-medium text-blue-gray-500'>
                            <ListItem>
                                <ListItemPrefix>
                                    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M2.00299 5.884L9.99999 9.882L17.997 5.884C17.9674 5.37444 17.7441 4.89549 17.3728 4.54523C17.0015 4.19497 16.5104 3.99991 16 4H3.99999C3.48958 3.99991 2.99844 4.19497 2.62717 4.54523C2.2559 4.89549 2.03259 5.37444 2.00299 5.884Z'
                                            fill='#90A4AE'
                                        />
                                        <path
                                            d='M18 8.11798L10 12.118L2 8.11798V14C2 14.5304 2.21071 15.0391 2.58579 15.4142C2.96086 15.7893 3.46957 16 4 16H16C16.5304 16 17.0391 15.7893 17.4142 15.4142C17.7893 15.0391 18 14.5304 18 14V8.11798Z'
                                            fill='#90A4AE'
                                        />
                                    </svg>
                                </ListItemPrefix>
                                person@example.com
                            </ListItem>
                        </a>
                    </List>
                </PopoverContent>
            </Popover>
            <div className='flex flex-col items-center justify-between'>
                {messages.length > 0 ? (
                    messages.map((message, i) => (
                        <div
                            key={i}
                            className={
                                `flex w-full items-center justify-center border-b border-gray-200 py-8` + message.role === 'user'
                                    ? ' bg-white'
                                    : ' bg-gray-100'
                            }
                        >
                            <div className='flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0'>
                                <div className={message.role === 'assistant' ? ' bg-white' : ' bg-black p-1.5 text-white'}>
                                    {message.role === 'user' ? <></> : <></>}
                                </div>
                                <div className='prose prose-p:leading-relaxed mt-1 w-full break-words'>{message.content}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='sm:mx-0 mx-5 mt-20 max-w-screen-md rounded-md sm:w-full'>
                        <div className='flex flex-col items-center space-y-4 p-7 sm:p-10'>
                            <img src={logo} alt='brand' className='h-10 w-10' />
                            <Typography variant='h4'>How can I help you today?</Typography>
                        </div>
                        <div className='grid grid-cols-2 gap-2 p-7 sm:p-10'>
                            {listQuestions ? (
                                listQuestions.data.map((question, i) => (
                                    <Button key={i} variant='outlined' className='normal-case text-left text-sm'>
                                        {question.content.slice(2).trim()}
                                    </Button>
                                ))
                            ) : (
                                <div className='grid col-span-2 justify-items-center items-center'>
                                    <Spinner color='pink' className='h-12 w-12' />
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <div className='fixed bottom-0 flex w-full flex-col items-center space-y-3 bg-gradient-to-b from-transparent via-gray-100 to-gray-100 p-5 pb-3 sm:px-0'>
                    <form
                        onSubmit={handleSubmit}
                        className='fixed bottom-0 mb-8 w-full max-w-screen-md rounded-xl border border-gray-500 bg-white px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4'
                    >
                        <Textarea
                            tabIndex={0}
                            required
                            rows={1}
                            maxRows={10}
                            autoFocus
                            placeholder='Send a message'
                            value={input}
                            onChange={handleInputChange}
                            spellCheck={false}
                            className='w-full pr-10 focus:outline-none'
                        />
                        <IconButton
                            size='sm'
                            color='pink'
                            disabled={!input}
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
