export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23')
];

export const server_loads = [0,4];

export const dictionary = {
		"/(app)": [~5,[2]],
		"/admin": [~17,[4]],
		"/admin/orders": [~18,[4]],
		"/admin/products": [~19,[4]],
		"/admin/products/new": [~20,[4]],
		"/admin/products/[id]/edit": [~21,[4]],
		"/admin/users": [~22,[4]],
		"/(app)/auth/login": [6,[2]],
		"/login": [~23],
		"/(app)/me": [7,[2]],
		"/(app)/orders": [~8,[2]],
		"/(app)/products": [~9,[2]],
		"/(app)/products/download/expired": [10,[2]],
		"/(app)/products/[id]/purchase": [~11,[2]],
		"/(product)/product/[slug]": [16,[],[3]],
		"/(catalog)/search": [~14],
		"/(app)/stripe/purchase-state": [~12,[2]],
		"/(app)/stripe/purchase-status": [~13,[2]],
		"/(catalog)/[slug]": [15]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.js';