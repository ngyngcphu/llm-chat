type UserData = {
    id: string;
    email: string;
};

type UserStore = {
    userStatus: StoreStatus;
    userData: UserData;
    getUserData: () => Promise<void>;
};
