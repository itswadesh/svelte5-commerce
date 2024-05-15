<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { GetColorName } from 'hex-color-to-color-name'
import { nanoid } from 'nanoid'
import { slide } from 'svelte/transition'
import ColoredBackground from '$lib/assets/konva/colored_background.png'

const dispatch = createEventDispatcher()

export let color = 'none'
export let disabled = false
export let isColor = false
export let items = []
export let model
export let name = ''
export let required = false
export let selectedItems = []
export let title = ''

let searchTerm
let showData = true
let showSearchBox = false

$: filteredTerms = searchTerm
	? items.filter(
			(item) =>
				item.key?.toLowerCase().indexOf(searchTerm?.toLowerCase()) !== -1 ||
				item.key?.toLowerCase().indexOf(searchTerm?.toLowerCase()) !== -1
		)
	: items

function handleSearchBox() {
	showSearchBox = !showSearchBox
	document.getElementById(`${title}searchText`).focus()
	if (!showSearchBox) {
		searchTerm = ''
		dispatch('go', { model, selectedItems })
	}
}
</script>

<div>
	{#if title}
		<button
			type="button"
			class="w-full text-left flex items-center gap-2 justify-between"
			on:click="{() => (showData = !showData)}">
			<h6 class="flex-1 text-lg font-normal text-primary-500 capitalize">
				{title.split('_').join(' ')}
			</h6>

			{#if showData}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6"></path>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
				</svg>
			{/if}
		</button>
	{:else}
		<div class="flex h-8">
			<div class="relative mb-3 h-8 w-full rounded-full border bg-zinc-100 transition duration-300">
				<input
					type="search"
					bind:value="{searchTerm}"
					class="h-8 w-full truncate rounded-full bg-transparent py-2 pl-4 pr-10 focus:outline-none"
					id="{title || model}searchText"
					placeholder="Search for {title || model}..." />

				<button
					type="button"
					class="absolute inset-y-0 right-2 z-20 flex items-center justify-center text-zinc-500 focus:outline-none"
					on:click="{handleSearchBox}">
					{#if !showSearchBox}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								clip-rule="evenodd"></path>
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"></path>
						</svg>
					{/if}
				</button>
			</div>
		</div>
	{/if}

	{#if showData && filteredTerms?.length}
		<ul transition:slide="{{ duration: 300 }}" class="mt-3 lg:flex flex-col hidden">
			{#each filteredTerms as i, ix}
				{#if i.key}
					<li>
						<label class="inline-flex items-center">
							<input
								type="checkbox"
								bind:group="{selectedItems}"
								{color}
								{disabled}
								{name}
								{required}
								class="h-5 w-5 shrink-0"
								id="{i.key + nanoid()}"
								value="{i.key}"
								on:change="{() => dispatch('go', { model, selectedItems })}" />

							<!-- {`${selectedItems.toString().search(i.key) === i.key}` ? 'font-medium' : 'font-normal'} -->

							<div
								class="ml-2 flex-1 flex flex-wrap gap-1 items-center leading-tight first-letter:uppercase">
								{#if isColor && i.key}
									{#if i.key === 'MultiColor'}
										<img
											src="{ColoredBackground}"
											alt=""
											class="h-6 w-6 shrink-0 border rounded-full object-cover object-center" />

										<span>
											{i.key}
										</span>
									{:else}
										<div
											class="h-6 w-6 shrink-0 border rounded-full"
											style="background-color: {i.key};">
										</div>

										<span>
											{GetColorName(i.key)}
										</span>
									{/if}
								{:else}
									<span>{i.key}</span>
								{/if}

								{#if i.doc_count}
									({i.doc_count})
								{/if}
							</div>
						</label>
					</li>
				{/if}
			{/each}
		</ul>
	{/if}

	<ul class="mt-3 flex flex-col lg:hidden">
		{#each filteredTerms as i, ix}
			{#if i.key}
				<li>
					<label class="inline-flex items-center">
						<input
							type="checkbox"
							bind:group="{selectedItems}"
							{color}
							{disabled}
							{name}
							{required}
							class="h-5 w-5 shrink-0"
							id="{i.key + nanoid()}"
							value="{i.key}"
							on:change="{() => dispatch('go', { model, selectedItems })}" />

						<!-- {`${selectedItems.toString().search(i.key) === i.key}` ? 'font-medium' : 'font-normal'} -->

						<div
							class="ml-2 flex-1 flex flex-wrap gap-1 items-center leading-tight first-letter:uppercase">
							{#if isColor && i.key}
								{#if i.key === 'MultiColor'}
									<img
										src="{ColoredBackground}"
										alt=""
										class="h-6 w-6 shrink-0 border rounded-full object-cover object-center" />

									<span>
										{i.key}
									</span>
								{:else}
									<div
										class="h-6 w-6 shrink-0 border rounded-full"
										style="background-color: {i.key};">
									</div>

									<span>
										{GetColorName(i.key)}
									</span>
								{/if}
							{:else}
								<span>{i.key}</span>
							{/if}

							{#if i.doc_count}
								<span class="text-xs text-zinc-500">({i.doc_count})</span>
							{/if}
						</div>
					</label>
				</li>
			{/if}
		{/each}
	</ul>
</div>
