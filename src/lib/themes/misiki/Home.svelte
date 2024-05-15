<script>
import { fireGTagEvent } from '$lib/utils/gTagB'
import { generatePriceRange, toast } from '$lib/utils'
import { goto, invalidateAll } from '$app/navigation'
import { MobileFooter } from '$lib/components'
import { onMount } from 'svelte'
import { page } from '$app/stores'
import { ProductService } from '$lib/services'
import { Skeleton } from '@misiki/litekart'
import CollectionsGeneral from './CollectionsGeneral.svelte'
import CollectionsHome5 from './CollectionsHome5.svelte'
import CustomBanners from './CustomBanners.svelte'
import dayjs from 'dayjs'
import Footer from './Footer.svelte'
import GenneralInfo from './GenneralInfo.svelte'
import Hero from './Hero.svelte'
import InstagramHome from './InstagramHome.svelte'
import ReachOutToTheTeam from './ReachOutToTheTeam.svelte'
import SEO from '$lib/components/SEO/index.svelte'

export let data
export let showFooter = false
export let showPinCodeEntryModal = false

let today = dayjs(new Date()).toISOString()
let loading = false

let seoProps = {
	brand: $page.data.store?.title,
	// breadcrumbs: data.category?.children,
	caption: $page.data.store?.title,
	category: data.searchData,
	contentUrl: $page.data.store?.logo,
	createdAt: today,
	email: `${$page?.data?.store?.email}`,
	id: $page?.url?.href,
	image: $page.data.store?.logo,
	logo: $page.data.store?.logo,
	ogSquareImage: { url: '', width: 56, height: 56 },
	openingHours: ['Monday,Tuesday,Wednesday,Thursday,Friday,Saturday 10:00-20:00'],
	timeToRead: 0,
	updatedAt: today,
	metaDescription: $page.data.store?.description,
	datePublished: today,
	description: $page.data.store?.description,
	dnsPrefetch: `//cdn.jsdelivr.net`,
	featuredImage: {
		url: $page.data.store?.logo,
		width: 675,
		height: 380,
		caption: $page.data.store?.title
	},
	keywords: $page.data.store?.keywords,
	lastUpdated: today,
	msapplicationTileImage: $page.data.store?.logo,
	ogImage: { url: $page.data.store?.logo, width: 128, height: 56 },
	ogImageSecureUrl: `${$page?.data?.store?.logo}`,
	ogImageType: 'image/jpeg',
	ogSiteName: `${$page.data.origin}/sitemap/sitemap.xml`,
	productBrand: data.searchData,
	productName: data.searchData,
	productPriceCurrency: `${$page?.data?.store?.currencyCode}`,
	slug: `/`,
	title: data.searchData || 'Buy online in - ' + $page.data.store?.websiteName,
	twitterImage: { url: $page.data.store?.logo }
}

let currentPage = 1
let hellobar = $page.data.store?.hellobar || {}
let hidden = true
let priceRange = []
let reachedLast = false
let selectedFilter
let showFilter = false
let showOnPx = 600
let showSort = false
let y

if (
	data.products?.facets?.all_aggs?.price_stats?.max > 0 &&
	data.products?.facets?.all_aggs?.price_stats?.min >= 0
) {
	priceRange = generatePriceRange(
		data.products?.facets?.all_aggs?.price_stats,
		data.store.currencySymbol
	)
}

$: innerWidth = 0

function goTop() {
	// scroll to the top
	window.scroll({ top: 0, behavior: 'smooth' })
}

function scrollContainer() {
	return document.documentElement || document.body
}

function handleOnScroll() {
	if (!scrollContainer()) {
		return
	}

	if (scrollContainer().scrollTop > showOnPx) {
		hidden = false
	} else {
		hidden = true
	}
}

async function sortNow(s) {
	let u = new URL($page.url)

	if (s == 'null' || s == null || s == undefined || s == 'undefined') {
		u.searchParams.delete('sort')
	} else {
		await u.searchParams.set('sort', s)
	}
	// await invalidateAll()
	goto(u.toString())
	window.scroll({ top: 0, behavior: 'smooth' })

	// await goto(`/search?${$page.url.searchParams.toString()}`)
}

async function loadNextPage() {
	if (!reachedLast) {
		let nextPage = currentPage + 1
		$page?.url?.searchParams.delete('page')
		const searchParams = $page?.url?.searchParams.toString()

		try {
			data.isLoading = true

			const res = await ProductService.fetchNextPageProducts({
				categorySlug: data?.category?.slug,
				nextPage,
				searchParams,
				origin: $page?.data?.origin,
				storeId: $page?.data?.storeId
			})

			const nextPageData = res?.nextPageData
			currentPage = currentPage + 1
			data.err = !res?.estimatedTotalHits ? 'No result Not Found' : null
			data.products.category = res?.category
			data.products.count = res?.count
			data.products.products = data?.products?.products?.concat(nextPageData)
			data.products.products.facets = res?.facets

			if (data.product?.count && data.products?.length === data.product?.count) {
				reachedLast = true
			}
		} catch (e) {
			toast(e, 'error')
		} finally {
			data.isLoading = false
		}
	}
}

async function refreshData() {}

let loadMoreDiv

onMount(() => {
	fireGTagEvent('search', { search_term: data.query })

	const observer = new IntersectionObserver((entries) => {
		if (!entries) return

		entries.forEach((entry) => {
			if (
				entry.isIntersecting &&
				data.products?.count &&
				data.products?.products?.length < data.products?.count &&
				!data.isLoading
			) {
				// Do something when the element is intersecting
				loadNextPage()
			}
		})
	})

	if (loadMoreDiv && !$page?.data?.isDesktop) {
		observer.observe(loadMoreDiv)
	}

	// const intersectionObserver = new IntersectionObserver((entries) => {
	// 	if (entries[0].intersectionRatio <= 0) return
	// 	// load more content;
	// 	loadNextPage()
	// })

	// // start observing

	// intersectionObserver.observe(document.querySelector('.more'))
	// // @ts-ignore
	// gtag('event', 'view_item', {
	// 	currency: 'USD',
	// 	value: 7.77,
	// 	items: [
	// 		{
	// 			item_id: 'SKU_12345',
	// 			item_name: 'Stan and Friends Tee',
	// 			affiliation: 'Google Merchandise Store',
	// 			coupon: 'SUMMER_FUN',
	// 			currency: 'USD',
	// 			discount: 2.22,
	// 			index: 0,
	// 			item_brand: 'Google',
	// 			item_category: 'Apparel',
	// 			item_category2: 'Adult',
	// 			item_category3: 'Shirts',
	// 			item_category4: 'Crew',
	// 			item_category5: 'Short sleeve',
	// 			item_list_id: 'related_products',
	// 			item_list_name: 'Related Products',
	// 			item_variant: 'green',
	// 			location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
	// 			price: 9.99,
	// 			quantity: 1
	// 		}
	// 	]
	// })

	// // @ts-ignore
	// gtag('event', 'view_item_list', {
	// 	item_list_id: 'related_products',
	// 	item_list_name: 'Related products',
	// 	items: [
	// 		{
	// 			item_id: 'SKU_12345',
	// 			item_name: 'Stan and Friends Tee',
	// 			affiliation: 'Google Merchandise Store',
	// 			coupon: 'SUMMER_FUN',
	// 			currency: 'USD',
	// 			discount: 2.22,
	// 			index: 0,
	// 			item_brand: 'Google',
	// 			item_category: 'Apparel',
	// 			item_category2: 'Adult',
	// 			item_category3: 'Shirts',
	// 			item_category4: 'Crew',
	// 			item_category5: 'Short sleeve',
	// 			item_list_id: 'related_products',
	// 			item_list_name: 'Related Products',
	// 			item_variant: 'green',
	// 			location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
	// 			price: 9.99,
	// 			quantity: 1
	// 		}
	// 	]
	// })
	// }
})

async function goCheckbox(item) {
	if (item === $page.url.searchParams.get('materials')) {
		$page.url.searchParams.set('materials', '')
	} else {
		$page.url.searchParams.set('materials', item)
		$page.url.searchParams.set('page', '1')
	}
	await goto($page.url.toString())
	await invalidateAll()
}

function handleFilterTags() {
	selectedFilter = 'Themes'
	showFilter = true
}
</script>

<SEO {...seoProps} />

<svelte:window bind:scrollY="{y}" bind:innerWidth on:scroll="{handleOnScroll}" />

<div class="bg-opacity-25 bg-center bg-repeat min-h-screen">
	<div class="mb-14 lg:mb-0">
		<!-- Main slider banner -->

		{#if loading}
			<div class="h-96 w-full bg-zinc-200 animate-pulse"></div>
		{:else if data.home}
			<Hero
				sliderBannersDesktop="{data?.home.page?.sliderBanners?.banners}"
				sliderBannersMobile="{data?.home.page?.sliderBanners?.bannersMobile}" />
		{/if}

		{#if loading}
			<div class="p-3 py-5 md:py-10">
				<Skeleton />
			</div>
		{:else if data?.collections?.data?.length}
			<CollectionsGeneral collections="{data?.collections?.data}" />
		{/if}

		{#if loading}
			<div class="p-3 py-5 md:py-10">
				<Skeleton />
			</div>
		{:else if data?.home?.page?.banners?.length > 0}
			<CustomBanners sections="{data?.home?.page?.banners}" />
		{/if}

		<div class="hidden md:block">
			<InstagramHome />
		</div>

		<CollectionsHome5 {data} />

		<ReachOutToTheTeam />

		<GenneralInfo />
		<!-- Footer show hide toggle -->

		<button
			type="button"
			class="lg:hidden p-3 sm:px-10 w-full border-t border-b border-zinc-400 flex items-center justify-between gap-4 text-sm focus:outline-none"
			on:click="{() => (showFooter = !showFooter)}">
			<span>More about {$page.data.store?.websiteName || 'store'}</span>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-5 h-5 transition duration-300
				{showFooter ? 'transform rotate-180' : ''}">
				<path
					fill-rule="evenodd"
					d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
					clip-rule="evenodd"></path>
			</svg>
		</button>

		<div class="{showFooter ? 'block' : 'hidden'}">
			<Footer />
		</div>
	</div>

	<!-- MOBILE FOOTER -->

	<div class="block lg:hidden">
		<MobileFooter />
	</div>
</div>
