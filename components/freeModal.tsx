import * as Progress from '@radix-ui/react-progress';
import SubscriptionButton from './subscription_button';
import { FREE_COUNTS } from '@/constants';
export async function FreeModal({ cnt }: { cnt: number }) {
	return (
		<>
			<div className="flex flex-col text-sm  gap-4 items-center  text-white bg-slate-700 rounded-md capitalize p-4 w-full">
				<p>
					{cnt} / {FREE_COUNTS} free generations
				</p>
				<Progress.Root
					className="bg-white transition-all w-full h-2.5 rounded-md relative overflow-hidden "
					value={(100 / FREE_COUNTS) * cnt}
				>
					<Progress.Indicator
						style={{
							transform: `translateX(-${100 - (100 / FREE_COUNTS) * cnt}%)`,
						}}
						className="transition-all bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-full h-full rounded-md"
					/>
				</Progress.Root>
				<SubscriptionButton />
			</div>
		</>
	);
}
