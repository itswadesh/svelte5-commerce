<script lang="ts">
  import { useLocalStorage } from "$lib/index.svelte";
  let obj = useLocalStorage("obj", {});
  import { getCounter } from "$lib/counter.svelte";
  import { getMe } from "$lib/me.svelte";

  const counter = getCounter();
  const meG = getMe();
  const login = () => {
    meG.set({ name: "xxxxxx", phone: "8895092508" });
  };
</script>

<button onclick={login}> Login </button>
<button onclick={() => counter.increment(counter.count)}>
  clicks: {counter.count}
</button>
<!-- <button onclick={() => count.value++}>
  {count.value}
</button> -->

<button
  style="background-color: red;"
  onclick={() => (obj.value = { a: 10, b: 20 })}
>
  A=10 B=20
</button>

<button style="background: blue;" onclick={() => (obj.value = { a: 1, b: 3 })}>
  A=1 B=23
</button>
<br />
{JSON.stringify(obj.value)}
