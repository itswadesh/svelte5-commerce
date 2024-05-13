let megamenu = $state(0)

export function getMegamenu() {
	function set(data) {
		megamenu = data
	}

	return {
		get megamenu() {
			return megamenu
		},
		set
	}
}
