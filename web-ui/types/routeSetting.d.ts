type BaseRoute = {
    icon: React.ReactElement;
    name: string;
};

type RouteItem = BaseRoute & {
    type: 'newChat-btn' | 'oldChat-btn';
    path: string;
    element: React.ReactElement;
};

type LogoutBtn = BaseRoute & {
    type: 'logout-btn';
    onClick: () => void;
};

type RouteMenuItem = RouteItem | 'divider' | LogoutBtn;

type RouteMenu = RouteMenuItem[];
