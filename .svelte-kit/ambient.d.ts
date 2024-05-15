
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const AB: string;
	export const ACLOCAL_PATH: string;
	export const ALLUSERSPROFILE: string;
	export const ANDROID_HOME: string;
	export const APPDATA: string;
	export const ChocolateyInstall: string;
	export const ChocolateyLastPathUpdate: string;
	export const CHROME_CRASHPAD_PIPE_NAME: string;
	export const CLASSPATH: string;
	export const COLORTERM: string;
	export const COMMONPROGRAMFILES: string;
	export const CommonProgramW6432: string;
	export const COMPUTERNAME: string;
	export const COMSPEC: string;
	export const CONFIG_SITE: string;
	export const COREPACK_ROOT: string;
	export const DISPLAY: string;
	export const DriverData: string;
	export const EXEPATH: string;
	export const FPS_BROWSER_APP_PROFILE_STRING: string;
	export const FPS_BROWSER_USER_PROFILE_STRING: string;
	export const GIT_ASKPASS: string;
	export const GOPATH: string;
	export const GYP_MSVS_VERSION: string;
	export const HOME: string;
	export const HOMEDRIVE: string;
	export const HOMEPATH: string;
	export const HOSTNAME: string;
	export const INFOPATH: string;
	export const INIT_CWD: string;
	export const JAVA_HOME: string;
	export const LANG: string;
	export const LOCALAPPDATA: string;
	export const LOGONSERVER: string;
	export const MANPATH: string;
	export const MINGW_CHOST: string;
	export const MINGW_PACKAGE_PREFIX: string;
	export const MINGW_PREFIX: string;
	export const MSYS: string;
	export const MSYSTEM: string;
	export const MSYSTEM_CARCH: string;
	export const MSYSTEM_CHOST: string;
	export const MSYSTEM_PREFIX: string;
	export const NODE: string;
	export const NODE_ENV: string;
	export const NODE_PATH: string;
	export const npm_command: string;
	export const npm_config_frozen_lockfile: string;
	export const npm_config_init_author_email: string;
	export const npm_config_init_author_name: string;
	export const npm_config_init_author_url: string;
	export const npm_config_msvs_version: string;
	export const npm_config_node_gyp: string;
	export const npm_config_registry: string;
	export const npm_config_user_agent: string;
	export const npm_config__bit_registry: string;
	export const npm_execpath: string;
	export const npm_lifecycle_event: string;
	export const npm_lifecycle_script: string;
	export const npm_node_execpath: string;
	export const npm_package_dependencies_formsnap: string;
	export const npm_package_dependencies_oslo: string;
	export const npm_package_dependencies_resend: string;
	export const npm_package_dependencies_stripe: string;
	export const npm_package_dependencies_sveltekit_superforms: string;
	export const npm_package_dependencies_svelte_email: string;
	export const npm_package_dependencies_svelte_stripe: string;
	export const npm_package_dependencies__lucia_auth_adapter_prisma: string;
	export const npm_package_dependencies__misiki_litekart_utils: string;
	export const npm_package_dependencies__prisma_client: string;
	export const npm_package_dependencies__stripe_stripe_js: string;
	export const npm_package_devDependencies_amazon_s3_uri: string;
	export const npm_package_devDependencies_autoprefixer: string;
	export const npm_package_devDependencies_bits_ui: string;
	export const npm_package_devDependencies_clsx: string;
	export const npm_package_devDependencies_cookie: string;
	export const npm_package_devDependencies_cookie_universal: string;
	export const npm_package_devDependencies_cssnano: string;
	export const npm_package_devDependencies_date_fns: string;
	export const npm_package_devDependencies_dayjs: string;
	export const npm_package_devDependencies_dotenv: string;
	export const npm_package_devDependencies_embla_carousel_svelte: string;
	export const npm_package_devDependencies_eslint: string;
	export const npm_package_devDependencies_eslint_config_prettier: string;
	export const npm_package_devDependencies_eslint_plugin_svelte: string;
	export const npm_package_devDependencies_fuse_js: string;
	export const npm_package_devDependencies_hash_it: string;
	export const npm_package_devDependencies_hex_color_to_color_name: string;
	export const npm_package_devDependencies_ioredis: string;
	export const npm_package_devDependencies_lucia: string;
	export const npm_package_devDependencies_lucide_svelte: string;
	export const npm_package_devDependencies_minio: string;
	export const npm_package_devDependencies_npm_run_all: string;
	export const npm_package_devDependencies_postcss: string;
	export const npm_package_devDependencies_postcss_load_config: string;
	export const npm_package_devDependencies_prettier: string;
	export const npm_package_devDependencies_prettier_plugin_svelte: string;
	export const npm_package_devDependencies_prettier_plugin_tailwindcss: string;
	export const npm_package_devDependencies_prisma: string;
	export const npm_package_devDependencies_shelljs: string;
	export const npm_package_devDependencies_ssh2shell: string;
	export const npm_package_devDependencies_svelte: string;
	export const npm_package_devDependencies_sveltekit_medusa_client: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const npm_package_devDependencies_svelte_confetti: string;
	export const npm_package_devDependencies_svelte_preprocess: string;
	export const npm_package_devDependencies_svelte_share_buttons_component: string;
	export const npm_package_devDependencies_svelte_sonner: string;
	export const npm_package_devDependencies_svelte_timeago: string;
	export const npm_package_devDependencies_svelte_toasts: string;
	export const npm_package_devDependencies_tailwindcss: string;
	export const npm_package_devDependencies_tailwind_merge: string;
	export const npm_package_devDependencies_tailwind_scrollbar: string;
	export const npm_package_devDependencies_tailwind_variants: string;
	export const npm_package_devDependencies_tslib: string;
	export const npm_package_devDependencies_ts_node: string;
	export const npm_package_devDependencies_typescript: string;
	export const npm_package_devDependencies_vanilla_lazyload: string;
	export const npm_package_devDependencies_vite: string;
	export const npm_package_devDependencies_vite_plugin_pwa: string;
	export const npm_package_devDependencies_zod: string;
	export const npm_package_devDependencies_zod_form_data: string;
	export const npm_package_devDependencies__aws_sdk_client_s3: string;
	export const npm_package_devDependencies__aws_sdk_lib_storage: string;
	export const npm_package_devDependencies__beyonk_svelte_facebook_pixel: string;
	export const npm_package_devDependencies__beyonk_svelte_google_analytics: string;
	export const npm_package_devDependencies__builder_io_partytown: string;
	export const npm_package_devDependencies__bulatdashiev_svelte_slider: string;
	export const npm_package_devDependencies__egjs_svelte_grid: string;
	export const npm_package_devDependencies__misiki_litekart: string;
	export const npm_package_devDependencies__playwright_test: string;
	export const npm_package_devDependencies__sentry_node: string;
	export const npm_package_devDependencies__sentry_svelte: string;
	export const npm_package_devDependencies__sentry_tracing: string;
	export const npm_package_devDependencies__splidejs_splide_extension_video: string;
	export const npm_package_devDependencies__splidejs_svelte_splide: string;
	export const npm_package_devDependencies__sveltejs_adapter_auto: string;
	export const npm_package_devDependencies__sveltejs_adapter_vercel: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
	export const npm_package_devDependencies__tailwindcss_line_clamp: string;
	export const npm_package_devDependencies__tailwindcss_typography: string;
	export const npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
	export const npm_package_devDependencies__typescript_eslint_parser: string;
	export const npm_package_devDependencies__types_eslint: string;
	export const npm_package_devDependencies__types_node: string;
	export const npm_package_devDependencies__woocommerce_woocommerce_rest_api: string;
	export const npm_package_name: string;
	export const npm_package_private: string;
	export const npm_package_scripts_build: string;
	export const npm_package_scripts_check: string;
	export const npm_package_scripts_check_watch: string;
	export const npm_package_scripts_dev: string;
	export const npm_package_scripts_format: string;
	export const npm_package_scripts_lint: string;
	export const npm_package_scripts_preview: string;
	export const npm_package_type: string;
	export const npm_package_version: string;
	export const NUMBER_OF_PROCESSORS: string;
	export const OneDrive: string;
	export const OneDriveConsumer: string;
	export const ORIGINAL_PATH: string;
	export const ORIGINAL_TEMP: string;
	export const ORIGINAL_TMP: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const OS: string;
	export const PATH: string;
	export const PATHEXT: string;
	export const PKG_CONFIG_PATH: string;
	export const PKG_CONFIG_SYSTEM_INCLUDE_PATH: string;
	export const PKG_CONFIG_SYSTEM_LIBRARY_PATH: string;
	export const PLINK_PROTOCOL: string;
	export const PNPM_HOME: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const PROCESSOR_ARCHITECTURE: string;
	export const PROCESSOR_IDENTIFIER: string;
	export const PROCESSOR_LEVEL: string;
	export const PROCESSOR_REVISION: string;
	export const ProgramData: string;
	export const PROGRAMFILES: string;
	export const ProgramW6432: string;
	export const PROMPT: string;
	export const PSModulePath: string;
	export const PUBLIC: string;
	export const PWD: string;
	export const SESSIONNAME: string;
	export const SHELL: string;
	export const SHLVL: string;
	export const SSH_ASKPASS: string;
	export const SYSTEMDRIVE: string;
	export const SYSTEMROOT: string;
	export const TEMP: string;
	export const TERM: string;
	export const TERM_PROGRAM: string;
	export const TERM_PROGRAM_VERSION: string;
	export const TMP: string;
	export const TMPDIR: string;
	export const USERDOMAIN: string;
	export const USERDOMAIN_ROAMINGPROFILE: string;
	export const USERNAME: string;
	export const USERPROFILE: string;
	export const VBOX_MSI_INSTALL_PATH: string;
	export const VS140COMNTOOLS: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const WINDIR: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		AB: string;
		ACLOCAL_PATH: string;
		ALLUSERSPROFILE: string;
		ANDROID_HOME: string;
		APPDATA: string;
		ChocolateyInstall: string;
		ChocolateyLastPathUpdate: string;
		CHROME_CRASHPAD_PIPE_NAME: string;
		CLASSPATH: string;
		COLORTERM: string;
		COMMONPROGRAMFILES: string;
		CommonProgramW6432: string;
		COMPUTERNAME: string;
		COMSPEC: string;
		CONFIG_SITE: string;
		COREPACK_ROOT: string;
		DISPLAY: string;
		DriverData: string;
		EXEPATH: string;
		FPS_BROWSER_APP_PROFILE_STRING: string;
		FPS_BROWSER_USER_PROFILE_STRING: string;
		GIT_ASKPASS: string;
		GOPATH: string;
		GYP_MSVS_VERSION: string;
		HOME: string;
		HOMEDRIVE: string;
		HOMEPATH: string;
		HOSTNAME: string;
		INFOPATH: string;
		INIT_CWD: string;
		JAVA_HOME: string;
		LANG: string;
		LOCALAPPDATA: string;
		LOGONSERVER: string;
		MANPATH: string;
		MINGW_CHOST: string;
		MINGW_PACKAGE_PREFIX: string;
		MINGW_PREFIX: string;
		MSYS: string;
		MSYSTEM: string;
		MSYSTEM_CARCH: string;
		MSYSTEM_CHOST: string;
		MSYSTEM_PREFIX: string;
		NODE: string;
		NODE_ENV: string;
		NODE_PATH: string;
		npm_command: string;
		npm_config_frozen_lockfile: string;
		npm_config_init_author_email: string;
		npm_config_init_author_name: string;
		npm_config_init_author_url: string;
		npm_config_msvs_version: string;
		npm_config_node_gyp: string;
		npm_config_registry: string;
		npm_config_user_agent: string;
		npm_config__bit_registry: string;
		npm_execpath: string;
		npm_lifecycle_event: string;
		npm_lifecycle_script: string;
		npm_node_execpath: string;
		npm_package_dependencies_formsnap: string;
		npm_package_dependencies_oslo: string;
		npm_package_dependencies_resend: string;
		npm_package_dependencies_stripe: string;
		npm_package_dependencies_sveltekit_superforms: string;
		npm_package_dependencies_svelte_email: string;
		npm_package_dependencies_svelte_stripe: string;
		npm_package_dependencies__lucia_auth_adapter_prisma: string;
		npm_package_dependencies__misiki_litekart_utils: string;
		npm_package_dependencies__prisma_client: string;
		npm_package_dependencies__stripe_stripe_js: string;
		npm_package_devDependencies_amazon_s3_uri: string;
		npm_package_devDependencies_autoprefixer: string;
		npm_package_devDependencies_bits_ui: string;
		npm_package_devDependencies_clsx: string;
		npm_package_devDependencies_cookie: string;
		npm_package_devDependencies_cookie_universal: string;
		npm_package_devDependencies_cssnano: string;
		npm_package_devDependencies_date_fns: string;
		npm_package_devDependencies_dayjs: string;
		npm_package_devDependencies_dotenv: string;
		npm_package_devDependencies_embla_carousel_svelte: string;
		npm_package_devDependencies_eslint: string;
		npm_package_devDependencies_eslint_config_prettier: string;
		npm_package_devDependencies_eslint_plugin_svelte: string;
		npm_package_devDependencies_fuse_js: string;
		npm_package_devDependencies_hash_it: string;
		npm_package_devDependencies_hex_color_to_color_name: string;
		npm_package_devDependencies_ioredis: string;
		npm_package_devDependencies_lucia: string;
		npm_package_devDependencies_lucide_svelte: string;
		npm_package_devDependencies_minio: string;
		npm_package_devDependencies_npm_run_all: string;
		npm_package_devDependencies_postcss: string;
		npm_package_devDependencies_postcss_load_config: string;
		npm_package_devDependencies_prettier: string;
		npm_package_devDependencies_prettier_plugin_svelte: string;
		npm_package_devDependencies_prettier_plugin_tailwindcss: string;
		npm_package_devDependencies_prisma: string;
		npm_package_devDependencies_shelljs: string;
		npm_package_devDependencies_ssh2shell: string;
		npm_package_devDependencies_svelte: string;
		npm_package_devDependencies_sveltekit_medusa_client: string;
		npm_package_devDependencies_svelte_check: string;
		npm_package_devDependencies_svelte_confetti: string;
		npm_package_devDependencies_svelte_preprocess: string;
		npm_package_devDependencies_svelte_share_buttons_component: string;
		npm_package_devDependencies_svelte_sonner: string;
		npm_package_devDependencies_svelte_timeago: string;
		npm_package_devDependencies_svelte_toasts: string;
		npm_package_devDependencies_tailwindcss: string;
		npm_package_devDependencies_tailwind_merge: string;
		npm_package_devDependencies_tailwind_scrollbar: string;
		npm_package_devDependencies_tailwind_variants: string;
		npm_package_devDependencies_tslib: string;
		npm_package_devDependencies_ts_node: string;
		npm_package_devDependencies_typescript: string;
		npm_package_devDependencies_vanilla_lazyload: string;
		npm_package_devDependencies_vite: string;
		npm_package_devDependencies_vite_plugin_pwa: string;
		npm_package_devDependencies_zod: string;
		npm_package_devDependencies_zod_form_data: string;
		npm_package_devDependencies__aws_sdk_client_s3: string;
		npm_package_devDependencies__aws_sdk_lib_storage: string;
		npm_package_devDependencies__beyonk_svelte_facebook_pixel: string;
		npm_package_devDependencies__beyonk_svelte_google_analytics: string;
		npm_package_devDependencies__builder_io_partytown: string;
		npm_package_devDependencies__bulatdashiev_svelte_slider: string;
		npm_package_devDependencies__egjs_svelte_grid: string;
		npm_package_devDependencies__misiki_litekart: string;
		npm_package_devDependencies__playwright_test: string;
		npm_package_devDependencies__sentry_node: string;
		npm_package_devDependencies__sentry_svelte: string;
		npm_package_devDependencies__sentry_tracing: string;
		npm_package_devDependencies__splidejs_splide_extension_video: string;
		npm_package_devDependencies__splidejs_svelte_splide: string;
		npm_package_devDependencies__sveltejs_adapter_auto: string;
		npm_package_devDependencies__sveltejs_adapter_vercel: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
		npm_package_devDependencies__tailwindcss_line_clamp: string;
		npm_package_devDependencies__tailwindcss_typography: string;
		npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
		npm_package_devDependencies__typescript_eslint_parser: string;
		npm_package_devDependencies__types_eslint: string;
		npm_package_devDependencies__types_node: string;
		npm_package_devDependencies__woocommerce_woocommerce_rest_api: string;
		npm_package_name: string;
		npm_package_private: string;
		npm_package_scripts_build: string;
		npm_package_scripts_check: string;
		npm_package_scripts_check_watch: string;
		npm_package_scripts_dev: string;
		npm_package_scripts_format: string;
		npm_package_scripts_lint: string;
		npm_package_scripts_preview: string;
		npm_package_type: string;
		npm_package_version: string;
		NUMBER_OF_PROCESSORS: string;
		OneDrive: string;
		OneDriveConsumer: string;
		ORIGINAL_PATH: string;
		ORIGINAL_TEMP: string;
		ORIGINAL_TMP: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		OS: string;
		PATH: string;
		PATHEXT: string;
		PKG_CONFIG_PATH: string;
		PKG_CONFIG_SYSTEM_INCLUDE_PATH: string;
		PKG_CONFIG_SYSTEM_LIBRARY_PATH: string;
		PLINK_PROTOCOL: string;
		PNPM_HOME: string;
		PNPM_SCRIPT_SRC_DIR: string;
		PROCESSOR_ARCHITECTURE: string;
		PROCESSOR_IDENTIFIER: string;
		PROCESSOR_LEVEL: string;
		PROCESSOR_REVISION: string;
		ProgramData: string;
		PROGRAMFILES: string;
		ProgramW6432: string;
		PROMPT: string;
		PSModulePath: string;
		PUBLIC: string;
		PWD: string;
		SESSIONNAME: string;
		SHELL: string;
		SHLVL: string;
		SSH_ASKPASS: string;
		SYSTEMDRIVE: string;
		SYSTEMROOT: string;
		TEMP: string;
		TERM: string;
		TERM_PROGRAM: string;
		TERM_PROGRAM_VERSION: string;
		TMP: string;
		TMPDIR: string;
		USERDOMAIN: string;
		USERDOMAIN_ROAMINGPROFILE: string;
		USERNAME: string;
		USERPROFILE: string;
		VBOX_MSI_INSTALL_PATH: string;
		VS140COMNTOOLS: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		VSCODE_GIT_IPC_HANDLE: string;
		WINDIR: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
