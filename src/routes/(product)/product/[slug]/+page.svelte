<script lang="ts">
import { onMount } from 'svelte'
import { page } from '$app/stores'
// import { ProductDetails } from '$lib/theme-config'
import { ProductService, VarniProductService, ReviewService, WishlistService } from '$lib/services'
// import { afterNavigate } from '$app/navigation'

export let data: any = {}
let moreProductDetails = {}
let productReviews = []

onMount(async () => {
	loadData()
})

// afterNavigate(() => {
// 	loadData()
// })

async function loadData() {
	if (!data.product || !$page.data.me?.active) {
		try {
			const [moreProductDetails, productReviews] = await Promise.all([
				VarniProductService.fetchProductDetailsVarni({
					id: data.product.slug,
					slug: data.product.slug,
					origin: $page.data.origin,
					sid: $page.data.sid,
					storeId: $page.data.storeId
				}),
				ReviewService.fetchProductReviews({
					page,
					slug: data.product.slug,
					origin: $page.data.origin,
					sid: $page.data.sid,
					storeId: $page.data.storeId
				})
			])

			data.product.isWishlisted = false
			data.moreProductDetails = moreProductDetails
			data.productReviews = productReviews
		} catch (e) {
			console.log('e', e)
		}
	} else {
		try {
			const [isWishlisted, moreProductDetails, productReviews] = await Promise.all([
				WishlistService.checkWishlist({
					pid: data.product?._id || data.product?.id,
					vid: data.product?._id || data.product?.id,
					origin: $page.data.origin,
					sid: $page.data.sid,
					storeId: $page.data.storeId
				}),
				VarniProductService.fetchProductDetailsVarni({
					id: data.product.slug,
					slug: data.product.slug,
					origin: $page.data.origin,
					sid: $page.data.sid,
					storeId: $page.data.storeId
				}),
				ReviewService.fetchProductReviews({
					page,
					slug: data.product.slug,
					origin: $page.data.origin,
					sid: $page.data.sid,
					storeId: $page.data.storeId
				})
			])

			data.product.isWishlisted = isWishlisted
			data.moreProductDetails = moreProductDetails
			data.productReviews = productReviews
		} catch (e) {
			console.log('e', e)
		}
	}
}
</script>

{JSON.stringify(data.moreProductDetails)}
