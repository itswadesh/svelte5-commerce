<script lang="ts">
let storesList = [
	'London',
	'New York',
	'Los Angeles',
	'San Francisco',
	'Austin',
	'Our Stores',
	'Boston',
	'Chicago',
	'Toronto',
	'Montreal',
	'Vancouver'
]
</script>

<div class="bg-secondary-500 py-5 border-b">
	<marquee behavior="scroll" direction="left" scrollamount="20">
		<ul class="m-0 p-0 list-none flex items-center gap-10">
			{#each storesList as store}
				<li
					class="store-item font-black uppercase
                    {store === 'Our Stores' ? 'text-4xl' : 'text-2xl'}">
					{store}
				</li>
			{/each}
		</ul>
	</marquee>
</div>
