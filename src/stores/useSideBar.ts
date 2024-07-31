import { create } from 'zustand';

interface SideBarStoreProps {
  isActive: boolean;
  setIsActive: (state: boolean) => void;
}

const useSideBar = create<SideBarStoreProps>(set => ({
  isActive: false,
  setIsActive: state => {
    set({ isActive: state });
  },
}));

export default useSideBar;
