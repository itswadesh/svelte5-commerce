<script lang="ts">
import { LazyImg } from '$lib/components'
import { navigateToProperPath } from '$lib/utils'
import { onMount } from 'svelte'
import { page } from '$app/stores'
import { SplideSlide } from '@splidejs/svelte-splide'

export let sliderBannersDesktop = []
export let sliderBannersMobile = []

$: innerHeight = 0
$: innerWidth = 0

let bannerHeight = $page?.data?.store?.homePageSliderBannerImageHeight || 50
let hellobar = $page.data.store?.hellobar || {}
let sliderHeightAccToPageHeight = innerHeight
let Splide

onMount(async () => {
	const SplideModule = await import('$lib/components/SplideJs.svelte')
	Splide = SplideModule.default
})

$: if (innerWidth < 640) {
	// 56 (without mobile footer)
	sliderHeightAccToPageHeight = innerHeight - 92
} else if (innerWidth < 1024) {
	// 80 (without mobile footer)
	sliderHeightAccToPageHeight = innerHeight - 116
} else {
	if (hellobar?.active?.val) {
		sliderHeightAccToPageHeight = innerHeight - 168
	} else {
		sliderHeightAccToPageHeight = innerHeight - 116
	}
}
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<!-- Desktop banner -->

{#if sliderBannersDesktop?.length}
	<div class="hidden sm:block bg-white">
		<svelte:component
			this="{Splide}"
			totalImagesLength="{sliderBannersDesktop?.length}"
			options="{{
				// heightRatio: 0.432,
				arrows: true,
				autoplay: true,
				cover: true,
				focus: 'center',
				height: bannerHeight == 50 ? sliderHeightAccToPageHeight / 2 : sliderHeightAccToPageHeight,
				width: innerWidth,
				lazyLoad: true,
				type: 'loop'
			}}">
			{#each sliderBannersDesktop as b, ix}
				{#if b.img}
					<SplideSlide key="{b._id || b.id}">
						<a
							href="{navigateToProperPath(b.link || b.slug)}"
							aria-label="Click to visit banner related products page"
							class="block h-full"
							data-sveltekit-preload-data>
							<!-- <LazyImg
								src="{b.img}"
								alt="{b.name}"
								height="{sliderHeightAccToPageHeight}"
								class="h-[{sliderHeightAccToPageHeight}px] w-full object-cover" /> -->

							<img src="{b.img}" alt="{b.name}" class="h-full w-full object-cover" />
						</a>
					</SplideSlide>
				{/if}
			{/each}
		</svelte:component>
	</div>
{/if}

<!-- Mobile banner -->

{#if sliderBannersMobile?.length}
	<div class="block sm:hidden bg-white">
		<svelte:component
			this="{Splide}"
			totalImagesLength="{sliderBannersMobile?.length}"
			options="{{
				arrows: false,
				autoplay: true,
				cover: true,
				focus: 'center',
				height: bannerHeight == 50 ? sliderHeightAccToPageHeight / 3 : sliderHeightAccToPageHeight,
				width: innerWidth,
				lazyLoad: true,
				type: 'loop'
			}}">
			{#each sliderBannersMobile as b, ix}
				{#if b.img}
					<SplideSlide key="{b._id || b.id}">
						<a
							href="{navigateToProperPath(b.link || b.slug)}"
							aria-label="Click to visit banner related products page"
							class="block h-full"
							data-sveltekit-preload-data>
							<!-- <LazyImg
								src="{b.img}"
								alt="{b.name}"
								height="{sliderHeightAccToPageHeight}"
								class="h-[{sliderHeightAccToPageHeight}px] w-full object-cover" /> -->

							<img src="{b.img}" alt="{b.name}" class="h-full w-full object-cover" />
						</a>
					</SplideSlide>
				{/if}
			{/each}
		</svelte:component>
	</div>
{/if}
