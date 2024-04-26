import { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppNavigation } from '@ui/components';
import { useSidebarStore } from '@ui/states';

export const AppLayout: Component<{ menu: RouteMenu }> = ({ menu }) => {
    const { collapseSidebar } = useSidebarStore();

    const routeItems = useMemo(() => {
        const items: { path: string; element: React.ReactElement }[] = [];
        for (const menuItem of menu) {
            if (menuItem.type === 'logout-btn') continue;
            items.push({ path: menuItem.path, element: menuItem.element });
        }
        return items;
    }, [menu]);

    return (
        <div className='flex flex-col h-screen sm:min-h-screen'>
            <AppNavigation menu={menu} />

            <div className={`lg:p-4 flex-1 h-full ml-[18rem]` + (collapseSidebar ? ' ml-[4rem]' : ' ml-[18rem]')}>
                <Routes>
                    {routeItems.map((item) => (
                        <Route key={item.path} path={item.path} element={item.element} />
                    ))}
                </Routes>
            </div>
        </div>
    );
};
