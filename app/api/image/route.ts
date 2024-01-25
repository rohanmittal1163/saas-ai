import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import Replicate from 'replicate';
import { increaseApiLimit, isApiLimitEnd, isPro } from '@/lib/apiLimit';

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request, res: NextResponse) {
	const { userId } = auth();
	const body = await req.json();

	const {
		prompt,
		amount,
		resolution,
	}: { prompt: string; amount: string; resolution: string } = body;

	if (!userId) {
		return new NextResponse('Unauthorized', { status: 401 });
	}
	if (prompt === '') {
		return new NextResponse('Prompt is required', { status: 400 });
	}
	const freeApi = await isApiLimitEnd();
	const ispro = await isPro();
	if (freeApi && !ispro) {
		return new NextResponse('Free limits expire', { status: 402 });
	}

	const output = await replicate.run(
		'stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4',
		{
			input: {
				prompt,
				num_outputs: parseInt(amount, 10),
				width: parseInt(resolution.split('x')[0], 10),
				height: parseInt(resolution.split('x')[1], 10),
			},
		}
	);

	if (!ispro) {
		await increaseApiLimit();
	}

	return NextResponse.json(output, { status: 200 });
}
