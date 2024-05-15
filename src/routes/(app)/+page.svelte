<script lang="ts">
import CategoriesSlider from '$lib/components/CategoriesSlider.svelte'
import Collections from '$lib/components/Collections.svelte'
import Hero from '$lib/components/Hero.svelte'

// import { useLocalStorage } from "$lib/index.svelte";
import { getHome } from '$lib/home.svelte'
// let obj = useLocalStorage("obj", {});
// import { getCounter } from "$lib/counter.svelte";
// const counter = getCounter();
const home = getHome()
</script>

<Hero
	sliderBannersDesktop="{home.home?.page?.sliderBanners?.banners}"
	sliderBannersMobile="{home.home?.page?.sliderBanners?.bannersMobile}" />

<CategoriesSlider title="Top Categories" categories="{home.home?.categories}" />
<Collections data="{home.home?.collections}" />

<!-- <button onclick={() => counter.increment(counter.count)}>
  clicks: {counter.count}
</button> -->
<!-- <button onclick={() => count.value++}>
  {count.value}
</button> -->

<!-- <button
  style="background-color: red;"
  onclick={() => (obj.value = { a: 10, b: 20 })}
>
  A=10 B=20
</button>

<button style="background: blue;" onclick={() => (obj.value = { a: 1, b: 3 })}>
  A=1 B=23
</button>
<br />
{JSON.stringify(obj.value)} -->
