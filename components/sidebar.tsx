'use client';
import { routes } from '@/constants';
import { SidebarRoutes } from '@/interfaces';
import { cn } from '@/lib/utils';

import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FreeModal } from './freeModal';

const monteserrat = Montserrat({
	weight: '600',
	subsets: ['latin'],
});

export default function Sidebar({
	cnt,
	isPro,
}: {
	cnt: number;
	isPro: boolean;
}) {
	const pathname: string = usePathname();

	return (
		<>
			<div className="flex gap-3 items-center w-full px-2  ">
				<div className="text-sky-500 text-emerald-500 text-purple-400 bg-purple-400/10 hidden"></div>
				<Image
					src="/logo.png"
					alt="error loading image"
					width={35}
					height={35}
				/>
				<p className={cn('text-2xl font-bold', monteserrat.className)}>
					Genius
				</p>
			</div>

			<div className="flex flex-col gap-1 text-sm">
				{routes.map((route: SidebarRoutes, idx: number) => {
					return (
						<Link
							href={route.href}
							key={idx}
							className={`flex flex-row gap-3 items-center hover:bg-white/10  p-3 rounded-lg capitalize ${
								pathname == route.href ? 'bg-white/10' : ''
							}`}
						>
							<route.icon className={route.color} />
							<p>{route.label}</p>
						</Link>
					);
				})}
			</div>
			{!isPro && <FreeModal cnt={cnt} />}
		</>
	);
}
