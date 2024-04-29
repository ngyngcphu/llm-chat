import { ChevronDownIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Button, Popover, PopoverContent, PopoverHandler, Typography } from '@material-tailwind/react';

export const ModelOption: Component<{ model: { data: { id: string; name: string }[] } | undefined }> = ({ model }) => {
    return (
        <Popover placement='bottom-start'>
            <PopoverHandler>
                <Button variant='text' className='normal-case text-lg flex items-center gap-1'>
                    <span>
                        {model ? (
                            <span>
                                Model <span className='text-base font-medium text-gray-500'>{model.data[0].name}</span>
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
            </PopoverContent>
        </Popover>
    );
};
