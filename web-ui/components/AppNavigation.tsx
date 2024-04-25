import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionBody, AccordionHeader, Card, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import logo from '@fe/assets/elearning-logo.png';

export const AppNavigation: Component<{ menu: RouteMenu }> = ({ menu }) => {
    const navigate = useNavigate();
    const [expanseSubmenu, setExpanseSubmenu] = useState<number>(-1);

    const handleExpandMenu = (value: number) => {
        setExpanseSubmenu(expanseSubmenu === value ? -1 : value);
    };

    const LogoCard = () => (
        <div className='flex items-center gap-2'>
            <img src={logo} alt='brand' className='h-8 w-8' />
            <Typography variant='h5' color='blue-gray' placeholder=''>
                Elearning System
            </Typography>
        </div>
    );

    return (
        <Card placeholder='' className='fixed top-0 left-0 h-[calc(100vh)] w-full max-w-[15rem] rounded-none'>
            <div className='py-4 flex justify-between items-center px-0'>
                <div className='ml-4'>
                    <LogoCard />
                </div>
            </div>
            <hr className='my-1 border-blue-gray-50' />
            <List placeholder=''>
                {menu.map((menuItem, idx) => {
                    if (menuItem === 'divider') return <hr className='my-2 border-blue-gray-50' key={menuItem + idx} />;

                    if (menuItem.type === 'list') {
                        return (
                            <Accordion
                                placeholder=''
                                open={expanseSubmenu === idx}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 transition-transform ${expanseSubmenu === idx ? 'rotate-180' : ''}`}
                                    />
                                }
                                key={menuItem.name}
                            >
                                <ListItem placeholder='' className='p-0' selected={expanseSubmenu === idx}>
                                    <AccordionHeader placeholder='' onClick={() => handleExpandMenu(idx)} className='border-b-0 p-3'>
                                        <ListItemPrefix placeholder=''>{menuItem.icon}</ListItemPrefix>
                                        <Typography placeholder='' color='blue-gray' className='mr-auto font-normal'>
                                            {menuItem.name}
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className='py-1'>
                                    <List placeholder='' className='p-0'>
                                        {menuItem.routes.map((route) => (
                                            <ListItem key={route.path} placeholder='' onClick={() => navigate(route.path)}>
                                                <ListItemPrefix placeholder=''>{route.icon}</ListItemPrefix>
                                                {route.name}
                                            </ListItem>
                                        ))}
                                    </List>
                                </AccordionBody>
                            </Accordion>
                        );
                    }

                    if (menuItem.type === 'item') {
                        return (
                            <ListItem placeholder='' onClick={() => navigate(menuItem.path)} key={menuItem.path}>
                                <ListItemPrefix placeholder=''>{menuItem.icon}</ListItemPrefix>
                                {menuItem.name}
                            </ListItem>
                        );
                    }

                    return (
                        <ListItem placeholder='' onClick={menuItem.onClick} key={menuItem.type}>
                            <ListItemPrefix placeholder=''>{menuItem.icon}</ListItemPrefix>
                            {menuItem.name}
                        </ListItem>
                    );
                })}
            </List>
        </Card>
    );
};
