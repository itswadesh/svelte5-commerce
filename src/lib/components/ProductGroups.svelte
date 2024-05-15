<script>
import LazyImg from './Image/LazyImg.svelte'

export let data = {}
</script>

<!-- Colour -->

{#if data.moreProductDetails?.pg?.colorGroup?.length}
	<div class="flex flex-col items-start gap-3">
		<div>Select Color</div>

		<div>
			<ul class="flex flex-wrap items-center gap-3">
				{#each data?.moreProductDetails?.pg?.colorGroup as cg}
					{#if cg?.color?.name && cg.img}
						<li>
							{#if cg.hasStock}
								<a
									href="/product/{cg.slug}"
									class="relative border h-20 w-14 flex items-center justify-center p-1 group transition duration-300 focus:outline-none
									{cg?.color?.name === data.product?.color?.name
										? 'border-primary-500'
										: 'border-zinc-300 hover:border-primary-500'}">
									<LazyImg
										src="{cg.img}"
										alt="{cg.color.name}"
										height="160"
										width="120"
										aspect_ratio="3:4"
										class="transform group-hover:scale-95 object-contain object-center w-full h-auto text-xs" />

									<div
										class="hidden group-hover:block absolute z-20 max-w-max min-w-max -top-2 leading-3 py-1 px-2 rounded whitespace-nowrap bg-primary-500 text-white text-[0.65em] text-center">
										{cg?.color.name}
									</div>
								</a>
							{:else}
								<a
									href="/product/{cg.slug}"
									class="relative border grayscale h-20 w-14 flex items-center justify-center p-1 group transition duration-300 focus:outline-none
									{cg?.color?.name === data.product?.color?.name
										? 'border-primary-500'
										: 'border-zinc-300 hover:border-primary-500'}">
									<LazyImg
										src="{cg.img}"
										alt="{cg.color.name}"
										height="160"
										width="120"
										aspect_ratio="3:4"
										class="transform group-hover:scale-95 object-contain object-center w-full h-auto text-xs" />

									<div
										class="hidden group-hover:block absolute z-20 max-w-max min-w-max -top-2 leading-3 py-1 px-2 rounded whitespace-nowrap bg-primary-500 text-white text-[0.65em] text-center">
										{cg?.color.name}
									</div>

									<hr class="absolute z-10 w-24 transform rotate-[56deg] border-zinc-300" />
								</a>
							{/if}
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</div>
{/if}

<!-- Size -->

{#if data?.moreProductDetails?.pg?.sizeGroup?.length}
	<div class="flex flex-col items-start gap-3">
		<div>Select Size</div>

		<div>
			<ul class="flex flex-wrap items-center gap-3">
				{#each data?.moreProductDetails?.pg?.sizeGroup as sg}
					{#if sg?.size?.name}
						<li>
							{#if sg.hasStock}
								<a
									href="/product/{sg.slug}"
									class="relative flex flex-col items-center justify-center text-center border rounded py-2 px-4 text-sm font-medium uppercase group transition duration-300 focus:outline-none
									{sg?.size?.name === data.product?.size?.name
										? 'border-primary-500'
										: 'bg-transparent border-zinc-300 hover:border-primary-500'}">
									<span class="w-full truncate">
										{sg?.size?.name}
									</span>

									{#if sg.stock < 5 && sg.stock > 0}
										<div
											class="absolute z-20 max-w-max min-w-max -bottom-2 leading-3 py-0.5 px-2 rounded whitespace-nowrap bg-[#ff5a5a] text-white text-[0.65em] text-center">
											{sg.stock} left
										</div>
									{/if}
								</a>
							{:else}
								<a
									href="/product/{sg.slug}"
									class="flex flex-col items-center justify-center text-center border text-zinc-200 rounded py-2 px-4 text-sm font-medium uppercase group transition duration-300 focus:outline-none
									{sg?.size?.name === data.product?.size?.name ? 'border-primary-500' : 'hover:border-primary-500'}">
									<span class="w-full truncate">
										{sg?.size?.name}
									</span>
								</a>
							{/if}
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</div>
{/if}

<!-- Finishing -->

{#if data.moreProductDetails?.pg?.finishing?.length}
	<div class="flex flex-col items-start gap-3">
		<div>Select Finishing</div>

		<div>
			<ul class="flex flex-wrap gap-3">
				{#each data.moreProductDetails?.pg?.finishing as fg}
					{#if fg?.finishing}
						<li>
							{#if fg.hasStock}
								<a
									href="/product/{fg.slug}"
									class="relative flex flex-col items-center justify-center text-center border rounded py-2 px-4 text-sm font-medium uppercase group transition duration-300 focus:outline-none
                                    {data.product?.attributes.some(
										(obj) => obj.val === fg?.finishing
									)
										? 'border-primary-500'
										: 'bg-transparent border-zinc-300 hover:border-primary-500'}">
									<span class="w-full truncate">
										{fg?.finishing}
									</span>

									{#if fg.stock < 5 && fg.stock > 0}
										<div
											class="absolute z-20 max-w-max min-w-max -bottom-2 leading-3 py-0.5 px-2 rounded whitespace-nowrap bg-[#ff5a5a] text-white text-[0.65em] text-center">
											{fg.stock} left
										</div>
									{/if}
								</a>
							{:else}
								<a
									href="/product/{fg.slug}"
									class="flex flex-col items-center justify-center text-center border text-zinc-200 rounded py-2 px-4 text-sm font-medium uppercase group transition duration-300 focus:outline-none
                                    {data.product?.attributes.some(
										(obj) => obj.val === fg?.finishing
									)
										? 'border-primary-500'
										: 'bg-transparent border-zinc-300 hover:border-primary-500'}">
									<span class="w-full truncate">
										{fg?.finishing}
									</span>

									{#if fg.stock < 5 && fg.stock > 0}
										<div
											class="absolute z-20 max-w-max min-w-max -bottom-2 leading-3 py-0.5 px-2 rounded whitespace-nowrap bg-[#ff5a5a] text-white text-[0.65em] text-center">
											{fg.stock} left
										</div>
									{/if}
								</a>
							{/if}
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</div>
{/if}

<!-- Initial -->

{#if data.moreProductDetails?.pg?.options?.length}
	<div class="flex flex-col items-start gap-3">
		<div>Select Initial</div>

		<div>
			<ul class="flex flex-wrap gap-3">
				{#each data.moreProductDetails?.pg?.options as ig}
					{#if ig?.options}
						<li>
							{#if ig.hasStock}
								<a
									href="/product/{ig.slug}"
									class="relative flex flex-col items-center justify-center text-center border rounded py-2 px-4 text-sm font-medium uppercase group transition duration-300 focus:outline-none
									{data.product?.attributes.some((obj) => obj.val === ig?.options)
										? 'border-primary-500'
										: 'bg-transparent border-zinc-300 hover:border-primary-500'}">
									<span class="w-full truncate">
										{ig?.options}
									</span>

									{#if ig.stock < 5 && ig.stock > 0}
										<div
											class="absolute z-20 max-w-max min-w-max -bottom-2 leading-3 py-0.5 px-2 rounded whitespace-nowrap bg-[#ff5a5a] text-white text-[0.65em] text-center">
											{ig.stock} left
										</div>
									{/if}
								</a>
							{:else}
								<a
									href="/product/{ig.slug}"
									class="flex flex-col items-center justify-center text-center border text-zinc-200 rounded py-2 px-4 text-sm font-medium uppercase group transition duration-300 focus:outline-none
                                    {ig?.options === data.product?.options
										? 'border-primary-500'
										: 'bg-transparent border-zinc-300 hover:border-primary-500'}">
									<span class="w-full truncate">
										{ig?.options}
									</span>

									{#if ig.stock < 5 && ig.stock > 0}
										<div
											class="absolute z-20 max-w-max min-w-max -bottom-2 leading-3 py-0.5 px-2 rounded whitespace-nowrap bg-[#ff5a5a] text-white text-[0.65em] text-center">
											{ig.stock} left
										</div>
									{/if}
								</a>
							{/if}
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</div>
{/if}

<!-- Material -->

{#if data.moreProductDetails?.pg?.materialGroup?.length}
	<div class="flex flex-col items-start gap-3">
		<div>Metal Purity</div>

		<div>
			<ul class="flex flex-wrap gap-3">
				{#each data.moreProductDetails?.pg?.materialGroup as mg}
					{#if mg?.material?.name}
						<li>
							{#if mg.hasStock}
								<a
									href="/product/{mg.slug}"
									class="relative flex flex-col items-center justify-center text-center border rounded py-2 px-4 text-sm font-medium uppercase group transition duration-300 focus:outline-none
                                    {mg?.material?.name === data.product?.material?.name
										? 'border-primary-500'
										: 'bg-transparent border-zinc-300 hover:border-primary-500'}">
									<span class="w-full truncate">
										{mg?.material?.name}
									</span>

									{#if mg.stock < 5 && mg.stock > 0}
										<div
											class="absolute z-20 max-w-max min-w-max -bottom-2 leading-3 py-0.5 px-2 rounded whitespace-nowrap bg-[#ff5a5a] text-white text-[0.65em] text-center">
											{mg.stock} left
										</div>
									{/if}
								</a>
							{:else}
								<a
									href="/product/{mg.slug}"
									class="flex flex-col items-center justify-center text-center border text-zinc-200 rounded py-2 px-4 text-sm font-medium uppercase group transition duration-300 focus:outline-none
                                    {mg?.material?.name === data.product?.material?.name
										? 'border-primary-500'
										: 'bg-transparent border-zinc-300 hover:border-primary-500'}">
									<span class="w-full truncate">
										{mg?.material?.name}
									</span>

									{#if mg.stock < 5 && mg.stock > 0}
										<div
											class="absolute z-20 max-w-max min-w-max -bottom-2 leading-3 py-0.5 px-2 rounded whitespace-nowrap bg-[#ff5a5a] text-white text-[0.65em] text-center">
											{mg.stock} left
										</div>
									{/if}
								</a>
							{/if}
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</div>
{/if}

<!-- Stone -->

{#if data.moreProductDetails?.pg?.stone?.length}
	<div class="flex flex-col items-start gap-3">
		<div>Stone Type</div>

		<div>
			<ul class="flex flex-wrap gap-3">
				{#each data.moreProductDetails?.pg?.stone as sg}
					{#if sg?.stone}
						<li>
							{#if sg.hasStock}
								<a
									href="/product/{sg.slug}"
									class="relative flex flex-col items-center justify-center text-center border rounded py-2 px-4 text-sm font-medium uppercase group transition duration-300 focus:outline-none
									{data.product?.attributes.some((obj) => obj.val === sg?.stone)
										? 'border-primary-500 '
										: 'bg-transparent border-zinc-300 hover:border-primary-500'}">
									<span class="w-full truncate">
										{sg?.stone}
									</span>

									{#if sg.stock < 5 && sg.stock > 0}
										<div
											class="absolute z-20 max-w-max min-w-max -bottom-2 leading-3 py-0.5 px-2 rounded whitespace-nowrap bg-[#ff5a5a] text-white text-[0.65em] text-center">
											{sg.stock} left
										</div>
									{/if}
								</a>
							{:else}
								<a
									href="/product/{sg.slug}"
									class="flex flex-col items-center justify-center text-center border text-zinc-200 rounded py-2 px-4 text-sm font-medium uppercase group transition duration-300 focus:outline-none
                                    {sg?.stone === data.product?.stone
										? 'border-primary-500'
										: 'bg-transparent border-zinc-300 hover:border-primary-500'}">
									<span class="w-full truncate">
										{sg?.stone}
									</span>

									{#if sg.stock < 5 && sg.stock > 0}
										<div
											class="absolute z-20 max-w-max min-w-max -bottom-2 leading-3 py-0.5 px-2 rounded whitespace-nowrap bg-[#ff5a5a] text-white text-[0.65em] text-center">
											{sg.stock} left
										</div>
									{/if}
								</a>
							{/if}
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</div>
{/if}

<!-- Quality -->

{#if data.moreProductDetails?.pg?.stone_quality?.length}
	<div class="flex flex-col items-start gap-3">
		<div>Stone Quality</div>

		<div>
			<ul class="flex flex-wrap gap-3">
				{#each data.moreProductDetails?.pg?.stone_quality as qg}
					{#if qg?.stone_quality}
						<li>
							{#if qg.hasStock}
								<a
									href="/product/{qg.slug}"
									class="relative flex flex-col items-center justify-center text-center border rounded py-2 px-4 text-sm font-medium uppercase group transition duration-300 focus:outline-none
									{data.product?.attributes.some((obj) => obj.val === qg?.stone_quality)
										? 'border-primary-500'
										: 'bg-transparent border-zinc-300 hover:border-primary-500'}">
									<span class="w-full truncate">
										{qg?.stone_quality}
									</span>

									{#if qg.stock < 5 && qg.stock > 0}
										<div
											class="absolute z-20 max-w-max min-w-max -bottom-2 leading-3 py-0.5 px-2 rounded whitespace-nowrap bg-[#ff5a5a] text-white text-[0.65em] text-center">
											{qg.stock} left
										</div>
									{/if}
								</a>
							{:else}
								<a
									href="/product/{qg.slug}"
									class="flex flex-col items-center justify-center text-center border text-zinc-200 rounded py-2 px-4 text-sm font-medium uppercase group transition duration-300 focus:outline-none
                                    {qg?.stone_quality === data.product?.stone_quality
										? 'border-primary-500'
										: 'bg-transparent border-zinc-300 hover:border-primary-500'}">
									<span class="w-full truncate">
										{qg?.stone_quality}
									</span>

									{#if qg.stock < 5 && qg.stock > 0}
										<div
											class="absolute z-20 max-w-max min-w-max -bottom-2 leading-3 py-0.5 px-2 rounded whitespace-nowrap bg-[#ff5a5a] text-white text-[0.65em] text-center">
											{qg.stock} left
										</div>
									{/if}
								</a>
							{/if}
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</div>
{/if}

<!-- Weight -->

{#if data.moreProductDetails?.pg?.weightGroup?.length}
	<div class="flex flex-col items-start gap-3">
		<div>Select Weight</div>

		<div>
			<ul class="flex flex-wrap gap-3">
				{#each data.moreProductDetails?.pg?.weightGroup as wg}
					{#if wg?.weight?.name}
						<li>
							{#if wg.hasStock}
								<a
									href="/product/{wg.slug}"
									class="relative flex flex-col items-center justify-center text-center border rounded py-2 px-4 text-sm font-medium uppercase group transition duration-300 focus:outline-none
                                    {wg?.weight?.name === data.product?.weight?.name
										? 'border-primary-500'
										: 'bg-transparent border-zinc-300 hover:border-primary-500'}">
									<span class="w-full truncate">
										{wg?.weight?.name}
									</span>

									{#if wg.stock < 5 && wg.stock > 0}
										<div
											class="absolute z-20 max-w-max min-w-max -bottom-2 leading-3 py-0.5 px-2 rounded whitespace-nowrap bg-[#ff5a5a] text-white text-[0.65em] text-center">
											{wg.stock} left
										</div>
									{/if}
								</a>
							{:else}
								<a
									href="/product/{wg.slug}"
									class="flex flex-col items-center justify-center text-center border text-zinc-200 rounded py-2 px-4 text-sm font-medium uppercase group transition duration-300 focus:outline-none
                                    {wg?.weight?.name === data.product?.weight?.name
										? 'border-primary-500'
										: 'bg-transparent border-zinc-300 hover:border-primary-500'}">
									<span class="w-full truncate">
										{wg?.weight?.name}
									</span>

									{#if wg.stock < 5 && wg.stock > 0}
										<div
											class="absolute z-20 max-w-max min-w-max -bottom-2 leading-3 py-0.5 px-2 rounded whitespace-nowrap bg-[#ff5a5a] text-white text-[0.65em] text-center">
											{wg.stock} left
										</div>
									{/if}
								</a>
							{/if}
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</div>
{/if}
