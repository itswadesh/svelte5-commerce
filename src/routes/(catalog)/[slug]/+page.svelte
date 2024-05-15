<script lang="ts">
export let data
</script>

{#if data.products.products.length}
	{#each data.products.products as p}
		<div class="mb-4 bg-green-500">
			<a href="/product/{p.slug}"> {p.name}</a>
		</div>
	{/each}
{/if}
<!-- {JSON.stringify(data.products.products)} -->
