<script lang="ts">
import { page } from '$app/stores'
import { ProductCard, DummyProductCard } from '$lib/components'

export let data
</script>

<!-- Popular products -->

{#if data?.home?.popular?.length > 0}
	<div>
		<h2 class="p-3 py-5 text-center sm:px-10 md:py-10 uppercase">
			POPULAR ON {$page.data.store?.websiteName}
		</h2>

		<ul
			class="sm:px-10 border-t sm:border-t-0 grid w-full grid-cols-2 items-start sm:gap-3 sm:flex sm:flex-wrap sm:justify-between lg:gap-6">
			{#each data?.home?.popular as p}
				<li>
					<ProductCard product="{p}" />
				</li>
			{/each}

			{#each { length: 8 } as _}
				<li class="hidden sm:block">
					<DummyProductCard />
				</li>
			{/each}
		</ul>
	</div>
{/if}
