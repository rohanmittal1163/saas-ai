import Image from 'next/image';

export default function Loader() {
	return (
		<div className=" bg-gray-400/10 z-10 top-0 w-full h-32 flex flex-col gap-4 items-center justify-center">
			<Image
				alt="think"
				src="/logo.png"
				className="animate-spin"
				width={40}
				height={40}
			/>
			<p className="font-bold">Genius is thinking...</p>
		</div>
	);
}
