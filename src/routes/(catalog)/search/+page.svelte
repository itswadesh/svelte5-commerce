<script lang="ts">
import { ProductService } from '$lib/services/index'
import { onMount } from 'svelte'

let { data } = $props()
let products: any = $state([])

onMount(async () => {
	console.log(data)
	try {
		products = await ProductService.fetchProducts({
			query: data.query.toString(),
			storeId: data.storeId,
			origin,
			sid: data.sid
		})
	} catch (e) {
		console.log(e)
	}
})
</script>

{#if products.data}
	{#each products.data as p}
		<div class="mb-4 bg-green-500">
			{p.name}
		</div>
	{/each}
{/if}
