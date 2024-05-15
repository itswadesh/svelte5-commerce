<style>
.minimum-width-rem {
	min-width: 360px;
}
</style>

<script lang="ts">
import { Autocomplete, AutosuggestModal, MegaMenu, LazyImg } from '$lib/components'
import { browser } from '$app/environment'
import { cartStore } from '$lib/store/cart'
import { createEventDispatcher, onMount } from 'svelte'
import { cubicOut } from 'svelte/easing'
import { fade, slide } from 'svelte/transition'
import { getMegamenuFromStore } from '$lib/store/megamenu'
import { getMenuFromStore } from '$lib/store/menu'
import { goto, invalidateAll } from '$app/navigation'
import { logo } from '$lib/config'
import { navigateToProperPath, toast } from '$lib/utils'
import { page } from '$app/stores'
import Cookie from 'cookie-universal'
import menu from '../../config/menu'
import { enhance } from '$app/forms'

const dispatch = createEventDispatcher()
const cookies = Cookie()

export let data
export let openSidebar: boolean
export let showCartSidebar: boolean

let clazz = ''
export { clazz as class }

export function convertParagraphs(node) {
	const paragraphs = node.querySelectorAll('p')

	paragraphs.forEach((paragraph) => {
		const span = document.createElement('span')
		span.innerHTML = paragraph.innerHTML
		paragraph.parentNode.replaceChild(span, paragraph)
	})
}

let hellobar = data.store?.hellobar || {}
let megamenu
let navMenu = []
let notReachedYLastPoint = true
let pin = ''
let q = ''
let selectedCategory
let selectedCategory2
let show = false
let showDropdownAccount = false
let showMiniNavSearch = false
let showPincodeInputBox = false
let showSubCategory = []
let showSubCategory2 = []

$: cart = {}
$: y = 0

$: if (y >= 48) {
	notReachedYLastPoint = false
} else {
	notReachedYLastPoint = true
}

onMount(async () => {
	q = $page.url.searchParams.get('q')
	// const response = await fetch('/server/cart')
	// cart = await response.json()

	pin = cookies.get('zip')

	if (browser) {
		// storeStore.subscribe((value) => (store = value))
		cartStore.subscribe((value) => {
			cart = value
		})
	}

	const menuRes = await getMenuFromStore({
		origin: $page.data.origin,
		storeId: data?.store?.id
	})

	// Filter "nav" items
	navMenu = menuRes
		?.filter((menu) => menu.menu_id === 'nav')
		.flatMap((menu) => menu.items)[0]?.items

	await getMegaMenu()
})

function slideFade(node, params) {
	const existingTransform = getComputedStyle(node).transform.replace('none', '')

	return {
		delay: params.delay || 0,
		duration: params.duration || 400,
		easing: params.easing || cubicOut,
		css: (t, u) =>
			`transform-origin: top left; transform: ${existingTransform} scaleX(${t}); opacity: ${t};`
	}
}

async function onSearchSubmit({ detail }) {
	let newUrl

	if (detail.type === 'category') {
		const u = new URL(`/${detail.slug}`, $page.data.origin)
		newUrl = u.toString()
	} else {
		const u = new URL('/search', $page.data.origin)
		u.searchParams.set('q', detail?.name)
		newUrl = u.toString()
	}

	goto(newUrl)
	dispatch('search', detail)
}

async function getMegaMenu() {
	if (browser && !$page.data.isDesktop) {
		try {
			megamenu = await getMegamenuFromStore({
				storeId: data?.store?.id,
				origin: $page.data.origin
			})
		} catch (e) {
			toast(e, 'error')
		} finally {
		}
	} else {
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

<svelte:window bind:scrollY="{y}" />

<nav
	class="{clazz} minimum-width-rem sticky inset-x-0 top-0 lg:-top-[48px] w-full border-b bg-white shadow-xs
	{showCartSidebar ? 'z-50 ' : 'z-40 delay-500'}
	{notReachedYLastPoint ? 'opacity-100' : 'opacity-90'}">
	<!-- hellobar -->

	<div transition:slide="{{ duration: 300 }}" class="hidden lg:block">
		{#if hellobar?.active?.val}
			<div class="flex justify-between items-center w-full bg-surface-500 text-white px-10">
				<div>
					{#if data.store?.socialSharingButtons || data.store?.email}
						<ul class="col-span-1 justify-center flex flex-wrap gap-2">
							{#if data.store?.socialSharingButtons?.facebook?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.facebook?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for facebook link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path
												d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"
											></path>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Instagram -->

							{#if data.store?.socialSharingButtons?.instagram?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.instagram?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for instagram link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<rect x="4" y="4" width="16" height="16" rx="4"></rect>
											<circle cx="12" cy="12" r="3"></circle>
											<line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Linkedin -->

							{#if data.store?.socialSharingButtons?.linkedin?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.linkedin?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for linkedin link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<rect x="4" y="4" width="16" height="16" rx="2"></rect>
											<line x1="8" y1="11" x2="8" y2="16"></line>
											<line x1="8" y1="8" x2="8" y2="8.01"></line>
											<line x1="12" y1="16" x2="12" y2="11"></line>
											<path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Pinterest -->

							{#if data.store?.socialSharingButtons?.pinterest?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.pinterest?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for pinterest link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<line x1="8" y1="20" x2="12" y2="11"></line>
											<path
												d="M10.7 14c.437 1.263 1.43 2 2.55 2c2.071 0 3.75 -1.554 3.75 -4a5 5 0 1 0 -9.7 1.7"
											></path>
											<circle cx="12" cy="12" r="9"></circle>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Reddit -->

							{#if data.store?.socialSharingButtons?.reddit?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.reddit?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for reddit link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path
												d="M12 8c2.648 0 5.028 .826 6.675 2.14a2.5 2.5 0 0 1 2.326 4.36c0 3.59 -4.03 6.5 -9 6.5c-4.875 0 -8.845 -2.8 -9 -6.294l-1 -.206a2.5 2.5 0 0 1 2.326 -4.36c1.646 -1.313 4.026 -2.14 6.674 -2.14z"
											></path>
											<path d="M12 8l1 -5l6 1"></path>
											<path d="M19 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
											<circle cx="9" cy="13" r=".5" fill="currentColor"></circle>
											<circle cx="15" cy="13" r=".5" fill="currentColor"></circle>
											<path d="M10 17c.667 .333 1.333 .5 2 .5s1.333 -.167 2 -.5"></path>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Snapchat -->

							{#if data.store?.socialSharingButtons?.snapchat?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.snapchat?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for snapchat link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path
												d="M16.882 7.842a4.882 4.882 0 0 0 -9.764 0c0 4.273 -.213 6.409 -4.118 8.118c2 .882 2 .882 3 3c3 0 4 2 6 2s3 -2 6 -2c1 -2.118 1 -2.118 3 -3c-3.906 -1.709 -4.118 -3.845 -4.118 -8.118zm-13.882 8.119c4 -2.118 4 -4.118 1 -7.118m17 7.118c-4 -2.118 -4 -4.118 -1 -7.118"
											></path>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Telegram -->

							{#if data.store?.socialSharingButtons?.telegram?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.telegram?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for telegram link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Twitter -->

							{#if data.store?.socialSharingButtons?.twitter?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.twitter?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for twitter link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path
												d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"
											></path>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Whatsapp -->

							{#if data.store?.socialSharingButtons?.whatsapp?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.whatsapp?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for whatsapp link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path
												d="M16.882 7.842a4.882 4.882 0 0 0 -9.764 0c0 4.273 -.213 6.409 -4.118 8.118c2 .882 2 .882 3 3c3 0 4 2 6 2s3 -2 6 -2c1 -2.118 1 -2.118 3 -3c-3.906 -1.709 -4.118 -3.845 -4.118 -8.118zm-13.882 8.119c4 -2.118 4 -4.118 1 -7.118m17 7.118c-4 -2.118 -4 -4.118 -1 -7.118"
											></path>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Youtube -->

							{#if data.store?.socialSharingButtons?.youtube?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.youtube?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for youtube link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<rect x="3" y="5" width="18" height="14" rx="4"></rect>
											<path d="M10 9l5 3l-5 3z"></path>
										</svg>
									</a>
								</li>
							{/if}

							{#if data.store?.email}
								<li class="max-w-max">
									<a
										href="mailto:{data.store?.email}"
										aria-label="Click to contact with mail id"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<rect x="3" y="5" width="18" height="14" rx="2"></rect>
											<polyline points="3 7 12 13 21 7"></polyline>
										</svg>
									</a>
								</li>
							{/if}
						</ul>
					{/if}
				</div>
				<div
					use:convertParagraphs
					class="h-12 text-sm text-center flex items-center justify-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="h-5 w-5">
						<g id="gem">
							<path
								d="M96.79,33.16s0-.09.07-.14a2,2,0,0,0,.07-.23l0-.13a1.5,1.5,0,0,0,0-.37h0v0c0-.11,0-.21,0-.32l0-.14a1.72,1.72,0,0,0-.07-.21,1,1,0,0,0-.07-.15l-.09-.18-.1-.14a.24.24,0,0,0-.06-.08l-15-18.2A2,2,0,0,0,80,12.1H20.24l-.25,0-.16,0-.24.08-.15.06-.22.14-.13.08,0,0a1.39,1.39,0,0,0-.21.21.34.34,0,0,0-.06.06h0L3.47,31l-.07.09-.09.14a1.14,1.14,0,0,0-.1.19.61.61,0,0,0-.07.14,1.87,1.87,0,0,0-.07.22l0,.13a1.64,1.64,0,0,0,0,.38H3v0a2.21,2.21,0,0,0,0,.35l0,.13a1.42,1.42,0,0,0,.07.22,1,1,0,0,0,.07.15,1.62,1.62,0,0,0,.1.18l.09.14.07.09L48.27,87.1a1.94,1.94,0,0,0,.92.61,2,2,0,0,0,.81.19,2,2,0,0,0,1.93-1.46v0L96.53,33.58a.61.61,0,0,1,.07-.1l.09-.13A1.74,1.74,0,0,0,96.79,33.16ZM20.29,17.24,30.82,30.29H9.3ZM54.13,16.1H75.49L64.69,29.47Zm6.1,14.19H39l11-13ZM34.89,29,24.51,16.1H45.7Zm-1.3,5.34L45.66,77.75,9.28,34.29Zm4.15,0H62.26L50,78.43ZM79.86,17.06l10.9,13.23H69.18ZM66.41,34.29H90.69L54.51,77.15Z">
							</path>
						</g>
					</svg>
					{@html hellobar.content?.val}
				</div>
				<div>test</div>
			</div>
		{/if}

		<!-- Social media, store phone, email, and legal pages links -->

		<!-- <div class="px-3 sm:px-10 bg-primary-700">
			<div class="h-14 flex items-center justify-between gap-4">
				<div class="flex items-center gap-4">
					{#if data.store?.socialSharingButtons || data.store?.email}
						<ul class="col-span-1 justify-center flex flex-wrap gap-2">
							{#if data.store?.socialSharingButtons?.facebook?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.facebook?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for facebook link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path
												d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"
											></path>
										</svg>
									</a>
								</li>
							{/if}
							{#if data.store?.socialSharingButtons?.instagram?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.instagram?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for instagram link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<rect x="4" y="4" width="16" height="16" rx="4"></rect>
											<circle cx="12" cy="12" r="3"></circle>
											<line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line>
										</svg>
									</a>
								</li>
							{/if}
							{#if data.store?.socialSharingButtons?.linkedin?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.linkedin?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for linkedin link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<rect x="4" y="4" width="16" height="16" rx="2"></rect>
											<line x1="8" y1="11" x2="8" y2="16"></line>
											<line x1="8" y1="8" x2="8" y2="8.01"></line>
											<line x1="12" y1="16" x2="12" y2="11"></line>
											<path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
										</svg>
									</a>
								</li>
							{/if}
							{#if data.store?.socialSharingButtons?.pinterest?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.pinterest?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for pinterest link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<line x1="8" y1="20" x2="12" y2="11"></line>
											<path
												d="M10.7 14c.437 1.263 1.43 2 2.55 2c2.071 0 3.75 -1.554 3.75 -4a5 5 0 1 0 -9.7 1.7"
											></path>
											<circle cx="12" cy="12" r="9"></circle>
										</svg>
									</a>
								</li>
							{/if}
						{#if data.store?.socialSharingButtons?.reddit?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.reddit?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for reddit link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path
												d="M12 8c2.648 0 5.028 .826 6.675 2.14a2.5 2.5 0 0 1 2.326 4.36c0 3.59 -4.03 6.5 -9 6.5c-4.875 0 -8.845 -2.8 -9 -6.294l-1 -.206a2.5 2.5 0 0 1 2.326 -4.36c1.646 -1.313 4.026 -2.14 6.674 -2.14z"
											></path>
											<path d="M12 8l1 -5l6 1"></path>
											<path d="M19 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
											<circle cx="9" cy="13" r=".5" fill="currentColor"></circle>
											<circle cx="15" cy="13" r=".5" fill="currentColor"></circle>
											<path d="M10 17c.667 .333 1.333 .5 2 .5s1.333 -.167 2 -.5"></path>
										</svg>
									</a>
								</li>
							{/if}
							{#if data.store?.socialSharingButtons?.snapchat?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.snapchat?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for snapchat link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path
												d="M16.882 7.842a4.882 4.882 0 0 0 -9.764 0c0 4.273 -.213 6.409 -4.118 8.118c2 .882 2 .882 3 3c3 0 4 2 6 2s3 -2 6 -2c1 -2.118 1 -2.118 3 -3c-3.906 -1.709 -4.118 -3.845 -4.118 -8.118zm-13.882 8.119c4 -2.118 4 -4.118 1 -7.118m17 7.118c-4 -2.118 -4 -4.118 -1 -7.118"
											></path>
										</svg>
									</a>
								</li>
							{/if}
							{#if data.store?.socialSharingButtons?.telegram?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.telegram?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for telegram link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path>
										</svg>
									</a>
								</li>
							{/if}

							{#if data.store?.socialSharingButtons?.twitter?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.twitter?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for twitter link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path
												d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"
											></path>
										</svg>
									</a>
								</li>
							{/if}



							{#if data.store?.socialSharingButtons?.whatsapp?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.whatsapp?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for whatsapp link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path
												d="M16.882 7.842a4.882 4.882 0 0 0 -9.764 0c0 4.273 -.213 6.409 -4.118 8.118c2 .882 2 .882 3 3c3 0 4 2 6 2s3 -2 6 -2c1 -2.118 1 -2.118 3 -3c-3.906 -1.709 -4.118 -3.845 -4.118 -8.118zm-13.882 8.119c4 -2.118 4 -4.118 1 -7.118m17 7.118c-4 -2.118 -4 -4.118 -1 -7.118"
											></path>
										</svg>
									</a>
								</li>
							{/if}



							{#if data.store?.socialSharingButtons?.youtube?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.youtube?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for youtube link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<rect x="3" y="5" width="18" height="14" rx="4"></rect>
											<path d="M10 9l5 3l-5 3z"></path>
										</svg>
									</a>
								</li>
							{/if}



							{#if data.store?.email}
								<li class="max-w-max">
									<a
										href="mailto:{data.store?.email}"
										aria-label="Click to contact with mail id"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<rect x="3" y="5" width="18" height="14" rx="2"></rect>
											<polyline points="3 7 12 13 21 7"></polyline>
										</svg>
									</a>
								</li>
							{/if}
						</ul>
					{/if}



					{#if data.store?.email}
						<a
							href="mailto:{data.store?.email}"
							aria-label="Click to visit login"
							class="text-zinc-200 hover:text-white transiton duration-300 focus:outline-none"
							data-sveltekit-preload-data>
							{data.store?.email}
						</a>
					{/if}



					{#if data.store?.phone}
						<a
							href="tel:+{data.store?.phone}"
							aria-label="Click to visit login"
							class="text-zinc-200 hover:text-white transiton duration-300 focus:outline-none"
							data-sveltekit-preload-data>
							{data.store?.phone}
						</a>
					{/if}
				</div>

				{#if navMenu?.length}
					<ul class="flex items-center gap-4 flex-wrap">
						{#each navMenu as menuItem}
							<li>
								<a
									href="{menuItem?.link}"
									class="block text-zinc-200 hover:text-white transiton duration-300 focus:outline-none">
									{menuItem.name}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div> -->
	</div>
	<!-- Menu mobile -->
	<div
		class="px-3 sm:px-10 border-b-[1px] border-surface-100 flex justify-between items-center h-16">
		<div class="flex gap-4">
			<button
				aria-label="Sidebar"
				type="button"
				class="focus:outline-none text-zinc-200 hover:text-white transition duration-300 block lg:hidden"
				on:click="{() => (openSidebar = true)}">
				<!-- Mobile Hamburger Menu Icon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="#333333"
					class="h-6 w-6">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
				</svg>
			</button>
			<!-- Search -->
			<button
				type="button"
				aria-label="Click to search quizzes, videos, notes etc..."
				class="text-zinc-200 hover:text-white transition duration-300 focus:outline-none"
				on:click="{() => (showMiniNavSearch = !showMiniNavSearch)}">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="#333333"
					class="w-6 h-6">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z">
					</path>
				</svg>
			</button>
		</div>
		<!-- Site Logo -->
		<a href="/" aria-label="Go to home" class="block shrink-0">
			{#if data.store?.logo}
				<LazyImg
					src="{data.store?.logo}"
					alt="logo"
					height="64"
					width="96"
					aspect_ratio="4:1"
					class="w-auto object-contain object-left transition duration-300 {notReachedYLastPoint
						? 'max-h-16'
						: 'max-h-6'}" />
			{:else if data.store?.websiteName}
				<h2
					class="bg-gradient-to-b from-primary-500 to-zinc-500 bg-clip-text text-transparent truncate w-40 sm:w-auto sm:max-w-sm">
					{data.store?.websiteName}
				</h2>
			{:else}
				<img src="{logo}" alt="logo" class="max-h-16 w-auto object-contain object-left" />
			{/if}
		</a>
		<div class="flex gap-4">
			<!-- Profile/Login -->
			<a
				href="{data.me?.active ? '/my/profile' : $page.data.loginUrl || '/auth/login'}?ref={$page
					?.url?.pathname}{$page?.url?.search}"
				aria-label="{data.me?.active ? 'Click to visit profile' : 'Click to visit login'}"
				title="{data.me?.active ? 'Click to visit profile' : 'Click to visit login'}"
				data-sveltekit-preload-data
				class="block text-zinc-200 hover:text-white transition duration-300">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="#333333"
					class="w-6 h-6">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
					></path>
				</svg>
			</a>
			<!-- Cart -->
			<a
				href="/cart"
				class="relative text-zinc-200 hover:text-white transition duration-300 focus:outline-none"
				aria-label="Click to visit cart"
				data-sveltekit-preload-data>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="#333333"
					class="w-6 h-6">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
					></path>
				</svg>

				{#if cart?.qty > 0}
					<div
						class="absolute -top-2 -right-1.5 flex items-center justify-center rounded-full bg-white py-[0.8px] px-[5px] text-center text-xs font-bold uppercase text-primary-500">
						{cart?.qty}
					</div>
				{/if}
			</a>
		</div>
	</div>

	<div class="hidden lg:flex justify-center items-center border-b-[1px] border-usrface-100 h-16">
		<MegaMenu />
	</div>
	<!-- <div
		class="px-3 sm:px-10 flex items-center justify-center bg-primary-500 shadow-md
		{notReachedYLastPoint ? 'h-16' : 'h-16 sm:h-20'}">
		<div class="container mx-auto w-full max-w-6xl">
			<div class="flex items-center justify-between gap-4">

				<button
					aria-label="Sidebar"
					type="button"
					class="focus:outline-none text-zinc-200 hover:text-white transition duration-300 block lg:hidden"
					on:click="{() => (openSidebar = true)}">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
					</svg>
				</button>
				<a href="/" aria-label="Go to home" class="block shrink-0">
					{#if data.store?.logo}
						<LazyImg
							src="{data.store?.logo}"
							alt="logo"
							height="64"
							width="96"
							aspect_ratio="4:1"
							class="w-auto object-contain object-left transition duration-300
							{notReachedYLastPoint ? 'max-h-16' : 'max-h-6'}" />
					{:else if data.store?.websiteName}
						<h2
							class="bg-gradient-to-b from-primary-500 to-zinc-500 bg-clip-text text-transparent truncate w-40 sm:w-auto sm:max-w-sm">
							{data.store?.websiteName}
						</h2>
					{:else}
						<img src="{logo}" alt="logo" class="max-h-16 w-auto object-contain object-left" />
					{/if}
				</a>


				<div class="hidden lg:flex items-center gap-4">
					<MegaMenu class="{notReachedYLastPoint ? 'h-16' : 'h-16 sm:h-20'}" />
				</div>

				<div class="flex items-center gap-4">

					<button
						type="button"
						aria-label="Click to search quizzes, videos, notes etc..."
						class="text-zinc-200 hover:text-white transition duration-300 focus:outline-none"
						on:click="{() => (showMiniNavSearch = !showMiniNavSearch)}">
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
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z">
							</path>
						</svg>
					</button>

					<a
						href="/cart"
						class="relative text-zinc-200 hover:text-white transition duration-300 focus:outline-none"
						aria-label="Click to visit cart"
						data-sveltekit-preload-data>
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
								d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
							></path>
						</svg>

						{#if cart?.qty > 0}
							<div
								class="absolute -top-2 -right-1.5 flex items-center justify-center rounded-full bg-white py-[0.8px] px-[5px] text-center text-xs font-bold uppercase text-primary-500">
								{cart?.qty}
							</div>
						{/if}
					</a>

					<a
						href="{data.me?.active
							? '/my/profile'
							: $page.data.loginUrl || '/auth/login'}?ref={$page?.url?.pathname}{$page?.url
							?.search}"
						aria-label="{data.me?.active ? 'Click to visit profile' : 'Click to visit login'}"
						title="{data.me?.active ? 'Click to visit profile' : 'Click to visit login'}"
						data-sveltekit-preload-data
						class="block text-zinc-200 hover:text-white transition duration-300">
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
					</a>
				</div>
			</div>
		</div>
	</div> -->

	<!-- Search box -->

	{#if showMiniNavSearch}
		<div
			transition:slide="{{ duration: 300 }}"
			class="sticky top-0 z-40 inset-x-0 py-20 px-3 sm:px-10 w-full bg-white">
			<div class="container mx-auto max-w-6xl">
				<Autocomplete
					placeholder="{data.store?.searchbarText || 'Search...'}"
					on:search="{onSearchSubmit}" />
			</div>
		</div>
	{/if}
</nav>

{#if show}
	<AutosuggestModal bind:show />
{/if}

<!-- Sidebar -->

{#if openSidebar}
	<aside class="fixed inset-0 z-[100] flex justify-end overflow-hidden bg-transparent">
		<button
			transition:fade="{{ duration: 500 }}"
			aria-label="Sidebar"
			type="button"
			class="absolute inset-0 bg-black bg-opacity-50 focus:outline-none"
			on:click="{() => (openSidebar = false)}">
		</button>

		<div
			transition:slideFade="{{ duration: 400 }}"
			class="relative z-[60] h-full w-full overflow-y-auto bg-white p-6 overflow-x-hidden">
			<button
				type="button"
				class="absolute top-5 right-4 transform cursor-pointer text-zinc-500 transition duration-300 focus:outline-none hover:scale-125 hover:text-zinc-800"
				on:click="{() => (openSidebar = false)}">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clip-rule="evenodd"></path>
				</svg>
			</button>

			<ul class="m-0 p-0 list-none flex w-full flex-col gap-2 text-sm">
				{#if megamenu?.length}
					<li>
						<!-- 1st level categories -->

						<ul class="m-0 p-0 list-none flex w-full flex-col gap-2 text-sm">
							{#each megamenu as m, mx}
								<li>
									{#if m.children?.length}
										<div class="flex w-full items-center justify-between gap-2 text-surface-500">
											<a
												href="{navigateToProperPath(m.link || m.slug)}"
												aria-label="Click to visit category related products"
												class="flex-1 uppercase font-bold text-lg py-1"
												on:click="{() => (openSidebar = false)}">
												{m.name}
											</a>

											<button
												type="button"
												class="overflow-hidden p-1 focus:outline-none"
												on:click="{() => handleToggleSubCategory(m, mx)}">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="h-5 w-5 shrink-0 transition duration-300
												{showSubCategory[mx] ? 'transform -rotate-180' : ''}">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
												</svg>
											</button>
										</div>
									{:else}
										<a
											href="{navigateToProperPath(m.link || m.slug)}"
											aria-label="Click to visit category related products"
											class="flex w-full items-center justify-between gap-2 py-1 text-left focus:outline-none text-surface-500 uppercase font-bold text-lg"
											on:click="{() => (openSidebar = false)}">
											{m.name}
										</a>
									{/if}

									<!-- 2nd level categories -->

									{#if showSubCategory[mx]}
										<ul class="ml-2 p-0 list-none">
											{#each m.children as c, cx}
												<li>
													{#if c.children?.length}
														<div
															class="flex w-full items-center justify-between gap-2 text-surface-500">
															<a
																href="{navigateToProperPath(c.link || c.slug)}"
																aria-label="Click to visit category related products page"
																class="flex-1"
																on:click="{() => (openSidebar = false)}">
																{c.name}
															</a>

															<button
																type="button"
																class="overflow-hidden p-1 focus:outline-none"
																on:click="{() => handleToggleSubCategory2(c, cx)}">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	stroke-width="1.5"
																	stroke="currentColor"
																	class="h-5 w-5 shrink-0 transition duration-300
																{showSubCategory2[cx] ? 'transform -rotate-180' : ''}">
																	<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
																</svg>
															</button>
														</div>
													{:else}
														<a
															href="{navigateToProperPath(c.link || c.slug)}"
															aria-label="Click to visit category related products page"
															class="flex w-full items-center justify-between gap-2 py-1 text-left focus:outline-none text-surface-500"
															on:click="{() => (openSidebar = false)}">
															{c.name}
														</a>
													{/if}

													<!-- 3rd level categories -->

													{#if showSubCategory2[cx]}
														<ul class="ml-4 p-0 list-none">
															{#each c.children as cc}
																<a
																	href="{navigateToProperPath(cc.link || cc.slug)}"
																	aria-label="Click to visit category related products page"
																	class="flex w-full items-center justify-between gap-2 py-1 text-left focus:outline-none text-surface-500"
																	on:click="{() => (openSidebar = false)}">
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
					</li>
				{/if}
				<div class="border-t-[1px] mt-16 pt-4 border-surface-100">
					{#if data.store?.socialSharingButtons || data.store?.email}
						<ul class="col-span-1 flex flex-wrap gap-2">
							{#if data.store?.socialSharingButtons?.facebook?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.facebook?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for facebook link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="#333333"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path
												d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"
											></path>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Instagram -->

							{#if data.store?.socialSharingButtons?.instagram?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.instagram?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for instagram link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="#333333"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<rect x="4" y="4" width="16" height="16" rx="4"></rect>
											<circle cx="12" cy="12" r="3"></circle>
											<line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Linkedin -->

							{#if data.store?.socialSharingButtons?.linkedin?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.linkedin?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for linkedin link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="#333333"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<rect x="4" y="4" width="16" height="16" rx="2"></rect>
											<line x1="8" y1="11" x2="8" y2="16"></line>
											<line x1="8" y1="8" x2="8" y2="8.01"></line>
											<line x1="12" y1="16" x2="12" y2="11"></line>
											<path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Pinterest -->

							{#if data.store?.socialSharingButtons?.pinterest?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.pinterest?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for pinterest link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="#333333"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<line x1="8" y1="20" x2="12" y2="11"></line>
											<path
												d="M10.7 14c.437 1.263 1.43 2 2.55 2c2.071 0 3.75 -1.554 3.75 -4a5 5 0 1 0 -9.7 1.7"
											></path>
											<circle cx="12" cy="12" r="9"></circle>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Reddit -->

							{#if data.store?.socialSharingButtons?.reddit?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.reddit?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for reddit link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="#333333"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path
												d="M12 8c2.648 0 5.028 .826 6.675 2.14a2.5 2.5 0 0 1 2.326 4.36c0 3.59 -4.03 6.5 -9 6.5c-4.875 0 -8.845 -2.8 -9 -6.294l-1 -.206a2.5 2.5 0 0 1 2.326 -4.36c1.646 -1.313 4.026 -2.14 6.674 -2.14z"
											></path>
											<path d="M12 8l1 -5l6 1"></path>
											<path d="M19 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
											<circle cx="9" cy="13" r=".5" fill="currentColor"></circle>
											<circle cx="15" cy="13" r=".5" fill="currentColor"></circle>
											<path d="M10 17c.667 .333 1.333 .5 2 .5s1.333 -.167 2 -.5"></path>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Snapchat -->

							{#if data.store?.socialSharingButtons?.snapchat?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.snapchat?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for snapchat link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="#333333"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path
												d="M16.882 7.842a4.882 4.882 0 0 0 -9.764 0c0 4.273 -.213 6.409 -4.118 8.118c2 .882 2 .882 3 3c3 0 4 2 6 2s3 -2 6 -2c1 -2.118 1 -2.118 3 -3c-3.906 -1.709 -4.118 -3.845 -4.118 -8.118zm-13.882 8.119c4 -2.118 4 -4.118 1 -7.118m17 7.118c-4 -2.118 -4 -4.118 -1 -7.118"
											></path>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Telegram -->

							{#if data.store?.socialSharingButtons?.telegram?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.telegram?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for telegram link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="#333333"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Twitter -->

							{#if data.store?.socialSharingButtons?.twitter?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.twitter?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for twitter link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="#333333"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path
												d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"
											></path>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Whatsapp -->

							{#if data.store?.socialSharingButtons?.whatsapp?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.whatsapp?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for whatsapp link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="#333333"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path
												d="M16.882 7.842a4.882 4.882 0 0 0 -9.764 0c0 4.273 -.213 6.409 -4.118 8.118c2 .882 2 .882 3 3c3 0 4 2 6 2s3 -2 6 -2c1 -2.118 1 -2.118 3 -3c-3.906 -1.709 -4.118 -3.845 -4.118 -8.118zm-13.882 8.119c4 -2.118 4 -4.118 1 -7.118m17 7.118c-4 -2.118 -4 -4.118 -1 -7.118"
											></path>
										</svg>
									</a>
								</li>
							{/if}

							<!-- Youtube -->

							{#if data.store?.socialSharingButtons?.youtube?.val}
								<li class="max-w-max">
									<a
										href="{data.store?.socialSharingButtons?.youtube?.val}"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Click for youtube link"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="#333333"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<rect x="3" y="5" width="18" height="14" rx="4"></rect>
											<path d="M10 9l5 3l-5 3z"></path>
										</svg>
									</a>
								</li>
							{/if}

							{#if data.store?.email}
								<li class="max-w-max">
									<a
										href="mailto:{data.store?.email}"
										aria-label="Click to contact with mail id"
										class="block focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 text-zinc-200 hover:text-white transiton duration-300"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="#333333"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<rect x="3" y="5" width="18" height="14" rx="2"></rect>
											<polyline points="3 7 12 13 21 7"></polyline>
										</svg>
									</a>
								</li>
							{/if}
						</ul>
					{/if}
				</div>
				<!-- 
				{#if navMenu?.length}
					<li>
						<ul class="m-0 p-0 list-none flex w-full flex-col gap-2 text-sm">
							{#each navMenu as menuItem}
								<li>
									<a
										href="{menuItem?.link}"
										class="block py-1 text-zinc-200 hover:text-white transiton duration-300 focus:outline-none"
										on:click="{() => (openSidebar = false)}">
										{menuItem.name}
									</a>
								</li>
							{/each}
						</ul>
					</li>
				{/if} -->

				<!-- <li>

					{#if data.store?.email}
						<a
							href="mailto:{data.store?.email}"
							aria-label="Click to visit login"
							class="text-zinc-200 hover:text-white transiton duration-300 focus:outline-none"
							data-sveltekit-preload-data>
							{data.store?.email}
						</a>
					{/if}

					{#if data.store?.phone}
						<a
							href="tel:+{data.store?.phone}"
							aria-label="Click to visit login"
							class="text-zinc-200 hover:text-white transiton duration-300 focus:outline-none"
							data-sveltekit-preload-data>
							{data.store?.phone}
						</a>
					{/if}
				</li> -->

				<!-- {#if menu?.length}
					<li>
						<ul class="m-0 p-0 list-none flex w-full flex-col gap-2 text-sm">
							{#each menu as m}
								<li>
									<a
										href="{m?.link}"
										class="block py-1 text-zinc-200 hover:text-white transiton duration-300 focus:outline-none"
										on:click="{() => (openSidebar = false)}">
										{m.name}
									</a>
								</li>
							{/each}
						</ul>
					</li>
				{/if} -->

				<!-- <li>
					<form
						action="/auth/logout"
						method="POST"
						use:enhance="{() => {
							return async () => {
								toast('Logged out successfully', 'success')
								openSidebar = false
								await invalidateAll()
							}
						}}">
						<button type="submit" aria-label="Logout" class="focus:outline-none"> Logout </button>
					</form>
				</li> -->
			</ul>
		</div>
	</aside>
{/if}
