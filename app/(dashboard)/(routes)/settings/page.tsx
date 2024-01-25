import Heading from '@/components/heading';
import SubscriptionButton from '@/components/subscription_button';
import { isPro } from '@/lib/apiLimit';
import { Settings } from 'lucide-react';
import React from 'react';

export default async function page() {
	const ispro: boolean = await isPro();
	return (
		<div className="py-2 px-5 flex flex-col gap-8 h-[calc(100%-65px)]">
			<Heading
				backgroundColor="bg-slate-700/10"
				color="text-white-700"
				desc="Manage account settings."
				label="Settings"
				icon={Settings}
			/>
			<SubscriptionButton isPro={ispro} />
		</div>
	);
}
