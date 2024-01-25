import { increaseApiLimit, isApiLimitEnd, isPro } from '@/lib/apiLimit';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request, res: NextResponse) {
	const { userId } = auth();
	const body = await req.json();
	const { prompt }: { prompt: string } = body;

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
		'meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38',
		{
			input: {
				model_version: 'stereo-melody-large',
				duration: 20,
				prompt,
				normalization_strategy: 'peak',
			},
		}
	);

	if (!ispro) {
		await increaseApiLimit();
	}
	return new NextResponse(output as any, { status: 200 });
}
