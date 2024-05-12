<script>
  let { categories, title } = $props();
</script>

{title}
{#if categories}
  {#each categories as c}
    <img src={c.img} alt="" />
  {/each}
{/if}

<!-- {#each desktopBannersMobile as mb}
  <img src={mb.img} alt="" />
{/each} -->
