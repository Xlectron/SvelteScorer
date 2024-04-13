<script lang="ts">
	import { PixelType, type Pixels } from "./pixels";

	export let pixels: Pixels
	export let row: number
	export let column: number

	function determineColor(state: PixelType) {
		switch (pixels.map[row][column]) {
			case PixelType.None:
				return "#505050";
			case PixelType.White:
				return "#d8d8d8";
			case PixelType.Yellow:
				return "#dda91b";
			case PixelType.Green:
				return "#22b01d";
			case PixelType.Purple:
				return "#b684c2";
			default:
				return "#505050";
		}
	}

	const values = Object.values(PixelType)
	const map = new Map(values.map((k, i) => [k, values[i + 1]]));

	function nameToPixelType(name: string) {
		switch (name) {
			case "empty":
				return PixelType.None;
			case "white":
				return PixelType.White;
			case "yellow":
				return PixelType.Yellow;
			case "green":
				return PixelType.Green;
			case "purple":
				return PixelType.Purple;
			default:
				return PixelType.None;
		}
	}

	let color = determineColor(pixels.get(row, column))
	function update() {
		const pixel = pixels.get(row, column)
		let next: PixelType
		if (pixels.active == "none") {
			if (pixel == PixelType.Purple) {
				next = PixelType.None
			} else {
				next = map.get(pixel)! as PixelType
			}
		} else {
			next = nameToPixelType(pixels.active)
		}
		pixels.set(row, column, next)

		color = determineColor(pixels.get(row, column))
	}
</script>

<style>
	button {
		display: inline-block;
		text-align: center;
		text-decoration: none;
		vertical-align: middle;
		user-select: none;
		height: 3.5em;
		width: 3.9em;
		font-size: min(2vh, 2vw);
		rotate: 90deg;
		
		touch-action: manipulation;

		outline: none;
		border: none;

		margin-left: .5em;

		--btn-raise: 1.3em;
		clip-path: polygon(var(--btn-raise) 0%, calc(100% - var(--btn-raise)) 0%, 100% 50%, calc(100% - var(--btn-raise)) 100%, var(--btn-raise) 100%, 0 50%);
		background-color: #dda91b;
	}
</style>

<button on:click={update} style="background-color: {color}"></button>
