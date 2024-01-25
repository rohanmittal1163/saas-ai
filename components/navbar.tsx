import { UserButton } from '@clerk/nextjs';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import Sidebar from './sidebar';

export default function Navbar({
	cnt,
	isPro,
}: {
	cnt: number;
	isPro: boolean;
}) {
	return (
		<div className=" flex flex-row items-center w-full p-3 justify-between md:justify-end bg-white">
			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden rounded-full"
					>
						<Menu />
					</Button>
				</SheetTrigger>

				<SheetContent side="left" className="p-0 m-0 text-white">
					<div className="flex w-full bg-slate-800  py-7 px-4 h-full  transition-all flex-col gap-10">
						<Sidebar cnt={cnt} isPro={isPro} />
					</div>
				</SheetContent>
			</Sheet>

			<UserButton afterSignOutUrl="/" />
		</div>
	);
}
