<script lang="ts">
import { fly } from 'svelte/transition'
import { onMount } from 'svelte'
import { ProductCard } from '$lib/components'
import { SplideSlide } from '@splidejs/svelte-splide'

export let collections = []

let Splide
$: innerWidth = 0
let responsiveWidth = 0
$: if (innerWidth >= 640) {
	responsiveWidth = innerWidth - 20
}

onMount(async () => {
	const SplideModule = await import('$lib/components/SplideJs.svelte')
	Splide = SplideModule.default
})
</script>

<svelte:window bind:innerWidth />

{#if collections.length}
	<ul class="mb-5 sm:mb-10 p-0 list-none flex flex-col gap-5 sm:gap-10">
		{#each collections as collection, cx}
			{#if collection && collection.products?.length}
				<li in:fly="{{ y: 20, duration: 700, delay: 100 * cx }}">
					<div
						class="p-3 pt-5 pb-2 sm:px-10 md:py-10 flex flex-col items-center justify-center gap-1">
						<h2 class="text-center text-xl uppercase font-black">
							{collection.name}
						</h2>
						<a href="{collection.link}" class="text-surface-500">
							<div
								class="text-surface-500 opacity-80 hover:opacity-100 transition-all duration-300 after:block after:h-[1px] after:bg-surface-500 after:w-0 hover:after:w-full after:transition-all after:duration-300">
								VIEW ALL
							</div>
						</a>
					</div>

					<div class="hidden sm:block">
						<svelte:component
							this="{Splide}"
							options="{{
								// autoplay: true,
								autoWidth: true,
								gap: '32px',
								lazyLoad: true,
								padding: '40px',
								pagination: false,
								perMove: 1,
								// type: 'loop',
								width: responsiveWidth || '100%'
							}}">
							{#each collection.products as p}
								{#if p}
									<SplideSlide>
										<ProductCard product="{p}" />
									</SplideSlide>
								{/if}
							{/each}
						</svelte:component>
					</div>

					<div
						class="flex w-[98vw] items-start justify-start gap-3 overflow-x-auto sm:hidden scrollbar-none">
						<ul class="flex w-full list-none items-start gap-2">
							{#each collection.products as p, px}
								{#if p}
									<li class="w-[210px] shrink-0">
										<ProductCard product="{p}" />
									</li>
								{/if}
							{/each}
						</ul>
					</div>
				</li>
			{/if}
		{/each}
	</ul>
{/if}
