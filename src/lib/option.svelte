<script lang="ts">
	import type { GetOption, SetOption } from "./options";

	export let getOption: GetOption
	export let setOption: SetOption
	export let name: string
	export let richName: string

	$: color = $getOption(name) ? "#50dd5f" : "#dd5b4f"

	function onClick() {
		setOption(name, !$getOption(name))
	}
</script>

<button on:click={onClick} class="option" style="border-color: {color}">{richName}</button>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');

	.option {
		background-color: rgb(57, 57, 57);
		outline: none;
		width: 8em;
		height: 2.5em;
		border: 2px solid #50dd5f;
		border-radius: 10px;
		cursor: pointer;
		transition: .2s;
		font-family: 'Josefin Sans', sans-serif;

	}
	.option:hover {
		background-color: rgb(47, 47, 47);
	}
</style>