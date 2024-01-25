import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';

export async function GET() {
	try {
		const { userId } = auth();
		const user = await currentUser();
		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		let userSubscription = await db.userSubscription.findUnique({
			where: {
				userId,
			},
			select: {
				stripeCustomerId: true,
			},
		});

		if (userSubscription && userSubscription.stripeCustomerId) {
			const stripeSession = await stripe.billingPortal.sessions.create({
				customer: userSubscription.stripeCustomerId,
				return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
			});
			return new NextResponse(stripeSession.url, { status: 200 });
		} else {
			const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
				{
					price_data: {
						currency: 'USD',
						product_data: {
							name: 'Genius Pro',
							description: 'unlimited ai generations',
						},
						unit_amount: 2000,
						recurring: {
							interval: 'month',
						},
					},
					quantity: 1,
				},
			];
			const stripeSession: Stripe.Response<Stripe.Checkout.Session> =
				await stripe.checkout.sessions.create({
					payment_method_types: ['card'],
					line_items,
					mode: 'subscription',
					success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
					cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
					metadata: {
						userId,
					},
					billing_address_collection: 'auto',
					customer_email: user?.emailAddresses[0].emailAddress,
				});
			return new NextResponse(stripeSession.url, { status: 200 });
		}
	} catch (err: any) {
		console.log('[STRIPE_ERROR]', err);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
