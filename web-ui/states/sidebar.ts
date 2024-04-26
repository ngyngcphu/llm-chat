import { create } from 'zustand';

export const useSidebarStore = create<SidebarStore>((set) => ({
    collapseSidebar: false,
    setCollapseSidebar: (payload) => {
        set({ collapseSidebar: payload });
    }
}));
