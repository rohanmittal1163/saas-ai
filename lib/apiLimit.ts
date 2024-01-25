import { DAY_IN_MS, FREE_COUNTS } from '@/constants';
import { auth } from '@clerk/nextjs';
import { db } from './db';

export async function increaseApiLimit(): Promise<void> {
	const { userId } = auth();
	if (!userId) {
		return;
	}
	const user = await db.userApiLimit.findUnique({
		where: {
			userId,
		},
	});

	if (user) {
		await db.userApiLimit.update({
			where: {
				userId,
			},
			data: {
				count: user.count + 1,
			},
		});
	} else {
		await db.userApiLimit.create({
			data: {
				userId,
				count: 1,
			},
		});
	}
}

export async function isApiLimitEnd(): Promise<boolean> {
	const { userId } = auth();
	if (!userId) {
		return false;
	}
	const user = await db.userApiLimit.findUnique({
		where: {
			userId,
		},
	});

	return !!user && user.count >= FREE_COUNTS;
}

export async function getApiLimitCount(): Promise<number> {
	const { userId } = auth();
	if (!userId) {
		return 0;
	}
	const user = await db.userApiLimit.findUnique({
		where: {
			userId,
		},
	});

	if (user) {
		return user.count;
	}
	return 0;
}

export async function isPro(): Promise<boolean> {
	const { userId } = auth();

	if (!userId) {
		return false;
	}

	const userSubscription = await db.userSubscription.findUnique({
		where: {
			userId: userId,
		},
		select: {
			stripeSubscriptionId: true,
			stripeCurrentPeriodEnd: true,
			stripeCustomerId: true,
			stripePriceId: true,
		},
	});

	if (!userSubscription) {
		return false;
	}

	const isValid =
		userSubscription.stripePriceId &&
		userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
			Date.now();

	return !!isValid;
}
