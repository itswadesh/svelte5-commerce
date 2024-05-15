import { error } from '@sveltejs/kit'
import Stripe from 'stripe'
// import { STRIPE_SECRETE_KEY } from '$env/static/private'
import { ProductService } from '$lib/services'

// const stripe = new Stripe(STRIPE_SECRETE_KEY)

export const load = async ({ params, url, parent }) => {
	const { zip, sid, origin, store, storeId, me } = await parent()
	const { slug } = params

	const product = await ProductService.fetchProduct({
		origin,
		sid,
		slug,
		id: slug,
		storeId
	})

	if (!product) error(404, 'Product not found')

	if (!product) error(404, 'not found')
	// const paymentIntent = await stripe.paymentIntents.create({
	// 	amount: product.priceInCents,
	// 	currency: 'USD',
	// 	metadata: { productId: product.id },
	// 	automatic_payment_methods: {
	// 		enabled: true
	// 	}
	// })
	// if (paymentIntent.client_secret === null) {
	// 	throw Error('failed to create payment intent')
	// }

	return {
		product,
		// clientSecret: paymentIntent.client_secret
	}
}
