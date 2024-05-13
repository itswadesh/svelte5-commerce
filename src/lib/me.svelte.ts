let me = $state(0)

export function getMe() {
	function set(data) {
		me = data
	}

	return {
		get me() {
			return me
		},
		set
	}
}
