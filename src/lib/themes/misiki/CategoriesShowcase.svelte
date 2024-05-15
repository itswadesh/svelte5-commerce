<style>
.new-underline {
	position: relative;
}

.new-underline::after {
	content: '';
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 1px; /* Adjust the desired thickness of the new-underline */
	background-color: #fff; /* Adjust the color of the new-underline */
	transform: scaleX(0); /* Initially, set the width to 0 */
	transform-origin: 0 50%;
	transition: transform 0.3s ease-in-out; /* Adjust the duration as needed */
}

.group:hover .new-underline::after {
	transform: scaleX(1); /* Expand the new-underline to full width on hover */
}
</style>

<script lang="ts">
import { LazyImg } from '$lib/components'
import { navigateToProperPath } from '$lib/utils'

export let categories = []
export let title = ''
</script>

{#if categories?.length}
	<div class="hover-root">
		{#if title}
			<h2 class="p-3 py-5 text-center uppercase sm:px-10 md:py-10">
				{title}
			</h2>
		{/if}

		<ul
			class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 border-b divide-x border-primary-500 divide-primary-500">
			{#each categories as category, ix}
				<li>
					{#if category.img}
						<a
							href="{navigateToProperPath(category.link || category.slug)}"
							aria-label="Click to view related products of this category"
							class="relative group col-span-1">
							<LazyImg
								src="{category.img}"
								alt="{category.name}"
								width="144"
								height="144"
								class="h-full w-full object-cover text-xs" />

							<div
								class="absolute bottom-0 inset-x-0 p-4 group-hover:bg-primary-500 group-hover:text-white transition duration-300">
								<span class="new-underline uppercase">
									{category.name}
								</span>
							</div>
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
{/if}
