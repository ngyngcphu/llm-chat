import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react';
import logo from '@ui/assets/dwarves-logo.png';
import { AppDrawer } from './AppDrawer';

export const AppNavigation: Component<{ menu: RouteMenu }> = ({ menu }) => {
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

    const navigate = useNavigate();
    const [openSidebar, setOpenSidebar] = useState<boolean>(true);

    const LogoCard: Component = () => (
        <div className='flex items-center gap-2'>
            <img src={logo} alt='brand' className='h-8 w-8' />
            <Typography variant='h5' color='blue-gray'>
                Dwarves Foundation
            </Typography>
        </div>
    );

    const Sidebar = useMemo(
        () => (
            <Card className='fixed top-0 left-0 h-[calc(100vh)] w-full max-w-[15rem] rounded-none'>
                <div className='py-4 flex justify-between items-center px-0'>
                    <div className='ml-4'>
                        <LogoCard />
                    </div>
                </div>
                <hr className='my-1 border-blue-gray-50' />
                <List>
                    {menu.map((menuItem, idx) => {
                        if (menuItem === 'divider') return <hr key={idx} className='my-2 border-blue-gray-50' />;

                        if (menuItem.type === 'newChat-btn') {
                            return (
                                <ListItem key={idx} onClick={() => navigate(menuItem.path)}>
                                    <ListItemPrefix>{menuItem.icon}</ListItemPrefix>
                                    {menuItem.name}
                                </ListItem>
                            );
                        }

                        if (menuItem.type === 'oldChat-btn') {
                            return (
                                <div key={idx}>
                                    <Typography variant='h6' color='blue-gray' className='px-4 py-2'>
                                        Recent chats
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
                        }

                        if (menuItem.type === 'logout-btn') {
                            return (
                                <ListItem onClick={menuItem.onClick} key={menuItem.type}>
                                    <ListItemPrefix>{menuItem.icon}</ListItemPrefix>
                                    {menuItem.name}
                                </ListItem>
                            );
                        }
                    })}
                </List>
            </Card>
        ),
        []
    );

    return (
        <AppDrawer open={openSidebar} onClose={() => setOpenSidebar(false)}>
            {Sidebar}
        </AppDrawer>
    );
};
