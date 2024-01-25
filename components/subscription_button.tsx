'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import axios from 'axios';

export default function SubscriptionButton({
	isPro = false,
}: {
	isPro?: boolean;
}) {
	const onClick = async () => {
		try {
			setLoading(true);
			const response = await axios.get('/api/stripe');
			window.location.href = response.data;
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	const [isLoading, setLoading] = useState<boolean>(false);
	return (
		<div className="flex flex-col gap-2 ">
			{isPro && (
				<p className="text-sm text-slate-600 capitalize">
					You are currently on a pro plan
				</p>
			)}
			<Button
				disabled={isLoading}
				onClick={onClick}
				variant={isPro ? 'primary' : 'gradient'}
				className="w-fit px-6 flex gap-2 items-center justify-center capitalize"
			>
				{isLoading ? (
					'Loading...'
				) : isPro ? (
					'Manage subscriptions'
				) : (
					<>
						upgrade <Zap />
					</>
				)}
			</Button>
		</div>
	);
}
