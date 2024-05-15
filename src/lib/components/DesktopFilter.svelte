<script lang="ts">
import { constructURL2, navigateToProperPath, toast } from '$lib/utils'
import { createEventDispatcher, onMount } from 'svelte'
import { GetColorName } from 'hex-color-to-color-name'
import { goto } from '$app/navigation'
import { page } from '$app/stores'
import { RadioEs, CheckboxEs } from '$lib/ui'
import { slide } from 'svelte/transition'
import ColoredBackground from '$lib/assets/konva/colored_background.png'
import Cookie from 'cookie-universal'
import Fuse from 'fuse.js'
import { browser } from '$app/environment'
import { getAllMegamenuFromStore } from '$lib/store/megamenu'
import DoubleRangeSlider from './DoubleRangeSlider.svelte'

const dispatch = createEventDispatcher()

export let appliedFilters = {}
export let filterLength = 0
export let fl = {}
export let mergedArr = []
export let priceRange = []
export let query // Required because after loading finished then only we will initiate the price slider component
export let facets = {}

let clazz
export { clazz as class }

// price range variables
let priceMax = 0
let priceMin = 0
let selectedPriceRange = []
let showPrice = true

// categories variables
let selectedCategory
let selectedCategory2
let showCategories = true
let showSubCategory = []
let showSubCategory2 = []
let loadingForMegamenu = false
let megamenu
let megamenuResult = []

// let allDiscount = []
// let allTags = []
let allAges = []
let allAttributes = []
let allBrands = []
let allColors = []
let allFeatures = []
let allGenders = []
let allMaterials = []
let allPromotions = []
let allSizes = []
let allTypes = []
let allVendors = []

function clearFilters() {
	fl = {}
	appliedFilters = {}
	const q = $page?.url?.searchParams.get('q') || ''
	const url = `${$page?.url?.pathname}?q=${q}`
	goto(url)
	dispatch('clearAll')
}

function goCheckbox(e) {
	fl[e.detail.model] = e.detail.selectedItems
	fl.q = $page.url.searchParams.get('q')
	let url = constructURL2(`${$page.url.pathname}`, fl)
	appliedFilters = { ...fl }
	delete appliedFilters?.page
	delete appliedFilters?.sort
	delete appliedFilters?.lat
	delete appliedFilters?.lng
	goto(`${url}page=1`)
}

onMount(async () => {
	$page.url.searchParams.forEach(function (value, key) {
		fl[key] = value
		if (key !== 'page' && key !== 'sort' && key !== 'lat' && key !== 'lng')
			appliedFilters[key] = value
	})

	await getMegamenu()
})

$: if (facets.all_aggs) {
	getFacetsWithProducts()
}

function getFacetsWithProducts() {
	// if (facets?.all_aggs?.age?.all?.buckets?.length) {
	allAges = facets?.all_aggs?.age?.all?.buckets?.filter((t) => t.doc_count > 0)
	// }
	// if (facets?.all_aggs?.attributes?.all?.key?.buckets?.length) {
	allAttributes = facets?.all_aggs?.attributes?.all?.key?.buckets?.filter((t) => t.doc_count > 0)
	// }
	// if (facets?.all_aggs?.brands?.all?.buckets?.length) {
	allBrands = facets?.all_aggs?.brands?.all?.buckets?.filter((t) => t.doc_count > 0)
	// }
	// if (facets?.all_aggs?.colors?.all?.buckets?.length) {
	allColors = facets?.all_aggs?.colors?.all?.buckets?.filter((t) => t.doc_count > 0)
	// }
	// if (facets?.all_aggs?.discount?.all?.buckets?.length) {
	// 	allDiscount = facets?.all_aggs?.discount?.all?.buckets?.filter((t) => t.doc_count > 0)
	// }
	// if (facets?.all_aggs?.features?.all?.buckets?.length) {
	allFeatures = facets?.all_aggs?.features?.all?.buckets?.filter((t) => t.doc_count > 0)
	// }
	// if (facets?.all_aggs?.genders?.all?.buckets?.length) {
	allGenders = facets?.all_aggs?.genders?.all?.buckets?.filter((t) => t.doc_count > 0)
	// }
	// if (facets?.all_aggs?.materials?.all?.buckets?.length) {
	allMaterials = facets?.all_aggs?.materials?.all?.buckets?.filter((t) => t.doc_count > 0)
	// }
	// if (facets?.all_aggs?.promotions?.all?.buckets?.length) {
	allPromotions = facets?.all_aggs?.promotions?.all?.buckets?.filter((t) => t.doc_count > 0)
	// }
	// if (facets?.all_aggs?.sizes?.all?.buckets?.length) {
	allSizes = facets?.all_aggs?.sizes?.all?.buckets?.filter((t) => t.doc_count > 0)
	// }
	// if (facets?.all_aggs?.tags?.all?.buckets?.length) {
	// 	allTags = facets?.all_aggs?.tags?.all?.buckets?.filter((t) => t.doc_count > 0)
	// }
	// if (facets?.all_aggs?.types?.all?.buckets?.length) {
	allTypes = facets?.all_aggs?.types?.all?.buckets?.filter((t) => t.doc_count > 0)
	// }
	if (facets?.all_aggs?.vendors?.all?.buckets?.length) {
		allVendors = facets?.all_aggs?.vendors?.all?.buckets?.filter((t) => t.doc_count > 0)
	}
	// if (facets?.all_aggs?.price_stats?.min && facets?.all_aggs?.price_stats?.max) {
	priceMin = facets?.all_aggs?.price_stats?.min
	priceMax = facets?.all_aggs?.price_stats?.max

	if ($page.url?.searchParams?.get('price')) {
		selectedPriceRange.push($page.url?.searchParams?.get('price').split(',')[0])
		selectedPriceRange.push($page.url?.searchParams?.get('price').split(',')[1])
	} else {
		selectedPriceRange.push(priceMin)
		selectedPriceRange.push(priceMax)
	}
	// }
}

async function getMegamenu() {
	if (browser) {
		try {
			loadingForMegamenu = true

			megamenu = await getAllMegamenuFromStore({
				storeId: $page?.data?.storeId,
				isCors: $page?.data?.store?.isCors,
				origin: $page.data.origin
			})

			if (megamenu?.length) {
				megamenu = megamenu.filter((e) => {
					return e.name !== 'New Arrivals'
				})
			}

			megamenuResult = megamenu
		} catch (e) {
			toast(e, 'error')
		} finally {
			loadingForMegamenu = false
		}
	}
}

$: {
	filterLength = 0
	mergedArr = []
	for (let a in appliedFilters) {
		const arr = appliedFilters[a] || []
		if (Array.isArray(arr)) {
			mergedArr.concat(arr)
			filterLength += arr.length
		} else {
			mergedArr.concat(arr.split(','))
			filterLength += arr.split(',').length
		}
	}
}

function handleToggleSubCategory(m, mx) {
	selectedCategory = m.name

	if (m.children?.length > 0) {
		if (showSubCategory[mx] === true) {
			selectedCategory = ''
			showSubCategory[mx] = false
		} else {
			showSubCategory[mx] = true
		}
	}
}

function handleToggleSubCategory2(c, cx) {
	selectedCategory2 = c.name

	if (c.children?.length > 0) {
		if (showSubCategory2[cx] === true) {
			selectedCategory2 = ''
			showSubCategory2[cx] = false
		} else {
			showSubCategory2[cx] = true
		}
	}
}
</script>

<div class="{clazz} flex w-72 shrink-0 flex-col items-start divide-y">
	<!-- Clear All -->

	{#if filterLength}
		<button
			type="button"
			class="py-3 text-left text-secondary-500 hover:underline max-w-max focus:outline-none"
			on:click="{clearFilters}">
			Clear All
		</button>
	{/if}

	{#if facets?.all_aggs?.price_stats?.min && facets?.all_aggs?.price_stats?.max}
		<div class="py-3">
			<button
				type="button"
				class="w-full text-left flex items-center gap-2 justify-between"
				on:click="{() => (showPrice = !showPrice)}">
				<h6 class="flex-1 text-lg font-normal text-primary-500 capitalize">Filter by Price</h6>

				{#if showPrice}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6"></path>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
					</svg>
				{/if}
			</button>

			{#if showPrice}
				<div transition:slide="{{ duration: 300 }}" class="mt-3">
					<div class="mb-3 flex items-center gap-3">
						<input
							type="text"
							name=""
							id=""
							class="p-1 flex-1 w-full text-sm text-zinc-500 border"
							bind:value="{selectedPriceRange[0]}" />

						<span> - </span>

						<input
							type="text"
							name=""
							id=""
							class="p-1 flex-1 w-full text-sm text-zinc-500 border"
							bind:value="{selectedPriceRange[1]}" />
					</div>

					<DoubleRangeSlider
						min="{priceMin}"
						max="{priceMax}"
						bind:range="{selectedPriceRange}"
						on:go="{goCheckbox}" />
				</div>
			{/if}
		</div>
	{/if}

	<!-- Megamenu -->

	{#if megamenuResult?.length}
		<div class="py-3">
			<button
				type="button"
				class="w-full text-left flex items-center gap-2 justify-between"
				on:click="{() => (showCategories = !showCategories)}">
				<h6 class="flex-1 text-lg font-normal text-primary-500 capitalize">Categories</h6>

				{#if showCategories}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6"></path>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
					</svg>
				{/if}
			</button>

			{#if showCategories}
				<div transition:slide="{{ duration: 300 }}" class="mt-3">
					<!-- 1st level categories -->

					<ul class="flex w-full cursor-pointer flex-col capitalize">
						{#each megamenuResult as m, mx}
							<li>
								{#if m.children?.length}
									<div
										class="flex w-full items-center justify-between gap-2
								{selectedCategory === m.name ? 'text-blue-600 font-medium' : 'hover:text-blue-600'}">
										<a
											href="{navigateToProperPath(m.link || m.slug)}"
											aria-label="Click to visit category related products"
											class="flex-1">
											{m.name}
										</a>

										<button
											type="button"
											class="overflow-hidden p-1 focus:outline-none"
											on:click="{() => handleToggleSubCategory(m, mx)}">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												class="h-5 w-5 shrink-0 transition duration-300
										{showSubCategory[mx] ? 'transform rotate-90' : ''}">
												<path
													fill-rule="evenodd"
													d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
													clip-rule="evenodd"></path>
											</svg>
										</button>
									</div>
								{:else}
									<a
										href="{navigateToProperPath(m.link || m.slug)}"
										aria-label="Click to visit category related products"
										class="flex w-full items-center justify-between gap-2 py-1 text-left focus:outline-none hover:text-blue-600">
										{m.name}
									</a>
								{/if}

								<!-- 2nd level categories -->

								{#if showSubCategory[mx]}
									<ul class="ml-2">
										{#each m.children as c, cx}
											<li>
												{#if c.children?.length}
													<div
														class="flex w-full items-center justify-between gap-2
												{selectedCategory2 === c.name ? 'text-blue-600 font-medium' : 'hover:text-blue-600'}">
														<a
															href="{navigateToProperPath(c.link || c.slug)}"
															aria-label="Click to visit category related products page"
															class="flex-1">
															{c.name}
														</a>

														<button
															type="button"
															class="overflow-hidden p-1 focus:outline-none"
															on:click="{() => handleToggleSubCategory2(c, cx)}">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																viewBox="0 0 20 20"
																fill="currentColor"
																class="h-5 w-5 shrink-0 transition duration-300
														{showSubCategory2[cx] ? 'transform rotate-90' : ''}">
																<path
																	fill-rule="evenodd"
																	d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
																	clip-rule="evenodd"></path>
															</svg>
														</button>
													</div>
												{:else}
													<a
														href="{navigateToProperPath(c.link || c.slug)}"
														aria-label="Click to visit category related products page"
														class="flex w-full items-center justify-between gap-2 py-1 text-left focus:outline-none hover:text-blue-600">
														{c.name}
													</a>
												{/if}

												<!-- 3rd level categories -->

												{#if showSubCategory2[cx]}
													<ul class="ml-4">
														{#each c.children as cc}
															<a
																href="{navigateToProperPath(cc.link || cc.slug)}"
																aria-label="Click to visit category related products page"
																class="flex w-full items-center justify-between gap-2 py-1 text-left focus:outline-none hover:text-blue-600">
																{cc.name}
															</a>
														{/each}
													</ul>
												{/if}
											</li>
										{/each}
									</ul>
								{/if}
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	{/if}

	{#if allAges?.length > 0}
		<div class="py-3">
			<CheckboxEs
				items="{allAges}"
				title="Age"
				model="age"
				selectedItems="{fl.age || []}"
				on:go="{goCheckbox}" />
		</div>
	{/if}

	{#if allAttributes?.length > 0}
		{#each allAttributes as attribute, ix (attribute.key)}
			{#if attribute.key !== 'options'}
				<div class="py-3">
					<CheckboxEs
						items="{attribute.value?.buckets}"
						title="{attribute.key}"
						model="{attribute.key}"
						selectedItems="{fl[attribute.key] || []}"
						on:go="{goCheckbox}" />
				</div>
			{/if}
		{/each}
	{/if}

	{#if allBrands?.length > 0}
		<div class="py-3">
			<CheckboxEs
				items="{allBrands}"
				title="Brands"
				model="brands"
				selectedItems="{fl.brands || []}"
				on:go="{goCheckbox}" />
		</div>
	{/if}

	{#if allColors?.length > 0}
		<div class="py-3">
			<CheckboxEs
				isColor
				items="{allColors}"
				model="colors"
				selectedItems="{fl.colors || []}"
				title="Colors"
				on:go="{goCheckbox}" />
		</div>
	{/if}

	<!-- {#if allDiscount?.length > 0}
		<div class="py-3">
			<RadioEs
				items="{allDiscount}"
				title="Discount"
				model="discount"
				selectedItems="{fl.discount || []}"
				on:go="{goCheckbox}" />
		</div>
	{/if} -->

	{#if allFeatures?.length > 0}
		<div class="py-3">
			<RadioEs
				items="{allFeatures}"
				title="Features"
				model="features"
				selectedItems="{fl.features || []}"
				on:go="{goCheckbox}" />
		</div>
	{/if}

	{#if allGenders?.length > 0}
		<div class="py-3">
			<CheckboxEs
				items="{allGenders}"
				title="Genders"
				model="genders"
				selectedItems="{fl.genders || []}"
				on:go="{goCheckbox}" />
		</div>
	{/if}

	{#if allMaterials?.length > 0}
		<div class="py-3">
			<CheckboxEs
				items="{allMaterials}"
				title="Materials"
				model="materials"
				selectedItems="{fl.materials || []}"
				on:go="{goCheckbox}" />
		</div>
	{/if}

	{#if allPromotions?.length > 0}
		<div class="py-3">
			<CheckboxEs
				items="{allPromotions}"
				title="Promotions"
				model="promotions"
				selectedItems="{fl.promotions || []}"
				on:go="{goCheckbox}" />
		</div>
	{/if}

	{#if allSizes?.length > 0}
		<div class="py-3">
			<CheckboxEs
				items="{allSizes}"
				title="Sizes"
				model="sizes"
				selectedItems="{fl.sizes || []}"
				on:go="{goCheckbox}" />
		</div>
	{/if}

	<!-- {#if allTags?.length > 0}
		<div class="py-3">
			<CheckboxEs
				items="{allTags}"
				title="tags"
				model="tags"
				selectedItems="{fl.tags || []}"
				on:go="{goCheckbox}" />
		</div>
	{/if} -->

	{#if allTypes?.length > 0}
		<div class="py-3">
			<CheckboxEs
				items="{allTypes}"
				title="types"
				model="types"
				selectedItems="{fl.types || []}"
				on:go="{goCheckbox}" />
		</div>
	{/if}

	{#if allVendors?.length > 0}
		<div class="py-3">
			<CheckboxEs
				items="{allVendors}"
				title="vendors"
				model="vendors"
				selectedItems="{fl.vendors || []}"
				on:go="{goCheckbox}" />
		</div>
	{/if}

	<!-- {#if facets?.all_aggs?.price?.all?.buckets?.length > 0}
		<div class="py-3">
			<RadioEs
				items="{facets?.all_aggs?.price?.all?.buckets}"
				title="Price"
				model="price"
				selectedItems="{fl.price || []}"
				on:go="{goCheckbox}" />
		</div>
	{/if} -->
</div>
