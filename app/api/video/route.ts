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
		return new NextResponse('Unauthorized', { status: 400 });
	}
	if (prompt === '') {
		return new NextResponse('prompt is required', { status: 401 });
	}

	const freeApi = await isApiLimitEnd();
	const ispro = await isPro();
	if (freeApi && !ispro) {
		return new NextResponse('Free limits expire', { status: 402 });
	}

	const output = await replicate.run(
		'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
		{
			input: {
				width: 1024,
				height: 576,
				prompt,
				guidance_scale: 17.5,
			},
		}
	);

	if (!ispro) {
		await increaseApiLimit();
	}
	return new NextResponse(output as any, { status: 200 });
}
