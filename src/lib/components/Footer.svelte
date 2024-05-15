<script lang="ts">
// import appStore from '$lib/assets/app/app-store.svg'
// import googlePlay from '$lib/assets/app/google-play.png'
import { browser } from '$app/environment'
// import { getAllMegamenuFromStore } from '$lib/store/megamenu'
// import { getMenuFromStore } from '$lib/store/menu'
// import { getPopularSearchFromStore } from '$lib/store/popular-search'
import { LazyImg } from '$lib/components'
import { logo } from '$lib/config'
// import { navigateToProperPath, toast } from '$lib/utils'
import { onMount } from 'svelte'
import { page } from '$app/stores'
import { PrimaryButton } from '$lib/ui'
import masterCard from '$lib/assets/payment-method/mastercard.png'
import paypal from '$lib/assets/payment-method/paypal.png'
import skrill from '$lib/assets/payment-method/skrill.png'
import visa from '$lib/assets/payment-method/visa.png'

export let content = ``
export let megamenu: Category[]

let email = ''
let menu = []
let paymentMethodCards = [masterCard, paypal, skrill, visa]
let popularSearches = []

function getYear() {
	const d = new Date()
	let year = d.getFullYear()
	return year
}

onMount(async () => {
	if (browser) {
		megamenu = await getAllMegamenuFromStore({
			storeId: $page?.data?.storeId,
			origin: $page.data.origin
		})

		menu = await getMenuFromStore({
			storeId: $page?.data?.storeId,
			origin: $page.data.origin
		})

		popularSearches = await getPopularSearchFromStore({
			// limit: 20,
			sid: null,
			origin: $page.data.origin,
			storeId: $page?.data?.storeId,
			isCors: $page.data.store?.isCors
		})
	}
})

function positionToDisplayIsMultiVendor(itemsLength) {
	if (itemsLength >= 2) {
		return 1
	} else {
		return 0
	}
}
</script>

<footer class="w-full border-t">
	<div class="justify-center p-3 sm:p-10">
		<div class="container mx-auto max-w-6xl">
			{#if menu?.length}
				<ul
					class="mb-5 p-0 list-none gap-5 sm:mb-10 sm:gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start text-zinc-500">
					<div class="col-span-1 flex flex-col gap-2">
						{#if $page?.data?.store?.logo}
							<LazyImg
								src="{$page?.data?.store?.logo}"
								alt="logo"
								height="64"
								width="96"
								aspect_ratio="4:1"
								class="h-10 w-auto object-contain object-left transition duration-300" />
						{:else if $page?.data?.store?.websiteName}
							<h2
								class="bg-gradient-to-b from-primary-500 to-secondary-500 bg-clip-text text-transparent truncate w-40 sm:w-auto sm:max-w-sm">
								{$page?.data?.store?.websiteName}
							</h2>
						{:else}
							<img src="{logo}" alt="logo" class="max-h-16 w-auto object-contain object-left" />
						{/if}

						<!-- Email/Phone -->

						{#if $page.data.store?.phone}
							<i class="text-zinc-500">
								Contact us of call <b>{$page.data.store?.phone}</b> for custom enquiries.
							</i>
						{/if}

						{#if $page.data.store?.socialSharingButtons || $page.data.store?.email}
							<ul class="flex items-center flex-wrap gap-2">
								<!-- Facebook -->

								{#if $page.data.store?.socialSharingButtons?.facebook?.val}
									<li class="max-w-max">
										<a
											href="{$page.data.store?.socialSharingButtons?.facebook?.val}"
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Click for facebook link">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5 transition duration-300 hover:text-[#4267B2]"
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

								{#if $page.data.store?.socialSharingButtons?.instagram?.val}
									<li class="max-w-max">
										<a
											href="{$page.data.store?.socialSharingButtons?.instagram?.val}"
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Click for instagram link">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5 transition duration-300 hover:text-[#C13584]"
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

								<!-- Twitter -->

								{#if $page.data.store?.socialSharingButtons?.twitter?.val}
									<li class="max-w-max">
										<a
											href="{$page.data.store?.socialSharingButtons?.twitter?.val}"
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Click for twitter link">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5 transition duration-300 hover:text-[#1DA1F2]"
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

								<!-- Mail -->

								{#if $page.data.store?.email}
									<li class="max-w-max">
										<a
											href="mailto:{$page.data.store?.email}"
											aria-label="Click to contact with mail id">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5 transition duration-300 hover:text-[#c71610]"
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

								<!-- Linkedin -->

								{#if $page.data.store?.socialSharingButtons?.linkedin?.val}
									<li class="max-w-max">
										<a
											href="{$page.data.store?.socialSharingButtons?.linkedin?.val}"
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Click for linkedin link">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5 transition duration-300 hover:text-[#0077b5]"
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

								{#if $page.data.store?.socialSharingButtons?.youtube?.val}
									<li class="max-w-max">
										<a
											href="{$page.data.store?.socialSharingButtons?.youtube?.val}"
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Click for pinterest link">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5 transition duration-300 hover:text-[#c8232c]"
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

								<!-- Youtube -->

								{#if $page.data.store?.youtubeUrl}
									<li class="max-w-max">
										<a
											href="{$page.data.store?.youtubeUrl}"
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Click for youtube link">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5 transition duration-300 hover:text-[#FF0000]"
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
							</ul>
						{/if}
					</div>

					{#each menu as menu}
						{#if menu.menu_id === 'footer'}
							{#each menu.items as item, mx}
								<li class="col-span-1">
									{#if item.link}
										<a
											href="{item.link || '#'} "
											target="_blank"
											aria-label="Click to visit this page"
											class="block">
											<h6 class="mb-4 whitespace-nowrap text-lg font-normal">{item.name}</h6>
										</a>
									{:else}
										<h6 class="mb-4 whitespace-nowrap text-lg font-normal">{item.name}</h6>
									{/if}

									<ul class="m-0 p-0 list-none flex flex-col gap-1">
										{#if item?.items?.length}
											{#each item?.items as item2}
												<li class="flex max-w-max items-center">
													{#if item2.link}
														<a
															href="{item2.link || '#'} "
															target="_blank"
															aria-label="Click to visit this page"
															class="hover:text-zinc-800 transition duration-300 capitalize whitespace-pre-wrap">
															{item2.name}
														</a>
													{:else}
														<span
															class="hover:text-zinc-800 transition duration-300 capitalize whitespace-pre-wrap">
															{item2.name}
														</span>
													{/if}
												</li>
											{/each}

											{#if mx === 0}
												<li class="flex max-w-xs items-center">
													<form
														on:submit|preventDefault="{() =>
															toast('subscribe currently not working', 'info')}"
														class="flex flex-col gap-4">
														<label for="email">
															<h6 class="mb-2 font-normal">Email *</h6>

															<input
																type="email"
																id="email"
																value="{email}"
																placeholder="Enter your email..."
																class="w-full bg-white text-zinc-800 py-2 pl-2 pr-28 border focus:outline-none" />
														</label>

														<PrimaryButton roundedNone class="w-full text-xs">
															Sign Up
														</PrimaryButton>
													</form>
												</li>
											{/if}

											{#if mx === positionToDisplayIsMultiVendor(menu.items?.length) && $page.data.store?.isMultiVendor}
												<li class="flex max-w-max items-center">
													<a
														href="{$page.data.store?.adminUrl || '#'} "
														target="_blank"
														aria-label="Click to visit this page"
														class="hover:text-zinc-800 transition duration-300 capitalize whitespace-pre-wrap">
														Vendor Login
													</a>
												</li>

												<li class="flex max-w-max items-center">
													<a
														href="{$page.data.store?.adminUrl}?role=vendor&store={$page.data.store
															?.id}"
														target="_blank"
														aria-label="Click to visit this page"
														class="hover:text-zinc-800 transition duration-300 capitalize whitespace-pre-wrap">
														Join as Vendor
													</a>

													<div
														class="ml-2 max-w-max rounded bg-primary-500 py-[0.1rem] px-1 text-[0.5rem] font-semibold leading-3 tracking-wider text-white">
														NEW
													</div>
												</li>
											{/if}
										{/if}
									</ul>
								</li>
							{/each}
						{/if}
					{/each}

					<!-- STORE INFO -->

					<!-- <div class="col-span-1">
						<h5 class="mb-4 whitespace-nowrap font-semibold uppercase">Store Info</h5>

						<ul class="m-0 p-0 list-none flex flex-col gap-2 text-zinc-200">
							<li class="flex max-w-max items-center">
								<a
									href="/about-us"
									target="self"
									aria-label="Click to visit this page"
									class= whitespace-pre-wrap">
									About Us
								</a>

								<div
									class="ml-2 max-w-max rounded bg-white py-[0.1rem] px-1 text-[0.5rem] font-semibold leading-3 tracking-wider text-primary-500">
									NEW
								</div>
							</li>

							<li class="flex max-w-max items-center">
								<a
									href="/contact-us"
									target="self"
									aria-label="Click to visit this page"
									class= whitespace-pre-wrap">
									Contact Us
								</a>
							</li>

							{#if $page.data.store?.isMultiVendor}
								<li class="flex max-w-max items-center">
									<a
										href="{$page.data.store?.adminUrl}?role=vendor&store={$page?.data?.storeId}"
										target="self"
										aria-label="Click to visit this page"
										class= whitespace-pre-wrap">
										Be Our Partner
									</a>
								</li>
							{/if}

							<li class="flex max-w-xs items-center">
								on:submit|preventDefault="{() => toast('subscribe currently not working')}"
								<form
									class="relative">
									<input
										type="email"
										value="{email}"
										placeholder="Enter your email..."
										class="w-full bg-white text-zinc-800 py-2 pl-2 pr-28 focus:outline-none" />

									<button
										type="submit"
										class="absolute inset-y-0 right-0 w-24 px-2 bg-secondary-500 hover:bg-secondary-600 text-white transition duration-300 focus:outline-none">
										Subscribe
									</button>
								</form>
							</li>
						</ul>
					</div> -->

					<!-- POLICIES -->

					<!-- <div class="col-span-1">
						<h5 class="mb-4 whitespace-nowrap font-semibold uppercase">Policies</h5>

						<ul class="m-0 p-0 list-none flex flex-col gap-2 text-zinc-200">
							{#if pages?.length}
								{#each pages as page}
									<li class="flex max-w-max items-center">
										<a
											href="/p/{page.link || page.slug}"
											aria-label="Click to visit this page"
											class="hover:text-zinc-800 transition duration-300 capitalize whitespace-pre-wrap">
											{page.name}
										</a>

										{#if page.new}
											<div
												class="ml-2 max-w-max rounded bg-primary-500 py-[0.1rem] px-1 text-[0.5rem] font-semibold leading-3 tracking-wider text-white">
												NEW
											</div>
										{/if}
									</li>
								{/each}
							{/if}
						</ul>
					</div> -->

					<!-- SERVICES -->

					<!-- {#if megamenu?.length}
						<div class="col-span-1">
							<h5 class="mb-4 whitespace-nowrap font-semibold uppercase">Services</h5>

							<ul class="m-0 p-0 list-none flex flex-col gap-2 text-zinc-200">
								{#each megamenu as category}
									<li class="flex max-w-max items-center">
										<a
											href="/{category.link || category.slug}"
											aria-label="Click to visit this page"
											class= whitespace-pre-wrap">
											{category.name}
										</a>

										{#if category.new}
											<div
												class="ml-2 max-w-max rounded bg-white py-[0.1rem] px-1 text-[0.5rem] font-semibold leading-3 tracking-wider text-primary-500">
												NEW
											</div>
										{/if}
									</li>
								{/each}
							</ul>
						</div>
					{/if} -->

					<!-- VALUE ADDED SERVICES -->

					<!-- {#if megamenu?.length}
						<div class="col-span-1">
							<h5 class="mb-4 whitespace-nowrap font-semibold uppercase">Value Added Services</h5>

							<ul class="m-0 p-0 list-none flex flex-col gap-2 text-zinc-200">
								{#each megamenu as category}
									<li class="flex max-w-max items-center">
										<a
											href="/{category.link || category.slug}"
											aria-label="Click to visit this page"
											class= whitespace-pre-wrap">
											{category.name}
										</a>

										{#if category.new}
											<div
												class="ml-2 max-w-max rounded bg-white py-[0.1rem] px-1 text-[0.5rem] font-semibold leading-3 tracking-wider text-primary-500">
												NEW
											</div>
										{/if}
									</li>
								{/each}
							</ul>
						</div>
					{/if} -->
				</ul>
			{/if}
		</div>
	</div>

	<hr />

	<div class="p-3 sm:px-10">
		<div class="container mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-4">
			<p class="col-span-1 justify-start text-xs">
				Copyright © {getYear()}
				<span class="text-secondary-500">{$page.data.store?.websiteName}</span>, All Rights
				Reserved. Powered by
				<a
					href="https://litekart.in/"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:underline">
					Litekart
				</a>
			</p>

			{#if paymentMethodCards?.length}
				<ul class="col-span-1 justify-end flex flex-wrap gap-2 items-center m-0 p-0 list-none">
					{#each paymentMethodCards as pmc}
						<li>
							<img src="{pmc}" alt="" class="h-8 w-auto object-contain" />
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</footer>
