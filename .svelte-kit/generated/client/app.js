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
	() => import('./nodes/19')
];

export const server_loads = [0,3];

export const dictionary = {
		"/(customerFacing)": [~4,[2]],
		"/admin": [~13,[3]],
		"/admin/orders": [~14,[3]],
		"/admin/products": [~15,[3]],
		"/admin/products/new": [~17,[3]],
		"/admin/products/[id]/edit": [~16,[3]],
		"/admin/users": [~18,[3]],
		"/(customerFacing)/auth/login": [5,[2]],
		"/login": [~19],
		"/(customerFacing)/me": [6,[2]],
		"/(customerFacing)/orders": [~7,[2]],
		"/(customerFacing)/products": [~8,[2]],
		"/(customerFacing)/products/download/expired": [10,[2]],
		"/(customerFacing)/products/[id]/purchase": [~9,[2]],
		"/(customerFacing)/stripe/purchase-state": [~11,[2]],
		"/(customerFacing)/stripe/purchase-status": [~12,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.js';