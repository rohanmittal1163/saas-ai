import { isApiLimitEnd, isPro } from '@/lib/apiLimit';
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
		'suno-ai/bark:b76242b40d67c76ab6742e987628a2a9ac019e11d56ab96c4e91ce03b79b2787',
		{
			input: {
				prompt,
				history_prompt: 'announcer',
			},
		}
	);
	if (!ispro) {
		await increaseApiLimit();
	}
	return new NextResponse(output.audio_out, { status: 200 });
}
