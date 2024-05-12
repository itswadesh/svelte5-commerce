<script lang="ts">
  import type { Snippet } from "svelte";
  type NavType = {
    children: Snippet;
  };
  let { children }: NavType = $props();
  import { useLocalStorage } from "$lib/index.svelte";
  import { getMe } from "$lib/me.svelte";

  let obj = useLocalStorage("obj", {});
  // obj.value.a = 3;
  import { getCounter } from "$lib/counter.svelte";

  const counter = getCounter();
  const me = getMe();
</script>

<nav
  class="flex items-center justify-center bg-primary px-4 text-primary-foreground"
>
  {@render children()}
</nav>
{JSON.stringify(me)}
{counter.count}

<button onclick={counter.increment}>
  clicks: {counter.count}
</button>
