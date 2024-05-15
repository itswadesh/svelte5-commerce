import { error } from '@sveltejs/kit'
import { utils } from '@misiki/litekart-utils'

export const fetchProductDetailsVarni = async ({ origin, slug, storeId, id, sid = null }) => {
	try {
		const res = await utils.getAPI(
			`product-details-varni/${slug || id}?store=${storeId}`,
			origin,
			sid
		)
		return res || {}
	} catch (e) {
		error(e.status, e.data?.message || e.message)
	}
}
