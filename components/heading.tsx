import { HeadingProps } from '@/interfaces';

export default function Heading({
	label,
	desc,
	icon: Icon,
	color,
	backgroundColor,
}: HeadingProps) {
	return (
		<div className="flex w-full gap-3 items-center">
			<div>
				<Icon
					className={`${color} ${backgroundColor} h-12 w-12 p-2 rounded-md`}
				/>
			</div>
			<div className="flex flex-col">
				<p className="text-3xl font-bold capitalize">{label}</p>
				<p className="text-sm font-semibold text-slate-400 ">{desc}</p>
			</div>
		</div>
	);
}
