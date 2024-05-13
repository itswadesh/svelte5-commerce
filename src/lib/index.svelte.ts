import { browser } from '$app/environment'
export class LocalStorage<T> {
	#value = $state<T>() as T
	key = ''

	constructor(key: string, value: T) {
		this.key = key
		this.#value = value

		if (browser) {
			const item = localStorage.getItem(key)
			if (item) {
				this.#value = this.deserialize(item)
			} else {
				localStorage.setItem(this.key, this.serialize(this.#value))
			}
		}
	}

	get value() {
		return this.#value
	}

	set value(newValue) {
		this.#value = newValue
		if (browser) {
			localStorage.setItem(this.key, this.serialize(this.#value))
		}
	}

	serialize(value: T): string {
		return JSON.stringify(value)
	}

	deserialize(value: string): T {
		return JSON.parse(value)
	}
}

export function useLocalStorage(key: string, value: any) {
	return new LocalStorage(key, value)
}
