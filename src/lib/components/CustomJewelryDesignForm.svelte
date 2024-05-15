<script lang="ts">
import { page } from '$app/stores'
import { ContactService } from '$lib/services'
import { PrimaryButton, Textbox } from '$lib/ui'
import { toast } from '$lib/utils'

let center_stone = ''
let company = ''
let do_you_want_designed = ''
let email = ''
let err = null
let fullName = ''
let loading = false
let message = ''
let metal = ''
let metal_purity = ''
let phone = ''
let stone_clarity = ''
let stone_color = ''
let stone_shape = ''
let stone_type = ''
let target_ctw = ''

async function submitContactInformation() {
	try {
		err = null
		loading = true

		message = `center stone = ${center_stone}, company = ${company}, do you want designed = ${do_you_want_designed}, metal purity = ${metal_purity}, metal = ${metal}, stone clarity = ${stone_clarity}, stone color = ${stone_color}, stone shape = ${stone_shape}, stone type = ${stone_type}, target ctw = ${target_ctw}`

		console.log('message', message)

		const res = await ContactService.submitContactUsForm({
			fullName,
			email,
			phone,
			subject: `Someone contact us from ${$page.data.store?.websiteName}`,
			message,
			storeId: $page?.data?.storeId,
			origin: $page.data.origin
		})

		toast(res, 'success')

		center_stone = ''
		company = ''
		do_you_want_designed = ''
		email = ''
		fullName = ''
		message = ''
		message = ''
		metal = ''
		metal_purity = ''
		phone = ''
		stone_clarity = ''
		stone_color = ''
		stone_shape = ''
		stone_type = ''
		target_ctw = ''
	} catch (e) {
		err = e
	} finally {
		loading = false
	}
}
</script>

<form class="w-full flex flex-col gap-2" on:submit|preventDefault="{submitContactInformation}">
	<Textbox type="text" placeholder="Name" bind:value="{fullName}" />

	<Textbox type="email" placeholder="Email" bind:value="{email}" />

	<Textbox type="text" placeholder="Cmpany" bind:value="{company}" />

	<Textbox type="text" placeholder="Phone Number" bind:value="{phone}" />

	<Textbox
		type="text"
		placeholder="What Do You Want Designed?"
		bind:value="{do_you_want_designed}" />

	<Textbox type="text" placeholder="Target Ctw?" bind:value="{target_ctw}" />

	<select
		name=""
		id=""
		class="w-full rounded border border-zinc-200 p-2 text-sm placeholder-zinc-400 transition duration-300 focus:outline-none focus:ring-1 focus:ring-primary-500 bg-transparent hover:bg-zinc-50"
		bind:value="{metal}">
		<!-- {#each } -->
		<option value="" disabled selected>Select a Metal</option>
	</select>

	<select
		name=""
		id=""
		class="w-full rounded border border-zinc-200 p-2 text-sm placeholder-zinc-400 transition duration-300 focus:outline-none focus:ring-1 focus:ring-primary-500 bg-transparent hover:bg-zinc-50"
		bind:value="{metal_purity}">
		<!-- {#each } -->
		<option value="" disabled selected>Select a Metal Purity</option>
	</select>

	<Textbox type="text" placeholder="Stone Type?" bind:value="{stone_type}" />

	<Textbox type="text" placeholder="Stone Shape?" bind:value="{stone_shape}" />

	<Textbox type="text" placeholder="Stone Color?" bind:value="{stone_color}" />

	<Textbox type="text" placeholder="Stone Clarity?" bind:value="{stone_clarity}" />

	<Textbox type="text" placeholder="Center Stone?" bind:value="{center_stone}" />

	<PrimaryButton type="submit">Submit</PrimaryButton>
</form>
