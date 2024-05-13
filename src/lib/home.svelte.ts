let home = $state(0)

export function getHome() {
	function set(data) {
		home = data
	}

	return {
		get home() {
			return home
		},
		set
	}
}
