<script lang="ts">
	import Hexagon from "./lib/hexagon.svelte";
	import Option from "./lib/option.svelte";
	import { createOptionsStore } from "./lib/options";
	import { Pixels, PixelType } from "./lib/pixels";

	const { getOption, setOption } = createOptionsStore();

	let pixels: Pixels;
	pixels = new Pixels();

 	pixels.calculate();

	const s = pixels.score;
	$: score = $s;

	let colorPicker: HTMLDivElement;
	function setActive(event: MouseEvent) {
		const target = event.target as HTMLButtonElement;
		if (pixels.active != "none" && pixels.active == target.id) {
			pixels.active = "none";
			colorPicker.childNodes.forEach((child) => {
				if (child instanceof HTMLButtonElement) {
					child.classList.remove("color-picker-active");
				}
			});
		} else {
			pixels.active = target.id;
			colorPicker.childNodes.forEach((child) => {
				if (child instanceof HTMLButtonElement) {
					child.classList.remove("color-picker-active");
				}
			});
			target.classList.add("color-picker-active");
		}
	}
</script>

<main>
	<div style="margin-top: 0.5em; margin-bottom: 0.5em" bind:this={colorPicker}>
		<button class="color-picker none" id="empty" on:click={setActive}></button>
		<button class="color-picker white" id="white" on:click={setActive}></button>
		<button class="color-picker yellow" id="yellow" on:click={setActive}></button>
		<button class="color-picker green" id="green" on:click={setActive}></button>
		<button class="color-picker purple" id="purple" on:click={setActive}></button>

		<div style="margin-top: 0.5em; margin-bottom: 0.5em">
			<Option
				{getOption}
				{setOption}
				name="setlines"
				richName="set lines"
			/>
		</div>

	</div>
	<div style="style: flex">
		{#each Array(11) as _, row}
			<div class="line">
				{#each Array(6 + (row % 2)) as _, column}
					<Hexagon {pixels} row={10 - row} {column}></Hexagon>
				{/each}

				{#if $getOption("setlines") && (row - 1) % 3 == 0 && row != 10}
					<div class="setline" style="top: {row}"></div>
				{/if}
			</div>
		{/each}
		<h2 style="color: rgb(255, 100, 0); margin-top: .5em; margin-bottom: .5em">{score != 0 ? score : 0}</h2>

	</div>

	<div class="bottom-buttons">
		<button class="button" on:click={() => window.location.href = "/home"}>Back</button>
	  </div>

</main>

<style>
	/* Style for buttons */
	.button {
      display: inline-block;
      padding: 20px;
      margin: 10px;
      font-size: 24px;
      background-color: white;
      color: black;
      border: none;
      cursor: pointer;
    }
  
    /* Style for sign out and account buttons */
    .bottom-buttons {
      position: fixed;
      bottom: 20px;
      left: 20px;
    }

	.line {
		/* height: max(7vh, 7vw); */
		/* width: max(55vw, 55vh); */
		position: relative;
		padding: 0%;
	}

	.color-picker {
		outline: none;
		width: 2.5em;
		height: 2.5em;
		border: 2px solid #858585;
		border-radius: 100%;
		cursor: pointer;
		transition: 0.2s;
		font-family: "Josefin Sans", sans-serif;
		padding: 0;
		margin: 0;
	}

	:global(.color-picker-active) {
		border: 2px solid #ffffff !important;
	}

	.color-picker:hover {
		border: 2px solid #4c4c4c;
	}

	.setline {
		background-color: rgb(125, 125, 125);
		height: 1.25vh;
		left: 0;
		right: 0;
		position: absolute;
		border-radius: 30px;
		z-index: -1;
	}

	.none {
		background-color: #505050;
	}

	.white {
		background-color: #d8d8d8;
	}

	.yellow {
		background-color: #dda91b;
	}

	.green {
		background-color: #22b01d;
	}

	.purple {
		background-color: #b684c2;
	}

	/* Style for sign out and account buttons */
	.bottom-buttons {
      position: fixed;
      bottom: 20px;
      left: 20px;
    }

</style>
