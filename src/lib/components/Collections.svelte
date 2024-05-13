<script>
let { data } = $props()
</script>

Collections
{#if data}
	{#each data as collection}
		<h3>{collection.name}</h3>
		{#each collection.products as product}
			{product.name}
			{#each product.images as img}
				{product.name}
				<img src="{img}" alt="" />
			{/each}
		{/each}
	{/each}
{/if}

<!-- {#each desktopBannersMobile as mb}
  <img src={mb.img} alt="" />
{/each} -->
