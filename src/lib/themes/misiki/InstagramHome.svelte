<style>
.slowtransition {
	animation: fade 0.5s;
}

@keyframes fade {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}
</style>

<script lang="ts">
// import { LazyImg } from 'ui'
import instagram1 from '$lib/assets/home/instagram1.jpg'
import instagram2 from '$lib/assets/home/instagram2.jpg'
import instagram3 from '$lib/assets/home/instagram3.jpg'
import instagram4 from '$lib/assets/home/instagram4.jpg'
import instagram5 from '$lib/assets/home/instagram5.jpg'
import instagram6 from '$lib/assets/home/instagram6.jpg'
import instagram7 from '$lib/assets/home/instagram7.jpg'
import instagram8 from '$lib/assets/home/instagram8.jpg'
import instagram9 from '$lib/assets/home/instagram9.jpg'
import instagram10 from '$lib/assets/home/instagram10.jpg'

let instagramReels = [
	{
		img: instagram1,
		like: 5,
		link: 'https://www.instagram.com/reel/Cjaz5_gAKrh/'
	},
	{
		img: instagram2,
		like: 1,
		link: 'https://www.instagram.com/p/CZ9rEiioXgY/'
	},
	{
		img: instagram3,
		like: 4,
		link: 'https://www.instagram.com/tv/CZz1UiugyMb/'
	},
	{
		img: instagram4,
		like: 3,
		link: 'https://www.instagram.com/p/CZzkqpHPCbP/'
	},
	{
		img: instagram5,
		like: 5,
		link: 'https://www.instagram.com/p/CZzewCshBQm/'
	},
	{
		img: instagram6,
		like: 3,
		link: 'https://www.instagram.com/p/CZuwmqlPFU5/'
	},
	{
		img: instagram7,
		like: 3,
		link: 'https://www.instagram.com/p/CZuQxliPp-T/'
	},
	{
		img: instagram8,
		like: 8,
		link: 'https://www.instagram.com/reel/CVwjzSTAEe8/'
	},
	{
		img: instagram9,
		like: 4,
		link: 'https://www.instagram.com/p/CVwiK7VAILF/'
	},
	{
		img: instagram10,
		like: 6,
		link: 'https://www.instagram.com/p/CVqMKEeAwls/'
	}
]
</script>

<div class="mb-5 sm:mb-10 py-5 md:py-10">
	<ul class="m-0 p-0 list-none grid grid-cols-5 items-start gap-2">
		{#each instagramReels as reel, rx}
			<li class="col-span-1">
				<a
					href="{reel.link}"
					target="_blank"
					rel="noopener noreferrer"
					class="block relative h-[20vh] lg:h-[30vh] xl:h-[40vh] group">
					<!-- <LazyImg src="{reel.img}" /> -->

					<img
						src="{reel.img}"
						alt="reel video {rx}"
						class="h-full w-full object-cover object-center" />

					<div
						class="slowtransition absolute inset-0 z-0 hidden items-center justify-center bg-black bg-opacity-50 text-white group-hover:flex">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="w-8 h-8">
							<path
								fill-rule="evenodd"
								d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
								clip-rule="evenodd"></path>
						</svg>

						{#if reel.like}
							<div class="absolute bottom-2 right-4 flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="w-5 h-5">
									<path
										d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z"
									></path>
								</svg>

								{reel.like}
							</div>
						{/if}
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>
