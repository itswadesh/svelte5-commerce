import { ProductService } from '$lib/services'
import { error, redirect } from '@sveltejs/kit'
// import { utils } from '@misiki/litekart-utils'

export const load = async ({ params, url, parent }) => {
	const { zip, sid, origin, store, storeId, me } = await parent()
	const { slug } = params

	if (store?.isSecureCatalogue && !me) {
		redirect(307, `/auth/login?ref=${url?.pathname}`)
	}

	try {
		const product = await ProductService.fetchProduct({
			origin,
			sid,
			slug,
			id: slug,
			storeId
		})

		if (!product) error(404, 'Product not found')

		// console.log('products2', products2);

		return {
			product
		}
	} catch (e) {
		if (e?.status === 307) {
			redirect(307, `/auth/login?ref=${url?.pathname}`)
		} else {
			error(e.status, e.message || 'Not found')
		}
	}
}
