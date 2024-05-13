let store = $state(0)

export function getStore() {
	function set(data) {
		store = data
	}

	return {
		get store() {
			return store
		},
		set
	}
}
