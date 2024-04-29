import { Avatar } from '@material-tailwind/react';
import logo from '@ui/assets/dwarves-logo.png';
import { ILayout } from '@ui/interfaces';

export const AuthLayout: ILayout = function ({ children }) {
    return (
        <div className='flex px-10 flex-col sm:flex-row justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full gap-6'>
            <div className='basis-1/2 flex justify-center items-end sm:items-center bg-emerald-100'>
                <Avatar src={logo} alt='TickLab Banner' className='h-64 w-64' />
            </div>
            <div className='basis-1/2 flex justify-center items-start sm:items-center'>{children}</div>
        </div>
    );
};
