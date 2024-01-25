'use client';
import Image from 'next/image';
import logo from '../icon.png';
import { Button } from '@/components/ui/button';
import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from 'react';
import { Testimonials } from '@/components/testimonial';
import { saasAiReviews } from '@/constants';
import Link from 'next/link';

export default function Home() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}
	return (
		<div className="bg-slate-900">
			<div className="mx-auto w-10/12 ">
				<div className="flex flex-row justify-between items-center h-16 ">
					<div className="flex flex-row gap-3 items-center">
						<Image
							src={logo}
							width={35}
							height={35}
							alt="error loading image"
						/>
						<p className="font-bold capitalize text-xl text-white">Genius</p>
					</div>
					<div>
						<Link href="/dashboard">
							<button className="py-2 px-5 rounded-full hover:bg-white/90 text-sm bg-white capitalize font-semibold">
								Get started
							</button>
						</Link>
					</div>
				</div>
				<div className="w-full flex flex-col items-center justify-center gap-4 h-[calc(100vh-64px)]">
					<div>
						<p className="text-6xl text-white font-extrabold text-center  ">
							The Best AI Tool for
						</p>
					</div>
					<div>
						<p className="text-6xl text-pink-500 font-extrabold capitalize text-center">
							<TypeAnimation
								sequence={[
									'chatbot.',
									1500,
									'image generation.',
									1500,
									'audio generation.',
									1500,
									'music generation.',
									1500,
								]}
								wrapper="span"
								speed={10}
								style={{ fontSize: '1em', display: 'inline-block' }}
								repeat={Infinity}
							/>
						</p>
					</div>
					<div>
						<p className="text-md text-slate-300">
							Create content using AI 10x faster.
						</p>
					</div>
					<div>
						<Link href="/dashboard">
							<Button
								variant={'gradient'}
								className="rounded-full px-8 capitalize font-semibold"
							>
								start generating for free
							</Button>
						</Link>
					</div>
					<div>
						<p className="text-sm text-slate-300">No credit card required.</p>
					</div>
				</div>

				<div className="flex flex-col gap-7">
					<p className="text-center text-white text-4xl font-extrabold">
						Testimonial
					</p>
					<div className="grid-cols-1 grid grid-rows-auto md:grid-cols-2 lg:grid-cols-4 gap-6">
						{saasAiReviews.map((val, index) => {
							return (
								<Testimonials
									user={val.user}
									review={val.review}
									designation={val.designation}
									key={index}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
