<script>
  let { sliderBannersDesktop, sliderBannersMobile } = $props();
</script>

{#each sliderBannersMobile as mb}
  <img src={mb.img} alt="" />
{/each}

<!-- {#each desktopBannersMobile as mb}
  <img src={mb.img} alt="" />
{/each} -->
