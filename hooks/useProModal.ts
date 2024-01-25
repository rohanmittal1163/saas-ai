import { Store } from '@/interfaces';
import { create } from 'zustand';

export const useProModal = create<Store>((set) => {
	return {
		isOpen: false,
		onOpen: () => set({ isOpen: true }),
		onClose: () => set({ isOpen: false }),
	};
});
