import prismadb from '@/lib/prismadb';
import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';
import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import toast from 'react-hot-toast';


const settingsUrl = absoluteUrl('/settings');


export async function GET() {

    try {
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId: user.id,
            },
        });

       

        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            });

            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }

        

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ['card'],
            mode: 'subscription',
            customer_email: user.emailAddresses[0].emailAddress,
            billing_address_collection: 'auto',
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: 'Nixi AI Pro',
                            description: 'Unlimited Nixi AI Generations',
                        },
                        unit_amount: 2000,
                        recurring: {
                            interval: 'month',
                        }
                    },
                    quantity: 1,
                }
            ],
            metadata: { 
                userId,
            },
        });

        return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    } catch (error) {
        toast.error("Something went wrong");
        return new NextResponse('Internal Error', { status: 500 });
    }
}