export function Testimonials({
	user,
	designation,
	review,
}: {
	user: string;
	designation: string;
	review: string;
}) {
	return (
		<>
			<div className="w-full flex flex-col gap-3 text-slate-500 text-center bg-white/10 rounded-md p-4">
				<div className="flex flex-col gap-0">
					<p className="text-white/90">{user}</p>
					<p className="text-sm">{designation}</p>
				</div>
				<div>
					<p className="text-center text-slate-300 text-sm">{review}</p>
				</div>
			</div>
		</>
	);
}
