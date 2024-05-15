<style>
div {
	--thumb-bg: transparent;
	--progress-bg: #ff9355;
	--track-bg: #deffd7;
}
</style>

<script lang="ts">
import { createEventDispatcher } from 'svelte'
import Slider from '@bulatdashiev/svelte-slider'

const dispatch = createEventDispatcher()

export let max = 0
export let min = 0
export let range = []

let timer = null // Variable to store the timer ID

function delayedLog() {
	if (timer) {
		clearTimeout(timer) // Clear any existing timer
	}

	timer = setTimeout(() => {
		dispatch('go', { model: 'price', selectedItems: range })
	}, 1000) // 1000 milliseconds (1 second)
}
</script>

{#if range?.length}
	<Slider
		{min}
		{max}
		step="{10}"
		bind:value="{range}"
		range
		order
		on:input="{() => delayedLog()}" />
{/if}
