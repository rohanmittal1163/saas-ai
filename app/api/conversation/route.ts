import OpenAIApi from 'openai';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { increaseApiLimit, isApiLimitEnd, isPro } from '@/lib/apiLimit';

const openai = new OpenAIApi({ apiKey: process.env.OPEN_AI_API_KEY });

export async function POST(req: Request, res: NextResponse) {
	const { userId } = auth();
	const body = await req.json();
	const { messages } = body;

	if (!userId) {
		return new NextResponse('Unauthorized', { status: 401 });
	}
	if (messages.content === '') {
		return new NextResponse('Prompt is Required', { status: 400 });
	}
	const freeApi = await isApiLimitEnd();
	const ispro = await isPro();
	if (freeApi && !ispro) {
		return new NextResponse('Free limits expire', { status: 402 });
	}

	const completion = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages,
	});

	if (!ispro) {
		await increaseApiLimit();
	}

	const theResponse = completion.choices[0].message;

	return NextResponse.json({ output: theResponse }, { status: 200 });
}
