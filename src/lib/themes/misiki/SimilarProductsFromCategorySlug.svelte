<script lang="ts">
import { ProductCard, DummyProductCard } from '$lib/components'
import { ProductSkeleton } from '$lib/ui'

export let centeredHeading = false
export let data
export let isBottomBorder = true
export let isUpperCase = false
</script>

{#if data.loading}
	<ul
		class="mb-5 grid w-full grid-cols-2 items-start gap-3 sm:mb-10 sm:flex sm:flex-wrap sm:justify-between lg:gap-6">
		{#each { length: 12 } as _}
			<li>
				<ProductSkeleton />
			</li>
		{/each}

		{#each { length: 7 } as _}
			<li class="hidden sm:block">
				<DummyProductCard />
			</li>
		{/each}
	</ul>
{:else if data?.length}
	<div class="mb-5 sm:mb-10">
		<div
			class="mb-10
			{centeredHeading ? 'flex items-center justify-center text-center' : ''}">
			<h2
				class="font-normal max-w-max
				{isBottomBorder ? 'border-b-4 border-zinc-800' : ''}
				{isUpperCase ? 'uppercase' : 'capitalize'}">
				Not the perfect style for you? Try these instead:
			</h2>
		</div>

		<div
			class="mb-5 grid w-full grid-cols-2 items-start gap-3 sm:mb-10 sm:flex sm:flex-wrap sm:justify-between lg:gap-6">
			{#each data as p}
				<ProductCard product="{p}" />
			{/each}

			{#each { length: 7 } as _}
				<div class="hidden sm:block">
					<DummyProductCard />
				</div>
			{/each}
		</div>
	</div>
{/if}
