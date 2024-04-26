import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react';
import logo from '@ui/assets/dwarves-logo.png';
import { useSidebarStore } from '@ui/states';

export const AppNavigation: Component<{ menu: RouteMenu }> = ({ menu }) => {
    const navigate = useNavigate();
    const TITLE = [
        'Run Typescript with Node.js',
        'Run Typescript with Node.js',
        'Run Typescript with Node.js',
        'Run Typescript with Node.js',
        'Run Typescript with Node.js',
        'Run Typescript with Node.js',
        'Run Typescript with Node.js',
        'Run Typescript with Node.js',
        'Run Typescript with Node.js',
        'Run Typescript with Node.js',
        'Run Typescript with Node.js',
        'Run Typescript with Node.js',
        'Run Typescript with Node.js',
        'Run Typescript with Node.js',
        'Run Typescript with Node.js'
    ];

    const { collapseSidebar, setCollapseSidebar } = useSidebarStore();

    const LogoCard: Component = useMemo(
        () => () => (
            <div className='flex items-center gap-2 mx-4'>
                <img
                    src={logo}
                    alt='brand'
                    className='h-8 w-8 cursor-pointer hover:shadow-lg'
                    onClick={() => setCollapseSidebar(!collapseSidebar)}
                />
                <Typography variant='h5' color='blue-gray'>
                    {collapseSidebar ? '' : 'Dwarves Foundation'}
                </Typography>
            </div>
        ),
        [collapseSidebar, setCollapseSidebar]
    );

    return (
        <Card
            className={
                `rounded-none fixed bg-gray-50 top-0 left-0 h-screen w-full` + `${collapseSidebar ? ' max-w-[4rem]' : ' max-w-[18rem]'}`
            }
        >
            <div className='py-4 px-0'>
                <LogoCard />
            </div>
            <hr className='my-1 border-blue-gray-50' />
            <List className='min-w-0'>
                {menu.map((menuItem, idx) => {
                    if (menuItem.type === 'newChat-btn')
                        return (
                            <ListItem key={idx} onClick={() => navigate(menuItem.path)}>
                                <ListItemPrefix>{menuItem.icon}</ListItemPrefix>
                                {!collapseSidebar ? menuItem.name : ''}
                            </ListItem>
                        );

                    if (menuItem.type === 'oldChat-btn' && TITLE.length > 0 && !collapseSidebar)
                        return (
                            <div key={idx} className='h-96 overflow-auto'>
                                <Typography variant='h6' color='blue-gray' className='px-4 py-2'>
                                    {!collapseSidebar ? 'Recent chats' : ''}
                                </Typography>
                                {TITLE.map((title, idx) => {
                                    return (
                                        <ListItem
                                            onClick={() => navigate(menuItem.path.replace(':id', idx.toString()))}
                                            key={menuItem.path + idx}
                                        >
                                            <ListItemPrefix>{menuItem.icon}</ListItemPrefix>
                                            {title}
                                        </ListItem>
                                    );
                                })}
                            </div>
                        );

                    if (menuItem.type === 'logout-btn')
                        return (
                            <div key={idx} className='!absolute bottom-4 inset-x-2'>
                                <hr className='border-blue-gray-50' />
                                <ListItem onClick={menuItem.onClick}>
                                    <ListItemPrefix>{menuItem.icon}</ListItemPrefix>
                                    {!collapseSidebar ? menuItem.name : ''}
                                </ListItem>
                            </div>
                        );
                })}
            </List>
        </Card>
    );
};
