<script lang="ts">
import { navigateToProperPath } from '$lib/utils'

export let sections = []
</script>

{#if sections?.length}
	{#each sections as banner, banner_index (banner.id)}
		{#if banner && banner.active}
			{#if !banner.is_mobile}
				<section class="hidden lg:block">
					<!-- Header -->
					{#if banner.link && banner.title}
						<!-- Title with link -->

						<a href="{banner.link}" class="block">
							<h2 class="p-3 py-5 text-center sm:px-10 md:py-10 uppercase">
								{banner.title}
							</h2>
						</a>
					{:else if banner.title}
						<!-- Title with out link -->

						<h2 class="p-3 py-5 text-center sm:px-10 md:py-10 uppercase">
							{banner.title}
						</h2>
					{/if}

					<!-- Layout -->
					<div class="flex gap-16 justify-center">
						{#each banner.items as item, item_index}
							<a
								href="{navigateToProperPath(item.link || item.slug)}"
								class="xl:w-96 xl:h-96 lg:w-72 lg:h-72 relative">
								<div
									class="h-full w-full flex absolute justify-center items-center text-center z-10 text-2xl font-black uppercase">
									{item.title}
								</div>
								<div class="h-full w-full absolute">
									<img
										src="{item.img}"
										alt="{banner.title || ''} banner {item_index + 1}"
										height="{(item.rows_count * banner.row_height).toString()}"
										class="h-full w-full object-cover object-top text-xs transform group-hover:scale-110 transition duration-300" />
								</div>
							</a>
						{/each}
					</div>

					<!-- <div>
						<div
							class="grid grid-cols-12 shrink-0"
							style="grid-template-rows: repeat({banner.total_rows}, minmax(0, 1fr)); 
                        	gap: {banner.padding_between_banners}px; 
                        	padding: {banner.padding_over_all_banners}px;">
							{#each banner.items as item, item_index}
								<a
									href="{navigateToProperPath(item.link || item.slug)}"
									class="relative block group overflow-hidden"
									style="grid-column: span {item.columns_count} / span {item.columns_count};  grid-row: span {item.rows_count} / span {item.rows_count};">
									{#if item.img}
										<!-- Banner -->

					<!-- aspect_ratio={item.aspect_ratio || ''}
										<img
											src="{item.img}"
											alt="{banner.title || ''} banner {item_index + 1}"
											height="{(item.rows_count * banner.row_height).toString()}"
											class="p-10 h-full w-full object-cover object-top text-xs transform group-hover:scale-110 transition duration-300" />

										{#if item.title}
											<div class="absolute inset-0 z-10 flex items-end justify-start p-10">
												<div class="flex flex-col gap-2 items-start">
													<h5 class="text-primary-500 text-xl font-bold uppercase">
														{item.title}
													</h5>

													<a
														href="{banner.link || '##'}"
														class="py-1 px-4 border border-zinc-800 hover:text-white hover:bg-zinc-800 transition duration-300 focus:outline-none">
														View Product
													</a>
												</div>
											</div>
										{/if}
									{/if}
								</a>
							{/each}
						</div> -->
					<!-- </div> -->
				</section>
			{:else if banner.is_mobile && !banner.is_horizontally_scrollable}
				<section class="block lg:hidden">
					<!-- Header -->

					{#if banner.link && banner.title}
						<!-- Title with link -->

						<a href="{banner.link}" class="block">
							<h2 class="p-3 py-5 text-center sm:px-10 md:py-10 uppercase">
								{banner.title}
							</h2>
						</a>
					{:else if banner.title}
						<!-- Title with out link -->

						<h2 class="p-3 py-5 text-center sm:px-10 md:py-10 uppercase">
							{banner.title}
						</h2>
					{/if}

					<!-- Layout -->

					<div>
						<div
							class="grid grid-cols-12 shrink-0"
							style="grid-template-rows: repeat({banner.total_rows}, minmax(0, 1fr)); 
                        	gap: {banner.padding_between_banners}px; 
                       	 	padding: {banner.padding_over_all_banners}px;">
							{#each banner.items as item, item_index}
								{#if item.img}
									<a
										href="{navigateToProperPath(item.link || item.slug)}"
										class="relative block shrink-0 group overflow-hidden"
										style="grid-column: span {item.columns_count} / span {item.columns_count};  grid-row: span {item.rows_count} / span {item.rows_count};"
										data-sveltekit-preload-data>
										<!-- aspect_ratio={item.aspect_ratio || ''} -->
										<img
											src="{item.img}"
											alt="{banner.title || ''} banner {item_index + 1}"
											height="{(item.rows_count * banner.row_height).toString()}"
											class="h-full w-full object-cover object-top text-xs transform group-hover:scale-110 transition duration-300" />

										{#if item.title}
											<div class="absolute inset-0 z-10 flex items-end justify-start p-10">
												<div class="flex flex-col gap-2 items-start">
													<h5 class="text-primary-500 text-xl font-bold uppercase">
														{item.title}
													</h5>

													<a
														href="{banner.link || '##'}"
														class="py-1 px-4 border border-zinc-800 hover:text-white hover:bg-zinc-800 transition duration-300 focus:outline-none">
														View Product
													</a>
												</div>
											</div>
										{/if}
									</a>
								{/if}
							{/each}
						</div>
					</div>
				</section>
			{:else if banner.is_mobile && banner.is_horizontally_scrollable}
				<section class="block lg:hidden">
					<!-- Header -->

					{#if banner.link && banner.title}
						<!-- Title with link -->

						<a href="{banner.link}" class="block">
							<h2 class="p-3 py-5 text-center sm:px-10 md:py-10 uppercase">
								{banner.title}
							</h2>
						</a>
					{:else if banner.title}
						<!-- Title with out link -->

						<h2 class="p-3 py-5 text-center sm:px-10 md:py-10 uppercase">
							{banner.title}
						</h2>
					{/if}

					<!-- Layout -->

					<div class="w-screen overflow-x-auto scrollbar-none">
						<div
							role="banner"
							class="flex flex-row items-start"
							style="gap: {banner.padding_between_banners}px; padding: {banner.padding_over_all_banners}px;">
							{#each banner.items as item, item_index}
								{#if item.img}
									<!-- Banner -->

									<a
										href="{navigateToProperPath(item.link || item.slug)}"
										class="relative block shrink-0 group overflow-hidden"
										data-sveltekit-preload-data>
										<!-- aspect_ratio={item.aspect_ratio || ''} -->
										<img
											src="{item.img}"
											alt="{banner.title || ''} banner {item_index + 1}"
											height="{banner.row_height}"
											class="h-[{banner.row_height}px] object-contain object-top transform group-hover:scale-110 transition duration-300" />

										{#if item.title}
											<div class="absolute inset-0 z-10 flex items-end justify-start p-10">
												<div class="flex flex-col gap-2 items-start">
													<h5 class="text-primary-500 text-xl font-bold uppercase">
														{item.title}
													</h5>

													<a
														href="{banner.link || '##'}"
														class="py-1 px-4 border border-zinc-800 hover:text-white hover:bg-zinc-800 transition duration-300 focus:outline-none">
														View Product
													</a>
												</div>
											</div>
										{/if}
									</a>
								{/if}
							{/each}
						</div>
					</div>
				</section>
			{/if}
		{/if}
	{/each}
{/if}
