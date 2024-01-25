'use client';
import { routes } from '@/constants';
import { SidebarRoutes } from '@/interfaces';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function dashboardPage() {
	return (
		<div className="flex flex-col gap-5 items-center">
			<p className="font-bold text-xl md:text-4xl text-center">
				Explore the power of AI
			</p>
			<p className="text-sm text-slate-500 -mt-3 text-center">
				Chat with smartest AI - Experience the power of AI
			</p>

			{routes.map((route: SidebarRoutes, idx: number) => {
				return (
					route.backgroundColor && (
						<Link
							href={route.href}
							key={idx}
							className="bg-white rounded-md hover:shadow-lg shadow-md flex items-center justify-between p-3 font-bold capitalize w-4/5"
						>
							<div className="flex items-center gap-3">
								<route.icon
									className={`${route.color} ${route.backgroundColor} w-10 h-10 p-2 rounded-md`}
								/>
								<p>{route.label}</p>
							</div>
							<ArrowRight />
						</Link>
					)
				);
			})}
		</div>
	);
}
