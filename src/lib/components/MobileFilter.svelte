<script lang="ts">
// import AllMegamenuStore from '$lib/store/megamenu'
// import Cookie from 'cookie-universal'
import { browser } from '$app/environment'
import { CheckboxEs, PrimaryButton, RadioEs } from '$lib/ui'
import { constructURL2, navigateToProperPath, toast } from '$lib/utils'
import { createEventDispatcher, onMount } from 'svelte'
import { DoubleRangeSlider } from '$lib/components'
import { fly } from 'svelte/transition'
import { getAllMegamenuFromStore } from '$lib/store/megamenu'
import { goto } from '$app/navigation'
import { page } from '$app/stores'
import Fuse from 'fuse.js'

// const cookies = Cookie()
const dispatch = createEventDispatcher()

let clazz = ''
export { clazz as class }

export let appliedFilters = {}
export let facets = {}
export let filterLength = 0
export let fl = {}
export let mergedArr = []
export let priceRange = []
export let selected = ''
export let showFilter = false
export let showSort = false

// price range variables
let priceMax = 0
let priceMin = 0
let selectedPriceRange = []

let loadingForMegamenu = false
let searchCategoryValue = null
let selectedCategory
let selectedCategory2
let showSearchBox = false
let showSubCategory = []
let showSubCategory2 = []

let allAges = []
let allAttributes = []
let allBrands = []
let allColors = []
let allDiscount = []
let allFeatures = []
let allGenders = []
let allMaterials = []
let allPromotions = []
let allSizes = []
let allTags = []
let allTypes = []
let allVendors = []
let firstBucketObjectWithLength = {}
let megamenu
let megamenuResult = []

const options = {
	keys: ['name', 'children.name', 'children.children.name'], // Search name and children's names
	threshold: 0.4 // Require at least 40% match score
}

onMount(async () => {
	$page.url.searchParams.forEach(function (value, key) {
		fl[key] = value
		if (key !== 'page' && key !== 'sort' && key !== 'lat' && key !== 'lng')
			appliedFilters[key] = value
	})

	await getMegamenu()
	await getSelected()
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
	allDiscount = facets?.all_aggs?.discount?.all?.buckets?.filter((t) => t.doc_count > 0)
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
	allTags = facets?.all_aggs?.tags?.all?.buckets?.filter((t) => t.doc_count > 0)
	// }
	// if (facets?.all_aggs?.types?.all?.buckets?.length) {
	allTypes = facets?.all_aggs?.types?.all?.buckets?.filter((t) => t.doc_count > 0)
	// }
	// if (facets?.all_aggs?.vendors?.all?.buckets?.length) {
	allVendors = facets?.all_aggs?.vendors?.all?.buckets?.filter((t) => t.doc_count > 0)
	// }
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

// let allMegamenu
// AllMegamenuStore.subscribe((data) => {
// 	megamenu = data
// 	megamenuResult = megamenu
// })

async function getMegamenu() {
	if (browser) {
		try {
			loadingForMegamenu = true

			megamenu = await getAllMegamenuFromStore({
				storeId: $page?.data?.storeId,
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

function searchCategories() {
	const fuse = new Fuse(megamenu, options)

	megamenuResult = fuse.search(searchCategoryValue)

	megamenuResult = megamenuResult.map((m) => {
		return m.item
	})

	if (!megamenuResult.length) {
		megamenuResult = megamenu
	}
}

async function handleSearchBox() {
	showSearchBox = !showSearchBox
	document.getElementById(`CategoriesSearchText`).focus()
	if (!showSearchBox) {
		searchCategoryValue = ''
		await searchCategories()
	}
}

function getSelected() {
	if (priceRange?.length > 0) {
		selected = 'Prices'
	} else if (megamenuResult?.length > 0) {
		selected = 'Categories'
	} else if (allAges?.length > 0) {
		selected = 'Age'
	} else if (firstBucketWithLength()) {
		selected = firstBucketObjectWithLength.key
	} else if (allBrands?.length > 0) {
		selected = 'Brands'
	} else if (allColors?.length > 0) {
		selected = 'Colors'
	} else if (allDiscount?.length > 1) {
		selected = 'Discount'
	} else if (allFeatures?.length > 0) {
		selected = 'Features'
	} else if (allGenders?.length > 0) {
		selected = 'Genders'
	} else if (allPromotions?.length > 0) {
		selected = 'Promotions'
	} else if (allSizes?.length > 0) {
		selected = 'Sizes'
	} else if (allTags?.length > 0) {
		selected = 'Tags'
	} else if (allTypes?.length > 0) {
		selected = 'Types'
	} else if (allVendors?.length > 0) {
		selected = 'Vendors'
	}
}

function firstBucketWithLength() {
	// Find the first bucket with a length inside the buckets array
	firstBucketObjectWithLength = allAttributes.find((bucket) => bucket.value.buckets.length > 0)

	return firstBucketObjectWithLength ? true : false
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

function clearFilters() {
	fl = {}
	appliedFilters = {}
	const q = $page?.url?.searchParams.get('q') || ''
	const url = `${$page?.url?.pathname}?q=${q}`
	showFilter = false
	goto(url)
	dispatch('clearAll')
}

function goCheckbox(e) {
	fl[e.detail.model] = e.detail.selectedItems
}

function applyFilter() {
	showFilter = false
	fl.q = $page.url.searchParams.get('q')
	let url = constructURL2(`${$page.url.pathname}`, fl)
	appliedFilters = { ...fl }
	delete appliedFilters?.page
	delete appliedFilters?.sort
	delete appliedFilters?.lat
	delete appliedFilters?.lng
	goto(`${url}page=1`)
}

async function sortNow(s) {
	let u = new URL($page.url)

	if (s == 'null' || s == null || s == undefined || s == 'undefined') {
		u.searchParams.delete('sort')
	} else {
		await u.searchParams.set('sort', s)
	}
	goto(u.toString())
	window.scroll({ top: 0, behavior: 'smooth' })
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
</script>

<div class="{clazz}">
	<!-- Header -->

	<!-- Filter -->

	<PrimaryButton
		type="button"
		blackBackground
		class="w-full text-xs"
		roundedNone
		loadingringsize="xs"
		on:click="{() => {
			;(showFilter = true) && getSelected()
		}}">
		Refined by
	</PrimaryButton>

	<!-- Show Filter -->

	{#if showFilter}
		<div
			transition:fly="{{ x: -50, duration: 300 }}"
			class="fixed inset-0 z-[100] h-screen w-screen bg-white">
			<header
				class="relative grid grid-cols-3 items-center gap-3 p-3 text-center text-lg font-bold tracking-wide shadow-md">
				<div class="col-span-1 flex items-center justify-self-start">
					<!-- Close Filter -->

					<button type="button" class="focus:outline-none" on:click="{() => (showFilter = false)}">
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

					<!-- Clear All -->

					{#if filterLength > 0}
						<span class="mx-2 h-6 w-[2px] border-l-2 border-zinc-200"></span>

						<button
							on:click="{clearFilters}"
							class="text-xs text-primary-500 focus:outline-none hover:underline">
							Clear All
						</button>
					{/if}
				</div>

				<h5 class="col-span-1 justify-self-center">Filter</h5>

				<!-- Apply Button -->

				<PrimaryButton
					type="button"
					loadingringsize="xs"
					roundedFull
					class="col-span-1 justify-self-end text-xs uppercase"
					on:click="{applyFilter}">
					Apply
				</PrimaryButton>
			</header>

			<div class="flex h-full items-start">
				<!-- Left Sidebar Section -->

				<div class="flex h-full w-2/6 flex-col border-b border-r bg-zinc-100">
					{#if priceRange?.length > 0}
						<button
							class="border-l-4 p-3 text-left text-sm font-semibold tracking-wide flex items-center gap-1 justify-between focus:outline-none
						{selected === 'Prices'
								? 'text-primary-500 border-primary-500 bg-white'
								: 'border-zinc-100 bg-transparent'}"
							on:click="{() => (selected = 'Prices')}">
							<span> Prices </span>

							{#if fl.price?.length}
								<div class="h-1.5 w-1.5 rounded-full bg-primary-500"></div>
							{/if}
						</button>

						<hr class="w-full" />
					{/if}

					{#if megamenuResult?.length}
						<button
							class="border-l-4 p-3 text-left text-sm font-semibold tracking-wide flex items-center gap-1 justify-between focus:outline-none
						{selected === 'Categories'
								? 'text-primary-500 border-primary-500 bg-white'
								: 'border-zinc-100 bg-transparent'}"
							on:click="{() => (selected = 'Categories')}">
							Categories
						</button>

						<hr class="w-full" />
					{/if}

					{#if allAges?.length > 0}
						<button
							class="border-l-4 p-3 text-left text-sm font-semibold tracking-wide flex items-center gap-1 justify-between focus:outline-none
						{selected === 'Age'
								? 'text-primary-500 border-primary-500 bg-white'
								: 'border-zinc-100 bg-transparent'}"
							on:click="{() => (selected = 'Age')}">
							<span> Age </span>

							{#if fl.age?.length}
								<div class="h-1.5 w-1.5 rounded-full bg-primary-500"></div>
							{/if}
						</button>

						<hr class="w-full" />
					{/if}

					{#if allAttributes?.length > 0}
						{#each allAttributes as attribute, ix (attribute.key)}
							{#if attribute.key !== 'options'}
								<button
									class="border-l-4 p-3 text-left text-sm font-semibold tracking-wide flex items-center gap-1 justify-between capitalize focus:outline-none
										{selected === attribute.key
										? 'text-primary-500 border-primary-500 bg-white'
										: 'border-zinc-100 bg-transparent'}"
									on:click="{() => (selected = attribute.key)}">
									<span> {attribute.key.replace(/_/g, ' ')} </span>

									{#if fl[attribute.key]?.length}
										<div class="h-1.5 w-1.5 rounded-full bg-primary-500 shrink-0"></div>
									{/if}
								</button>

								<hr class="w-full" />
							{/if}
						{/each}
					{/if}

					{#if allBrands?.length > 0}
						<button
							class="border-l-4 p-3 text-left text-sm font-semibold tracking-wide flex items-center gap-1 justify-between focus:outline-none
						{selected === 'Brands'
								? 'text-primary-500 border-primary-500 bg-white'
								: 'border-zinc-100 bg-transparent'}"
							on:click="{() => (selected = 'Brands')}">
							<span>Brands</span>

							{#if fl.brands?.length}
								<div class="h-1.5 w-1.5 rounded-full bg-primary-500"></div>
							{/if}
						</button>

						<hr class="w-full" />
					{/if}

					{#if allColors?.length > 0}
						<button
							class="border-l-4 p-3 text-left text-sm font-semibold tracking-wide flex items-center gap-1 justify-between focus:outline-none
						{selected === 'Colors'
								? 'text-primary-500 border-primary-500 bg-white'
								: 'border-zinc-100 bg-transparent'}"
							on:click="{() => (selected = 'Colors')}">
							<span>Colors</span>

							{#if fl.colors?.length}
								<div class="h-1.5 w-1.5 rounded-full bg-primary-500"></div>
							{/if}
						</button>

						<hr class="w-full" />
					{/if}

					{#if allDiscount?.length > 1}
						<button
							class="border-l-4 p-3 text-left text-sm font-semibold tracking-wide flex items-center gap-1 justify-between focus:outline-none
						{selected === 'Discount'
								? 'text-primary-500 border-primary-500 bg-white'
								: 'border-zinc-100 bg-transparent'}"
							on:click="{() => (selected = 'Discount')}">
							<span> Discount </span>

							{#if fl.discount?.length}
								<div class="h-1.5 w-1.5 rounded-full bg-primary-500"></div>
							{/if}
						</button>

						<hr class="w-full" />
					{/if}

					{#if allFeatures?.length > 0}
						<button
							class="border-l-4 p-3 text-left text-sm font-semibold tracking-wide flex items-center gap-1 justify-between focus:outline-none
						{selected === 'Features'
								? 'text-primary-500 border-primary-500 bg-white'
								: 'border-zinc-100 bg-transparent'}"
							on:click="{() => (selected = 'Features')}">
							<span> Features </span>

							{#if fl.features?.length}
								<div class="h-1.5 w-1.5 rounded-full bg-primary-500"></div>
							{/if}
						</button>

						<hr class="w-full" />
					{/if}

					{#if allGenders?.length > 0}
						<button
							class="border-l-4 p-3 text-left text-sm font-semibold tracking-wide flex items-center gap-1 justify-between focus:outline-none
						{selected === 'Genders'
								? 'text-primary-500 border-primary-500 bg-white'
								: 'border-zinc-100 bg-transparent'}"
							on:click="{() => (selected = 'Genders')}">
							<span> Genders </span>

							{#if fl.genders?.length}
								<div class="h-1.5 w-1.5 rounded-full bg-primary-500"></div>
							{/if}
						</button>

						<hr class="w-full" />
					{/if}

					{#if allMaterials?.length > 0}
						<button
							class="border-l-4 p-3 text-left text-sm font-semibold tracking-wide flex items-center gap-1 justify-between focus:outline-none
						{selected === 'Materials'
								? 'text-primary-500 border-primary-500 bg-white'
								: 'border-zinc-100 bg-transparent'}"
							on:click="{() => (selected = 'Materials')}">
							<span> Materials </span>

							{#if fl.materials?.length}
								<div class="h-1.5 w-1.5 rounded-full bg-primary-500"></div>
							{/if}
						</button>

						<hr class="w-full" />
					{/if}

					{#if allPromotions?.length > 0}
						<button
							class="border-l-4 p-3 text-left text-sm font-semibold tracking-wide flex items-center gap-1 justify-between focus:outline-none
						{selected === 'Promotions'
								? 'text-primary-500 border-primary-500 bg-white'
								: 'border-zinc-100 bg-transparent'}"
							on:click="{() => (selected = 'Promotions')}">
							<span> Promotions </span>

							{#if fl.promotions?.length}
								<div class="h-1.5 w-1.5 rounded-full bg-primary-500"></div>
							{/if}
						</button>

						<hr class="w-full" />
					{/if}

					{#if allSizes?.length > 0}
						<button
							class="border-l-4 p-3 text-left text-sm font-semibold tracking-wide flex items-center gap-1 justify-between focus:outline-none
						{selected === 'Sizes'
								? 'text-primary-500 border-primary-500 bg-white'
								: 'border-zinc-100 bg-transparent'}"
							on:click="{() => (selected = 'Sizes')}">
							<span> Sizes </span>

							{#if fl.sizes?.length}
								<div class="h-1.5 w-1.5 rounded-full bg-primary-500"></div>
							{/if}
						</button>

						<hr class="w-full" />
					{/if}

					{#if allTags?.length > 0}
						<button
							class="border-l-4 p-3 text-left text-sm font-semibold tracking-wide flex items-center gap-1 justify-between focus:outline-none
						{selected === 'Tags'
								? 'text-primary-500 border-primary-500 bg-white'
								: 'border-zinc-100 bg-transparent'}"
							on:click="{() => (selected = 'Tags')}">
							<span> Tags </span>

							{#if fl.tags?.length}
								<div class="h-1.5 w-1.5 rounded-full bg-primary-500"></div>
							{/if}
						</button>

						<hr class="w-full" />
					{/if}

					{#if allTypes?.length > 0}
						<button
							class="border-l-4 p-3 text-left text-sm font-semibold tracking-wide flex items-center gap-1 justify-between focus:outline-none
						{selected === 'Types'
								? 'text-primary-500 border-primary-500 bg-white'
								: 'border-zinc-100 bg-transparent'}"
							on:click="{() => (selected = 'Types')}">
							<span> Types </span>

							{#if fl.types?.length}
								<div class="h-1.5 w-1.5 rounded-full bg-primary-500"></div>
							{/if}
						</button>

						<hr class="w-full" />
					{/if}

					{#if allVendors?.length > 0}
						<button
							class="border-l-4 p-3 text-left text-sm font-semibold tracking-wide flex items-center gap-1 justify-between focus:outline-none
						{selected === 'Vendors'
								? 'text-primary-500 border-primary-500 bg-white'
								: 'border-zinc-100 bg-transparent'}"
							on:click="{() => (selected = 'Vendors')}">
							<span> Vendors </span>

							{#if fl.types?.length}
								<div class="h-1.5 w-1.5 rounded-full bg-primary-500"></div>
							{/if}
						</button>

						<hr class="w-full" />
					{/if}

					<!-- {#if facets?.all_aggs?.price?.all?.buckets?.length > 0}
						<button
							class="border-l-4 p-3 text-left text-sm font-semibold tracking-wide flex items-center gap-1 justify-between focus:outline-none
						{selected === 'Price'
								? 'text-primary-500 border-primary-500 bg-white'
								: 'border-zinc-100 bg-transparent'}"
							on:click={() => (selected = 'Price')}>
							<span> Price </span>

							{#if fl.price?.length}
								<div class="h-1.5 w-1.5 rounded-full bg-primary-500"></div>
							{/if}
						</button>

						<hr class="w-full" />
					{/if} -->
				</div>

				<!-- Right Section -->

				<div class="h-full w-4/6">
					{#if selected === 'Prices'}
						<div
							class="h-[93vh] w-full overflow-y-auto p-4 overflow-x-hidden"
							in:fly="{{ y: -10, duration: 300, delay: 300 }}">
							{#if priceRange?.length > 0}
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
							{/if}
						</div>
					{/if}

					{#if selected === 'Categories'}
						<div
							class="h-[93vh] w-full overflow-y-auto p-4 overflow-x-hidden"
							in:fly="{{ y: -10, duration: 300, delay: 300 }}">
							<div
								class="relative mb-3 h-8 w-full rounded-full border bg-zinc-100 transition duration-300">
								<input
									type="search"
									id="CategoriesSearchText"
									placeholder="Search for categories"
									class="h-8 w-full truncate rounded-full bg-transparent py-2 pl-4 pr-10 text-sm focus:outline-none"
									bind:value="{searchCategoryValue}"
									on:input="{searchCategories}" />

								<button
									type="button"
									class="absolute inset-y-0 right-2 z-20 flex items-center justify-center text-zinc-500 focus:outline-none"
									on:click="{handleSearchBox}">
									{#if !showSearchBox}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-4 w-4"
											viewBox="0 0 20 20"
											fill="currentColor">
											<path
												fill-rule="evenodd"
												d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
												clip-rule="evenodd"></path>
										</svg>
									{:else}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-4 w-4"
											viewBox="0 0 20 20"
											fill="currentColor">
											<path
												fill-rule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clip-rule="evenodd"></path>
										</svg>
									{/if}
								</button>
							</div>

							<ul class="flex cursor-pointer flex-col">
								{#if megamenuResult?.length}
									<!-- 1st level categories -->

									<ul class="flex w-full cursor-pointer flex-col">
										{#each megamenuResult as m, mx}
											<li>
												{#if m.children?.length}
													<div
														class="flex w-full items-center justify-between gap-2
													{selectedCategory === m.name ? 'text-blue-600 font-medium' : 'hover:text-blue-600'}">
														<a
															href="{navigateToProperPath(m.link || m.slug, $page.data.origin)}"
															aria-label="Click to visit category related products page"
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
														href="{navigateToProperPath(m.link || m.slug, $page.data.origin)}"
														aria-label="Click to visit category related products page"
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
								{/if}
							</ul>
						</div>
					{/if}

					{#if selected === 'Age'}
						<div
							class="h-[93vh] w-full overflow-y-auto p-4 overflow-x-hidden"
							in:fly="{{ y: -10, duration: 300, delay: 300 }}">
							{#if allAges?.length > 0}
								<CheckboxEs
									items="{allAges}"
									model="age"
									selectedItems="{fl.age || []}"
									showSearchBox
									on:go="{goCheckbox}" />
							{/if}
						</div>
					{/if}

					{#if allAttributes?.length > 0}
						{#each allAttributes as attribute}
							{#if selected === attribute.key}
								<div
									class="h-[93vh] w-full overflow-y-auto p-4 overflow-x-hidden"
									in:fly="{{ y: -10, duration: 300, delay: 300 }}">
									{#if attribute.value?.buckets?.length > 0}
										<CheckboxEs
											items="{attribute.value?.buckets}"
											model="{attribute.key}"
											selectedItems="{fl[attribute.key] || []}"
											showSearchBox
											on:go="{goCheckbox}" />
									{/if}
								</div>
							{/if}
						{/each}
					{/if}

					{#if selected === 'Brands'}
						<div
							class="h-[93vh] w-full overflow-y-auto p-4 overflow-x-hidden"
							in:fly="{{ y: -10, duration: 300, delay: 300 }}">
							{#if allBrands?.length > 0}
								<CheckboxEs
									items="{allBrands}"
									model="brands"
									selectedItems="{fl.brands || []}"
									showSearchBox
									on:go="{goCheckbox}" />
							{/if}
						</div>
					{/if}

					{#if selected === 'Colors'}
						<div
							class="h-[93vh] w-full overflow-y-auto p-4 overflow-x-hidden"
							in:fly="{{ y: -10, duration: 300, delay: 300 }}">
							{#if allColors?.length > 0}
								<CheckboxEs
									isColor
									items="{allColors}"
									model="colors"
									selectedItems="{fl.colors || []}"
									showSearchBox
									on:go="{goCheckbox}" />
							{/if}
						</div>
					{/if}

					{#if selected === 'Discount'}
						<div
							class="h-[93vh] w-full overflow-y-auto p-4 overflow-x-hidden"
							in:fly="{{ y: -10, duration: 300, delay: 300 }}">
							{#if allDiscount?.length > 1}
								<RadioEs
									items="{allDiscount}"
									model="discount"
									selectedItems="{fl.discount || []}"
									on:go="{goCheckbox}" />
							{/if}
						</div>
					{/if}

					{#if selected === 'Features'}
						<div
							class="h-[93vh] w-full overflow-y-auto p-4 overflow-x-hidden"
							in:fly="{{ y: -10, duration: 300, delay: 300 }}">
							{#if allFeatures?.length > 0}
								<CheckboxEs
									items="{allFeatures}"
									model="features"
									selectedItems="{fl.features || []}"
									showSearchBox
									on:go="{goCheckbox}" />
							{/if}
						</div>
					{/if}

					{#if selected === 'Genders'}
						<div
							class="h-[93vh] w-full overflow-y-auto p-4 overflow-x-hidden"
							in:fly="{{ y: -10, duration: 300, delay: 300 }}">
							{#if allGenders?.length > 0}
								<CheckboxEs
									items="{allGenders}"
									model="genders"
									selectedItems="{fl.genders || []}"
									showSearchBox
									on:go="{goCheckbox}" />
							{/if}
						</div>
					{/if}

					{#if selected === 'Materials'}
						<div
							class="h-[93vh] w-full overflow-y-auto p-4 overflow-x-hidden"
							in:fly="{{ y: -10, duration: 300, delay: 300 }}">
							{#if allMaterials?.length > 0}
								<CheckboxEs
									items="{allMaterials}"
									model="materials"
									selectedItems="{fl.materials || []}"
									showSearchBox
									on:go="{goCheckbox}" />
							{/if}
						</div>
					{/if}

					{#if selected === 'Promotions'}
						<div
							class="h-[93vh] w-full overflow-y-auto p-4 overflow-x-hidden"
							in:fly="{{ y: -10, duration: 300, delay: 300 }}">
							{#if allPromotions?.length > 0}
								<CheckboxEs
									items="{allPromotions}"
									model="promotions"
									selectedItems="{fl.promotions || []}"
									showSearchBox
									on:go="{goCheckbox}" />
							{/if}
						</div>
					{/if}

					{#if selected === 'Sizes'}
						<div
							class="h-[93vh] w-full overflow-y-auto p-4 overflow-x-hidden"
							in:fly="{{ y: -10, duration: 300, delay: 300 }}">
							{#if allSizes?.length > 0}
								<CheckboxEs
									items="{allSizes}"
									model="sizes"
									selectedItems="{fl.sizes || []}"
									showSearchBox
									on:go="{goCheckbox}" />
							{/if}
						</div>
					{/if}

					{#if selected === 'Tags'}
						<div
							class="h-[93vh] w-full overflow-y-auto p-4 overflow-x-hidden"
							in:fly="{{ y: -10, duration: 300, delay: 300 }}">
							{#if allTags?.length > 0}
								<CheckboxEs
									items="{allTags}"
									model="tags"
									selectedItems="{fl.tags || []}"
									showSearchBox
									on:go="{goCheckbox}" />
							{/if}
						</div>
					{/if}

					{#if selected === 'Types'}
						<div
							class="h-[93vh] w-full overflow-y-auto p-4 overflow-x-hidden"
							in:fly="{{ y: -10, duration: 300, delay: 300 }}">
							{#if allTypes?.length > 0}
								<CheckboxEs
									items="{allTypes}"
									model="types"
									selectedItems="{fl.types || []}"
									showSearchBox
									on:go="{goCheckbox}" />
							{/if}
						</div>
					{/if}

					{#if selected === 'Vendors'}
						<div
							class="h-[93vh] w-full overflow-y-auto p-4 overflow-x-hidden"
							in:fly="{{ y: -10, duration: 300, delay: 300 }}">
							{#if allVendors?.length > 0}
								<CheckboxEs
									items="{allVendors}"
									model="vendors"
									selectedItems="{fl.vendors || []}"
									showSearchBox
									on:go="{goCheckbox}" />
							{/if}
						</div>
					{/if}

					<!-- {#if selected === 'Price'}
						<div
							class="h-[93vh] w-full overflow-y-auto p-4 overflow-x-hidden"
							in:fly={{ y: -10, duration: 300, delay: 300 }}>
							{#if facets?.all_aggs?.price?.all?.buckets?.length > 0}
								<CheckboxEs
									items={facets?.all_aggs?.price?.all?.buckets}
									model="price"
									selectedItems={fl.price || []}
									showSearchBox
									on:go={goCheckbox} />
							{/if}
						</div>
					{/if} -->
				</div>
			</div>

			<!-- Close and Apply button -->

			<!-- <div
				class="absolute inset-x-0 bottom-0 z-[100] flex items-center divide-x-2 divide-zinc-200 border-2 border-zinc-200 bg-white">
				<button
					type="button"
					class="w-1/2 p-3 font-bold tracking-wide text-center focus:outline-none"
					on:click={() => (showFilter = false)}>
					Cancel
				</button>

				<button
					type="button"
					class="w-1/2 p-3 font-bold tracking-wide text-center focus:outline-none"
					on:click={() => (showFilter = false)}>
					Apply
				</button>
			</div> -->
		</div>
	{/if}
</div>
