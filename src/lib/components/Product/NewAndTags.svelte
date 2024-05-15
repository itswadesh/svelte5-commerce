<script>
import { onMount } from 'svelte'

export let data = {}
// console.log('zzzzzzzzzzzzzzzzzz', data)

let isRibbonTagPresent = false

onMount(() => {
	if (data && data.product && data.product.tags) {
		for (let tag of data.product.tags) {
			if (tag.type === 'Ribbon') {
				isRibbonTagPresent = true // Ribbon tag found
			}
		}
	} else {
		isRibbonTagPresent = false // Ribbon tag not found
	}
})
</script>

{#if data.product?.new || isRibbonTagPresent}
	<div class="flex flex-wrap gap-1 mb-3">
		{#if data.product?.new}
			<div class="px-2 py-1 text-xs font-semibold text-white uppercase bg-red-500">New</div>
		{/if}

		{#if data.product?.tags?.length}
			{#each data.product?.tags as tag}
				{#if tag?.name && tag?.type === 'Ribbon'}
					<div
						class="px-2 py-1 text-xs font-semibold text-white uppercase"
						style="background-color: {tag.colorCode || '#047868'};">
						{tag.name}
					</div>
				{/if}
			{/each}
		{/if}
	</div>
{/if}
