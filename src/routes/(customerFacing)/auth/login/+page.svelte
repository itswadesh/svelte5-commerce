<script>
import { getMe } from '$lib/me.svelte'

const meG = getMe()
const login = () => {
	meG.set({ name: 'xxxxxx', phone: '8895092508' })
}
</script>

<button onclick="{login}"> Login </button>
