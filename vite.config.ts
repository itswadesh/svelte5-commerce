import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
const HTTP_ENDPOINT = 'https://api.litekart.in'

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: true,
		port: 3000,
		proxy: {
			'/api': HTTP_ENDPOINT,
			'/sitemap': 'https://s3.ap-south-1.amazonaws.com/litekart.in'
		}
	}
})
