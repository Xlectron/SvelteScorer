<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    let email;
    let password;
    let teams = [];
    let number;
    let isLoading = true; // Initialize loading indicator
    const dispatcher = createEventDispatcher();

    const getCookie = (name) => {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ').reduce((acc, cookie) => {
            const [cookieName, cookieValue] = cookie.split('=');
            acc[cookieName] = cookieValue;
            return acc;
        }, {});
        return cookies[name];
  };

  const myTeams = async () => {
    email = getCookie('email')
    password = getCookie('password')
    console.log("Email:", email, "Password:", password)
    
    try {
        const response = await fetch('/myteams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }) 
        });

        const data = await response.json();
        // Sort teams by average score
        teams = data.sort((a, b) => b.avgscore - a.avgscore);
        isLoading = false; // Set loading indicator to false after data is received

    } catch (error) {
        console.error('Error:', error);
    }
};

  onMount(() => {
      myTeams();
  });
</script>


<main>
    <h1>FTC Scorer</h1>

    <div class="team-container">
      {#each teams as team, index}
          <div class="team">
              <h2>{team.name}</h2>
              <p> {team.number} </p>
              <p class="avg-score">Average Score: {team.avgscore}</p>
          </div>
      {/each}
  </div>

    <div class="bottom-buttons">
		<button class="button" on:click={() => window.location.href = "/home"}>Back</button>
	  </div>    
</main>


<style>
/* Style for team container */
.team-container {
  /* Remove flex properties */
  margin-top: 20px;
}

/* Style for each team */
.team {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 10px auto; /* Center the teams horizontally */
  background-color: #f9f9f9;
  width: 300px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: black; 
}



  .team h2 {
    margin-bottom: 10px;
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

	
</style>
