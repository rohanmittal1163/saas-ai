import Image from 'next/image';

export default function Empty({ desc }: { desc: string }) {
	return (
		<div className="flex flex-col h-full items-center justify-center p-5">
			<Image alt="empty" src="/empty.png" width={300} height={300} />
			<p className="text-sm text-slate-600">{desc}</p>
		</div>
	);
}
