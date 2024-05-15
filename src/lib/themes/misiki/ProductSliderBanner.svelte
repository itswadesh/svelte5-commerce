<script lang="ts">
import { Gallery, LazyImg } from '$lib/components'
import { onMount } from 'svelte'
import { Splide, SplideSlide } from '@splidejs/svelte-splide'

export let data
export let lazy = true
export let showPhotosModal = false

let main: Splide
let selectedImgIndex
let thumbs: SplideSlide

const mainOptions = {
	type: 'loop',
	perPage: 1,
	perMove: 1,
	pagination: false
}

const thumbsOptions = {
	type: 'slide',
	rewind: true,
	gap: '1rem',
	pagination: false,
	fixedWidth: 100,
	fixedHeight: 100,
	cover: true,
	focus: 'center' as const,
	isNavigation: true,
	updateOnMove: true,
	breakpoints: {
		640: {
			fixedWidth: 80,
			fixedHeight: 80
		}
	}
}

onMount(() => {
	if (main && thumbs) {
		main.sync(thumbs.splide)
	}
})

function handleGallery(index) {
	selectedImgIndex = index
	showPhotosModal = true
}
</script>

<div class="flex flex-col gap-5">
	{#if data?.product?.images?.length}
		<Splide options="{mainOptions}" bind:this="{main}" aria-labelledby="thumbnails-example-heading">
			{#each data.product?.images as img, ix (img)}
				<SplideSlide class="flex justify-center">
					<button type="button" on:click="{() => handleGallery(ix)}">
						{#if lazy}
							<LazyImg
								src="{img}"
								alt="banner{ix}"
								aspect_ratio="1:1"
								height="300"
								class="block h-auto w-full justify-center object-contain object-center" />
						{:else}
							<img
								src="{img}"
								alt="banner{ix}"
								height="300"
								class="block h-auto w-full justify-center object-contain object-center" />
						{/if}
						<!-- <img
							alt="{data.product?.name}"
							height="500"
							src="{`${getCdnImageUrl(img, $page.data.store.IMAGE_CDN_URL)}?tr=h-500`}"
							class="block h-auto w-full justify-center object-contain object-center" /> -->
					</button>
				</SplideSlide>
			{/each}
		</Splide>

		{#if data?.product?.images?.length > 1}
			<Splide options="{thumbsOptions}" bind:this="{thumbs}">
				{#each data.product?.images as img2, ix (img2)}
					<SplideSlide>
						{#if lazy}
							<LazyImg
								src="{img2}"
								alt="thumbnail{ix}"
								aspect_ratio="1:1"
								height="80"
								width="80"
								class="h-20 w-20 object-contain object-center" />
						{:else}
							<img
								src="{img2}"
								alt="thumbnail{ix}"
								height="80"
								width="80"
								class="h-20 w-20 object-contain object-center" />
						{/if}

						<!-- <img
							src="{img2}"
							alt="thumbnail{ix}"
							class="block h-20 w-20 object-contain object-center" /> -->
					</SplideSlide>
				{/each}
			</Splide>
		{/if}
	{/if}
</div>

<!-- Gallery -->

<Gallery bind:selectedImgIndex bind:showPhotosModal product="{data.product}" />
