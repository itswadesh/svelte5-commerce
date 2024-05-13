<script lang="ts">
let { children, data } = $props()
import '../app.pcss'
import { getMe } from '$lib/me.svelte'
import { getMegamenu } from '$lib/megamenu.svelte'
import { getMenu } from '$lib/menu.svelte'
import { getStore } from '$lib/store.svelte'
import { getHome } from '$lib/home.svelte'
import { getCollections } from '$lib/collections.svelte'
const me = getMe()
me.set({ phone: data.store.phone, name: data.store.websiteName })
const store = getStore()
store.set(data.store)
const menu = getMenu()
menu.set(data.menu)
const megamenu = getMegamenu()
megamenu.set(data.megamenu)
const home = getHome()
home.set(data.home)
</script>

<div class="bg-background min-h-screen font-sans antialiased">
	{@render children()}
</div>
<div class="container">
	{JSON.stringify(data.store.websiteName)}
	{JSON.stringify(data.store.address)}
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
