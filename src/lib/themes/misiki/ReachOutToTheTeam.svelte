<script lang="ts">
import { ContactService } from '$lib/services'
import { Error, LazyImg } from '$lib/components'
import { logo } from '$lib/config'
import { page } from '$app/stores'
import { PrimaryButton, Textarea, Textbox } from '@misiki/litekart'
import { toast } from '$lib/utils'

let email
let message
let loading = false
let err

async function submitContactInformation() {
	try {
		err = null
		loading = true

		await ContactService.submitContactUsForm({
			email,
			subject: `Someone contact us from ${$page.data.store?.websiteName}`,
			message,
			storeId: $page?.data?.storeId,
			origin: $page.data.origin
		})

		toast('You have successfully contacted with us', 'success')

		email = null
		message = null
	} catch (e) {
		err = e
	} finally {
		loading = false
	}
}
</script>

<div class="p-3 py-5 sm:px-10 md:py-10">
	<div class="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
		<!-- Form -->

		<div class="col-span-1">
			<form on:submit|preventDefault="{submitContactInformation}" class="flex flex-col gap-5">
				<Error {err} />

				<label for="email">
					<h6 class="mb-2">Email *</h6>

					<Textbox type="text" id="email" required class="col-span-1 w-full" bind:value="{email}" />
				</label>

				<label for="message">
					<h6 class="mb-2">Message</h6>

					<Textarea id="message" rows="6" class="w-full" required bind:value="{message}" />
				</label>

				<div>
					<PrimaryButton type="submit" {loading} loadingringsize="sm" roundedNone class="text-sm">
						Submit
					</PrimaryButton>
				</div>
			</form>
		</div>

		<!-- Information -->

		<div class="col-span-1 flex flex-col items-center justify-center text-center gap-5">
			{#if $page?.data?.store?.logo}
				<LazyImg
					src="{$page?.data?.store?.logo}"
					alt="logo"
					height="128"
					width="364"
					aspect_ratio="4:1"
					class="h-full w-full max-h-32 max-w-96 object-contain object-left transition duration-300" />
			{:else if $page?.data?.store?.websiteName}
				<h2
					class="bg-gradient-to-b from-primary-500 to-secondary-500 bg-clip-text text-transparent truncate w-40 sm:w-auto sm:max-w-sm">
					{$page?.data?.store?.websiteName}
				</h2>
			{:else}
				<img src="{logo}" alt="logo" class="max-h-16 w-auto object-contain object-left" />
			{/if}

			<h2 class="font-normal">Reach Out to the {$page.data.store?.websiteName} Team!</h2>

			<p class="text-primary-500">
				Please don't hesitate to reach out to us about any questions or concerns you may have.
			</p>

			<p class="text-primary-500">
				We will do our best to realize your dream piece of jewelry at an amazing direct from the
				manufacturer price.
			</p>

			{#if $page.data.store?.socialSharingButtons || $page.data.store?.email}
				<ul class="col-span-1 justify-center flex flex-wrap gap-2">
					<!-- Facebook -->

					{#if $page.data.store?.socialSharingButtons?.facebook?.val}
						<li class="max-w-max">
							<a
								href="{$page.data.store?.socialSharingButtons?.facebook?.val}"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Click for facebook link"
								class="block focus:outline-none">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 block focus:outline-none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"
									></path>
								</svg>
							</a>
						</li>
					{/if}

					<!-- Instagram -->

					{#if $page.data.store?.socialSharingButtons?.instagram?.val}
						<li class="max-w-max">
							<a
								href="{$page.data.store?.socialSharingButtons?.instagram?.val}"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Click for instagram link"
								class="block focus:outline-none">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 block focus:outline-none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<rect x="4" y="4" width="16" height="16" rx="4"></rect>
									<circle cx="12" cy="12" r="3"></circle>
									<line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line>
								</svg>
							</a>
						</li>
					{/if}

					<!-- Linkedin -->

					{#if $page.data.store?.socialSharingButtons?.linkedin?.val}
						<li class="max-w-max">
							<a
								href="{$page.data.store?.socialSharingButtons?.linkedin?.val}"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Click for linkedin link"
								class="block focus:outline-none">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 block focus:outline-none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<rect x="4" y="4" width="16" height="16" rx="2"></rect>
									<line x1="8" y1="11" x2="8" y2="16"></line>
									<line x1="8" y1="8" x2="8" y2="8.01"></line>
									<line x1="12" y1="16" x2="12" y2="11"></line>
									<path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
								</svg>
							</a>
						</li>
					{/if}

					<!-- Pinterest -->

					{#if $page.data.store?.socialSharingButtons?.pinterest?.val}
						<li class="max-w-max">
							<a
								href="{$page.data.store?.socialSharingButtons?.pinterest?.val}"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Click for pinterest link"
								class="block focus:outline-none">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 block focus:outline-none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<line x1="8" y1="20" x2="12" y2="11"></line>
									<path
										d="M10.7 14c.437 1.263 1.43 2 2.55 2c2.071 0 3.75 -1.554 3.75 -4a5 5 0 1 0 -9.7 1.7"
									></path>
									<circle cx="12" cy="12" r="9"></circle>
								</svg>
							</a>
						</li>
					{/if}

					<!-- Reddit -->

					{#if $page.data.store?.socialSharingButtons?.reddit?.val}
						<li class="max-w-max">
							<a
								href="{$page.data.store?.socialSharingButtons?.reddit?.val}"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Click for reddit link"
								class="block focus:outline-none">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 block focus:outline-none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path
										d="M12 8c2.648 0 5.028 .826 6.675 2.14a2.5 2.5 0 0 1 2.326 4.36c0 3.59 -4.03 6.5 -9 6.5c-4.875 0 -8.845 -2.8 -9 -6.294l-1 -.206a2.5 2.5 0 0 1 2.326 -4.36c1.646 -1.313 4.026 -2.14 6.674 -2.14z"
									></path>
									<path d="M12 8l1 -5l6 1"></path>
									<path d="M19 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
									<circle cx="9" cy="13" r=".5" fill="currentColor"></circle>
									<circle cx="15" cy="13" r=".5" fill="currentColor"></circle>
									<path d="M10 17c.667 .333 1.333 .5 2 .5s1.333 -.167 2 -.5"></path>
								</svg>
							</a>
						</li>
					{/if}

					<!-- Snapchat -->

					{#if $page.data.store?.socialSharingButtons?.snapchat?.val}
						<li class="max-w-max">
							<a
								href="{$page.data.store?.socialSharingButtons?.snapchat?.val}"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Click for snapchat link"
								class="block focus:outline-none">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 block focus:outline-none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path
										d="M16.882 7.842a4.882 4.882 0 0 0 -9.764 0c0 4.273 -.213 6.409 -4.118 8.118c2 .882 2 .882 3 3c3 0 4 2 6 2s3 -2 6 -2c1 -2.118 1 -2.118 3 -3c-3.906 -1.709 -4.118 -3.845 -4.118 -8.118zm-13.882 8.119c4 -2.118 4 -4.118 1 -7.118m17 7.118c-4 -2.118 -4 -4.118 -1 -7.118"
									></path>
								</svg>
							</a>
						</li>
					{/if}

					<!-- Telegram -->

					{#if $page.data.store?.socialSharingButtons?.telegram?.val}
						<li class="max-w-max">
							<a
								href="{$page.data.store?.socialSharingButtons?.telegram?.val}"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Click for telegram link"
								class="block focus:outline-none">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 block focus:outline-none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path>
								</svg>
							</a>
						</li>
					{/if}

					<!-- Twitter -->

					{#if $page.data.store?.socialSharingButtons?.twitter?.val}
						<li class="max-w-max">
							<a
								href="{$page.data.store?.socialSharingButtons?.twitter?.val}"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Click for twitter link"
								class="block focus:outline-none">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 block focus:outline-none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path
										d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"
									></path>
								</svg>
							</a>
						</li>
					{/if}

					<!-- Whatsapp -->

					{#if $page.data.store?.socialSharingButtons?.whatsapp?.val}
						<li class="max-w-max">
							<a
								href="{$page.data.store?.socialSharingButtons?.whatsapp?.val}"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Click for whatsapp link"
								class="block focus:outline-none">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 block focus:outline-none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path
										d="M16.882 7.842a4.882 4.882 0 0 0 -9.764 0c0 4.273 -.213 6.409 -4.118 8.118c2 .882 2 .882 3 3c3 0 4 2 6 2s3 -2 6 -2c1 -2.118 1 -2.118 3 -3c-3.906 -1.709 -4.118 -3.845 -4.118 -8.118zm-13.882 8.119c4 -2.118 4 -4.118 1 -7.118m17 7.118c-4 -2.118 -4 -4.118 -1 -7.118"
									></path>
								</svg>
							</a>
						</li>
					{/if}

					<!-- Youtube -->

					{#if $page.data.store?.socialSharingButtons?.youtube?.val}
						<li class="max-w-max">
							<a
								href="{$page.data.store?.socialSharingButtons?.youtube?.val}"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Click for youtube link"
								class="block focus:outline-none">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 block focus:outline-none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<rect x="3" y="5" width="18" height="14" rx="4"></rect>
									<path d="M10 9l5 3l-5 3z"></path>
								</svg>
							</a>
						</li>
					{/if}

					<!-- Mail -->

					{#if $page.data.store?.email}
						<li class="max-w-max">
							<a
								href="mailto:{$page.data.store?.email}"
								aria-label="Click to contact with mail id"
								class="block focus:outline-none">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 block focus:outline-none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<rect x="3" y="5" width="18" height="14" rx="2"></rect>
									<polyline points="3 7 12 13 21 7"></polyline>
								</svg>
							</a>
						</li>
					{/if}
				</ul>
			{/if}
		</div>
	</div>
</div>
