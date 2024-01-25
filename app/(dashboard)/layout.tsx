import { CrispProvider } from '@/components/crisp-provider';
import Modal from '@/components/modal';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { getApiLimitCount, isPro } from '@/lib/apiLimit';

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const free_limit: number = await getApiLimitCount();
	const ispro: boolean = await isPro();
	return (
		<>
			<Modal />
			<CrispProvider />

			<div className="flex gap-0 flex-row w-full h-full ">
				<div className="hidden md:flex w-80 bg-slate-800 text-white py-7 px-4 h-full relative  transition-all flex-col gap-10">
					<Sidebar cnt={free_limit} isPro={ispro} />
				</div>
				<div className="flex-col gap-0 items-center justify-center w-full">
					<Navbar isPro={ispro} cnt={free_limit} />
					{children}
				</div>
			</div>
		</>
	);
}
