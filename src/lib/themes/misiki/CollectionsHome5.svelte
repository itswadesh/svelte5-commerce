<style>
.link-underline {
	border-bottom-width: 0;
	background-image: linear-gradient(transparent, transparent),
		linear-gradient(rgb(249 250 251), rgb(249 250 251));
	background-size: 0 1px;
	background-position: 0 100%;
	background-size: 100% 1px;
	background-repeat: no-repeat;
	transition: background-size 0.5s ease-in-out;
}

.link-underline-gray {
	background-image: linear-gradient(transparent, transparent),
		linear-gradient(rgb(107 114 128), rgb(107 114 128));
}

.link-underline:hover {
	background-size: 0% 1px;
	background-position: 0 100%;
}
</style>

<script lang="ts">
import { page } from '$app/stores'
import { LazyImg } from '$lib/components'
import { currency } from '$lib/utils'
import { onMount } from 'svelte'

export let data = {}

let Splide

$: innerWidth = 0
let responsiveWidth = 0

$: if (innerWidth >= 640) {
	responsiveWidth = innerWidth - 80
} else {
	responsiveWidth = innerWidth - 24
}

onMount(async () => {
	const SplideModule = await import('$lib/components/SplideJs.svelte')
	Splide = SplideModule.default
})
</script>

<svelte:window bind:innerWidth />

{#if data?.collections?.count > 0}
	{#each data?.collections?.data as collection, cx}
		{#if collection.block === 'block-5'}
			{#if collection?.products?.length}
				<ul class="m-0 p-0 list-none grid grid-cols-3 gap-5">
					{#each collection?.products as product, ix}
						{#if product.img || product.images[0]}
							<li class="col-span-1">
								<LazyImg
									src="{product.img || product.images[0]}"
									alt="{product.name}"
									height="533"
									aspect_ratio="3:4"
									class="object-contain object-bottom text-xs" />

								<div>
									<a
										href="{product.link || `/product/${product.slug}`}"
										aria-label="Click to visit banner related products page"
										class="block"
										data-sveltekit-preload-data>
										{product.name}
									</a>

									<p class="text-zinc-500">
										{currency(product.price, $page.data?.store?.currencySymbol)}
									</p>
								</div>

								<button
									type="button"
									class="py-2 px-4 text-sm bg-transparent hover:bg-zinc-800 border border-zinc-800 hover:text-white transition duration-300 focus:outline-none">
									View products
								</button>
							</li>
						{/if}
					{/each}
				</ul>
			{/if}
		{/if}
	{/each}
{/if}
