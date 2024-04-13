import { writable, derived, type Readable } from "svelte/store";

type JsonType = { [key: string]: boolean };

export type GetOption = Readable<(name: string) => boolean>;
export type SetOption = (name: string, value: boolean) => void;

export function createOptionsStore(init = {}) {
	const { subscribe, update } = writable(init);

	const getOption = derived(
		{ subscribe },
		($options) => (name: string) => ($options as JsonType)[name]
	);

	function setOption(name: string, value: boolean) {
		update((options) => {
			(options as JsonType)[name] = value;
			localStorage.setItem("options", JSON.stringify(options));
			return options;
		});
	}

	// const json = derived({ subscribe }, ($options) => JSON.stringify($options));

	return {
		getOption,
		setOption,
		// json,
	};
}
