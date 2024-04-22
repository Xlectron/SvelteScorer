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
	let previousPenaltyValue = 0;

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


	function majorPenalty(event: Event) {
        // Get the selected penalty value
        const selectedPenalty = (event.target as HTMLSelectElement).value;
        // Convert the selected penalty value to a number
        const penaltyValue = parseInt(selectedPenalty);
        // Subtract the penalty value from the score
        score += (previousPenaltyValue - penaltyValue) * 30;

		previousPenaltyValue = penaltyValue;
    }

	function minorPenalty(event: Event) {
        // Get the selected penalty value
        const selectedPenalty = (event.target as HTMLSelectElement).value;
        // Convert the selected penalty value to a number
        const penaltyValue = parseInt(selectedPenalty);
        // Subtract the penalty value from the score
        score += (previousPenaltyValue - penaltyValue) * 10;

		previousPenaltyValue = penaltyValue;
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
    
    <!-- Blue Team Input Boxes -->
    <div class="team-inputs blue">
        <div class="input-container">
            <input type="text" placeholder="Team 1" style="background-color: #E3F2FD; color: #2196F3; width: 100px;">
            <input type="text" placeholder="Team 2" style="background-color: #E3F2FD; color: #2196F3; width: 100px;">
        </div>
    </div>
    
    <!-- Red Team Input Boxes -->
    <div class="team-inputs red">
        <div class="input-container">
            <input type="text" placeholder="Team 1" style="background-color: #FFEBEE; color: red; width: 100px;">
            <input type="text" placeholder="Team 2" style="background-color: #FFEBEE; color: red; width: 100px;">
        </div>
    </div>
    

    <!-- Major and Minor Penalties -->
    <div class="penalties">
        <div class="input-container">
            <label style="color: #000000;">Major Penalties:</label>
            <select style="width: 100px;" on:change={majorPenalty}>
                {#each Array(100) as num, index}
                    <option value={index}>{index}</option>
                {/each}
            </select>
            <label style="color: #000000;">Minor Penalties:</label>
            <select style="width: 100px;" on:change={minorPenalty}>
                {#each Array(100) as num, index}
                    <option value={index}>{index}</option>
                {/each}
            </select>
        </div>
    </div>

    
    <!-- Save Match Button -->
    <div class="save-match">
        <button class="button" style="background-color: #4CAF50; color: white;">Save Match</button>
    </div>
    
    <!-- Hexagons and Score -->
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

    <!-- Back Button -->
    <div class="bottom-buttons">
        <button class="button" on:click={() => window.location.href = "/home"}>Back</button>
    </div>
</main>

<style>
    .team-inputs {
        position: absolute;
        left: 20px;
    }

    .team-inputs.blue {
        top: 100px; /* Adjust top position as needed */
    }

    .team-inputs.red {
        top: 250px; /* Adjust top position as needed */
    }

    .input-container {
        background-color: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .team-inputs label {
        font-weight: bold;
        margin-bottom: 10px;
        display: block;
    }

    .team-inputs input {
        width: 100px; /* Adjust width as needed */
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
        box-sizing: border-box;
    }
    
    .penalties {
        position: absolute;
        right: 20px;
        top: 100px; /* Adjust top position as needed */
    }

    .penalties label {
        font-weight: bold;
        margin-bottom: 5px;
        display: block;
    }

    .penalties select {
        width: 100px;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
        box-sizing: border-box;
    }
    
    .save-match {
        position: absolute;
        right: 20px;
        top: 500px; /* Adjust top position as needed */
    }
    
    .save-match button {
        padding: 15px 30px;
        font-size: 18px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
  
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
