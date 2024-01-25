import { LucideIcon } from 'lucide-react';

export interface SidebarRoutes {
	label: string;
	icon: LucideIcon;
	color: string;
	href: string;
	backgroundColor?: string;
}

export interface HeadingProps {
	label: string;
	desc: string;
	icon: LucideIcon;
	color: string;
	backgroundColor: string;
}

export interface ChatMessage {
	role: string;
	content: string;
}

export interface AmountOption {
	value: string;
	label: string;
}

export interface Store {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}
