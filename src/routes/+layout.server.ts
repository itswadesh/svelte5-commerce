import { CollectionService, HomeService, ProductService, InitService } from '$lib/services'

export const load = async ({ fetch, url }) => {
	const storeId = '6356502aca4ff28ed596cb1b'
	const { origin, host } = url
	console.log(origin, host)
	// const initRes = await fetch('http://api.litekart.in/api/init?domain=demo.litekart.in')
	// const init = await initRes.json()
	console.log('layout.server.ts', {
		host: host,
		domain: 'demo.litekart.in'
	})
	const init = await InitService.fetchInit({
		host: 'demo.litekart.in',
		origin
	})

	// const homeRes = await fetch('http://api.litekart.in/api/home?store=6356502aca4ff28ed596cb1b')
	// const home = await homeRes.json()

	const home = await HomeService.fetchHome({
		origin,
		storeId,
		sid: null
	})

	// const collectionsRes = await fetch(
	// 	'http://api.litekart.in/api/collections?store=6356502aca4ff28ed596cb1b'
	// )

	// const collections = await collectionsRes.json()
	const collections = await CollectionService.fetchCollections({
		origin,
		storeId
	})

	const products = await ProductService.fetchProducts({
		query: {},
		origin,
		storeId
	})
	home.collections = collections.data

	return {
		menu: init.menu,
		megamenu: init.megamenu,
		store: init.storeOne,
		popularSearches: init.popularSearches,
		home,
		collections: collections.data,
		products
	}
}
