<script lang="ts">
import { LazyImg } from '$lib/components'
import { navigateToProperPath } from '$lib/utils'

export let heroBanners
</script>

{#if heroBanners?.length > 0}
	<div>
		<div class="grid grid-cols-1 sm:grid-cols-2">
			<a
				href="{navigateToProperPath(heroBanners[0].link || heroBanners[0].slug)}"
				aria-label="Click here to view the banner's related products">
				<LazyImg
					src="{heroBanners[0]?.img}"
					alt=""
					height="390"
					aspect_ratio="2:1"
					class="col-span-1 h-full w-full object-cover" />
			</a>

			<a
				href="{navigateToProperPath(heroBanners[1].link || heroBanners[1].slug)}"
				aria-label="Click here to view the banner's related products">
				<LazyImg
					src="{heroBanners[1]?.img}"
					alt=""
					height="390"
					aspect_ratio="2:1"
					class="col-span-1 h-full w-full object-cover" />
			</a>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2">
			<div class="grid grid-cols-2">
				<a
					href="{navigateToProperPath(heroBanners[2].link || heroBanners[2].slug)}"
					aria-label="Click here to view the banner's related products">
					<LazyImg
						src="{heroBanners[2]?.img}"
						alt=""
						height="390"
						class="col-span-1 h-full w-full object-cover" />
				</a>

				<a
					href="{navigateToProperPath(heroBanners[3].link || heroBanners[3].slug)}"
					aria-label="Click here to view the banner's related products">
					<LazyImg
						src="{heroBanners[3]?.img}"
						alt=""
						height="390"
						class="col-span-1 h-full w-full object-cover" />
				</a>
			</div>

			<div>
				<a
					href="{navigateToProperPath(heroBanners[4].link || heroBanners[4].slug)}"
					aria-label="Click here to view the banner's related products">
					<LazyImg
						src="{heroBanners[4]?.img}"
						alt=""
						height="390"
						aspect_ratio="2:1"
						class="col-span-1 h-full w-full object-cover" />
				</a>
			</div>
		</div>
	</div>
{/if}
