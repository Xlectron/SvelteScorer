<script lang="ts">
	import Hexagon from "./lib/hexagon.svelte";
	import Option from "./lib/option.svelte";
	import { createOptionsStore } from "./lib/options";
	import { Pixels, PixelType } from "./lib/pixels";

	const { getOption, setOption } = createOptionsStore();
    let email;
    let password;

	let pixels_1: Pixels;
	pixels_1 = new Pixels();
 	pixels_1.calculate();
    
    let pixels_2: Pixels;
	pixels_2 = new Pixels();
 	pixels_2.calculate();

	const s_1 = pixels_1.score;
    const s_2 = pixels_2.score;
    let teams = {}
    let scores = {}

	$: score_1 = $s_1;
    $: score_2 = $s_2;
	let previousPenaltyValue_blue_minor = 0;
    let previousPenaltyValue_blue_major = 0;
    let previousPenaltyValue_red_minor = 0;
    let previousPenaltyValue_red_major = 0;

    const getCookie = (name) => {
      const cookieString = document.cookie;
      const cookies = cookieString.split('; ').reduce((acc, cookie) => {
          const [cookieName, cookieValue] = cookie.split('=');
          acc[cookieName] = cookieValue;
          return acc;
      }, {});
      return cookies[name];
    };

    const saveMatch = async () => {
      email = getCookie('email')
      password = getCookie('password')
      console.log("Email:", email, "Password:", password)

      const team1Name = (document.querySelector('.team-inputs.blue input:nth-child(1)') as HTMLInputElement).value;
      const team2Name = (document.querySelector('.team-inputs.red input:nth-child(1)') as HTMLInputElement).value;
      const team3Name = (document.querySelector('.team-inputs.blue input:nth-child(2)') as HTMLInputElement).value;
      const team4Name = (document.querySelector('.team-inputs.red input:nth-child(2)') as HTMLInputElement).value;

      teams = {team1Name, team2Name, team3Name, team4Name}
      scores = {score_1, score_2}
        
      // You can save the scores and team names to a backend server here
      // For simplicity, I'm just printing them out
      console.log("Teams:", teams);
      console.log("Scores:", scores);
      
      try {
          const response = await fetch('/savematch', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ teams, scores, email }) 
          });

          const data = await response.json();
          console.log(data)

      } catch (error) {
          console.error('Error:', error);
      }
  };


	let colorPicker: HTMLDivElement;
	function setActive(event: MouseEvent) {
		const target = event.target as HTMLButtonElement;
		if (pixels_1.active != "none" && pixels_1.active == target.id) {
			pixels_1.active = "none";
			colorPicker.childNodes.forEach((child) => {
				if (child instanceof HTMLButtonElement) {
					child.classList.remove("color-picker-active");
				}
			});
		} else {
			pixels_1.active = target.id;
			colorPicker.childNodes.forEach((child) => {
				if (child instanceof HTMLButtonElement) {
					child.classList.remove("color-picker-active");
				}
			});
			target.classList.add("color-picker-active");
		}
	}


	function majorPenaltyBlue(event: Event) {
        // Get the selected penalty value
        const selectedPenalty = (event.target as HTMLSelectElement).value;
        // Convert the selected penalty value to a number
        const penaltyValue = parseInt(selectedPenalty);
        // Subtract the penalty value from the score
        
        score_1 += (previousPenaltyValue_blue_major - penaltyValue) * 30;

		previousPenaltyValue_blue_major = penaltyValue;
    }

	function minorPenaltyBlue(event: Event) {
        // Get the selected penalty value
        const selectedPenalty = (event.target as HTMLSelectElement).value;
        // Convert the selected penalty value to a number
        const penaltyValue = parseInt(selectedPenalty);
        // Subtract the penalty value from the score
        score_1 += (previousPenaltyValue_blue_minor - penaltyValue) * 10;

		previousPenaltyValue_blue_minor = penaltyValue;
    }

    function majorPenaltyRed(event: Event) {
        // Get the selected penalty value
        const selectedPenalty = (event.target as HTMLSelectElement).value;
        // Convert the selected penalty value to a number
        const penaltyValue = parseInt(selectedPenalty);
        // Subtract the penalty value from the score
        
        score_2 += (previousPenaltyValue_red_major - penaltyValue) * 30;

		previousPenaltyValue_red_major = penaltyValue;
    }

	function minorPenaltyRed(event: Event) {
        // Get the selected penalty value
        const selectedPenalty = (event.target as HTMLSelectElement).value;
        // Convert the selected penalty value to a number
        const penaltyValue = parseInt(selectedPenalty);
        // Subtract the penalty value from the score
        score_2 += (previousPenaltyValue_red_minor - penaltyValue) * 10;

		previousPenaltyValue_red_minor = penaltyValue;
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

    
    <div class="team-inputs blue">
        <div class="input-container">
            <input type="text" placeholder="Team 1" style="background-color: #E3F2FD; color: #2196F3; width: 100px;" value="13710">
            <input type="text" placeholder="Team 2" style="background-color: #E3F2FD; color: #2196F3; width: 100px;" value="21511">
        </div>
    </div>
    
    <div class="team-inputs red">
        <div class="input-container">
            <input type="text" placeholder="Team 1" style="background-color: #FFEBEE; color: red; width: 100px;" value="12993">
            <input type="text" placeholder="Team 2" style="background-color: #FFEBEE; color: red; width: 100px;" value="19283">
        </div>
    </div>
    
    <div class="penalties_blue" style="top: 200px;">
        <div class="input-container">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label style="color: #000000;">Major Penalties:</label>
            <select style="width: 100px;" on:change={majorPenaltyBlue}>
                {#each Array(100) as num, index}
                    <option value={index}>{index}</option>
                {/each}
            </select>
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label style="color: #000000;">Minor Penalties:</label>
            <select style="width: 100px;" on:change={minorPenaltyBlue}>
                {#each Array(100) as num, index}
                    <option value={index}>{index}</option>
                {/each}
            </select>
        </div>
    </div>

    <div class="penalties_red" style="top: 200px;">
        <div class="input-container">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label style="color: #000000;">Major Penalties:</label>
            <select style="width: 100px;" on:change={majorPenaltyRed}>
                {#each Array(100) as num, index}
                    <option value={index}>{index}</option>
                {/each}
            </select>
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label style="color: #000000;">Minor Penalties:</label>
            <select style="width: 100px;" on:change={minorPenaltyRed}>
                {#each Array(100) as num, index}
                    <option value={index}>{index}</option>
                {/each}
            </select>
        </div>
    </div>
    

    <div class="save-match">
        <button class="button" style="background-color: #4CAF50; color: white;" on:click={saveMatch}>Save Match</button>
    </div>


    <div class="container">
        <!-- Hexagons and Score -->
        <div style="style: flex">
            {#each Array(11) as _, row} <!-- Loop 11 times -->
                <div class="line"> <!-- Create a div container for each line -->
                    {#each Array(6 + (row % 2)) as _, column} <!-- Loop 6 or 7 times, depending on row-->
                        <Hexagon pixels={pixels_1} row={10 - row} {column}></Hexagon> <!-- Create pixel objects-->
                    {/each}

                    {#if $getOption("setlines") && (row - 1) % 3 == 0 && row != 10} <!-- Create a set line every 3 rows-->
                        <div class="setline" style="top: {row}"></div>
                    {/if}
                </div>
            {/each}
            <h2 style="color: rgb(255, 100, 0); margin-top: .5em; margin-bottom: .5em">{score_1 != 0 ? score_1 : 0}</h2>
        </div>
            <!-- Hexagons and Score -->
        <div style="style: flex">
            {#each Array(11) as _, row}
                <div class="line">
                    {#each Array(6 + (row % 2)) as _, column}
                        <Hexagon pixels={pixels_2} row={10 - row} {column}></Hexagon>
                    {/each}

                    {#if $getOption("setlines") && (row - 1) % 3 == 0 && row != 10}
                        <div class="setline" style="top: {row}"></div>
                    {/if}
                </div>
            {/each}
            <h2 style="color: rgb(255, 100, 0); margin-top: .5em; margin-bottom: .5em">{score_2 != 0 ? score_2 : 0}</h2>
        </div>
    </div>

    <!-- Back Button -->
    <div class="bottom-buttons">
        <button class="button" on:click={() => window.location.href = "/home"}>Back</button>
    </div>
</main>

<style>
    .container {
        display: flex;
        width: 100%;
    }

    .container:first-child {
        margin-right: 10px; /* Adjust margin as needed */
    }

    .container:last-child {
        margin-left: 10px; /* Adjust margin as needed */
    }

    .team-inputs {
        position: absolute;
        
    }

    .team-inputs.blue {
        top: 100px; /* Adjust top position as needed */
        left: 20px;
    }

    .team-inputs.red {
        top: 100px; /* Adjust top position as needed */
        right: 20px;
    }

    .input-container {
        background-color: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .team-inputs input {
        width: 100px; /* Adjust width as needed */
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
        box-sizing: border-box;
    }
    
    .penalties_red {
        position: absolute;
        right: 20px;
        top: 100px; /* Adjust top position as needed */
    }

    .penalties_blue {
        position: absolute;
        left: 20px;
        top: 100px; /* Adjust top position as needed */
    }

    .penalties_blue label {
        font-weight: bold;
        margin-bottom: 5px;
        display: block;
    }

    .penalties_red label {
        font-weight: bold;
        margin-bottom: 5px;
        display: block;
    }

    .penalties_red select {
        width: 100px;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
        box-sizing: border-box;
    }

    .penalties_blue select {
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

    /* Define a media query for screens smaller than 768px */
    @media screen and (max-width: 768px) {
        .team-inputs {
            position: static; /* Remove absolute positioning */
            margin-top: 20px; /* Add margin for spacing */
        }

        .penalties {
            position: static; /* Remove absolute positioning */
            margin-top: 20px; /* Add margin for spacing */
        }

        .save-match {
            position: static; /* Remove absolute positioning */
            margin-top: 20px; /* Add margin for spacing */
        }

        /* Adjust width and padding for input fields */
        .team-inputs input {
            width: calc(50% - 15px); /* Adjust width for smaller screens */
            margin-right: 10px; /* Add margin for spacing */
        }

        /* Adjust width and margin for penalties */
        .penalties select {
            width: calc(50% - 15px); /* Adjust width for smaller screens */
            margin-right: 10px; /* Add margin for spacing */
        }
    }

</style>
