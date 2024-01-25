'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
} from '@/components/ui/dialog';
import { Badge } from './ui/badge';
import { Check, Zap } from 'lucide-react';
import { SidebarRoutes } from '@/interfaces';
import { routes } from '@/constants';
import { useProModal } from '@/hooks/useProModal';
import SubscriptionButton from './subscription_button';

export default function Modal() {
	const proModal = useProModal();
	return (
		<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
			<DialogContent className="w-1/3 flex flex-col items-center justify-center">
				<DialogHeader className="flex flex-row font-bold capitalize text-black w-full bg-white items-center gap-4 justify-center">
					<p className="mt-1 text-2xl">upgrade to Genius</p>
					<Badge variant="gradient">pro</Badge>
				</DialogHeader>
				{routes.map((route: SidebarRoutes, idx: number) => {
					return (
						route.backgroundColor && (
							<div
								key={idx}
								className="bg-white rounded-md hover:shadow-lg shadow-md flex items-center justify-between p-3 font-bold capitalize w-full"
							>
								<div className="flex items-center gap-3">
									<route.icon
										className={`${route.color} ${route.backgroundColor} w-10 h-10 p-2 rounded-md`}
									/>
									<p>{route.label}</p>
								</div>
								<Check className={route.color} />
							</div>
						)
					);
				})}
				<DialogFooter>
					<SubscriptionButton />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
