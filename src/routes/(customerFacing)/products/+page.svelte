<script lang="ts">
  let { data } = $props();
  // import { getCounter } from "$lib/counter.svelte";

  // const counter = getCounter();
</script>

<!-- <button onclick={() => counter.increment(counter.count)}>
  clicks: {counter.count}
</button> -->

{#each data.products as p}
  {p.x}
{/each}
