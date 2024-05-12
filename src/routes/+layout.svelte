<script lang="ts">
  let { children, data } = $props();
  import "../app.pcss";
  import { getMe } from "$lib/me.svelte";
  const me = getMe();
  me.set({ phone: data.store.phone, name: data.store.websiteName });
</script>

<div class="bg-background min-h-screen font-sans antialiased">
  {@render children()}
</div>
<div class="container">
  {JSON.stringify(data.store.websiteName)}
  {JSON.stringify(data.store.address)}
  <!-- {JSON.stringify(data.popularSearches)} -->
  <div>
    {#each data.popularSearches.data as s}
      {`${s.text} | `}
    {/each}
  </div>
</div>
<!-- {JSON.stringify(data.menu)}

{#each data.menu as m}
  {m.name}
  {#each m.items as i}
    {i.name}-{i.link}
  {/each}
{/each} -->
