<style>
.shake-animation {
	animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
	transform: translate3d(0, 0, 0);
	backface-visibility: hidden;
	border: 1px solid red;
}

@keyframes shake {
	10%,
	90% {
		transform: translate3d(-1px, 0, 0);
	}

	20%,
	80% {
		transform: translate3d(2px, 0, 0);
	}

	30%,
	50%,
	70% {
		transform: translate3d(-4px, 0, 0);
	}

	40%,
	60% {
		transform: translate3d(4px, 0, 0);
	}
}

@media only screen and (max-width: 768px) {
	.box-shadow {
		box-shadow: 0px -4px 10px rgba(50, 50, 50, 0.2);
	}
}
</style>

<script lang="ts">
// import SecondaryButton from '$lib/ui/SecondaryButton.svelte'
import {
	Checkbox,
	CheckboxOfMultiProducts,
	PrimaryButton,
	ProductSkeleton,
	Radio,
	RadioColor,
	RadioSize,
	Skeleton,
	Textarea,
	Textbox,
	WhiteButton
} from '$lib/ui'
import { applyAction, enhance } from '$app/forms'
import { browser } from '$app/environment'
import { CartService } from '$lib/services'
import {
	AnimatedCartItem,
	Breadcrumb,
	CustomJewelryDesignForm,
	DummyProductCard,
	Error,
	Footer,
	Gallery,
	LazyImg,
	NewAndTags,
	ProductGroups,
	ProductNav,
	ProductsGrid,
	RatingsAndReviews,
	SocialSharingButtons
} from '$lib/components'
import { cubicOut } from 'svelte/easing'
import { currency, getIdFromYoutubeVideo, toast } from '$lib/utils'
import {
	DeliveryOptions,
	ProductSliderBanner,
	SimilarProductsFromCategorySlug
} from '$lib/theme-config'
import { fade } from 'svelte/transition'
// import { fireGTagEvent } from 'lib/utils/gTagB'
import { goto, invalidateAll } from '$app/navigation'
import { onMount } from 'svelte'
import { page } from '$app/stores'
import { slide } from 'svelte/transition'
import Cookie from 'cookie-universal'
import dayjs from 'dayjs'
import productVeg from '$lib/assets/product/veg.png'
import SEO from '$lib/components/SEO/index.svelte'
import viewport from '$lib/actions/useViewPort'
// import { updateCartStore } from '$lib/store/cart'

const cookies = Cookie()
const isServer = import.meta.env.SSR

export let data
// console.log('zzzzzzzzzzzzzzzzzz', data)

let currentVariantId = $page.url.searchParams?.get('variant') || ''
let currentVariantPrice = data.product?.price || 0

let seoProps = {
	// addressCountry: 'India',
	// addressLocality: 'Semiliguda, Koraput',
	// addressRegion: 'Odisha',
	// alternateJsonHref: '',
	// alternateXml: { title: '', href: '' },
	brand: `${$page?.data?.store?.websiteName}`,
	breadcrumbs: data.product?.categoryPool,
	caption: `${$page?.data?.store?.websiteName}`,
	category: data.product?.category?.name,
	contentUrl: data.product?.img || $page?.data?.store?.logo,
	createdAt: `${data.product?.createdAt || '_'}`,
	// depth: { unitCode: '', value: '' },
	email: `${$page?.data?.store?.email}`,
	// entityMeta: '',
	// facebookPage: '',
	// gtin: '',
	// height: '',
	id: $page?.url?.href,
	logo: $page?.data?.store?.logo,
	// ogSquareImage: { url: 'https://lrnr.in/favicon.ico', width: 56, height: 56 },
	openingHours: ['Monday,Tuesday,Wednesday,Thursday,Friday,Saturday 10:00-20:00'],
	popularity: data.product?.popularity,
	// postalCode: '764036',
	price: currentVariantPrice,
	priceRange: `${currentVariantPrice}-${data.product?.mrp}`,
	ratingCount: 1,
	ratingValue: +data.product?.ratings + 1,
	sku: data.product?.sku,
	// streetAddress: 'Padmajyoti Marg, Nandapur Road',
	timeToRead: 0,
	updatedAt: `${data.product?.updatedAt || '_'}`,
	// weight: { unitCode: '', value: '' },
	// width: { unitCode: '', value: '' },
	// wlwmanifestXmlHref: '',
	metaDescription: data.product?.metaDescription,
	// article: false,
	datePublished: `${data.product?.publishedAt || '_'}`,
	description: ` ${data.product?.description}`,
	dnsPrefetch: `//cdn.jsdelivr.net`,
	// entityMeta: null,
	featuredImage: {
		url: `${data.product?.img}`,
		width: 675,
		height: 380,
		caption: data.product?.name
	},
	keywords: data.product?.keywords,
	lastUpdated: `${data.product?.updatedAt || '_'}`,
	msapplicationTileImage: `${data.product?.img}`,
	image: `${data.product?.img}`,
	'og:image': `${data.product?.img}`,
	ogImage: { url: data.product?.img, width: 128, height: 56 },
	ogImageSecureUrl: data.product?.img,
	ogImageType: 'image/jpeg',
	ogSiteName: `${$page.data.origin}/sitemap/sitemap.xml`,
	productAvailability: `${data.product?.stock}`,
	productBrand: `${data.product?.brandName || `${$page?.data?.store?.websiteName}`}`,
	productName: `${data.product?.name}`,
	productPriceAmount: `${currentVariantPrice}`,
	productPriceCurrency: `${$page?.data?.store?.currencyCode}`,
	slug: `${data.product?.slug}`,
	// timeToRead: 0,
	title: `${data.product?.name}`,
	twitterImage: { url: `${data.product?.img}` }
}

let bounceItemFromTop = false
let cartButtonText = 'Add to Cart'
let customizedImg
let isExpired = false
let loading = false
let loadingForWishlist = false
let product_image_dimension = $page.data.store?.product_image_dimension || '3x4'
let productReviews = {}
let recentlyViewed = []
let ribbonTags = []
let screenWidth
let selectedImgIndex
let selectedLinkiedProducts = []
let selectedOptions = []
let finalSelectedOptions = []
let selectedReviewType = 'product_review'
let shake = false
let showCustomOrdersAndPersonalization = false
let showDesignDetails = false
let showDiamonds = true
let showEditor = false
let showFAQ = false
let showFooter = false
let showJewelWeSellWarranty = false
let showLongDescription = false
let showMetalColorOptions = true
let showMetalDetails = false
let showPhotosModal = false
let showShippingAndReturnPolicy = false
let showSizeChart = false
let showSizes = true
let showStickyCartButton = true
let showStoneDetails = false
let showUserInputForm = false
let today = dayjs().format('YYYY-MM-DD')
let viewPortCartPositionFromTop = 0
let wiggleVariants = false
let y = 0

$: if (y > 500) {
	showUserInputForm = true
}

if (data.product?.expiryDate) {
	// Create a Date object from the UTC string
	const date = new Date(data.product?.expiryDate)

	// Calculate the difference in milliseconds between the given date and now
	const diffMs = Date.now() - date.getTime()

	// Convert the difference in milliseconds to minutes
	const diffMinutes = Math.round(diffMs / (1000 * 60))

	if (diffMinutes > 0) {
		isExpired = true
	} else {
		isExpired = false
	}
}

if (data.product?.tags?.length) {
	ribbonTags = data.product?.tags.filter((tag) => {
		return tag.type === 'Ribbon'
	})
}

onMount(async () => {
	try {
		screenWidth = screen.width
		storeRecentlyViewedToLocatStorage()
	} catch (e) {}
})

const go = async (type, item) => {
	if (type === 'color') {
		data.selectedColor.key = item.key
	}

	const url = new URL(`${$page.data.origin}/api/es/products/combination/${data.product?.slug}}`)

	url.searchParams.set('predicate', type)
	url.searchParams.set('store', '638446182f153d9bc9f1a497')
	url.searchParams.set('product_master_id', data.product.productMasterId)

	// if (!item.active) {
	// 	if (type == 'material') {
	// 		url.searchParams.set('material', data.selectedMaterial?.key)
	// 		// if (data.selectedInitial?.key) url.searchParams.set('initial', data.selectedInitial.key)
	// 	}

	// 	if (type == 'quality') {
	// 		url.searchParams.set('quality', data.selectedQuality?.key)
	// 		// if (data.selectedInitial?.key) url.searchParams.set('initial', data.selectedInitial?.key)
	// 	}

	if (type == 'finishing') {
		if (item.key == 'casting') item.key = 'Raw Casting'
		data.selectedFinishing = { key: item.key }
		// url.searchParams.set('finishing', item?.key)
		// if (data.selectedInitial?.key) url.searchParams.set('initial', data.selectedInitial?.key)
	}

	// 	if (type == 'casting') {
	// 		url.searchParams.set('finishing', data.selectedFinishing?.key)
	// 		// if (data.selectedInitial?.key) url.searchParams.set('initial', data.selectedInitial?.key)
	// 	}

	// 	if (type == 'stone') {
	// 		url.searchParams.set('stone', data.selectedStone?.key)
	// 		// if (data.selectedInitial?.key) url.searchParams.set('initial', data.selectedInitial?.key)
	// 	}

	// 	if (type == 'metal') {
	// 		url.searchParams.set('metal', data.selectedMetal?.key)
	// 		// if (data.selectedInitial?.key) url.searchParams.set('initial', data.selectedInitial?.key)
	// 	}

	// 	// if (type == 'initial') {
	// 	url.searchParams.set('initial', data.selectedInitial?.key)
	// 	// }

	// 	// if (type == 'color') {
	// 	url.searchParams.set('color', data.selectedColor?.key)
	// 	// if (data.selectedInitial?.key) url.searchParams.set('initial', data.selectedInitial?.key)
	// 	// }
	// } else {
	if (data.selectedMaterial?.key) url.searchParams.set('material', data.selectedMaterial?.key)
	if (data.selectedQuality?.key) url.searchParams.set('quality', data.selectedQuality?.key)
	if (data.selectedFinishing?.key) url.searchParams.set('finishing', data.selectedFinishing?.key)
	if (data.selectedStone?.key) url.searchParams.set('stone', data.selectedStone?.key)
	if (data.selectedMetal?.key) url.searchParams.set('metal', data.selectedMetal?.key)
	if (data.selectedInitial?.key) url.searchParams.set('initial', data.selectedInitial?.key)
	if (data.selectedColor?.key) url.searchParams.set('color', data.selectedColor?.key)
	// }

	try {
		const res = await fetch(url.toString())
		const dd = await res.json()

		if (dd.product?.slug) {
			goto(`/product/${dd.product?.slug}`)
		} else return

		// invalidateAll()
		// product = data.product
	} catch (e) {
		// console.error('err', e)
	}
}

const storeRecentlyViewedToLocatStorage = async () => {
	const localRecentlyViewed = localStorage.getItem(`recently_viewed_${$page?.data?.storeId}`)

	if (!!localRecentlyViewed && localRecentlyViewed !== 'undefined') {
		recentlyViewed = JSON.parse(localRecentlyViewed)
	}

	if (JSON.stringify(recentlyViewed).includes(data?.product?.name)) {
		return
	} else if (data?.product?.img && data?.product?.name && data?.product?.price) {
		const prod = {
			brandName: data?.product?.brand?.name,
			discount: data?.product?.discount,
			hasStock: data?.product?.hasStock,
			img: data?.product?.img,
			mrp: data?.product?.mrp,
			name: data?.product?.name,
			price: data?.product?.price,
			slug: data?.product?.slug
		}

		if (recentlyViewed?.length > 10) {
			recentlyViewed.shift()
		}

		const resvw = [...recentlyViewed]
		resvw.push(prod)
		recentlyViewed = resvw

		if (browser) {
			localStorage.setItem(
				`recently_viewed_${$page?.data?.storeId}`,
				JSON.stringify(recentlyViewed)
			)
		}
	}
}

function slideFade(node, params) {
	const existingTransform = getComputedStyle(node).transform.replace('none', '')

	return {
		delay: params.delay || 0,
		duration: params.duration || 400,
		easing: params.easing || cubicOut,
		css: (t, u) =>
			`transform-origin: ${
				params.transformOrigin || 'top right'
			}; transform: ${existingTransform} scaleX(${t}); opacity: ${t};`
	}
}

function handleSelectedLinkiedProducts(e) {
	selectedLinkiedProducts = e.detail
}

// This is used only for customized product else cart?/add

async function addToBag(p, customizedImg, customizedJson) {
	try {
		loading = true
		cartButtonText = 'Adding...'

		let cart = await CartService.addToCartService({
			pid: p.id,
			vid: p.id,
			qty: 1,
			options: selectedOptions,
			customizedImg: customizedImg,
			storeId: $page?.data?.storeId,
			customizedData: customizedJson,
			origin: $page.data.origin
		})
		if (selectedLinkiedProducts?.length) {
			for (const i of selectedLinkiedProducts) {
				cart = await CartService.addToCartService({
					pid: i,
					vid: i,
					qty: 1,
					storeId: $page?.data?.storeId,
					origin: $page.data.origin
				})
			}
		}

		const response = await fetch('/server/cart')
		cart = await response.json()

		if (cart) {
			const cookieCart = {
				cartId: cart?.cart_id,
				// items: cart?.items,
				qty: cart?.qty,
				tax: cart?.tax,
				subtotal: cart?.subtotal,
				total: cart?.total,
				currencySymbol: cart?.currencySymbol,
				discount: cart?.discount,
				savings: cart?.savings,
				selfTakeout: cart?.selfTakeout,
				shipping: cart?.shipping,
				unavailableItems: cart?.unavailableItems,
				formattedAmount: cart?.formattedAmount
			}
			cookies.set('cartId', cookieCart.cartId, { path: '/' })
			cookies.set('cartQty', cookieCart.qty, { path: '/' })
			// cookies.set('cart', JSON.stringify(cookieCart), { path: '/' })
			// cartButtonText = 'Added To Cart'
			bounceItemFromTop = true
		}

		cartButtonText = 'Go to Cart'
		// p.qty < 0 ? fireGTagEvent('remove_from_cart', cart) : fireGTagEvent('add_to_cart', cart)

		await invalidateAll()

		// const res = await getAPI('carts/my')
	} catch (e) {
		// toast(e, 'error')
		cartButtonText = 'Error Add To Cart'
	} finally {
		loading = false
		// await delay(1000)
		cartButtonText = 'Add to Cart'
		bounceItemFromTop = false
	}
}

// let windowHeight
// let cartButtonPosition = 0
// onMount(() => {
// 	let elem = document.getElementById('cartButton')
// 	let rect = elem.getBoundingClientRect()
// 	const ActualCartButtonPosition = rect.y
// 	cartButtonPosition = ActualCartButtonPosition - windowHeight + 280
// })

async function cartButtonEnterViewport() {
	await getCartViewPortLocation()

	if (y > 0) {
		showStickyCartButton = false
	} else {
		showStickyCartButton = true
	}
}

async function cartButtonExitViewport() {
	await getCartViewPortLocation()

	if (y < viewPortCartPositionFromTop) {
		showStickyCartButton = true
	} else {
		showStickyCartButton = false
	}
}

const getCartViewPortLocation = () => {
	const cartViewPort = document.getElementById('cart_viewport')
	viewPortCartPositionFromTop = cartViewPort.offsetTop
}

function alertToSelectMandatoryOptions() {
	// Raised by AddToCart Button at detail page
	toast('Please select a size', 'error')

	const el = document.getElementsByClassName('sizeSelector')[0]
	if (el) {
		el.scrollIntoView({ behavior: 'smooth' })
	}

	shake = true
	setTimeout(() => {
		shake = false
	}, 3000)
}

$: {
	const newOptions = []

	for (const i in selectedOptions) {
		if (Array.isArray(selectedOptions[i]))
			newOptions.push({ option: i, values: selectedOptions[i] })
		else newOptions.push({ option: i, values: [selectedOptions[i]] || selectedOptions[i] })
	}

	finalSelectedOptions = newOptions.filter((item) => {
		if (item.values?.length) {
			if (item.values[0]) {
				return item
			}
		} else if (typeof item.values !== 'object') {
			return item
		}
	})
}

function scrollTo(elementId) {
	let element
	if (elementId.detail) {
		element = document.getElementById(elementId.detail)
	} else {
		element = document.getElementById(elementId)
	}
	window.scroll({
		behavior: 'smooth',
		left: 0,
		top: element.offsetTop - 100
	})
}

function handleGallery(index) {
	selectedImgIndex = index
	showPhotosModal = true
}

function handleMobileCanvas() {
	if (screenWidth < 640 && showEditor === false) {
		showEditor = true
	}
}

async function updateVariant(variant) {
	$page.url.searchParams.set('variant', variant.id)
	currentVariantPrice = variant.prices[0]?.amount || currentVariantPrice
	await goto($page.url.toString())
	await invalidateAll()
}
</script>

<SEO {...seoProps} />

<svelte:window bind:scrollY="{y}" />

<svelte:head>
	<title>{data.product?.name}</title>
</svelte:head>

<div class="min-h-screen p-3 sm:px-10 lg:p-10 flex flex-col gap-5">
	<div class="mb-2 flex flex-col lg:flex-row items-start lg:items-center gap-2">
		<!-- Breadcrumb -->

		<div class="flex-1">
			<Breadcrumb
				categoryPool="{data.product?.category?.pathA}"
				currentProductName="{data.product?.name}"
				isHomeIcon="{false}"
				isMultipleLine="{true}" />
		</div>

		<!-- Previous/Next -->

		<!-- <div class="max-w-max flex items-center gap-1">
				<button type="button" class="focus:outline-none" on:click="{() => goto('/')}">
					Previous
				</button>

				<span>|</span>

				<button type="button" class="focus:outline-none" on:click="{() => goto('/')}">
					Next
				</button>
			</div> -->
	</div>

	<h2 class="font-normal text-center">
		{data.product?.name}
	</h2>

	<div class="mb-5 grid grid-cols-1 items-start gap-5 sm:mb-10 sm:gap-10 lg:grid-cols-5">
		<!-- Banner section -->

		<div
			class="col-span-1 h-auto lg:col-span-3
			{showPhotosModal ? 'static' : 'lg:sticky lg:top-0'}">
			{#if !data.product?.isCustomized && data?.product?.images?.length}
				<ProductSliderBanner {data} bind:showPhotosModal />
			{/if}
		</div>

		<!-- Informatin section -->

		<div class="col-span-1 lg:col-span-2 flex flex-col gap-5">
			<!-- prices -->

			{#if $page.data.store?.isSecureCatalogue && !$page.data?.me}
				<a
					href="{$page.data?.store?.otpLogin ? '/auth/otp-login' : '/auth/login'}?ref={$page?.url
						?.pathname}{$page?.url?.search}"
					class="block hover:underline max-w-max font-bold">
					Login to view price
				</a>
			{:else}
				<div class="flex flex-col">
					{#if $page.data.store?.websiteName}
						<a href="/search?q=" class="block max-w-max">
							{$page.data.store?.websiteName}
						</a>
					{/if}

					{#if data.product?.sku}
						<span class="text-lg text-primary-500">
							{data.product?.sku}
						</span>
					{/if}

					<div class="flex flex-wrap items-baseline gap-2">
						<span class="text-xl whitespace-nowrap text-primary-500">
							{currency(currentVariantPrice, $page.data?.store?.currencySymbol)}
						</span>

						{#if data.product?.mrp > currentVariantPrice}
							<span class="text-xl whitespace-nowrap text-red-500">
								<strike>
									{currency(data.product?.mrp, $page.data?.store?.currencySymbol)}
								</strike>
							</span>
						{/if}
					</div>

					{#if data.product?.discount > 0}
						<span class="text-xl whitespace-nowrap text-primary-500">
							You save: {data.product?.discount}% ({data.product?.mrp - currentVariantPrice})
						</span>
					{/if}
				</div>
			{/if}

			<!-- New and Tags -->

			{#if data.product?.tags?.length || data.product?.new}
				<NewAndTags {data} />
			{/if}

			<!-- ratings -->

			{#if $page.data.store?.isProductReviewsAndRatings}
				{#if data?.productReviews?.reviewsSummary?.productReviews?.summary?.ratings_avg?.value}
					<button
						type="button"
						class="flex max-w-max items-center divide-x divide-zinc-200 border border-zinc-200 py-1 text-sm focus:outline-none"
						on:click="{() => scrollTo('ratings_and_reviews')}">
						<div class="flex items-center gap-1 px-2 font-semibold">
							<span>
								{data?.productReviews?.reviewsSummary?.productReviews?.summary?.ratings_avg?.value.toFixed(
									1
								)}
							</span>

							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 text-primary-500"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
								</path>
							</svg>
						</div>

						<span class="px-2 text-zinc-500">
							{data?.productReviews?.product?.count || 'No'} Reviews
						</span>
					</button>
				{/if}
			{/if}

			<ProductGroups {data} />

			<!-- {#if moreOptions?.length > 0}
					<div class="mb-5 flex flex-col gap-2">
						{#each moreOptions as option}
							<label for="{option.title}" class="flex items-center gap-2 text-sm font-medium">
								{#if option.type === 'checkbox'}
									<input
										type="checkbox"
										name="{option.title}"
										id="{option.title}"
										class="h-4 w-4" />
								{/if}

								<span>
									{option.title}
								</span>
							</label>
						{/each}
					</div>
				{/if} -->

			<!-- select options  -->

			{#if data.product.options?.length > 0}
				<div class="sizeSelector mb-5 flex flex-col gap-3 text-sm" class:shake-animation="{shake}">
					{#each data.product.options as o}
						{#if o && o.name && o.values?.length}
							<div class="flex flex-col items-start sm:flex-row">
								<h6 class="mb-1 w-full shrink-0 font-medium sm:mb-0 sm:w-52">
									{o.name}
								</h6>

								<!-- dropdown -->

								{#if o.inputType == 'dropdown'}
									<select
										bind:value="{selectedOptions[o._id]}"
										class="w-full max-w-xs flex-1 rounded border border-zinc-200 py-1.5 text-sm font-light placeholder-zinc-400 transition duration-300 focus:outline-none hover:bg-white">
										{#each o.values as i}
											<option value="{i._id}">
												{i.name}
											</option>
										{/each}
									</select>

									<!-- textbox -->
								{:else if o.inputType == 'textbox'}
									<Textbox bind:value="{selectedOptions[o._id]}" type="text" />

									<!-- date -->
								{:else if o.inputType == 'date'}
									<Textbox id="start" bind:value="{selectedOptions[o._id]}" type="date" />

									<!-- daterange -->
									<!-- {:else if o.inputType == 'daterange'}
										<span>Date range picker is not found</span>

										<date-picker
											bind:value="{selectedOptions[o.id]}"
											class="max-w-xs flex-1"
											type="date"
											:disabled-date="disabledBeforeTodayAndAfterAWeek"
											range
											@change="$emit('optionChanged', selectedOptions)">
										</date-picker> -->

									<!-- textarea -->
								{:else if o.inputType == 'textarea'}
									<Textarea bind:value="{selectedOptions[o._id]}" />

									<!-- size -->
								{:else if o.inputType == 'size'}
									<div class="flex flex-wrap">
										{#each o.values as v}
											<RadioSize value="{v._id}" bind:modelValue="{selectedOptions[o._id]}">
												<span class="text-zinc-500">{v.name}</span>
											</RadioSize>
										{/each}
									</div>

									<!-- color -->
								{:else if o.inputType == 'color'}
									<div class="flex flex-wrap gap-4">
										{#each o.values as v}
											<RadioColor value="{v._id}" bind:modelValue="{selectedOptions[o._id]}">
												<span class="text-zinc-500">{v.name}</span>
											</RadioColor>
										{/each}
									</div>
									<!-- radio -->
								{:else if o.inputType == 'radio'}
									<div class="flex flex-wrap gap-4">
										{#each o.values as v}
											<Radio value="{v._id}" bind:modelValue="{selectedOptions[o._id]}">
												<span class="text-zinc-500">{v.name}</span>
											</Radio>
										{/each}
									</div>

									<!-- checkbox -->
								{:else if o.inputType == 'checkbox'}
									<div class="flex flex-wrap gap-4">
										{#each o.values as v, i}
											<Checkbox value="{v._id}" bind:modelValue="{selectedOptions[o._id]}">
												<span class="text-zinc-500">{v.name}</span>
											</Checkbox>
										{/each}
									</div>
								{/if}
							</div>
						{/if}
					{/each}
				</div>
			{/if}

			<!-- Linked Products -->

			{#if data?.product?.linkedProducts?.length && data?.product?.linkedProducts[0] && (data?.product?.linkedProducts[0]._id || data?.product?.linkedProducts[0].id)}
				<div>
					<div class="mb-2 flex items-center gap-2 uppercase">
						<h5>Linked Products</h5>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1"
							stroke="currentColor"
							class="h-5 w-5">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
							></path>
						</svg>
					</div>

					<CheckboxOfMultiProducts
						items="{data.product?.linkedProducts}"
						selectedItems="{selectedLinkiedProducts || []}"
						on:change="{handleSelectedLinkiedProducts}" />
				</div>
			{/if}

			{#if ($page?.data?.store?.allowBackOrder || data.product?.allow_back_order) && !data.product?.hasStock}
				<form
					id="create_back_order"
					in:fade="{{ duration: 300 }}"
					action="/cart?/createBackOrder"
					method="POST"
					use:enhance="{() => {
						return async ({ result }) => {
							toast('Your back order is created successfully', 'success')

							await invalidateAll()
							await applyAction(result)
						}
					}}">
					<input type="hidden" name="pid" value="{data?.product?._id || null}" />

					<input type="hidden" name="qty" value="{1}" />

					<button
						type="submit"
						title="It will create a order, and the order will be shipped when vendor will get stock"
						class="max-w-max text-sm text-secondary-500 font-semibold hover:underline focus:outline-none">
						Create Back Order
					</button>
				</form>
			{/if}

			{#if !data.product?.isCustomized}
				<div class="w-full hidden md:grid gap-2 items-center uppercase grid-cols-5 static">
					{#if $page.data.store?.isWishlist}
						<div class="col-span-2">
							<form
								id="toggle_wishlist_1"
								action="/my/wishlist?/toggleWishlist"
								method="POST"
								use:enhance="{() => {
									return async ({ result }) => {
										if (result?.type === 'redirect') {
											goto(result?.location)
										} else if (result?.data) {
											data.product.isWishlisted = result?.data
										} else if (result?.error) {
											toast(result?.error?.message, 'error')
										}

										await invalidateAll()
										await applyAction(result)
									}
								}}">
								<input
									type="hidden"
									name="pid"
									value="{data?.product?._id || data?.product?.id || null}" />

								<input
									type="hidden"
									name="vid"
									value="{data?.product?._id || data?.product?.id || null}" />

								<WhiteButton
									type="submit"
									loading="{loadingForWishlist}"
									roundedNone
									class="w-full">
									<!-- on:click="{() => toggleWishlist(data.product?._id)}" -->
									{#if data?.product?.isWishlisted}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 shrink-0 text-accent-500"
											viewBox="0 0 20 20"
											fill="currentColor">
											<path
												fill-rule="evenodd"
												d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
												clip-rule="evenodd"></path>
										</svg>

										<span>Wishlisted</span>
									{:else}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 shrink-0"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
											></path>
										</svg>

										<span>Wishlist</span>
									{/if}
								</WhiteButton>
							</form>
						</div>
					{/if}

					{#if currentVariantPrice > 0}
						<div class="{$page.data.store?.isWishlist ? ' col-span-3' : ' col-span-5'}">
							{#if $page.data.store?.isSecureCatalogue && !$page.data?.me}
								<a
									href="{$page.data?.loginUrl || '/auth/login'}?ref={$page?.url?.pathname}{$page
										?.url?.search}"
									class="block">
									<WhiteButton type="button" hideLoading class="w-full">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="w-5 h-5">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
											></path>
										</svg>

										<span> Login </span>
									</WhiteButton>
								</a>
							{:else if isExpired}
								<WhiteButton type="button" hideLoading roundedNone class="w-full" disabled>
									Item Expired
								</WhiteButton>
							{:else if data.product?.active && data.product?.hasStock}
								{#if cartButtonText === 'Go to Cart'}
									<a
										in:fade="{{ duration: 300 }}"
										class="block"
										href="/cart"
										data-sveltekit-preload-data>
										<WhiteButton type="button" hideLoading roundedNone class="w-full">
											{cartButtonText}
										</WhiteButton>
									</a>
								{:else}
									<form
										id="add_to_cart_1"
										in:fade="{{ duration: 300 }}"
										action="/cart?/add"
										method="POST"
										enctype="multipart/form-data"
										use:enhance="{() => {
											return async ({ result }) => {
												if (result?.error) {
													toast(result?.error, 'error')
													loading = false
													return
												} else if (result?.data === 'choose variant') {
													scrollTo('variants_list')
													toast('Please choose a variant', 'warning')
													wiggleVariants = true
													setTimeout(() => {
														wiggleVariants = false
													}, 820)
													loading = false
													return
												} else if (result?.status === 200) {
													updateCartStore({ data: result.data })

													result?.data?.qty < 0
														? fireGTagEvent('remove_from_cart', result?.data)
														: fireGTagEvent('add_to_cart', result?.data)

													cartButtonText = 'Added To Cart'
													bounceItemFromTop = true

													setTimeout(() => {
														bounceItemFromTop = false
														cartButtonText = 'Add to Bag'
													}, 3000)

													loading = false
													cartButtonText = 'Go to Cart'

													if (customizedImg) {
														goto(`/checkout/address`)
													}

													// await invalidateAll()
													await applyAction(result)
												}
											}
										}}">
										<input type="hidden" name="pid" value="{data?.product?._id || null}" />

										<input type="hidden" name="vid" value="{data?.product?._id || null}" />

										<input
											type="hidden"
											name="variantsLength"
											value="{data?.moreProductDetails?.variants?.length || null}" />

										<input
											type="hidden"
											name="currentVariantId"
											value="{currentVariantId || null}" />

										<input
											type="hidden"
											name="linkedItems"
											value="{JSON.stringify(selectedLinkiedProducts) || null}" />

										<input type="hidden" name="qty" value="{1}" />

										<input
											type="hidden"
											name="options"
											value="{JSON.stringify(finalSelectedOptions) || null}" />

										<input type="hidden" name="customizedImg" value="{customizedImg || null}" />

										<WhiteButton type="submit" {loading} roundedNone class="w-full">
											{cartButtonText}
										</WhiteButton>
									</form>
								{/if}
							{:else}
								<WhiteButton type="button" hideLoading roundedNone class="w-full" disabled>
									Item Unavailable
								</WhiteButton>
							{/if}
						</div>
					{/if}
				</div>
			{/if}

			<!-- Product details (short description) -->

			{#if loading}
				<Skeleton small />
			{:else if data.product.description}
				<div class="prose max-w-none text-sm text-primary-500">
					{@html data.product.description}
				</div>
			{/if}

			<!-- Product information -->

			<div>
				<h2 class="mb-2 font-normal">Product Information</h2>

				<ul class="text-primary-500">
					<li>
						<button
							type="button"
							class="px-2 py-5 w-full border-b border-zinc-800 flex items-center gap-3 transition duration-300 focus:outline-none
							{showDesignDetails ? 'bg-zinc-100' : 'hover:bg-zinc-100'}"
							on:click="{() => (showDesignDetails = !showDesignDetails)}">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6 transition duration-300
								{showDesignDetails ? 'transform -rotate-180' : ''}">
								<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"
								></path>
							</svg>

							<h3 class="font-normal">Design Details</h3>
						</button>

						{#if showDesignDetails}
							<ul
								transition:slide="{{ duration: 300 }}"
								class="m-0 py-5 pl-11 pr-2 list-none flex flex-col gap-1">
								{#if data.product?.sku}
									<li>
										SKU: {data.product?.sku}
									</li>
								{/if}

								{#if data.product?.attributes?.length}
									{#each data.product?.attributes as att}
										<li>
											<span class="capitalize">
												{att.key.split('_').join(' ')}
											</span>

											:

											<span>
												{att.val}
											</span>
										</li>
									{/each}
								{/if}

								{#if data.product?.specifications?.length}
									{#each data.product?.specifications as specification}
										<li>
											<span class="capitalize">
												{specification.key}
											</span>

											:

											<span>
												{specification.val}
											</span>
										</li>
									{/each}
								{/if}
							</ul>
						{/if}
					</li>

					<!-- <li>
							<button
								type="button"
								class="px-2 py-5 w-full border-b border-zinc-800 flex items-center gap-3 transition duration-300 focus:outline-none
								{showStoneDetails ? 'bg-zinc-100' : 'hover:bg-zinc-100'}"
								on:click={() => (showStoneDetails = !showStoneDetails)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6 transition duration-300
								{showStoneDetails ? 'transform -rotate-180' : ''}">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
								</svg>

								<h3 class="font-normal">Stone Details</h3>
							</button>

							{#if showStoneDetails}
								<ul
									transition:slide={{ duration: 300 }}
									class="m-0 py-5 pl-11 pr-2 list-none flex flex-col gap-1">
									<li></li>
								</ul>
							{/if}
						</li> -->

					<!-- <li>
							<button
								type="button"
								class="px-2 py-5 w-full border-b border-zinc-800 flex items-center gap-3 transition duration-300 focus:outline-none
								{showMetalDetails ? 'bg-zinc-100' : 'hover:bg-zinc-100'}"
								on:click={() => (showMetalDetails = !showMetalDetails)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6 transition duration-300
								{showMetalDetails ? 'transform -rotate-180' : ''}">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
								</svg>

								<h3 class="font-normal">Metal Details</h3>
							</button>

							{#if showMetalDetails}
								<ul
									transition:slide={{ duration: 300 }}
									class="m-0 py-5 pl-11 pr-2 list-none flex flex-col gap-1">
									<li></li>
								</ul>
							{/if}
						</li> -->
				</ul>
			</div>

			<!-- Warranty & Policies -->

			<div>
				<h2 class="mb-2 font-normal">Warranty & Policies</h2>

				<ul class="text-primary-500">
					<li>
						<button
							type="button"
							class="px-2 py-5 w-full border-b border-zinc-800 flex items-center gap-3 transition duration-300 focus:outline-none
							{showShippingAndReturnPolicy ? 'bg-zinc-100' : 'hover:bg-zinc-100'}"
							on:click="{() => (showShippingAndReturnPolicy = !showShippingAndReturnPolicy)}">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6 transition duration-300
								{showShippingAndReturnPolicy ? 'transform -rotate-180' : ''}">
								<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"
								></path>
							</svg>

							<h3 class="font-normal">Shipping & Return Policy</h3>
						</button>

						{#if showShippingAndReturnPolicy}
							<div
								transition:slide="{{ duration: 300 }}"
								class="m-0 py-5 pl-11 pr-2 list-none flex flex-col gap-5">
								<p>
									<span style="font-size: 1.17em; font-weight: 700;">Shipping Policy</span><br />
								</p>

								<p>
									&nbsp;&nbsp;&nbsp;&nbsp;All items are shipped insured and with tracking. Domestic
									orders that total $750 or more are generally shipped with signature required. If
									you order multiple items, we can combine your shipments to save you money. Please
									notify us before or at payment.
								</p>

								<p>
									&nbsp;&nbsp;&nbsp;&nbsp;Please note each item listed has a handling time noted on
									the item page, which indicates approximately how long it will take to process the
									item before shipping.
								</p>

								<p>
									&nbsp;&nbsp;&nbsp;&nbsp;Various shipping carriers are used at our discretion
									(USPS, FedEx and UPS) depending on the purchase amount, shipping location, and
									shipping method chosen during checkout. Once your item(s) has been shipped, a
									tracking number will be posted to your order and you will receive an email
									confirmation. You may check the status of your order, as well as other details by
									logging in after purchasing. We can only ship to the confirmed shipping address
									that is indicated on the payment. Please ensure the shipping address and other
									details are correctly entered when placing your order. Shipping/handling costs are
									non-refundable.
								</p>

								<h5>International:</h5>

								<p>
									&nbsp;&nbsp;&nbsp;&nbsp;International buyers are responsible for taxes and customs
									as determined by their country’s customs. Buyers may contact their local post
									office or customs office for more information as to what to expect in terms of
									duties/taxes, etc.
								</p>

								<p>
									&nbsp;&nbsp;&nbsp;&nbsp;Shipping transit times are estimated times given which do
									not include postal or customs delays.
								</p>

								<h3>Return/Exchange Policy</h3>

								<p>
									Your satisfaction is our utmost priority. If for any reason, you are not satisfied
									with your order, you may send it back for a refund or exchange within 30 days of
									delivery of the package with your order provided it meets the following
									criteria:&nbsp;&nbsp;&nbsp;&nbsp;• &nbsp;&nbsp;The item must be returned in the
									same new, unworn condition it was sent in. It should not have any scratches,
									marks, or any other signs of wear or misuse.&nbsp;&nbsp;&nbsp;&nbsp;•
									&nbsp;&nbsp;JewelWeSell is contacted for an RMA number prior to
									return/exchange.&nbsp;&nbsp;&nbsp;&nbsp;• &nbsp;&nbsp;The item cannot be resized
									or altered in any way by anyone other than JewelWeSell.&nbsp;&nbsp;&nbsp;&nbsp;•
									&nbsp;&nbsp;The buyer is responsible for return shipping/insurance
									fees.&nbsp;&nbsp;&nbsp;&nbsp;• &nbsp;&nbsp;Item(s) must be returned with all
									original paperwork, gift boxes, tags, etc. Shipping/handling costs and payment
									processing costs are non-refundable
								</p>

								<p>Refunds are issued within 7 business days from date of return.</p>

								<p>
									&nbsp;&nbsp;&nbsp;&nbsp;Any item returned that does not meet the noted criteria
									will not be accepted for return/exchange and would be returned back to the buyer
									at the buyer’s expense.
								</p>

								<p>
									Order cancelations: Any refunds for orders canceled prior to shipping will be
									minus any relevant payment processing fees.
								</p>

								<p>
									Certain custom orders may potentially have different return/exchange and
									cancelation policy terms, which will be noted to the buyer for their respective
									custom order request(s).
								</p>
							</div>
						{/if}
					</li>

					<li>
						<button
							type="button"
							class="px-2 py-5 w-full border-b border-zinc-800 flex items-center gap-3 transition duration-300 focus:outline-none
							{showJewelWeSellWarranty ? 'bg-zinc-100' : 'hover:bg-zinc-100'}"
							on:click="{() => (showJewelWeSellWarranty = !showJewelWeSellWarranty)}">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6 transition duration-300
								{showJewelWeSellWarranty ? 'transform -rotate-180' : ''}">
								<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"
								></path>
							</svg>

							<h3 class="font-normal">Jewel We Sell Warranty</h3>
						</button>

						{#if showJewelWeSellWarranty}
							<div
								transition:slide="{{ duration: 300 }}"
								class="m-0 py-5 pl-11 pr-2 list-none flex flex-col gap-1">
								- If a diamond(or any other gemstone) falls out of a piece of jewelry purchased from
								JewelWeSell.com during the term of the warranty, if you send the piece to us with
								the diamond(s) or gemstone(s) that fall out, we will set it back into the ring and
								ship it back to you for free (other than the cost of insured shipping/handling
								to/back). - Please note, we cannot replace any lost gemstones. However, if one does
								fall out and you cannot find it, we can let you know the lowest price we can offer
								for a replacement stone. - Free cleaning, polishing, and re-plating: Normal wear and
								tear over time can cause jewelry to lose its shine and allure. At JewelWeSell, we
								offer free cleaning, polishing, and re-plating for any items purchased from our
								website. (the only cost would be the insured shipping/handling costs) - Please note
								that this warranty does not cover any damage caused to the items by the purchaser or
								others. However, please let us know if there is any damage that you would like
								repaired and we can tell you the lowest possible price it would be for us to repair
								it. - Unauthorized repairs or service (meaning any modifications, alterations,
								repairs or service by anyone other than us or a repair center authorized by us can
								void the warranty.
							</div>
						{/if}
					</li>

					<li>
						<button
							type="button"
							class="px-2 py-5 w-full border-b border-zinc-800 flex items-center gap-3 transition duration-300 focus:outline-none
							{showCustomOrdersAndPersonalization ? 'bg-zinc-100' : 'hover:bg-zinc-100'}"
							on:click="{() =>
								(showCustomOrdersAndPersonalization = !showCustomOrdersAndPersonalization)}">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6 transition duration-300
								{showCustomOrdersAndPersonalization ? 'transform -rotate-180' : ''}">
								<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"
								></path>
							</svg>

							<h3 class="font-normal">Custom Orders & Personalization</h3>
						</button>

						{#if showCustomOrdersAndPersonalization}
							<div
								transition:slide="{{ duration: 300 }}"
								class="m-0 py-5 pl-11 pr-2 list-none flex flex-col gap-2">
								<h3 class="font-normal text-center">Custom Jewelry Design</h3>

								<p>
									Please fill out the form below and we will get back to you about your custom
									design inquiry within 24 hours.
								</p>

								<CustomJewelryDesignForm />

								<span>
									Although our extensive line of different designs are chosen specifically for the
									online community and we try to make sure you get the best product from the lowest
									price, if you cannot find what you are looking for, we are a jewelry manufacturer
									and design and can produce almost whatever you desire to perfectly suits your
									preferences for design and specifications. We can take your jewelry visions and
									make them into realities Please contact us for quotes and more information
									regarding custom orders.
								</span>
							</div>
						{/if}
					</li>

					<li>
						<button
							type="button"
							class="px-2 py-5 w-full border-b border-zinc-800 flex items-center gap-3 transition duration-300 focus:outline-none
							{showFAQ ? 'bg-zinc-100' : 'hover:bg-zinc-100'}"
							on:click="{() => (showFAQ = !showFAQ)}">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6 transition duration-300
								{showFAQ ? 'transform -rotate-180' : ''}">
								<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"
								></path>
							</svg>

							<h3 class="font-normal">F.A.Q.</h3>
						</button>

						{#if showFAQ}
							<div
								transition:slide="{{ duration: 300 }}"
								class="m-0 py-5 pl-11 pr-2 list-none flex flex-col gap-5">
								<p>
									<span style="font-size: 1em; font-weight: 700;">Why buy from JewelWeSell?</span
									><br />
								</p>

								<ul>
									<li>
										Since we manufacture all of our jewelry and there is no middleman, we can offer
										our customers jewelry at wholesale prices, while maintaining superior quality
									</li>
									<li>We offer a 30-day return/exchange policy.&nbsp;</li>
									<li>
										We offer a constantly expanding line of diamond and color stone jewelry&nbsp;
									</li>
									<li>All of the diamonds we sell are 100% conflict-free</li>
									<li>
										We have a devoted customer service team who work vigorously to ensure that our
										customers have the best possible experience when doing business with us.
									</li>
									<li>
										We offer financing (through Affirm and PayPal credit) to eligible customers.
									</li>
								</ul>

								<h4>Where is your jewelry made?</h4>

								<p>The majority of our items are made in our factory in Metuchen, NJ / NYC.</p>

								<p>We also manufacture jewelry in our factory in India.</p>

								<h4>Do I need to pay sales tax?</h4>

								<p>
									Items ordered with a shipping address in New Jersey will be subject to NJ’s sales
									tax.
								</p>

								<h4>How do I know if you received my order?</h4>

								<p>
									After your order is placed, you will receive a confirmation email for your order.
									You may also view your order on our site.
								</p>

								<h4>What payment methods do you accept?</h4>

								<h4>What if I can&apos;t find something I am looking for on your site?</h4>

								<p>
									Custom design inquiries can be made via phone or through the following custom
									design request page:
								</p>

								<p>Custom Design Request</p>

								<h4>How do I request a custom order?</h4>

								<p>
									At JewelWeSell.com we specialize in customized jewelry, with a dedicated team of
									skilled designs that can turn your jewelry vision into a reality. Almost any of
									our designs can be made in any metal, ct weight/quality, measurements and with any
									stone type(s) according to your preferences. Alternatively, you may request to
									have any other design modeled and we will get back to you with additional
									information, quotes , and rendered pics according to your preferences.
								</p>

								<p>
									Custom design inquiries can be made via phone or through the following custom
									design request page:
								</p>

								<p>Custom Design Request</p>
							</div>
						{/if}
					</li>
				</ul>
			</div>

			<!-- Delivery Options Desktop -->

			{#if data.product?.handling_time_when_stock || data.product?.handling_time_when_nis || $page.data.store?.isIndianPincodes}
				<h2 class="mb-2 font-normal">Delivery Options</h2>

				<div class="flex flex-col gap-5">
					{#if data.product?.hasStock && data.product?.handling_time_when_stock}
						<span class="text-sm bg-yellow-300 px-2 py-1 max-w-max">
							{data.product?.handling_time_when_stock}
						</span>
					{:else if !data.product?.hasStock && data.product?.handling_time_when_nis}
						<span class="text-sm bg-yellow-300 px-2 py-1 max-w-max">
							{data.product?.handling_time_when_nis}
						</span>
					{/if}

					{#if $page.data.store?.isIndianPincodes}
						<DeliveryOptions product="{data.product}" deliveryDetails="{data.deliveryDetails}" />
					{/if}
				</div>
			{/if}

			<!-- Promo video -->

			{#if $page.data.store?.storePromoVideo?.active?.val && getIdFromYoutubeVideo($page.data.store?.storePromoVideo?.url?.val)}
				<iframe
					src="https://www.youtube.com/embed/{getIdFromYoutubeVideo(
						$page.data.store?.storePromoVideo?.url?.val
					)}"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					class="w-full max-w-md h-auto aspect-video"
					allowfullscreen>
				</iframe>
			{/if}

			<!-- Add to Cart -->

			<!-- Cart viewport -->

			<div
				id="cart_viewport"
				use:viewport
				on:enterViewport="{cartButtonEnterViewport}"
				on:exitViewport="{cartButtonExitViewport}">
			</div>

			{#if data?.moreProductDetails}
				{#if showStickyCartButton && !data.product?.isCustomized}
					<div
						class="w-full grid md:hidden grid-cols-5 gap-2 items-center uppercase fixed inset-x-0 bottom-0 z-40 h-16 border-t bg-white p-3 box-shadow">
						{#if $page.data.store?.isWishlist}
							<div class="col-span-2">
								<form
									id="toggle_wishlist_2"
									action="/my/wishlist?/toggleWishlist"
									method="POST"
									use:enhance="{() => {
										return async ({ result }) => {
											if (result?.type === 'redirect') {
												goto(result?.location)
											} else if (result?.data) {
												data.product.isWishlisted = result?.data
											} else if (result?.error) {
												toast(result?.error?.message, 'error')
											}

											await invalidateAll()
											await applyAction(result)
										}
									}}">
									<input
										type="hidden"
										name="pid"
										value="{data?.product?._id || data?.product?.id || null}" />

									<input
										type="hidden"
										name="vid"
										value="{data?.product?._id || data?.product?.id || null}" />

									<WhiteButton
										type="submit"
										loading="{loadingForWishlist}"
										roundedNone
										class="w-full">
										<!-- on:click="{() => toggleWishlist(data.product?._id)}" -->
										{#if data?.product?.isWishlisted}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5 shrink-0 text-accent-500"
												viewBox="0 0 20 20"
												fill="currentColor">
												<path
													fill-rule="evenodd"
													d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
													clip-rule="evenodd"></path>
											</svg>

											<span>Wishlisted</span>
										{:else}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5 shrink-0"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="2">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
												></path>
											</svg>

											<span>Wishlist</span>
										{/if}
									</WhiteButton>
								</form>
							</div>
						{/if}

						{#if currentVariantPrice > 0}
							<div class="{$page.data.store?.isWishlist ? ' col-span-3' : ' col-span-5'}">
								{#if $page.data.store?.isSecureCatalogue && !$page.data?.me}
									<a
										href="{$page.data?.loginUrl || '/auth/login'}?ref={$page?.url?.pathname}{$page
											?.url?.search}"
										class="block">
										<WhiteButton type="button" hideLoading roundedNone class="w-full">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="w-5 h-5">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
												></path>
											</svg>

											<span> Login </span>
										</WhiteButton>
									</a>
								{:else if isExpired}
									<WhiteButton type="button" hideLoading roundedNone class="w-full" disabled>
										Item Expired
									</WhiteButton>
								{:else if data.product?.active && data.product?.hasStock}
									{#if cartButtonText === 'Go to Cart'}
										<a
											in:fade="{{ duration: 300 }}"
											class="block"
											href="/cart"
											data-sveltekit-preload-data>
											<WhiteButton type="button" hideLoading roundedNone class="w-full">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="h-5 w-5 shrink-0"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													stroke-width="2">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z">
													</path>
												</svg>

												<span>
													{cartButtonText}
												</span>
											</WhiteButton>
										</a>
									{:else}
										<form
											id="add_to_cart_2"
											in:fade="{{ duration: 300 }}"
											action="/cart?/add"
											method="POST"
											use:enhance="{() => {
												return async ({ result }) => {
													if (result?.data === 'choose variant') {
														scrollTo('variants_list')
														toast('Please choose a variant', 'warning')
														wiggleVariants = true

														setTimeout(() => {
															wiggleVariants = false
														}, 820)
														return
													}
													result?.data?.qty < 0
														? fireGTagEvent('remove_from_cart', result?.data)
														: fireGTagEvent('add_to_cart', result?.data)
													cartButtonText = 'Added To Cart'
													bounceItemFromTop = true
													setTimeout(() => {
														bounceItemFromTop = false
														cartButtonText = 'Add to Cart'
													}, 3000)
													cartButtonText = 'Go to Cart'
													if (customizedImg) {
														goto(`/checkout/address`)
													}
													invalidateAll()
													await applyAction(result)
												}
											}}">
											<input type="hidden" name="pid" value="{data?.product?._id || null}" />

											<input type="hidden" name="vid" value="{data?.product?._id || null}" />

											<input
												type="hidden"
												name="variantsLength"
												value="{data?.moreProductDetails?.variants?.length || null}" />

											<input
												type="hidden"
												name="currentVariantId"
												value="{currentVariantId || null}" />

											<input
												type="hidden"
												name="linkedItems"
												value="{JSON.stringify(selectedLinkiedProducts) || null}" />

											<input type="hidden" name="qty" value="{1}" />

											<input
												type="hidden"
												name="options"
												value="{JSON.stringify(finalSelectedOptions) || null}" />

											<input type="hidden" name="customizedImg" value="{customizedImg || null}" />

											<WhiteButton type="submit" {loading} roundedNone class="w-full">
												{cartButtonText}
											</WhiteButton>
										</form>
									{/if}
								{:else}
									<WhiteButton type="button" hideLoading roundedNone class="w-full" disabled>
										Item Unavailable
									</WhiteButton>
								{/if}
							</div>
						{/if}
					</div>
				{/if}

				{#if !data.product?.isCustomized}
					<div class="w-full grid md:hidden grid-cols-5 gap-2 items-center uppercase">
						{#if $page.data.store?.isWishlist}
							<div class="col-span-2">
								<form
									id="toggle_wishlist_3"
									action="/my/wishlist?/toggleWishlist"
									method="POST"
									use:enhance="{() => {
										return async ({ result }) => {
											if (result?.type === 'redirect') {
												goto(result?.location)
											} else if (result?.data) {
												data.product.isWishlisted = result?.data
											} else if (result?.error) {
												toast(result?.error?.message, 'error')
											}

											await invalidateAll()
											await applyAction(result)
										}
									}}">
									<input
										type="hidden"
										name="pid"
										value="{data?.product?._id || data?.product?.id || null}" />

									<input
										type="hidden"
										name="vid"
										value="{data?.product?._id || data?.product?.id || null}" />

									<WhiteButton
										type="submit"
										loading="{loadingForWishlist}"
										roundedNone
										class="w-full">
										<!-- on:click="{() => toggleWishlist(data.product?._id)}" -->
										{#if data?.product?.isWishlisted}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5 shrink-0 text-accent-500"
												viewBox="0 0 20 20"
												fill="currentColor">
												<path
													fill-rule="evenodd"
													d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
													clip-rule="evenodd"></path>
											</svg>

											<span>Wishlisted</span>
										{:else}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5 shrink-0"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="2">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
												></path>
											</svg>

											<span>Wishlist</span>
										{/if}
									</WhiteButton>
								</form>
							</div>
						{/if}

						{#if currentVariantPrice > 0}
							<div class="{$page.data.store?.isWishlist ? ' col-span-3' : ' col-span-5'}">
								{#if $page.data.store?.isSecureCatalogue && !$page.data?.me}
									<a
										href="{$page.data?.loginUrl || '/auth/login'}?ref={$page?.url?.pathname}{$page
											?.url?.search}"
										class="block">
										<WhiteButton type="button" hideLoading roundedNone class="w-full">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="w-5 h-5">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
												></path>
											</svg>

											<span> Login </span>
										</WhiteButton>
									</a>
								{:else if isExpired}
									<WhiteButton type="button" hideLoading roundedNone class="w-full" disabled>
										Item Expired
									</WhiteButton>
								{:else if data.product?.active && data.product?.hasStock}
									{#if cartButtonText === 'Go to Cart'}
										<a
											in:fade="{{ duration: 300 }}"
											class="block"
											href="/cart"
											data-sveltekit-preload-data>
											<WhiteButton type="button" hideLoading roundedNone class="w-full">
												{cartButtonText}
											</WhiteButton>
										</a>
									{:else}
										<form
											id="add_to_cart_3"
											in:fade="{{ duration: 300 }}"
											action="/cart?/add"
											method="POST"
											use:enhance="{() => {
												return async ({ result }) => {
													if (result?.data === 'choose variant') {
														scrollTo('variants_list')
														toast('Please choose a variant', 'warning')
														wiggleVariants = true

														setTimeout(() => {
															wiggleVariants = false
														}, 820)
														return
													}
													result?.data?.qty < 0
														? fireGTagEvent('remove_from_cart', result?.data)
														: fireGTagEvent('add_to_cart', result?.data)
													cartButtonText = 'Added To Cart'
													bounceItemFromTop = true
													setTimeout(() => {
														bounceItemFromTop = false
														cartButtonText = 'Add to Cart'
													}, 3000)
													cartButtonText = 'Go to Cart'
													if (customizedImg) {
														goto(`/checkout/address`)
													}
													invalidateAll()
													await applyAction(result)
												}
											}}">
											<input type="hidden" name="pid" value="{data?.product?._id || null}" />

											<input type="hidden" name="vid" value="{data?.product?._id || null}" />

											<input
												type="hidden"
												name="variantsLength"
												value="{data?.moreProductDetails?.variants?.length || null}" />

											<input
												type="hidden"
												name="currentVariantId"
												value="{currentVariantId || null}" />

											<input
												type="hidden"
												name="linkedItems"
												value="{JSON.stringify(selectedLinkiedProducts) || null}" />

											<input type="hidden" name="qty" value="{1}" />

											<input
												type="hidden"
												name="options"
												value="{JSON.stringify(finalSelectedOptions) || null}" />

											<input type="hidden" name="customizedImg" value="{customizedImg || null}" />

											<WhiteButton type="submit" {loading} roundedNone class="w-full">
												{cartButtonText}
											</WhiteButton>
										</form>
									{/if}
								{:else}
									<WhiteButton type="button" hideLoading roundedNone class="w-full" disabled>
										Item Unavailable
									</WhiteButton>
								{/if}
							</div>
						{/if}
					</div>
				{/if}
			{/if}

			{#if data.product?.specifications?.length}
				<ul class="m-0 p-0 list-none border">
					{#each data.product?.specifications as s}
						<li class="p-2 grid grid-cols-2 gap-2">
							<p class="col-span-1">
								{s.name || '_'}
							</p>

							<p class="col-span-1 text-right">
								{s.value || '_'}
							</p>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>

<!-- Ratings & Reviews -->

{#if $page.data.store?.isProductReviewsAndRatings}
	<div id="ratings_and_reviews">
		<div class="flex items-center flex-wrap gap-5">
			<button
				type="button"
				class="mb-2 lg:mb-0 uppercase border-b-4 focus:outline-none
										{selectedReviewType === 'product_review'
					? 'border-primary-500 text-primary-500'
					: 'border-zinc-200 text-zinc-500'}"
				on:click="{() => {
					;(selectedReviewType = 'product_review') && scrollTo('ratings_and_reviews')
				}}">
				<h5>Product Review</h5>
			</button>

			<button
				type="button"
				class="mb-2 lg:mb-0 uppercase border-b-4 focus:outline-none
										{selectedReviewType === 'brand_review'
					? 'border-primary-500 text-primary-500'
					: 'border-zinc-200 text-zinc-500'}"
				on:click="{() => {
					;(selectedReviewType = 'brand_review') && scrollTo('ratings_and_reviews')
				}}">
				<h5>Brand Review</h5>
			</button>
		</div>
	</div>

	<RatingsAndReviews
		type="{selectedReviewType}"
		product="{data?.product}"
		reviewsSummary="{selectedReviewType === 'product_review'
			? data?.productReviews?.reviewsSummary?.productReviews
			: data?.productReviews?.reviewsSummary?.brandReviews}"
		reviews="{data?.productReviews}" />
{/if}

<div class="flex flex-col gap-5 sm:gap-10">
	<!-- Similar products From category slug -->

	{#if loading}
		<ul class="m-0 p-0 list-none flex flex-wrap gap-5">
			{#each { length: 7 } as _}
				<li>
					<ProductSkeleton />
				</li>
			{/each}
		</ul>
	{:else if data?.moreProductDetails?.moreFromCategory && data?.moreProductDetails?.moreFromCategory[0] && data?.moreProductDetails?.moreFromCategory[0].slug}
		<SimilarProductsFromCategorySlug
			centeredHeading="{true}"
			isBottomBorder="{false}"
			isUpperCase="{false}"
			data="{data?.moreProductDetails?.moreFromCategory}" />
	{/if}

	<!-- Recommended products -->

	{#if data.product?.relatedProducts?.length}
		<hr />

		<ProductsGrid title="Recommended Products" products="{data.product?.relatedProducts}" />
	{/if}
</div>

<!-- Footer mobile show hide toggle -->

<div class="block lg:hidden">
	<button
		type="button"
		class="p-3 sm:px-10 w-full flex items-center justify-between gap-4 text-sm focus:outline-none"
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

	{#if showFooter}
		<div transition:slide="{{ duration: 300 }}">
			<Footer />
		</div>
	{/if}
</div>

<Gallery
	bind:selectedImgIndex
	bind:showPhotosModal
	images="{data.product?.images}"
	title="{data.product?.businessName}" />

{#if bounceItemFromTop}
	<AnimatedCartItem img="{customizedImg || data.product?.img}" />
{/if}

<!-- <UserForm showUserInputForm="{showUserInputForm}" /> -->

{#if showSizeChart}
	<div class="fixed inset-0 h-screen w-screen z-50 flex justify-end">
		<button
			type="button"
			class="absolute inset-0 cursor-default focus:outline-none"
			on:click="{() => (showSizeChart = false)}">
		</button>

		<div
			transition:slideFade="{{ duration: 500 }}"
			class="absolute inset-y-0 right-0 z-[60] h-full w-full sm:w-96 bg-white p-5 sm:p-10 flex flex-col items-end justify-end"
			style="box-shadow: -4px 0px 10px rgba(50, 50, 50, 0.2);">
			<button
				type="button"
				class="text-zinc-500 hover:text-zinc-800 transition duration-300 transform scale-125 focus:outline-none"
				on:click="{() => (showSizeChart = false)}">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
				</svg>
			</button>

			<div class="h-full w-full flex items-center justify-center">
				<img
					src="{data.product.sizechart}"
					alt="{data.product?.name} size chart"
					class="object-contain object-center w-full h-auto first-line:text-xs" />strea
			</div>
		</div>
	</div>
{/if}
